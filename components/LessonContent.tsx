"use client";

import { useState } from "react";
import FlashCard from "@/components/FlashCard";
import WordList from "@/components/WordList";
import { LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";

interface LessonContentProps {
    lesson: any;
}

export default function LessonContent({ lesson }: LessonContentProps) {
    const [viewMode, setViewMode] = useState<"flashcard" | "list">("flashcard");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const nextWord = () => {
        setCurrentWordIndex((prev) => (prev + 1) % lesson.words.length);
    };

    const prevWord = () => {
        setCurrentWordIndex((prev) => (prev - 1 + lesson.words.length) % lesson.words.length);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Compact View Toggle */}
            <div className="flex p-0.5 bg-slate-100 rounded-lg border border-slate-200 w-fit self-center">
                <button
                    onClick={() => setViewMode("flashcard")}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${viewMode === "flashcard" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
                        }`}
                >
                    <LayoutGrid className="w-3 h-3" />
                    Cards
                </button>
                <button
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
                        }`}
                >
                    <List className="w-3 h-3" />
                    List
                </button>
            </div>

            <div className="relative">
                {viewMode === "flashcard" ? (
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-full max-w-sm">
                            <FlashCard word={lesson.words[currentWordIndex]} />
                        </div>

                        {/* Compact Controls */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={prevWord}
                                className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-all text-blue-600 active:scale-90"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full font-bold text-[10px] tracking-widest border border-blue-100">
                                {currentWordIndex + 1} / {lesson.words.length}
                            </div>

                            <button
                                onClick={nextWord}
                                className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-all text-blue-600 active:scale-90"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <WordList words={lesson.words} />
                    </div>
                )}
            </div>
        </div>
    );
}
