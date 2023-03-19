import { createDroppable } from "@thisbeyond/solid-dnd";
import { Component } from "solid-js";
import { Props as DraggableProps } from "./DraggableKana";

type Props = DraggableProps & {
  isAnswered: boolean;
};

export const DroppableKana: Component<Props> = (props) => {
  const droppable = createDroppable(props.kana.romaji, {
    type: props.kana.romaji,
  });

  return (
    <div use:droppable>
      {props.isAnswered ? props.kana[props.quizType] : props.kana.romaji}
    </div>
  );
};
