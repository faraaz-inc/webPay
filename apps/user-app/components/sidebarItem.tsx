"use client"

import { usePathname, useRouter } from "next/navigation";
import React from "react";


export function SidebarItem({href, title, icon}: {href: string, title: string, icon: React.ReactNode}): JSX.Element {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;

    return <div className={`flex ${selected ? "text-primary" : "text-slate-500"} hover:text-primary transition-colors cursor-pointer p-2 pl-8` } onClick={() => router.push(href)}>
        <div className="mr-3">
            {icon}
        </div>
        <div>
            {title}
        </div>
    </div>
}