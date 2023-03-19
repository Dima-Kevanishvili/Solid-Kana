export type KanaTypes = "hiragana" | "katakana";

export type HomePageParams = {
  kana: KanaTypes;
};

export type QuizMethods = "multiple-choice" | "bento";

export type QuizPageParams = {
  method: QuizMethods;
};

export type Kana = {
  hiragana: string;
  katakana: string;
  romaji: string;
  column: number;
  row: number;
};

export type KanaQuestion = {
  type: "hiragana" | "katakana";
  symbol: string;
  answer: string;
  choices: string[];
};

import "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      draggable: boolean;
      droppable: boolean;
      sortable: boolean;
    }
  }
}
