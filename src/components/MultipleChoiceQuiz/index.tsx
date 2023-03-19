import { Component, createEffect, createSignal, Match, Switch } from "solid-js";
import { generateQuestions } from "../../kana";
import { KanaQuestion, KanaTypes } from "../../types";
import { MultipleChoiceQuizEndScreen } from "../MultpleChoiceQuizEndScreen";
import QuizQuestion from "../QuizQuestion";
import QuizTypeChooser from "../QuizTypeChooser";

const MultipleChoiceQuiz: Component = () => {
  const [hasStarted, setHasStarted] = createSignal<boolean>(false);
  const [quizType, setQuizType] = createSignal<KanaTypes>("hiragana");
  const [questions, setQuestions] = createSignal<KanaQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = createSignal<number>(0);
  const [correctlyAnsweredAmount, setCorrectlyAnsweredAmount] =
    createSignal<number>(0);
  const [hasEnded, setHasEnded] = createSignal<boolean>(false);

  const genSetQuestions = (qT: KanaTypes) => {
    const q = generateQuestions(qT, 25);
    setCurrentQuestion(0);
    return setQuestions(q);
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => {
      if (questions().length - 1 >= prev + 1) {
        return prev + 1;
      }
      setHasEnded(true);
      return prev;
    });
  };

  const reset = () => {
    setHasStarted(false);
    setHasEnded(false);
    setQuizType("hiragana");
    genSetQuestions(quizType());
    setCurrentQuestion(0);
    setCorrectlyAnsweredAmount(0);
  };

  createEffect(() => genSetQuestions(quizType()));

  return (
    <Switch>
      <Match when={!hasStarted()}>
        <QuizTypeChooser
          quizType={quizType()}
          setHasStarted={setHasStarted}
          setQuizType={setQuizType}
        />
      </Match>
      <Match when={hasStarted() && !hasEnded()}>
        <QuizQuestion
          question={questions()[currentQuestion()]!}
          nextQuestion={nextQuestion}
          totalQuestions={questions().length}
          currentQuestionIndex={currentQuestion()}
          setCorrectlyAnsweredAmount={setCorrectlyAnsweredAmount}
        />
      </Match>
      <Match when={hasEnded()}>
        <MultipleChoiceQuizEndScreen
          questions={questions().length}
          reset={reset}
          correctlyAnsweredAmount={correctlyAnsweredAmount()}
        />
      </Match>
    </Switch>
  );
};

export default MultipleChoiceQuiz;
