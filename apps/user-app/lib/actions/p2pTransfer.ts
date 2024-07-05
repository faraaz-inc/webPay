"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function p2pTransfer(toUser: any, amount: number) {

    const session = await getServerSession(authOptions);
    const fromUser = session?.user?.id;
    if(!fromUser) {
        throw new Error("Error while processing transaction")
    }

    //create a p2p transaction in db
    const txn = await prisma.p2pTransactions.create({
        data: {
            amount,
            status: "Processing",
            timestamp: new Date(),
            fromUserId: Number(fromUser),
            toUserId: toUser.id
        }
    });

    try {
        await prisma.$transaction(async (tx) => {
            //lock the database
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUser)} FOR UPDATE`;
    
            //check for available balance
            const fromBalance = await prisma.balance.findFirst({
                where: {
                    userId: Number(fromUser)
                }
            });
            if(!fromBalance || fromBalance.amount < amount) {
                console.log("Inside error condition")
                throw new Error("Insufficient funds");
            }
    
            //debit amount from source account
            await tx.balance.update({
                where: {
                    userId: Number(fromUser)
                },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            });
    
            //credit amount in destination account
            await tx.balance.update({
                where: {
                    userId: toUser.id
                },
                data: {
                    amount: {
                        increment: amount
                    }
                }
            });
    
            //update transaction status to succesfull
            await tx.p2pTransactions.update({
                where: {
                    id: txn.id
                },
                data: {
                    status: "Successful"
                }
            })
        });
        return {
            status: 0,
            message: "Transfer succesfull"
        }
    }
    catch(err: any) {
        //set transaction status to failed
        await prisma.p2pTransactions.update({
            where: {
                id: txn.id
            },
            data: {
                status: "Failed"
            }
        });
        throw new Error(err.message);
    }
}