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
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Word</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reading</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meaning</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pronunciation</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Audio</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {words.map((word, idx) => (
                        <tr key={idx} className="hover:bg-blue-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900">{word.word}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <span className="block">{word.reading}</span>
                                <span className="text-xs text-gray-400 font-mono">{word.romaji}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">{word.meaning}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{word.pronunciation}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <AudioButton text={word.pronunciation} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
