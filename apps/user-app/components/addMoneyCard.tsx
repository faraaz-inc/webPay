"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
import { Select } from "@repo/ui/select"
import { TextInput } from "@repo/ui/textInput"
import { useState } from "react"
import { createOnRampTxns } from "../lib/actions/createOnRampTxns"


const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectURL: "https://netbanking.hdfcbank.com/"
}, {
    name: "Axis Bank",
    redirectURL: "https://www.axisbank.com"
}]


export function AddMoney() {
    const [redirectURL, setRedirectURL] = useState(SUPPORTED_BANKS[0]?.redirectURL);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name);

    return <Card title="Add Money">
        <TextInput label="Amount" placeholder="Amount" onChange={(value) => {
            setAmount(Number(value) * 100);
        }} />
        <div className="block mt-5 mb-2 text-md text-gray-900">
            Bank
        </div>
        <Select options={SUPPORTED_BANKS.map(x => ({key: x.name, value: x.name}))} onSelect={(value) => {
            setRedirectURL(SUPPORTED_BANKS.find(x => x.name === value)?.redirectURL);
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name)
        }} />
        <div className="mt-10">
            <Center>
                <Button title="Add Money" onClick={async () => {
                    await createOnRampTxns(amount as number, provider as string);
                    window.location.href = redirectURL as string
                }} />
            </Center>
        </div>
    </Card>
}