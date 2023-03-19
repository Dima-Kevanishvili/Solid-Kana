import { Component, createSignal, For, Setter } from "solid-js";
import { KanaQuestion } from "../../types";
import styles from "./QuizQuestion.module.scss";
type Props = {
  question: KanaQuestion;
  nextQuestion: () => void;
  totalQuestions: number;
  currentQuestionIndex: number;
  setCorrectlyAnsweredAmount: Setter<number>;
};
const QuizQuestion: Component<Props> = (props) => {
  const [answeredValue, setAnsweredValue] = createSignal<string>("");

  const onAnswer = (choice: string) => {
    if (answeredValue()) {
      return;
    }
    if (choice === props.question.answer) {
      props.setCorrectlyAnsweredAmount((prev) => prev + 1);
    }
    setAnsweredValue(choice);
  };
  const handleNextQuestion = () => {
    if (!answeredValue()) {
      return;
    }
    setAnsweredValue("");
    props.nextQuestion();
  };
  return (
    <div class="quizWrapper">
      <div class="status">
        {props.currentQuestionIndex + 1}/{props.totalQuestions}
      </div>
      <div class={styles.symbol}>{props.question.symbol}</div>
      <div class="defaultInnerWrapper">
        <For each={props.question.choices}>
          {(choice) => (
            <div
              classList={{
                [styles.answerButton]: true,
                [styles.correctAnswer]:
                  (answeredValue() && choice === props.question.answer) ||
                  false,
                [styles.incorrectAnswer]:
                  (answeredValue() === choice &&
                    choice !== props.question.answer) ||
                  false,
              }}
              onClick={() => onAnswer(choice)}
            >
              {choice}
            </div>
          )}
        </For>
      </div>
      <div
        class={styles.nextButton}
        onClick={handleNextQuestion}
        style={{ opacity: answeredValue() ? 1 : 0 }}
      >
        Next Question {"->"}
      </div>
    </div>
  );
};

export default QuizQuestion;
