import { Component, For } from "solid-js";
import { Kana, KanaTypes } from "../../../types";
import styles from "../BentoQuiz.module.scss";
import { DroppableKana } from "./DroppableKana";

type Props = {
  neededKanas: {
    [key: string]: Kana[][];
  };
  quizType: KanaTypes;
  answered: string[];
};

export const DroppablesTable: Component<Props> = (props) => (
  <div class={styles.romajiWrapper}>
    <For each={Object.keys(props.neededKanas)} fallback={<div></div>}>
      {(row) => (
        <div class={styles.romajiRow}>
          <For each={props.neededKanas[row]} fallback={<div></div>}>
            {(column) => (
              <For
                each={column}
                fallback={
                  <div
                    classList={{
                      [styles.romajiCell]: true,
                      [styles.answeredCell]: true,
                    }}
                  ></div>
                }
              >
                {(kana) => (
                  <div
                    classList={{
                      [styles.romajiCell]: true,
                      [styles.answeredCell]:
                        !kana || props.answered.includes(kana.romaji),
                    }}
                  >
                    <DroppableKana
                      quizType={props.quizType}
                      kana={kana}
                      isAnswered={props.answered.includes(kana.romaji)}
                    />
                  </div>
                )}
              </For>
            )}
          </For>
        </div>
      )}
    </For>
  </div>
);
