import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: {label: "Phone Number", type: "text", placeholder: "Number"},
                password: {label: "Password", type: "password", placeholder: "Password"}
            },
            async authorize(credentials: any) {

            }
        })
    ],
    secret: process.env.NEXTAUTH_URL || "secret",
    callbacks: {
        
    }
}