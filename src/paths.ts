const Paths = {
  Home: {
    pattern: "/:kana?",
    default: "/",
    hiragana: "/hiragana",
    katakana: "/katakana",
  },

  Quiz: {
    pattern: "/quiz/:method?",
    default: "/quiz",
    multipleChoice: "/quiz/multiple-choice",
    bento: "/quiz/bento",
  },
};

export default Paths;
