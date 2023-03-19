import { Component } from "solid-js";
import styles from "./KanaItem.module.scss";
type Props = {
  symbol: string;
  romaji: string;
};
const KanaItem: Component<Props> = (props) => {
  return (
    <div class={styles.wrapper}>
      <div class={styles.symbolText}>{props.symbol}</div>
      <div class={styles.romajiText}>{props.romaji}</div>
    </div>
  );
};

export default KanaItem;
