"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { N5_LESSONS_VOCABULARY } from "@/data/vocabulary";
import {
    Timer,
    CheckCircle2,
    XCircle,
    RotateCcw,
    Play,
    ChevronRight,
    Trophy,
    Settings2
} from "lucide-react";
import AudioButton from "./AudioButton";
import { Word, Lesson } from "@/types/lesson";

type QuizState = "config" | "playing" | "results";

export default function VocabularyQuiz() {
    const [state, setState] = useState<QuizState>("config");
    const [selectedLessons, setSelectedLessons] = useState<number[]>([]);
    const [questionCount, setQuestionCount] = useState(10);
    const [timeLimit, setTimeLimit] = useState(15); // seconds per question

    const [quizWords, setQuizWords] = useState<Word[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [options, setOptions] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startQuiz = () => {
        let pool: Word[] = [];
        if (selectedLessons.length === 0) {
            // All lessons
            N5_LESSONS_VOCABULARY.forEach((l: Lesson) => pool.push(...l.words));
        } else {
            N5_LESSONS_VOCABULARY.filter((l: Lesson) => selectedLessons.includes(l.id))
                .forEach((l: Lesson) => pool.push(...l.words));
        }

        // Shuffle and pick
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, questionCount);

        setQuizWords(selected);
        setCurrentIndex(0);
        setScore(0);
        setState("playing");
        prepareQuestion(selected, 0);
    };

    const prepareQuestion = (words: Word[], index: number) => {
        const currentWord = words[index];
        const otherMeanings = N5_LESSONS_VOCABULARY.flatMap((l: Lesson) => l.words)
            .filter((w: Word) => w.meaning !== currentWord.meaning)
            .map((w: Word) => w.meaning);

        const shuffledOthers = [...otherMeanings].sort(() => Math.random() - 0.5);
        const questionOptions = [currentWord.meaning, ...shuffledOthers.slice(0, 3)]
            .sort(() => Math.random() - 0.5);

        setOptions(questionOptions);
        setSelectedOption(null);
        setIsCorrect(null);
        setTimeLeft(timeLimit);

        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleAnswer(null); // Time's up
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleAnswer = (option: string | null) => {
        if (selectedOption !== null || state !== "playing") return;

        if (timerRef.current) clearInterval(timerRef.current);

        const currentWord = quizWords[currentIndex];
        const correct = option === currentWord.meaning;

        setSelectedOption(option);
        setIsCorrect(correct);
        if (correct) setScore(prev => prev + 1);

        setTimeout(() => {
            if (currentIndex + 1 < quizWords.length) {
                setCurrentIndex(prev => prev + 1);
                prepareQuestion(quizWords, currentIndex + 1);
            } else {
                setState("results");
            }
        }, 2000);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    if (state === "config") {
        return (
            <div className="w-full max-w-2xl mx-auto p-2 sm:p-6 animate-fade-in">
                <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 p-4 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 sm:mb-8">
                        <div className="p-2 bg-blue-50 rounded-xl">
                            <Settings2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Quiz Settings</h2>
                    </div>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Lessons Selection */}
                        <div>
                            <label className="block text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">
                                Select Lessons ({selectedLessons.length === 0 ? "All" : selectedLessons.length})
                            </label>
                            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5 sm:gap-2">
                                {N5_LESSONS_VOCABULARY.map((lesson: Lesson) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => {
                                            setSelectedLessons(prev =>
                                                prev.includes(lesson.id)
                                                    ? prev.filter(id => id !== lesson.id)
                                                    : [...prev, lesson.id]
                                            );
                                        }}
                                        className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl text-left text-[9px] sm:text-[10px] font-semibold transition-all border ${selectedLessons.includes(lesson.id)
                                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                                            : "bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-200"
                                            }`}
                                    >
                                        L{lesson.id}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            {/* Question Count */}
                            <div>
                                <label className="block text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-3">
                                    Number of Questions
                                </label>
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <input
                                        type="range"
                                        min="5"
                                        max="50"
                                        step="5"
                                        value={questionCount}
                                        onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                                        className="flex-1 accent-blue-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="w-6 sm:w-8 text-xs sm:text-sm font-bold text-slate-700">{questionCount}</span>
                                </div>
                            </div>

                            {/* Timer */}
                            <div>
                                <label className="block text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-3">
                                    Time per Question (sec)
                                </label>
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <input
                                        type="range"
                                        min="5"
                                        max="60"
                                        step="5"
                                        value={timeLimit}
                                        onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                                        className="flex-1 accent-blue-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="w-6 sm:w-8 text-xs sm:text-sm font-bold text-slate-700">{timeLimit}s</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={startQuiz}
                            className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 bg-blue-600 text-white font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl sm:rounded-2xl hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100 group"
                        >
                            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (state === "results") {
        const percentage = Math.round((score / quizWords.length) * 100);
        return (
            <div className="w-full max-w-2xl mx-auto p-2 sm:p-6 animate-fade-in">
                <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 text-center shadow-lg">
                    <div className="inline-flex p-3 sm:p-4 bg-yellow-50 rounded-2xl mb-4 sm:mb-6">
                        <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Quiz Completed!</h2>
                    <p className="text-slate-500 text-sm mb-6 sm:mb-8">Here's how you performed:</p>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 text-left">
                        <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl">
                            <span className="block text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Score</span>
                            <span className="text-xl sm:text-2xl font-bold text-blue-600">{score} / {quizWords.length}</span>
                        </div>
                        <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl">
                            <span className="block text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Accuracy</span>
                            <span className="text-xl sm:text-2xl font-bold text-blue-600">{percentage}%</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setState("config")}
                        className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 bg-slate-900 text-white font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl sm:rounded-2xl hover:bg-slate-800 transition-all active:scale-95"
                    >
                        <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const currentWord = quizWords[currentIndex];

    return (
        <div className="w-full max-w-2xl mx-auto p-2 sm:p-6 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 sm:mb-8 px-2 sm:px-0">
                <div className="flex flex-col">
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Question</span>
                    <span className="text-sm sm:text-lg font-bold text-slate-800">{currentIndex + 1} <span className="text-slate-300 font-medium">/ {quizWords.length}</span></span>
                </div>

                <div className={`flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border transition-all ${timeLeft <= 5 ? "bg-red-50 border-red-100 text-red-600 animate-pulse" : "bg-blue-50 border-blue-100 text-blue-600"
                    }`}>
                    <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="font-bold text-xs sm:text-sm tabular-nums">{timeLeft}s</span>
                </div>

                <div className="flex flex-col text-right">
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
                    <span className="text-sm sm:text-lg font-bold text-green-600">{score}</span>
                </div>
            </div>

            {/* Quiz Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 p-5 sm:p-12 mb-6 text-center relative shadow-sm overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 h-1 sm:h-1.5 bg-blue-100 w-full">
                    <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / quizWords.length) * 100}%` }}
                    />
                </div>

                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <AudioButton text={currentWord.word} />
                </div>

                <div className="mb-8 sm:mb-10 mt-4 sm:mt-0">
                    <h3 className="text-4xl sm:text-6xl font-bold text-slate-800 mb-2 sm:mb-4 tracking-tight">{currentWord.word}</h3>
                    <div className="flex justify-center gap-2 sm:gap-3">
                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] sm:text-xs font-medium">{currentWord.reading}</span>
                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] sm:text-xs font-medium uppercase">{currentWord.romaji}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {options.map((option, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(option)}
                            disabled={selectedOption !== null}
                            className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold text-left transition-all border ${selectedOption === option
                                ? isCorrect
                                    ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-100"
                                    : "bg-red-600 text-white border-red-600 shadow-lg shadow-red-100"
                                : selectedOption !== null && option === currentWord.meaning
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100 hover:border-slate-200"
                                } ${selectedOption === null ? "active:scale-95" : ""}`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="flex-1 pr-2">{option}</span>
                                {selectedOption === option && (
                                    isCorrect ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />
                                )}
                                {selectedOption !== null && option === currentWord.meaning && selectedOption !== currentWord.meaning && (
                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {selectedOption !== null && (
                <div className="animate-fade-in px-2 sm:px-0">
                    <div className={`p-4 rounded-xl sm:rounded-2xl flex items-center gap-3 ${isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }`}>
                        {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                        ) : (
                            <XCircle className="w-5 h-5 shrink-0" />
                        )}
                        <div className="flex-1">
                            <p className="text-[10px] font-bold uppercase tracking-wider">
                                {isCorrect ? "Correct!" : "Oops! The right answer was:"}
                            </p>
                            {!isCorrect && <p className="text-base sm:text-lg font-bold">{currentWord.meaning}</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
