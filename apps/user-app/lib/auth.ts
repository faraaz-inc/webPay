import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt"
import type { AuthOptions } from "next-auth";
import { pages } from "next/dist/build/templates/app-page";
import { Session } from "inspector";


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: {label: "Phone Number", type: "text", placeholder: "Number"},
                password: {label: "Password", type: "password", placeholder: "Password"}
            },
            async authorize(credentials: any) {
                //otp and zod validation here

                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await prisma.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });
                if(existingUser) {
                    const passwordValidation = await bcrypt.compare(hashedPassword, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        } as any;
                    }
                    return null as any;
                }

                //create user if it doesn't exist
                
                // try {
                //     const user = await prisma.user.create({
                //         data: {
                //             name: "dummy",
                //             email: "dummy@example.com",
                //             number: credentials.phone,
                //             password: hashedPassword
                //         }
                //     });

                //     return {
                //         id: user.id.toString(),
                //         name: user.name,
                //         email: user.email
                //     }   
                // } catch(err) {
                //     console.log(err);
                //     return null
                // }
                
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        async session({token, session}: any) {
            session.user.id = token.sub
            return session;
        }
    },
    pages: {
        
    }
}