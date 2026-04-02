"use client";

import { useState, useEffect, useCallback } from "react";
import { hiragana, katakana } from "@/data/alphabat";
import AudioButton from "./AudioButton";
import { RefreshCw, Eye, BookOpen, PenTool, ChevronRight } from "lucide-react";

type AlphabetItem = {
    char: string;
    romaji: string;
    bn: string;
    alts: string[];
};

export default function AlphabetPractice() {
    const [kanaType, setKanaType] = useState<"hiragana" | "katakana">("hiragana");
    const [practiceMode, setPracticeMode] = useState<"normal" | "reverse">("normal");
    const [currentItem, setCurrentItem] = useState<AlphabetItem | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const getRandomItem = useCallback(() => {
        const pool = kanaType === "hiragana" ? hiragana : katakana;
        const randomIndex = Math.floor(Math.random() * pool.length);
        const newItem = pool[randomIndex];

        if (currentItem && newItem.char === currentItem.char && pool.length > 1) {
            return getRandomItem();
        }

        setCurrentItem(newItem);
        setShowAnswer(false);
    }, [kanaType, currentItem]);

    useEffect(() => {
        getRandomItem();
    }, [kanaType]);

    const handleNext = () => {
        getRandomItem();
    };

    if (!currentItem) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <RefreshCw className="animate-spin text-blue-600 w-5 h-5" />
        </div>
    );

    return (
        <div className="max-w-xl mx-auto px-4">
            {/* Compact Controls */}
            <div className="flex flex-col gap-3 mb-8">
                <div className="flex p-0.5 bg-slate-100 rounded-lg border border-slate-200">
                    <button
                        onClick={() => setKanaType("hiragana")}
                        className={`flex-1 px-4 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${kanaType === "hiragana" ? "bg-white text-blue-600 border border-slate-200" : "text-slate-500"
                            }`}
                    >
                        Hiragana
                    </button>
                    <button
                        onClick={() => setKanaType("katakana")}
                        className={`flex-1 px-4 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${kanaType === "katakana" ? "bg-white text-blue-600 border border-slate-200" : "text-slate-500"
                            }`}
                    >
                        Katakana
                    </button>
                </div>

                <div className="flex p-0.5 bg-slate-100 rounded-lg border border-slate-200">
                    <button
                        onClick={() => setPracticeMode("normal")}
                        className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${practiceMode === "normal" ? "bg-white text-blue-600 border border-slate-200" : "text-slate-500"
                            }`}
                    >
                        <BookOpen className="w-3 h-3" />
                        Recognition
                    </button>
                    <button
                        onClick={() => setPracticeMode("reverse")}
                        className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${practiceMode === "reverse" ? "bg-white text-blue-600 border border-slate-200" : "text-slate-500"
                            }`}
                    >
                        <PenTool className="w-3 h-3" />
                        Writing
                    </button>
                </div>
            </div>

            {/* Compact Practice Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 text-center animate-fade-in relative">
                <div className="absolute top-6 right-6 scale-90">
                    <AudioButton text={currentItem.bn} />
                </div>

                <div className="min-h-[120px] flex items-center justify-center mb-6">
                    {practiceMode === "normal" ? (
                        <div className="text-8xl font-bold text-slate-800 leading-none select-none">
                            {currentItem.char}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-5xl font-bold text-blue-600 uppercase tracking-tighter">
                                {currentItem.romaji}
                            </span>
                            <span className="text-sm text-slate-400 font-bold uppercase tracking-widest opacity-60">({currentItem.bn})</span>
                        </div>
                    )}
                </div>

                <div className="min-h-[80px] flex flex-col items-center justify-center">
                    {showAnswer ? (
                        <div className="animate-fade-in">
                            <span className="text-3xl font-bold text-blue-600 block mb-1">
                                {practiceMode === "normal" ? currentItem.romaji.toUpperCase() : currentItem.char}
                            </span>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                Sound: {currentItem.romaji} • Bengali: {currentItem.bn}
                            </p>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowAnswer(true)}
                            className="px-6 py-2 bg-slate-50 text-slate-500 font-bold text-[9px] uppercase tracking-widest rounded-full transition-all active:scale-95 border border-slate-200"
                        >
                            Reveal Answer
                        </button>
                    )}
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleNext}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all active:scale-95 group"
                    >
                        <span>Next Character</span>
                        <ChevronRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}
