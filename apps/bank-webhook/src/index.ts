import express from "express"

const app = express();

app.post("/hdfcWebhook", (req, res) => {
    //Add zod validation
    const paymentInfo = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    //update balance in DB and add txn
    
})