"use server"

import prisma from "@repo/db/client"

export async function findUser(number: string) {

        const user = await prisma.user.findFirst({
            where: {
                number
            }
        });

        return user;
}