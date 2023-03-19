import { createDraggable, transformStyle } from "@thisbeyond/solid-dnd";
import { Component } from "solid-js";
import { Kana, KanaTypes } from "../../../types";
import styles from "../BentoQuiz.module.scss";

export type Props = {
  kana: Kana;
  quizType: KanaTypes;
  isAnswered: boolean;
};

export const DraggableKana: Component<Props> = (props) => {
  const draggable = createDraggable(props.kana.romaji, {
    type: props.kana.romaji,
  });
  const activators = () => (props.isAnswered ? {} : draggable.dragActivators);
  return (
    <div class={styles.draggableBox} {...activators()}>
      <div ref={draggable.ref} style={transformStyle(draggable.transform)}>
        {props.isAnswered ? "" : props.kana[props.quizType]}
      </div>
    </div>
  );
};
