import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
import { TextInput } from "@repo/ui/textInput"
import { useState } from "react"

export function SendMoneyCard({user}: {user: any}) {
    const [amount, setAmount] = useState(0);

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
                <div className="mt-10 mb-5">
                    <Button title="Pay Now" onClick={() => {}} />
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