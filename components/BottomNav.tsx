"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Book, Trophy } from "lucide-react";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Alphabet", href: "/alphabet", icon: Book },
    { name: "Quiz", href: "/quiz", icon: Trophy },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="sm:hidden fixed bottom-4 left-6 right-6 bg-white border border-gray-100 p-1.5 flex justify-around items-center z-50 rounded-2xl shadow-lg">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl transition-all duration-300 ${isActive
                            ? "bg-blue-600 text-white font-bold"
                            : "bg-slate-50/50 text-slate-400 font-bold hover:bg-slate-100 hover:text-slate-600"
                            }`}
                    >
                        <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : "stroke-[2px]"}`} />
                        {isActive && (
                            <span className="text-[10px] uppercase tracking-wider animate-fade-in">
                                {item.name}
                            </span>
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
