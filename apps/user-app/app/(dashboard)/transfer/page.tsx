import { useSession } from "next-auth/react";
import { AddMoney } from "../../../components/addMoneyCard";
import { BalanceCard } from "../../../components/balanceCard";
import { RecentTransactions } from "../../../components/recentTransactionsCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";


async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: session?.user?.id as number
        }
    });

    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: session?.user?.id as number
        }
    });

    console.log(txns);

    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }));
}


export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="ml-12 mt-10 w-full">
        <div className="text-4xl text-primary">
            Transfer Money
        </div>
        <div className="grid grid-cols-2 w-full mt-10">
            <div className="mr-20">
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <RecentTransactions transactions={transactions} />
            </div>

        </div>
    </div>
}