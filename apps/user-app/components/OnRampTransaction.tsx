import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center py-8 text-gray-500">
                    No Recent Transactions
                </div>
            </Card>
        );
    }

    return (
        <Card title="Recent Transactions">
            <div className="pt-4 space-y-6">
                {transactions.map((t, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-gray-200 pb-4 last:border-none">
                        <div>
                            <div className="text-md font-medium text-gray-800">
                                Received INR
                            </div>
                            <div className="text-slate-600 text-xs mt-1">
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-center ml-4">
                            <div className="text-lg font-semibold text-green-600">
                                + Rs {(t.amount / 100).toFixed(2)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
