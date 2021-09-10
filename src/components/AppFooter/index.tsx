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
    {
      label: "About this project",
      href: "#",
    },
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
    <footer class="pt-12">
      <footer id="footer" class="relative z-50 dark:bg-gray-900 pt-24">
        <div class=" border-t border-b border-gray-200 dark:border-gray-700 py-16">
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
        <div class="py-16 flex flex-col justify-center items-center">
          <img src={jkLogo} alt="jk logo" class="lg:w-1/2" />
          <p class="mt-6 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">
            Copyright © 2021 Justine Kizhakkinedath. All Rights Reserved.
          </p>
        </div>
      </footer>
    </footer>
  );
};
