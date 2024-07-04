"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { SendMoneyCard } from "./sendMoneyCard";
import { findUser } from "../lib/actions/findUser";


export function SearchUserCard() {
    const [number, setNumber] = useState("0");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("valid");

    return <div className="grid grid-cols-3">
        <div className="">
            <Card title="Enter Phone number">
                <TextInput label="Phone Number" onChange={(value) => {setNumber(value)}} placeholder="Phone Number" />
                {error === "invalid" && (
                    <div className="text-red-500">
                        Invalid Phone Number
                    </div>
                )}
                <Center>
                    <div className="mt-3 font-semibold mb-5">
                        <Button title="Verify" onClick={async () => {
                            const user = await findUser(number);
                            if(!user) {
                                setError("invalid");
                                setUser(null);
                                return;
                            }
                            setError("valid");
                            setUser(user as any);
                        }} />
                    </div>
                </Center>
            </Card>
        </div>
        <div className="col-span-2 ml-10 mr-10">
            <SendMoneyCard user={user} />
        </div>
    </div>
}
