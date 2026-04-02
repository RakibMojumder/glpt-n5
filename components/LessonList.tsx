import Link from "next/link";

interface Lesson {
    id: number;
    icon: string;
    titleBn: string;
    titleEn: string;
}

interface LessonListProps {
    lessons: Lesson[];
}

export default function LessonList({ lessons }: LessonListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
                <Link
                    key={lesson.id}
                    href={`/lesson/${lesson.id}`}
                    className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                            {lesson.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{lesson.titleBn}</h3>
                            <p className="text-sm text-gray-500">{lesson.titleEn}</p>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Explore Vocabulary</span>
                        <svg className="w-5 h-5 transform translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                        </svg>
                    </div>
                </Link>
            ))}
        </div>
    );
}
