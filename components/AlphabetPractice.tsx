"use client";

import { useState, useEffect, useCallback } from "react";
import { hiragana, katakana } from "@/data/alphabat";
import AudioButton from "./AudioButton";
import { RefreshCw, Eye, EyeOff, BookOpen, PenTool, ChevronRight, ChevronLeft } from "lucide-react";

type AlphabetItem = {
    char: string;
    romaji: string;
    bn: string;
    alts: string[];
};

export default function AlphabetPractice() {
    const [kanaType, setKanaType] = useState<"hiragana" | "katakana">("hiragana");
    const [practiceMode, setPracticeMode] = useState<"normal" | "reverse">("normal");
    const [currentItem, setCurrentItem] = useState<AlphabetItem>(() => {
        const pool = hiragana;
        return pool[Math.floor(Math.random() * pool.length)];
    });
    const [showAnswer, setShowAnswer] = useState(false);
    const [history, setHistory] = useState<AlphabetItem[]>([]);

    const getRandomItem = useCallback(() => {
        const pool = kanaType === "hiragana" ? hiragana : katakana;
        const randomIndex = Math.floor(Math.random() * pool.length);
        const newItem = pool[randomIndex];

        // Avoid immediate duplicates
        if (currentItem && newItem.char === currentItem.char && pool.length > 1) {
            return getRandomItem();
        }

        setCurrentItem(newItem);
        setShowAnswer(false);
    }, [kanaType, currentItem]);

    useEffect(() => {
        getRandomItem();
    }, [kanaType]); // Also refresh on kana type change

    const handleNext = () => {
        if (currentItem) {
            setHistory(prev => [currentItem, ...prev].slice(0, 10));
        }
        getRandomItem();
    };

    if (!currentItem) return null;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between">
                <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
                    <button
                        onClick={() => setKanaType("hiragana")}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${kanaType === "hiragana" ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Hiragana
                    </button>
                    <button
                        onClick={() => setKanaType("katakana")}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${kanaType === "katakana" ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Katakana
                    </button>
                </div>

                <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
                    <button
                        onClick={() => setPracticeMode("normal")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${practiceMode === "normal" ? "bg-indigo-600 text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                            }`}
                        title="See character, guess sound"
                    >
                        <BookOpen className="w-4 h-4" />
                        Recognition
                    </button>
                    <button
                        onClick={() => setPracticeMode("reverse")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${practiceMode === "reverse" ? "bg-indigo-600 text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                            }`}
                        title="See/Hear sound, write character on paper"
                    >
                        <PenTool className="w-4 h-4" />
                        Writing (Paper)
                    </button>
                </div>
            </div>

            {/* Practice Card */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-blue-50 p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute top-4 right-4">
                    <AudioButton text={currentItem.bn} className="scale-125" />
                </div>

                <div className="mb-8">
                    {practiceMode === "normal" ? (
                        <div className="text-9xl font-bold text-gray-800 animate-fade-in">
                            {currentItem.char}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 animate-fade-in">
                            <span className="text-6xl font-bold text-blue-600 uppercase tracking-widest">
                                {currentItem.romaji}
                            </span>
                            <span className="text-2xl text-gray-400 font-medium">({currentItem.bn})</span>
                            <p className="text-sm text-gray-400 mt-4 italic">Write the character on your paper...</p>
                        </div>
                    )}
                </div>

                <div className="min-h-[120px] flex flex-col items-center justify-center">
                    {showAnswer ? (
                        <div className="animate-fade-in-up">
                            <div className="flex items-center justify-center gap-4 mb-2">
                                <span className="text-4xl font-bold text-green-600">
                                    {practiceMode === "normal" ? currentItem.romaji.toUpperCase() : currentItem.char}
                                </span>
                            </div>
                            <p className="text-gray-500 font-medium">
                                {practiceMode === "normal" ? `Bengali: ${currentItem.bn}` : `Sound: ${currentItem.romaji} (${currentItem.bn})`}
                            </p>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowAnswer(true)}
                            className="flex items-center gap-2 px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-2xl transition-all"
                        >
                            <Eye className="w-5 h-5" />
                            Show Answer
                        </button>
                    )}
                </div>

                <div className="mt-12 flex gap-4">
                    <button
                        onClick={handleNext}
                        className="flex-1 flex items-center justify-center gap-3 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 touch-manipulation"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Next Character
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* History / Info */}
            <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">
                    {practiceMode === "reverse"
                        ? "Tip: Listen to the audio and try to write the character from memory."
                        : "Tip: Try to say the sound out loud before revealing the answer."}
                </p>
            </div>
        </div>
    );
}
