import { N5_LESSONS_VOCABULARY } from "@/data/vocabulary";
import LessonContent from "@/components/LessonContent";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

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
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <h1 className="text-lg font-bold text-slate-800 mb-4">Lesson Not Found</h1>
                <Link href="/" className="text-blue-600 hover:underline">Return Home</Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white pt-8 pb-24 md:pt-12 md:pb-16 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Compact Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/"
                        className="p-2 bg-white hover:bg-slate-50 rounded-lg transition-all border border-gray-100 text-slate-400"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">{lesson.icon}</span>
                        <div>
                            <h1 className="text-lg font-bold text-slate-900 leading-tight">
                                {lesson.titleBn}
                            </h1>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                                {lesson.titleEn}
                            </p>
                        </div>
                    </div>
                </div>

                <LessonContent lesson={lesson} />
            </div>
        </main>
    );
}
