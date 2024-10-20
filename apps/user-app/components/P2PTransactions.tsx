import { Card } from "@repo/ui/card";


export const P2PTransactions = ({
    transactions,
}: {
    transactions: {
        id: number;
        type: "sent" | "received";
        amount: number;
        timestamp: Date;
        user: string;
    }[];
}) => {
    if (!transactions.length) {
        return (
            <Card title="P2P Transactions">
                <div className="text-center py-8 text-gray-500">
                    No P2P Transactions
                </div>
            </Card>
        );
    }

    return (
        <Card title="P2P Transactions">
            <div className="pt-4 space-y-6">
                {transactions.map((txn) => (
                    <div key={txn.id} className="flex justify-between items-center border-b border-gray-200 pb-4 last:border-none">
                        <div>
                            <div className="text-md font-medium text-gray-800">
                                {txn.type === "sent" ? "Sent to" : "Received from"} {txn.user}
                            </div>
                            <div className="text-slate-600 text-xs mt-1">
                                {txn.timestamp.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-center ml-4">
                            <div className={`text-lg font-semibold ${txn.type === "sent" ? "text-red-600" : "text-green-600"}`}>
                                {txn.type === "sent" ? "- Rs" : "+ Rs"} {(txn.amount / 100).toFixed(2)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
