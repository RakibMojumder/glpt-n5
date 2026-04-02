"use client";

import { N5_LESSONS_VOCABULARY } from "@/data/vocabulary";
import LessonList from "@/components/LessonList";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Compact Hero Section */}
      <section className="py-12 md:py-20 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-bold uppercase tracking-widest rounded-full mb-6">
            JLPT N5 Preparation
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Master Japanese <br />
            <span className="text-blue-600">Vocabulary</span>
          </h1>

          <p className="max-w-md mx-auto text-base text-slate-500 leading-relaxed mb-8">
            Minna No Nihongo vocabulary with interactive flashcards and Bengali audio.
          </p>

          <div className="flex justify-center">
            <Link
              href="/alphabet"
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2 text-sm"
            >
              <BookOpen className="w-4 h-4" />
              Practice Alphabet
            </Link>
          </div>
        </div>
      </section>

      {/* Compact Lesson List Section */}
      <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Vocabulary Lessons</h2>
          <p className="text-slate-500 text-sm">Pick a lesson to start learning.</p>
        </div>

        <LessonList lessons={N5_LESSONS_VOCABULARY} />
      </section>

      {/* Compact Footer */}
      <footer className="py-12 text-center border-t border-gray-100 pb-32 md:pb-12">
        <p className="text-slate-400 font-medium text-xs">
          Built for Japanese Learners
        </p>
      </footer>
    </main>
  );
}
