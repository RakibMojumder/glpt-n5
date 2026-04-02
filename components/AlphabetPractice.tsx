"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { hiragana, katakana } from "@/data/alphabat";
import AudioButton from "./AudioButton";
import {
    RefreshCw,
    BookOpen,
    PenTool,
    ChevronRight,
    Mic,
    CheckCircle2,
    XCircle,
} from "lucide-react";

type AlphabetItem = {
    char: string;
    romaji: string;
    bn: string;
    alts: string[];
};

export default function AlphabetPractice() {
    const [kanaType, setKanaType] = useState<"hiragana" | "katakana">("hiragana");
    const [practiceMode, setPracticeMode] = useState<
        "normal" | "reverse" | "pronounce"
    >("normal");
    const [currentItem, setCurrentItem] = useState<AlphabetItem | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
    const [recognizedText, setRecognizedText] = useState("");

    const recognitionRef = useRef<any>(null);
    const audioTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const isSpeechSupported =
        typeof window !== "undefined" &&
        ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

    // ✅ START LISTENING
    const startListening = () => {
        if (!isSpeechSupported) return;

        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (recognitionRef.current) {
            try {
                recognitionRef.current.onend = null;
                recognitionRef.current.stop();
            } catch (e) { }
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "ja-JP";
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 3;

        recognition.onstart = () => {
            setIsListening(true);
            setFeedback(null);
            setRecognizedText("");

            // Auto-stop after 5 seconds if no results heard
            if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);
            audioTimeoutRef.current = setTimeout(() => {
                stopListening();
            }, 6000);
        };

        recognition.onresult = (event: any) => {
            let currentTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const result = event.results[i];
                currentTranscript = result[0].transcript.trim().toLowerCase();
                setRecognizedText(currentTranscript);

                if (currentItem) {
                    const allTranscripts = Array.from(result).map((res: any) => res.transcript.trim().toLowerCase());

                    const isMatch = allTranscripts.some(t =>
                        t === currentItem.char ||
                        t === currentItem.romaji ||
                        currentItem.alts.map(a => a.toLowerCase()).includes(t)
                    );

                    if (isMatch) {
                        setFeedback("correct");
                        setShowAnswer(true);
                        stopListening();
                        return; // Exit early on correct match
                    }

                    if (result.isFinal) {
                        setRecognizedText(currentTranscript);
                        setFeedback("incorrect");
                        setShowAnswer(true);
                        stopListening();
                    }
                }
            }
        };

        recognition.onerror = (event: any) => {
            console.error("Speech error:", event.error);
            setIsListening(false);

            if (event.error === 'network') {
                setRecognizedText("Network error: This feature often requires official Google Chrome and a stable internet connection.");
            } else if (event.error === 'no-speech') {
                setRecognizedText("No speech detected. Please try again.");
            } else {
                setRecognizedText(`Error: ${event.error}`);
            }
        };

        recognition.onend = () => {
            setIsListening(false);
            if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);
        };

        recognitionRef.current = recognition;

        // Use a small delay to avoid "immediate close" issues on some browsers/platforms
        setTimeout(() => {
            try {
                recognition.start();
            } catch (e) {
                console.error("Failed to start recognition:", e);
                setIsListening(false);
            }
        }, 300);
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.onend = null;
                recognitionRef.current.stop();
            } catch (e) { }
        }
        setIsListening(false);
        if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);
    };

    // ✅ RANDOM ITEM
    const getRandomItem = useCallback(() => {
        const pool = kanaType === "hiragana" ? hiragana : katakana;
        const randomIndex = Math.floor(Math.random() * pool.length);
        const newItem = pool[randomIndex];

        if (currentItem && newItem.char === currentItem.char && pool.length > 1) {
            return getRandomItem();
        }

        setCurrentItem(newItem);
        setShowAnswer(false);
        setFeedback(null);
        setRecognizedText("");
    }, [kanaType, currentItem]);

    useEffect(() => {
        getRandomItem();
        return () => stopListening();
    }, [kanaType]);

    const handleNext = () => {
        stopListening();
        getRandomItem();
    };

    if (!currentItem)
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <RefreshCw className="animate-spin text-blue-600 w-5 h-5" />
            </div>
        );

    return (
        <div className="max-w-xl mx-auto animate-fade-in">
            {/* Nav & Mode Controls */}
            <div className="flex flex-col gap-4 mb-10">
                <div className="flex p-1 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                    <button
                        onClick={() => setKanaType("hiragana")}
                        className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${kanaType === "hiragana" ? "bg-white text-blue-600 shadow-sm border border-slate-200" : "text-slate-400 hover:text-slate-600"
                            }`}
                    >
                        Hiragana
                    </button>
                    <button
                        onClick={() => setKanaType("katakana")}
                        className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${kanaType === "katakana" ? "bg-white text-blue-600 shadow-sm border border-slate-200" : "text-slate-400 hover:text-slate-600"
                            }`}
                    >
                        Katakana
                    </button>
                </div>

                <div className="flex p-1 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                    <button
                        onClick={() => setPracticeMode("normal")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${practiceMode === "normal" ? "bg-white text-blue-600 shadow-sm border border-slate-200" : "text-slate-400 hover:text-slate-600"
                            }`}
                    >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Recognition</span>
                    </button>
                    <button
                        onClick={() => setPracticeMode("reverse")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${practiceMode === "reverse" ? "bg-white text-blue-600 shadow-sm border border-slate-200" : "text-slate-400 hover:text-slate-600"
                            }`}
                    >
                        <PenTool className="w-3.5 h-3.5" />
                        <span>Writing</span>
                    </button>
                    <button
                        onClick={() => setPracticeMode("pronounce")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${practiceMode === "pronounce" ? "bg-white text-blue-600 shadow-sm border border-slate-200" : "text-slate-400 hover:text-slate-600"
                            }`}
                    >
                        <Mic className="w-3.5 h-3.5" />
                        <span>Pronounce</span>
                    </button>
                </div>
            </div>

            {/* Main Practice Card */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-14 text-center relative shadow-xl shadow-slate-200/40 overflow-hidden group">
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-100/50 transition-colors" />

                <div className="absolute top-8 right-8">
                    <AudioButton text={currentItem.bn} />
                </div>

                <div className="min-h-[160px] flex items-center justify-center mb-10">
                    <div className="relative">
                        {practiceMode === "reverse" ? (
                            <div className="flex flex-col items-center animate-fade-in">
                                <span className="text-6xl md:text-7xl font-bold text-blue-600 tracking-tighter uppercase mb-2">
                                    {currentItem.romaji}
                                </span>
                                <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-100">
                                    Sound: {currentItem.bn}
                                </span>
                            </div>
                        ) : (
                            <div className="text-9xl md:text-[10rem] font-bold text-slate-900 leading-none select-none drop-shadow-sm animate-fade-in">
                                {currentItem.char}
                            </div>
                        )}
                    </div>
                </div>

                {/* Pronunciation Interface */}
                {practiceMode === "pronounce" && (
                    <div className="mb-10 flex flex-col items-center gap-4 animate-fade-in">
                        <button
                            onClick={startListening}
                            disabled={isListening}
                            className={`p-7 rounded-full transition-all duration-300 relative ${isListening
                                ? "bg-red-50 text-red-500 scale-110 shadow-lg shadow-red-100"
                                : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-200"
                                }`}
                        >
                            {isListening ? (
                                <>
                                    <div className="absolute inset-0 rounded-full animate-ping bg-red-100/60" />
                                    <Mic className="w-8 h-8 relative z-10" />
                                </>
                            ) : (
                                <Mic className="w-8 h-8" />
                            )}
                        </button>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                {isListening ? "Listening... speak clearly" : "Click mic to practice"}
                            </p>
                            {recognizedText && (
                                <p className="text-xs text-slate-500 italic font-medium animate-fade-in max-w-[250px] mx-auto leading-relaxed">
                                    {recognizedText}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Show/Hide Logic */}
                <div className="min-h-[120px] flex flex-col items-center justify-center">
                    {showAnswer ? (
                        <div className="animate-fade-in flex flex-col items-center gap-4">
                            {feedback && (
                                <div className={`flex items-center gap-2 mb-2 px-4 py-1.5 rounded-full border shadow-sm ${feedback === "correct"
                                    ? "bg-green-50 text-green-600 border-green-100"
                                    : "bg-red-50 text-red-600 border-red-100"
                                    }`}>
                                    {feedback === "correct" ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                    ) : (
                                        <XCircle className="w-4 h-4" />
                                    )}
                                    <span className="text-[10px] font-bold uppercase tracking-wider">
                                        {feedback === "correct" ? "Excellent!" : "Keep practicing!"}
                                    </span>
                                </div>
                            )}

                            <div className="text-center">
                                <span className="text-4xl md:text-5xl font-bold text-slate-800 block mb-2">
                                    {practiceMode === "reverse" ? currentItem.char : currentItem.romaji.toUpperCase()}
                                </span>
                                <div className="flex gap-2 justify-center">
                                    <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[9px] font-bold uppercase tracking-widest border border-slate-100 rounded-md">
                                        Sound: {currentItem.bn}
                                    </span>
                                    <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[9px] font-bold uppercase tracking-widest border border-slate-100 rounded-md">
                                        Romaji: {currentItem.romaji}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowAnswer(true)}
                            className="group/btn px-8 py-3 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest rounded-full transition-all hover:bg-slate-800 active:scale-95 shadow-lg shadow-slate-200 flex items-center gap-2"
                        >
                            <span>Reveal Answer</span>
                            <RefreshCw className="w-3.5 h-3.5 group-hover/btn:rotate-180 transition-transform duration-500" />
                        </button>
                    )}
                </div>

                <div className="mt-12">
                    <button
                        onClick={handleNext}
                        className="w-full flex items-center justify-center gap-3 py-5 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all active:scale-[0.98] shadow-xl shadow-blue-100 group/next"
                    >
                        <span>Next Character</span>
                        <ChevronRight className="w-4 h-4 group-hover/next:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}