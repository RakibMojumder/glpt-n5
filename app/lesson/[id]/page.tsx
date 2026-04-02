"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { N5_LESSONS_VOCABULARY } from "@/data/vocabulary";
import FlashCard from "@/components/FlashCard";
import WordList from "@/components/WordList";
import { ChevronLeft, LayoutGrid, List, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const lessonId = parseInt(id);
    const lesson = N5_LESSONS_VOCABULARY.find((l) => l.id === lessonId);
    const [viewMode, setViewMode] = useState<"flashcard" | "list">("flashcard");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    if (!lesson) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson Not Found</h1>
                <Link href="/" className="text-blue-600 hover:underline">Return Home</Link>
            </div>
        );
    }

    const nextWord = () => {
        setCurrentWordIndex((prev) => (prev + 1) % lesson.words.length);
    };

    const prevWord = () => {
        setCurrentWordIndex((prev) => (prev - 1 + lesson.words.length) % lesson.words.length);
    };

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-200"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-3xl">{lesson.icon}</span>
                                <h1 className="text-2xl font-bold text-gray-900">{lesson.titleBn}</h1>
                            </div>
                            <p className="text-gray-500">{lesson.titleEn}</p>
                        </div>
                    </div>

                    <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200 self-start md:self-center">
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
                </div>

                {/* Content Area */}
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
            </div>
        </main>
    );
}
