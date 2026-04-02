"use client";

import AudioButton from "./AudioButton";

interface Word {
    word: string;
    reading: string;
    romaji: string;
    meaning: string;
    pronunciation: string;
}

interface WordListProps {
    words: Word[];
}

export default function WordList({ words }: WordListProps) {
    return (
        <div className="space-y-2">
            {/* Compact Mobile View */}
            <div className="md:hidden space-y-2">
                {words.map((word, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-gray-100 flex items-center justify-between gap-3 shadow-sm">
                        <div className="flex-1">
                            <div className="flex items-baseline gap-2 mb-0.5">
                                <span className="text-lg font-bold text-slate-900">{word.word}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{word.romaji}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <span className="text-xs font-bold text-blue-600">
                                    {word.meaning}
                                </span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1.5 py-0.5 bg-slate-50 rounded-md">
                                    {word.pronunciation}
                                </span>
                            </div>
                        </div>
                        <div className="shrink-0 scale-90">
                            <AudioButton text={word.pronunciation} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Compact Desktop View */}
            <div className="hidden md:block overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-slate-50 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                        <tr>
                            <th className="px-5 py-3 text-left">Word</th>
                            <th className="px-5 py-3 text-left">Pronunciation</th>
                            <th className="px-5 py-3 text-left">Meaning</th>
                            <th className="px-5 py-3 text-right">Audio</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                        {words.map((word, idx) => (
                            <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
                                <td className="px-5 py-3 whitespace-nowrap">
                                    <span className="text-lg font-bold text-slate-900">{word.word}</span>
                                </td>
                                <td className="px-5 py-3 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{word.romaji}</span>
                                        <span className="text-[10px] font-medium text-slate-400 italic">({word.pronunciation})</span>
                                    </div>
                                </td>
                                <td className="px-5 py-3 whitespace-nowrap text-sm font-bold text-blue-600">{word.meaning}</td>
                                <td className="px-5 py-3 whitespace-nowrap text-right scale-90">
                                    <AudioButton text={word.pronunciation} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
