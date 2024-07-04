"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


export async function p2pTransfer() {
    const session = await getServerSession(authOptions);
    const fromUser = session?.user?.id;
    if(!fromUser) {
        return {
            message: "Error while sending Money"
        }
    }
}