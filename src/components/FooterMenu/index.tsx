import { Component } from "solid-js";
import Paths from "../../paths";
import FooterMenuButton from "../FooterMenuButton";
import styles from "./FooterMenu.module.scss";

const FooterMenu: Component = () => {
  return (
    <>
      <div class={styles.wrapper}>
        <FooterMenuButton text="Hiragana" navigatePath={Paths.Home.hiragana} />
        <FooterMenuButton text="Katakana" navigatePath={Paths.Home.katakana} />
        <FooterMenuButton text="Quiz" navigatePath={Paths.Quiz.default} />
      </div>
    </>
  );
};

export default FooterMenu;
