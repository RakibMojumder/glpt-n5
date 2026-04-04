import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Lesson } from "@/types/lesson";

interface LessonListProps {
    lessons: Lesson[];
}

export default function LessonList({ lessons }: LessonListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {lessons.map((lesson) => (
                <Link
                    key={lesson.id}
                    href={`/lesson/${lesson.id}`}
                    className="group p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-all active:scale-[0.98] flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                            {lesson.icon}
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900 leading-tight mb-0.5 group-hover:text-blue-600 transition-colors">
                                {lesson.titleBn} {lesson.words.length}
                            </h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                {lesson.titleEn}
                            </p>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transform group-hover:translate-x-0.5 transition-all" />
                </Link>
            ))}
        </div>
    );
}
