"use client";

import { N5_LESSONS_VOCABULARY } from "@/data/vocabulary";
import LessonList from "@/components/LessonList";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-bold rounded-full mb-6">
            JLPT N5 PREPARATION
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Master Japanese Vocabulary <br />
            <span className="text-blue-600">Minna No Nihongo</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed mb-8">
            Enhance your learning with interactive flashcards, comprehensive word lists,
            and authentic Bengali pronunciation for all 25 lessons.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/alphabet"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1"
            >
              <BookOpen className="w-5 h-5" />
              Start Alphabet Practice
            </Link>
          </div>
        </div>
      </section>

      {/* Lesson Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Vocabulary Lessons</h2>
            <p className="text-gray-500">Pick a lesson to start practicing</p>
          </div>
          <div className="hidden sm:block text-sm font-semibold text-gray-400">
            {N5_LESSONS_VOCABULARY.length} LESSONS TOTAL
          </div>
        </div>

        <LessonList lessons={N5_LESSONS_VOCABULARY} />
      </section>

      {/* Footer / CTA */}
      <footer className="py-20 text-center bg-white border-t border-gray-100">
        <p className="text-gray-400 text-sm">
          Built with ❤️ for Japanese Language Learners
        </p>
      </footer>
    </main>
  );
}
