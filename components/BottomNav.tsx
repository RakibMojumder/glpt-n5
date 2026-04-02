"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Book } from "lucide-react";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Alphabet", href: "/alphabet", icon: Book },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="sm:hidden fixed bottom-3 left-6 right-6 bg-white border border-gray-100 shadow-lg px-8 py-3 flex justify-around items-center z-50 rounded-xl">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex flex-col items-center gap-0.5 transition-all ${isActive ? "text-blue-600 scale-105" : "text-slate-400"
                            }`}
                    >
                        <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : "stroke-[1.5px]"}`} />
                        <span className={`text-[8px] font-bold uppercase tracking-widest ${isActive ? "opacity-100" : "opacity-0"}`}>
                            {item.name}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
