export interface Synonym {
  w: string;
  r: string;
  m: string;
}

export interface Antonym {
  w: string;
  r: string;
  m: string;
}

export interface Word {
  word: string;
  reading: string;
  romaji: string;
  type: string;
  meaning: string;
  pronunciation: string;
  synonyms: Synonym[];
  antonyms: Antonym[];
}

export interface Lesson {
  id: number;
  icon: string;
  titleBn: string;
  titleEn: string;
  words: Word[];
}
