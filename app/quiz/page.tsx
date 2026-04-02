"use client";

import VocabularyQuiz from "@/components/VocabularyQuiz";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function QuizPage() {
    return (
        <main className="min-h-screen bg-white pb-32">
            <div className="max-w-4xl mx-auto px-3 pt-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-all mb-8 group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Back to Home</span>
                </Link>

                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Vocabulary Quiz</h1>
                    <p className="text-slate-500 text-sm">Challenge yourself with custom quiz sessions.</p>
                </div>

                <VocabularyQuiz />
            </div>
        </main>
    );
}
