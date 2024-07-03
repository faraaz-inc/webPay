import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";



export function RecentTransactions({ transactions }: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) {
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
        <Card title="Recent Transactions">
            <div className="mt-5">
                {transactions.map(transaction => {
                    return <div className="flex justify-between border-b py-1">
                        <div>
                            <div>
                                Recieved INR
                            </div>
                            <div>
                                {transaction.time.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center ">
                            + Rs {transaction.amount / 100}
                        </div>
                    </div>
                })}
            </div>
        </Card>
    </div>
}