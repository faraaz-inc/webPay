"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function createOnRampTxns(amount: number, provider: string) {

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    //in real world this token will come from an http request from the bank
    const token = Math.random().toString();

    if(!userId) {
        return {
            message: "User not logged in"
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount,
            status: "Processing",
            startTime: new Date(),
            provider: provider,
            token
        }
    });

    return {
        message: "On Ramp Transaction created"
    }
}