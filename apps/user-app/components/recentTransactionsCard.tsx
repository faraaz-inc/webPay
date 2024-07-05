import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";



export function RecentTransactions({ transactions }: {
    transactions: {
        id: number,
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) {
    const sortedTransactions = transactions.sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 5);
    
    if(!transactions.length) {
        return <div className="w-full mt-8"> 
            <Card title="Recent Transactions">
                <Center>
                    <div className="mt-5">
                        No Recent Transactions
                    </div>
                </Center>
            </Card>
        </div>
    }
    return <div className="w-full mt-8">
        <Card title="Recent OnRamp Transactions">
            <div className="mt-5">
                {sortedTransactions.map(transaction => {
                    
                    return <div key={transaction.id} className="flex justify-between border-b py-1">
                        <div>
                            <div>
                                Recieved INR
                            </div>
                            <div>
                                {transaction.time.toDateString()} ({transaction.status})
                            </div>
                        </div>
                        <div className="flex flex-col justify-center text-green-600">
                            + Rs {transaction.amount / 100}
                        </div>
                    </div>
                })}
            </div>
        </Card>
    </div>
}