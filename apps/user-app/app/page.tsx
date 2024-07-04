import { Appbar } from "@repo/ui/appbar"
import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getServerSession();
  console.log(session);
  
  if(session?.user) {
    redirect("/dashboard");
  }
  else {
    redirect("/api/auth/signin");
  }

  return (
    <div>

    </div>
  );
}