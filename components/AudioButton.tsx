"use client";

import { Volume2, AlertCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface AudioButtonProps {
    text: string;
    className?: string;
}

export default function AudioButton({ text, className = "" }: AudioButtonProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const [hasBnVoice, setHasBnVoice] = useState(true);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (!window.speechSynthesis) {
            setIsSupported(false);
            return;
        }

        const checkVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                const hasBn = voices.some(v =>
                    v.lang.toLowerCase().includes("bn")
                );
                setHasBnVoice(hasBn);
            }
        };

        checkVoices();

        window.speechSynthesis.onvoiceschanged = checkVoices;

        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const playAudio = (e?: React.MouseEvent | React.TouchEvent) => {
        if (e) e.stopPropagation();

        if (!window.speechSynthesis || !text) return;

        console.log("Playing audio for:", text);

        const speak = () => {
            const voices = window.speechSynthesis.getVoices();

            if (!voices.length) {
                console.warn("No voices available");
                return;
            }

            // Stop previous speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utteranceRef.current = utterance;

            // ✅ Smart voice selection
            let voice =
                voices.find(v => v.lang.startsWith("bn") && v.name.includes("Google")) ||
                voices.find(v => v.lang.startsWith("bn")) ||
                voices.find(v => v.lang.includes("bn")) ||
                voices.find(v => v.lang.startsWith("en")) ||
                voices[0];

            utterance.voice = voice;
            utterance.lang = voice.lang;

            utterance.rate = 0.9;
            utterance.pitch = 1;

            utterance.onstart = () => setIsPlaying(true);

            utterance.onend = () => {
                if (utteranceRef.current === utterance) {
                    setIsPlaying(false);
                }
            };

            utterance.onerror = (event) => {
                console.error("Speech error:", event.error);
                setIsPlaying(false);
            };

            // ✅ Chrome reliability fix
            setTimeout(() => {
                try {
                    window.speechSynthesis.speak(utterance);
                } catch (err) {
                    console.error("Speak failed:", err);
                    setIsPlaying(false);
                }
            }, 100);
        };

        const voices = window.speechSynthesis.getVoices();

        // ✅ If voices already loaded → speak immediately
        if (voices.length > 0) {
            speak();
        } else {
            // ✅ Wait for voices, then speak automatically
            window.speechSynthesis.onvoiceschanged = () => {
                speak();
            };
        }
    };

    if (!isSupported) return null;

    return (
        <div className="inline-flex items-center gap-1">
            <button
                onClick={playAudio}
                onTouchStart={playAudio}
                type="button"
                className={`p-3 rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center ${isPlaying
                    ? "bg-blue-200 scale-110 shadow-md"
                    : "bg-blue-50 hover:bg-blue-100 active:scale-95"
                    } ${className}`}
                title={
                    hasBnVoice
                        ? "Listen to pronunciation"
                        : "No Bengali voice found (using fallback)"
                }
            >
                <Volume2
                    className={`w-5 h-5 ${isPlaying ? "text-blue-900" : "text-blue-600"
                        }`}
                />
            </button>

            {!hasBnVoice && (
                <div
                    title="No Bengali voice detected. Using fallback voice."
                    className="cursor-help"
                >
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                </div>
            )}
        </div>
    );
}