import { Component, For } from "solid-js";
import { Kana, KanaTypes } from "../../../types";
import styles from "../BentoQuiz.module.scss";
import { DraggableKana } from "./DraggableKana";

type Props = {
  quizType: KanaTypes;
  answered: string[];
  shuffledKanas: Kana[][];
};

export const DraggablesTable: Component<Props> = (props) => {
  return (
    <div class={styles.draggablesWrapper}>
      <For each={props.shuffledKanas} fallback={<div></div>}>
        {(row) => (
          <div class={styles.romajiRow}>
            <For each={row} fallback={<div></div>}>
              {(kana) => (
                <div class={styles.draggableBoxWrapper}>
                  <DraggableKana
                    kana={kana}
                    quizType={props.quizType}
                    isAnswered={props.answered.includes(kana.romaji)}
                  />
                </div>
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  );
};
