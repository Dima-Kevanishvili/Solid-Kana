import { useParams } from "@solidjs/router";
import { Component, createEffect, createSignal, Match, Switch } from "solid-js";
import BentoQuiz from "../../components/BentoQuiz";
import MultipleChoiceQuiz from "../../components/MultipleChoiceQuiz";
import QuizMethodChooser from "../../components/QuizMethodChooser";
import { QuizMethods, QuizPageParams } from "../../types";

const Quiz: Component = () => {
  const params = useParams<QuizPageParams>();
  const [quizMethod, setQuizMethod] = createSignal<QuizMethods>();

  createEffect(() => {
    if (!["multiple-choice", "bento"].includes(params.method)) {
      return setQuizMethod(undefined);
    }
    return setQuizMethod(params.method);
  });

  return (
    <Switch>
      <Match when={!quizMethod()}>
        <QuizMethodChooser />
      </Match>
      <Match when={quizMethod() === "multiple-choice"}>
        <MultipleChoiceQuiz />
      </Match>
      <Match when={quizMethod() === "bento"}>
        <BentoQuiz />
      </Match>
    </Switch>
  );
};

export default Quiz;
