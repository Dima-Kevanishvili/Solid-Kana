import { A } from "@solidjs/router";
import { Component } from "solid-js";
import styles from "./FooterMenuButton.module.scss";

type Props = {
  text: string;
  navigatePath: string;
};

const FooterMenuButton: Component<Props> = (props) => {
  return (
    <A
      href={props.navigatePath}
      class={styles.button}
      activeClass={styles.active}
    >
      {props.text}
    </A>
  );
};

export default FooterMenuButton;
