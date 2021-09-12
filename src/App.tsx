import type { Component } from "solid-js";
import "virtual:windi.css";
import "virtual:windi-devtools";
import { Route } from "solid-app-router";
import DefaultLayout from "~/layouts/default";
import { GlobalStoreProvider } from "~/store";

const App: Component = () => {
  return (
    <GlobalStoreProvider>
      <DefaultLayout>
        <Route />
      </DefaultLayout>
    </GlobalStoreProvider>
  );
};

export default App;
