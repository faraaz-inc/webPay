import express from "express"
import prisma from "@repo/db/client";

const app = express();
const PORT = 3003;

app.post("/hdfcWebhook", async (req, res) => {
    //Add zod validation
    const paymentInfo = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    try {
        await prisma.$transaction([
            //update balance in DB and add txn
            prisma.balance.update({
                where: {
                    userId: paymentInfo.userId,
                },
                data: {
                    amount: {
                        increment: paymentInfo.amount
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    token: paymentInfo.token
                },
                data: {
                    status: "Successful"
                }
            })
        ]);

        res.status(200).json({
            message: "Transaction Succesfull"
        });
        
    }
    catch(err) {
        console.log(err);
        res.status(411).json({
            message: "Error while processing webHook"
        })
    }
});

app.listen(PORT, () => console.log("Listening on port 3003"));