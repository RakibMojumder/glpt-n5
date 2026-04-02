import AlphabetPractice from "@/components/AlphabetPractice";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AlphabetPage() {
    return (
        <main className="min-h-screen bg-white pt-8 pb-24 md:pt-12 md:pb-16 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Compact Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/"
                        className="p-2 bg-white hover:bg-slate-50 rounded-lg transition-all border border-gray-100 text-slate-400"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900 leading-tight">
                            Alphabet Practice
                        </h1>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                            Master Hiragana & Katakana
                        </p>
                    </div>
                </div>

                <AlphabetPractice />
            </div>
        </main>
    );
}
