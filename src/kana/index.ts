import { getRandomInt, shuffleArray } from "../helpers";
import { Kana, KanaQuestion, KanaTypes } from "../types";

const KanaList: Kana[] = [
  { hiragana: "あ", romaji: "a", katakana: "ア", column: 0, row: 0 },
  { hiragana: "い", romaji: "i", katakana: "イ", column: 0, row: 1 },
  { hiragana: "う", romaji: "u", katakana: "ウ", column: 0, row: 2 },
  { hiragana: "え", romaji: "e", katakana: "エ", column: 0, row: 3 },
  { hiragana: "お", romaji: "o", katakana: "オ", column: 0, row: 4 },
  { hiragana: "か", romaji: "ka", katakana: "カ", column: 1, row: 0 },
  { hiragana: "き", romaji: "ki", katakana: "キ", column: 1, row: 1 },
  { hiragana: "く", romaji: "ku", katakana: "ク", column: 1, row: 2 },
  { hiragana: "け", romaji: "ke", katakana: "ケ", column: 1, row: 3 },
  { hiragana: "こ", romaji: "ko", katakana: "コ", column: 1, row: 4 },
  { hiragana: "さ", romaji: "sa", katakana: "サ", column: 2, row: 0 },
  { hiragana: "し", romaji: "shi", katakana: "シ", column: 2, row: 1 },
  { hiragana: "す", romaji: "su", katakana: "ス", column: 2, row: 2 },
  { hiragana: "せ", romaji: "se", katakana: "セ", column: 2, row: 3 },
  { hiragana: "そ", romaji: "so", katakana: "ソ", column: 2, row: 4 },
  { hiragana: "た", romaji: "ta", katakana: "タ", column: 3, row: 0 },
  { hiragana: "ち", romaji: "chi", katakana: "チ", column: 3, row: 1 },
  { hiragana: "つ", romaji: "tsu", katakana: "ツ", column: 3, row: 2 },
  { hiragana: "て", romaji: "te", katakana: "テ", column: 3, row: 3 },
  { hiragana: "と", romaji: "to", katakana: "ト", column: 3, row: 4 },
  { hiragana: "な", romaji: "na", katakana: "ナ", column: 4, row: 0 },
  { hiragana: "に", romaji: "ni", katakana: "ニ", column: 4, row: 1 },
  { hiragana: "ぬ", romaji: "nu", katakana: "ヌ", column: 4, row: 2 },
  { hiragana: "ね", romaji: "ne", katakana: "ネ", column: 4, row: 3 },
  { hiragana: "の", romaji: "no", katakana: "ノ", column: 4, row: 4 },
  { hiragana: "は", romaji: "ha", katakana: "ハ", column: 5, row: 0 },
  { hiragana: "ひ", romaji: "hi", katakana: "ヒ", column: 5, row: 1 },
  { hiragana: "ふ", romaji: "fu", katakana: "フ", column: 5, row: 2 },
  { hiragana: "へ", romaji: "he", katakana: "ヘ", column: 5, row: 3 },
  { hiragana: "ほ", romaji: "ho", katakana: "ホ", column: 5, row: 4 },
  { hiragana: "ま", romaji: "ma", katakana: "マ", column: 6, row: 0 },
  { hiragana: "み", romaji: "mi", katakana: "ミ", column: 6, row: 1 },
  { hiragana: "む", romaji: "mu", katakana: "ム", column: 6, row: 2 },
  { hiragana: "め", romaji: "me", katakana: "メ", column: 6, row: 3 },
  { hiragana: "も", romaji: "mo", katakana: "モ", column: 6, row: 4 },
  { hiragana: "や", romaji: "ya", katakana: "ヤ", column: 7, row: 0 },
  { hiragana: "ゆ", romaji: "yu", katakana: "ユ", column: 7, row: 2 },
  { hiragana: "よ", romaji: "yo", katakana: "ヨ", column: 7, row: 4 },
  { hiragana: "ら", romaji: "ra", katakana: "ラ", column: 8, row: 0 },
  { hiragana: "り", romaji: "ri", katakana: "リ", column: 8, row: 1 },
  { hiragana: "る", romaji: "ru", katakana: "ル", column: 8, row: 2 },
  { hiragana: "れ", romaji: "re", katakana: "レ", column: 8, row: 3 },
  { hiragana: "ろ", romaji: "ro", katakana: "ロ", column: 8, row: 4 },
  { hiragana: "わ", romaji: "wa", katakana: "ワ", column: 9, row: 0 },
  { hiragana: "を", romaji: "wo", katakana: "ヲ", column: 9, row: 2 },
  { hiragana: "ん", romaji: "n", katakana: "ン", column: 9, row: 4 },
];

const generateQuestions = (
  type: KanaTypes,
  numberOfQuestions: number
): KanaQuestion[] => {
  const questions: KanaQuestion[] = [];
  for (let i = 0; i < numberOfQuestions; i++) {
    const randomKanaIndex = getRandomInt(0, KanaList.length);
    const randomKana = KanaList[randomKanaIndex];
    const choices: string[] = [randomKana.romaji];
    const choiceIndices: number[] = [randomKanaIndex];

    for (let j = 0; j < 3; j++) {
      const randomChoiceKanaIndex = getRandomInt(
        0,
        KanaList.length,
        choiceIndices
      );
      choiceIndices.push(randomChoiceKanaIndex);
      const randomChoiceKana = KanaList[randomChoiceKanaIndex];
      choices.push(randomChoiceKana.romaji);
    }

    const question: KanaQuestion = {
      type,
      symbol: randomKana[type],
      answer: randomKana.romaji,
      choices: shuffleArray(choices),
    };
    questions.push(question);
  }
  return questions;
};

const getKanasForBento = () => {
  const rows: { [key: string]: Kana[][] } = {};
  KanaList.forEach((kana) => {
    if (!rows[kana.row]) {
      rows[kana.row] = [[], [], [], [], [], [], [], [], [], []];
    }
    rows[kana.row][kana.column].push(kana);
  });
  Object.keys(rows).forEach((key) => (rows[key] = rows[key].reverse()));
  return rows;
};

const getKanasForBentoDraggables = () => {
  let result: Kana[][] = [[], [], [], [], []];
  const shuffled = shuffleArray(KanaList);
  let index = 0;
  shuffled.forEach((kana, i) => {
    if (result[index].length > 9) {
      index++;
    }
    result[index].push(kana);
  });
  return result;
};

export {
  KanaList,
  generateQuestions,
  getKanasForBento,
  getKanasForBentoDraggables,
};
