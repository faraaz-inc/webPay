import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
import { TextInput } from "@repo/ui/textInput"
import { useState } from "react"
import { p2pTransfer } from "../lib/actions/p2pTransfer"

export function SendMoneyCard({user}: {user: any}) {
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState(null);
    const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>()

    if(!user) {
        return <div>
            
        </div>
    }

    return <div className="mx-20">
        <Card title="User Details">
            <Center>
                <div className="text-3xl">
                    {user.name}
                </div>
            </Center>
            <Center>
                <div className="text-3xl mt-5">
                    <div className="flex place-items-center gap-2">
                        <div>
                            {user.number}
                        </div>
                        <div className=""> 
                            <VerifiedIcon />
                        </div>
                    </div>
                </div>
            </Center>
            <Center>
                <div className="w-8/12">
                    <TextInput label="Amount" placeholder="Amount" onChange={(value) => {
                        setAmount(Number(value) * 100);
                        console.log(amount);
                    }} />
                </div>
                
            </Center>
            <Center>
                {error && (
                    <div className="text-red-500 mt-3">
                        {error}
                    </div>
                )}
                {transactionStatus == TransactionStatus["Succesfull"] && (
                    <div className="flex place-items-center gap-1 text-green-500 mt-3">
                        <div>
                            Payment Succesfull
                        </div>
                        <div>
                            <SuccessIcon />
                        </div>
                    </div>
                )}
            </Center>
            <Center>
                <div className="mt-5 mb-5">
                    <Button title="Pay Now" onClick={async () => {
                        //call transfer action
                        console.log("Amount to be transferred: ", amount);
                        try {
                            const res = await p2pTransfer(user, amount);
                            setError(null);
                            setTransactionStatus(TransactionStatus["Succesfull"])
                        }
                        catch(err: any) {
                            setTransactionStatus(TransactionStatus["Failed"]);
                            setError(err.message);
                            console.log(err);
                        }
                        
                    }} />
                </div>
            </Center>
        </Card>
    </div>
}

function VerifiedIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-primary">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
  </svg>
  
}

function SuccessIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
  </svg>
  
}

enum TransactionStatus {
    "Processing",
    "Succesfull",
    "Failed"
}

