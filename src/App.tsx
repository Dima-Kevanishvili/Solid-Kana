import { Route, Routes } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import FooterMenu from "./components/FooterMenu";
import Paths from "./paths";
const Home = lazy(() => import("./pages/Home"));
const Quiz = lazy(() => import("./pages/Quiz"));

const App: Component = () => {
  return (
    <div class="appWrapper">
      <Routes>
        <Route path={Paths.Home.pattern} component={Home} />
        <Route path={Paths.Quiz.pattern} component={Quiz} />
      </Routes>
      <FooterMenu />
    </div>
  );
};

export default App;
