import { Component, Setter } from "solid-js";
import { KanaTypes } from "../../types";
import styles from "./QuizTypeChooser.module.scss";
type Props = {
  quizType: KanaTypes;
  setQuizType: Setter<KanaTypes>;
  setHasStarted: Setter<boolean>;
};
const QuizTypeChooser: Component<Props> = (props) => {
  return (
    <div class="flexColumnCenterWrapper">
      <div class="heading">Choose The Quiz Type:</div>
      <div class={styles.quizTypeChooser}>
        <label>
          <input
            type="radio"
            checked={props.quizType === "hiragana"}
            value="hiragana"
            name="quizType"
            onChange={(e) => {
              props.setQuizType(e.currentTarget.value as KanaTypes);
            }}
          />
          Hiragana
        </label>
        <label>
          <input
            type="radio"
            checked={props.quizType === "katakana"}
            value="katakana"
            name="quizType"
            onChange={(e) =>
              props.setQuizType(e.currentTarget.value as KanaTypes)
            }
          />
          Katakana
        </label>
      </div>
      <div class={styles.button} onClick={() => props.setHasStarted(true)}>
        Start
      </div>
    </div>
  );
};

export default QuizTypeChooser;
