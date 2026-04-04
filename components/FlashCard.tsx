"use client";

import { useState } from "react";
import AudioButton from "./AudioButton";
import { Word } from "@/types/lesson";

interface FlashCardProps {
    word: Word;
}

export default function FlashCard({ word }: FlashCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = (e: React.MouseEvent | React.TouchEvent) => {
        if ((e.target as HTMLElement).closest('button')) return;
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className="group perspective w-full h-72 cursor-pointer touch-manipulation"
            onClick={toggleFlip}
        >
            <div className={`relative w-full h-full text-center transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden bg-white border border-gray-100 rounded-xl flex flex-col items-center justify-center p-4 hover:border-blue-200 transition-colors">
                    <span className="text-5xl font-bold text-slate-800 mb-2">{word.word}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{word.romaji}</span>
                    <p className="mt-6 text-[9px] font-bold text-blue-400 uppercase tracking-widest animate-pulse">Tap to flip</p>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full backface-hidden bg-blue-50 border border-blue-100 rounded-xl flex flex-col items-center justify-center p-4 rotate-y-180">
                    <span className="text-3xl font-bold text-blue-700 mb-3">{word.meaning}</span>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{word.romaji}</span>
                        <AudioButton text={word.pronunciation} />
                    </div>
                    <div className="px-3 py-1.5 bg-white rounded-lg border border-blue-100 text-center">
                        <span className="text-[10px] font-bold text-slate-300 block leading-none mb-1 uppercase tracking-widest">Pronunciation</span>
                        <span className="text-sm font-bold text-slate-700">{word.pronunciation}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
