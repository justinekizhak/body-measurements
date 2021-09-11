import { For } from "solid-js";
import { Link } from "solid-app-router";
import jkLogo from "~/assets/svg/jk.svg";
import Socials from "./Socials";

export default () => {
  const links = [
    {
      label: "About this project",
      href: "#",
    },
  ];
  const legalLinks = [
    {
      label: "Privacy Policy",
      href: "#",
    },
    {
      label: "Terms of Use",
      href: "#",
    },
    {
      label: "Disclaimer",
      href: "#",
    },
  ];

  const allLinks = [links, legalLinks];
  return (
    <footer id="footer" class="relative  dark:bg-gray-800 pt-24">
      <div class=" border-t border-b dark:border-gray-700 py-16 mx-8 lg:mx-auto max-w-7xl border-gray-300">
        <div class="container mx-auto grid grid-cols-2 lg:grid-cols-3 gap-8 px-8">
          <For each={allLinks}>
            {(linkCategory) => (
              <div class="gap-6 flex flex-col">
                <For each={linkCategory}>
                  {(link) => (
                    <Link href={link.href}>
                      <a class="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">
                        {link.label}
                      </a>
                    </Link>
                  )}
                </For>
              </div>
            )}
          </For>
          <Socials />
        </div>
      </div>
      <div class="py-16 flex flex-col justify-center items-center max-w-7xl mx-auto">
        <img src={jkLogo} alt="jk logo" class="lg:w-1/4" />
        <div class="mt-6 text-xs lg:text-sm lg:text-center  text-gray-900 dark:text-gray-50 w-full px-8">
          Copyright © 2021 Justine Kizhakkinedath. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
