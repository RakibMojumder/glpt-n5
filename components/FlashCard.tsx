"use client";

import { useState } from "react";
import AudioButton from "./AudioButton";

interface Word {
    word: string;
    reading: string;
    romaji: string;
    meaning: string;
    pronunciation: string;
}

interface FlashCardProps {
    word: Word;
}

export default function FlashCard({ word }: FlashCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = (e: React.MouseEvent | React.TouchEvent) => {
        // If clicking a child button/link, don't flip
        if ((e.target as HTMLElement).closest('button')) return;

        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className="group perspective w-full h-80 cursor-pointer touch-manipulation"
            onClick={toggleFlip}
        >
            <div className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden bg-white border-2 border-blue-100 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 hover:border-blue-300 transition-colors">
                    <span className="text-5xl font-bold text-gray-800 mb-4">{word.word}</span>
                    <span className="text-xl text-gray-500 font-medium">{word.reading}</span>
                    <p className="mt-8 text-sm text-blue-400 font-semibold animate-pulse">Click to flip</p>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full backface-hidden bg-blue-50 border-2 border-blue-200 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 rotate-y-180">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-blue-800">{word.meaning}</span>
                        <AudioButton text={word.pronunciation} />
                    </div>
                    <span className="text-lg text-gray-600 italic mb-4">{word.romaji}</span>
                    <div className="px-4 py-2 bg-white rounded-lg border border-blue-100">
                        <span className="text-sm text-gray-400 block mb-1">Bengali Pronunciation:</span>
                        <span className="text-xl font-medium text-gray-700">{word.pronunciation}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
