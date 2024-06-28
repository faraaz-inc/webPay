"use client"

import { useBalance } from "@repo/store/useBalance";
import { Tester } from "@repo/ui/test";


export default function Home() {
  const balance = useBalance();
  return (
    <div>
      <div className="text-2xl text-red-500">
        Hi there
      </div>
      <Tester />
      current balance = {balance}
    </div>
  );
}
