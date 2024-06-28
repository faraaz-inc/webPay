import { PrismaClient } from "@repo/db/client"
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function POST() {
    try {
        await prisma.user.create({
            data: {
                email: "dummy@example.com",
                name: "Dummy"
            }
        });
        return NextResponse.json({
            message: "User created"
        })
    }
    catch(err) {
        console.log(err);
        return NextResponse.json({
            message: "error"
        })
    }

}