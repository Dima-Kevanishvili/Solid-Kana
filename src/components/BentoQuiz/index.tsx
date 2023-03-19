import {
  DragDropProvider,
  DragDropSensors,
  DragEventHandler,
} from "@thisbeyond/solid-dnd";
import {
  Component,
  createEffect,
  createSignal,
  Match,
  onCleanup,
  Switch,
} from "solid-js";
import {
  getKanasForBento,
  getKanasForBentoDraggables,
  KanaList,
} from "../../kana";
import { Kana, KanaTypes } from "../../types";
import QuizTypeChooser from "../QuizTypeChooser";
import styles from "./BentoQuiz.module.scss";
import { DraggablesTable } from "./DnDComponents/DraggablesTable";
import { DroppablesTable } from "./DnDComponents/DroppablesTable";

const BentoQuiz: Component = () => {
  const bentoKanas = getKanasForBento();

  const [answered, setAnswered] = createSignal<string[]>([]);
  const [quizType, setQuizType] = createSignal<KanaTypes>("hiragana");
  const [hasChosenType, setHasChosenType] = createSignal<boolean>(false);
  const [hasStarted, setHasStarted] = createSignal<boolean>(false);
  const [timeElapsed, setTimeElapsed] = createSignal<number>(0);
  const [timer, setTimer] = createSignal<number>();
  const [hasEnded, setHasEnded] = createSignal<boolean>(false);
  const [shuffledKanas, setShuffledKanas] = createSignal<Kana[][]>(
    getKanasForBentoDraggables()
  );

  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    if (droppable) {
      if (draggable.data.type === droppable.data.type) {
        setAnswered((prev) => [...prev, draggable.data.type]);
      }
    }
  };

  const onDragStart: DragEventHandler = () => {
    if (!hasStarted()) setHasStarted(true);
  };

  const stopTimer = () => {
    clearInterval(timer());
  };

  const startTimer = () => {
    setTimer(
      setInterval(() => {
        setTimeElapsed((prev) => prev + 100);
      }, 100)
    );
  };

  const reset = () => {
    setAnswered([]);
    setHasStarted(false);
    setTimeElapsed(0);
    setTimer();
    setHasEnded(false);
    setShuffledKanas(getKanasForBentoDraggables());
  };

  createEffect(() => {
    if (hasStarted()) {
      startTimer();
    }
    return onCleanup(() => stopTimer());
  });

  createEffect(() => {
    if (answered().length === KanaList.length) {
      stopTimer();
      setHasEnded(true);
    }
  });

  const getTime = () => {
    const ms = timeElapsed();
    const minutes = Math.floor(ms / (60 * 1000));
    const seconds = ((ms % (60 * 1000)) / 1000).toFixed(0);
    const smallMS = (ms % 1000) / 100;
    return `${minutes}.${seconds}:${smallMS}`;
  };

  return (
    <Switch>
      <Match when={!hasChosenType()}>
        <QuizTypeChooser
          quizType={quizType()}
          setQuizType={setQuizType}
          setHasStarted={setHasChosenType}
        />
      </Match>
      <Match when={hasChosenType()}>
        <DragDropProvider onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <DragDropSensors />
          <div class="quizWrapper">
            <div class="status">{getTime()}</div>
            <div class={styles.dndWrapper}>
              <DroppablesTable
                quizType={quizType()}
                answered={answered()}
                neededKanas={bentoKanas}
              />
              <Switch>
                <Match when={hasEnded()}>
                  <div class="heading">
                    You're Done! It took you {getTime()} to finish
                  </div>
                </Match>
                <Match when={!hasEnded()}>
                  <DraggablesTable
                    quizType={quizType()}
                    answered={answered()}
                    shuffledKanas={shuffledKanas()}
                  />
                </Match>
              </Switch>
            </div>
            <div onClick={reset} class={styles.resetButton}>
              Reset
            </div>
          </div>
        </DragDropProvider>
      </Match>
    </Switch>
  );
};

export default BentoQuiz;
