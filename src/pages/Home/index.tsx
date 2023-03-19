import { useNavigate, useParams } from "@solidjs/router";
import { Component, createEffect, createSignal, For } from "solid-js";
import KanaItem from "../../components/KanaItem";
import { KanaList } from "../../kana";
import Paths from "../../paths";
import { HomePageParams, KanaTypes } from "../../types";
import styles from "./Home.module.scss";

const Home: Component = () => {
  const params = useParams<HomePageParams>();
  const navigate = useNavigate();
  const [currentKana, setCurrentKana] = createSignal<KanaTypes>(
    params.kana || "hiragana"
  );

  createEffect(() => {
    if (!["hiragana", "katakana"].includes(params.kana)) {
      return navigate(Paths.Home.hiragana, { replace: true });
    }
    setCurrentKana(params.kana);
  });

  return (
    <div class={styles.wrapper}>
      <For each={KanaList} fallback={<div>Loading...</div>}>
        {(kana) => (
          <KanaItem symbol={kana[currentKana()]} romaji={kana.romaji} />
        )}
      </For>
    </div>
  );
};

export default Home;
