"use client";

import AlphabetPractice from "@/components/AlphabetPractice";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AlphabetPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <Link
                        href="/"
                        className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-200"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Alphabet Practice</h1>
                        <p className="text-gray-500">Master Hiragana and Katakana characters</p>
                    </div>
                </div>

                <AlphabetPractice />

                <section className="mt-20 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                        Learning Tips
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <h3 className="font-bold text-blue-700">Writing Practice</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Use the <strong>Writing Mode</strong> to test your muscle memory.
                                We show you the sound, you write it on your physical paper,
                                then check if your stroke order and shape were correct.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-bold text-blue-700">Audio Recognition</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Always listen to the Bengali pronunciation by clicking the
                                speaker icon. Associating the sound with the visual character
                                is the fastest way to learn.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
