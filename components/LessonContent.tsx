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
        <>
            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200 self-start md:self-center mb-8 w-fit">
                <button
                    onClick={() => setViewMode("flashcard")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === "flashcard" ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <LayoutGrid className="w-4 h-4" />
                    Flashcard
                </button>
                <button
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === "list" ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <List className="w-4 h-4" />
                    List View
                </button>
            </div>

            <div className="mt-8">
                {viewMode === "flashcard" ? (
                    <div className="flex flex-col items-center gap-8">
                        <div className="w-full max-w-md animate-fade-in-up">
                            <FlashCard word={lesson.words[currentWordIndex]} />
                        </div>

                        <div className="flex items-center gap-6">
                            <button
                                onClick={prevWord}
                                className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all text-blue-600"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <div className="px-6 py-2 bg-blue-100/50 rounded-full text-blue-800 font-bold">
                                {currentWordIndex + 1} / {lesson.words.length}
                            </div>
                            <button
                                onClick={nextWord}
                                className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all text-blue-600"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="text-gray-400 text-sm text-center">
                            Use arrows to navigate words. Click card to see meaning and listen.
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <WordList words={lesson.words} />
                    </div>
                )}
            </div>
        </>
    );
}
