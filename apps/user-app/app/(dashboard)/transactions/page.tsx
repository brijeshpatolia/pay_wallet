import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { P2PTransactions } from "../../../components/P2PTransactions"; // Assuming you created this component for P2P transactions.

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return [];
    }

    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id),
        },
    });

    return txns.map((t) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
    }));
}

async function getP2PTransactions() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return [];
    }

    const userId = Number(session.user.id);

    // Fetching sent transactions
    const sentTxns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: userId,
        },
        include: {
            toUser: true,
        },
    });

    // Fetching received transactions
    const receivedTxns = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: userId,
        },
        include: {
            fromUser: true,
        },
    });

    console.log("Sent P2P Transactions:", sentTxns); // Log to see the fetched data
    console.log("Received P2P Transactions:", receivedTxns); // Log to see the fetched data

    return [
        ...sentTxns.map((txn) => ({
            id: txn.id,
            type: "sent" as const,
            amount: txn.amount,
            timestamp: txn.timestamp,
            user: txn.toUser?.name || txn.toUser?.email || "Unknown User",
        })),
        ...receivedTxns.map((txn) => ({
            id: txn.id,
            type: "received" as const,
            amount: txn.amount,
            timestamp: txn.timestamp,
            user: txn.fromUser?.name || txn.fromUser?.email || "Unknown User",
        })),
    ];
}


export default async function TransactionsPage() {
    const onRampTransactions = await getOnRampTransactions();
    const p2pTransactions = await getP2PTransactions();

    return (
        <div className="flex justify-around pt-4">
            <div className="w-1/2 pr-4">
                <OnRampTransactions transactions={onRampTransactions} />
            </div>
            <div className="w-1/2 pl-4">
                <P2PTransactions transactions={p2pTransactions} />
            </div>
        </div>
    );
}
