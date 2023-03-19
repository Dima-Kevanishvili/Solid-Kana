import { A } from "@solidjs/router";
import { Component } from "solid-js";
import Paths from "../../paths";
import styles from "./QuizMethodChooser.module.scss";
const QuizMethodChooser: Component = () => {
  return (
    <div class="flexColumnCenterWrapper">
      <div class="heading">Choose The Quiz Method</div>
      <div class="defaultInnerWrapper">
        <A class={styles.button} href={Paths.Quiz.multipleChoice}>
          Multiple Choice
        </A>
        <A class={styles.button} href={Paths.Quiz.bento}>
          Bento
        </A>
      </div>
    </div>
  );
};

export default QuizMethodChooser;
