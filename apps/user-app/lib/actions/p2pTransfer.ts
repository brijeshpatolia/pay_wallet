"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

// Define the expected type for the Balance query result
type BalanceRecord = {
    userId: number;
    amount: number;
};

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if (!from) {
        return {
            message: "Error: User not authenticated"
        };
    }

    const toUser = await prisma.user.findFirst({
        where: { number: to }
    });

    if (!toUser) {
        return {
            message: "Error: Recipient user not found"
        };
    }

    try {
        // Execute the transaction
        await prisma.$transaction(async (tx) => {
            // Lock sender's balance for update using raw SQL and explicitly type the result
            const fromBalance: BalanceRecord[] | null = await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

            // Check if balance exists and if the user has sufficient funds
            if (!fromBalance || fromBalance.length === 0 || !fromBalance[0] || fromBalance[0].amount < amount) {
                throw new Error('Error: Insufficient funds');
            }

            // Lock recipient's balance for update using raw SQL
            const toBalance: BalanceRecord[] | null = await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(toUser.id)} FOR UPDATE`;

            if (!toBalance || toBalance.length === 0 || !toBalance[0]) {
                throw new Error('Error: Recipient balance not found');
            }

            // Deduct amount from sender's balance
            await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: amount } },
            });

            // Add amount to recipient's balance
            await tx.balance.update({
                where: { userId: Number(toUser.id) },
                data: { amount: { increment: amount } },
            });

            // Record the transfer in p2pTransfer table
            await tx.p2pTransfer.create({
                data: {
                    fromUserId: Number(from),
                    toUserId: Number(toUser.id),
                    amount,
                    timestamp: new Date(),
                },
            });
        });

        return {
            message: "Transfer successful"
        };

    } catch (error) {
        // Narrow the error type
        if (error instanceof Error) {
            return {
                message: error.message
            };
        } else {
            return {
                message: "An unknown error occurred"
            };
        }
    }
}
