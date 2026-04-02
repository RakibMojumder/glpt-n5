import { N5_LESSONS_VOCABULARY } from "@/data/vocabulary";
import FlashCard from "@/components/FlashCard";
import WordList from "@/components/WordList";
import { ChevronLeft, LayoutGrid, List, ChevronRight } from "lucide-react";
import Link from "next/link";
import LessonContent from "@/components/LessonContent";

export function generateStaticParams() {
    return N5_LESSONS_VOCABULARY.map((lesson) => ({
        id: lesson.id.toString(),
    }));
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const lessonId = parseInt(id);
    const lesson = N5_LESSONS_VOCABULARY.find((l) => l.id === lessonId);

    if (!lesson) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson Not Found</h1>
                <Link href="/" className="text-blue-600 hover:underline">Return Home</Link>
            </div>
        );
    }

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
                </div>

                <LessonContent lesson={lesson} />
            </div>
        </main>
    );
}
