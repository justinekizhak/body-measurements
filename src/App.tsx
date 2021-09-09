import type { Component } from "solid-js";
import "virtual:windi.css";
import "virtual:windi-devtools";
// import styles from "./App.module.css";
import "./global.css";
import { Link } from "solid-app-router";

const AppHeader = () => {
  return <header>Header</header>;
};

const AppFooter = () => {
  return (
    <footer class="border-t flex text-center text-sm pt-4 text-gray-300 justify-center lg:text-left">
      <div class="w-full justify-between lg:flex">
        <div class="lg:w-auto">
          <span class="font-display inline-block"> Copyright © 2021 </span>
          <span>Justine Kizhakkinedath </span>
        </div>
        <div class="flex my-4 gap-4 justify-center lg:my-0">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/terms-of-service">Terms of Service</Link>LinkLLiL
        </div>
      </div>
    </footer>
  );
};

const App: Component = () => {
  return (
    <div class="flex flex-col min-h-screen text-white">
      <AppHeader />
      <main class="flex-grow">Main</main>
      <AppFooter />
    </div>
  );
};

export default App;
