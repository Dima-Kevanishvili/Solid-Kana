import { Component } from "solid-js";
import styles from "./MultipleChoiceQuizEndScreen.module.scss";

type Props = {
  correctlyAnsweredAmount: number;
  questions: number;
  reset: () => void;
};

export const MultipleChoiceQuizEndScreen: Component<Props> = (props) => {
  return (
    <div class={styles.endWrapper}>
      <div class="heading">
        You got {props.correctlyAnsweredAmount}/{props.questions} questions
        answered correctly
      </div>
      <div class={styles.startButton} onClick={props.reset}>
        Start Over
      </div>
    </div>
  );
};
