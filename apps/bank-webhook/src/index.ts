import express from "express"
import prisma from "@repo/db/client";

const app = express();
const PORT = 3003;

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
    //Add zod validation
    
    const paymentInfo = {
        token: req.body.token,
        userId: Number(req.body.user_identifier),
        amount: Number(req.body.amount)
    }

    const txn = await prisma.onRampTransaction.findUnique({
        where: {
            token: paymentInfo.token
        }
    });

    if(txn?.status != "Processing") {
        return res.status(400).json({
            message: "Transaction Already Processed"
        })
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
            message: "Transaction Captured"
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