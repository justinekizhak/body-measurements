import { createSignal, For } from "solid-js";
import GithubIcon from "~/components/library/icons/GithubIcon";
import TwitterIcon from "~/components/library/icons/TwitterIcon";
import LaptopIcon from "~/components/library/icons/LaptopIcon";
import SunIcon from "~/components/library/icons/SunIcon";
import MoonIcon from "~/components/library/icons/MoonIcon";
import ChevronDownIcon from "~/components/library/icons/ChevronDownIcon";

export default () => {
  const [mode, setMode] = createSignal("auto");
  const icons = [
    { svg: GithubIcon, name: "github", href: "#" },
    { svg: TwitterIcon, name: "twitter", href: "#" },
  ];

  const themeIconMap = {
    auto: LaptopIcon,
    light: SunIcon,
    dark: MoonIcon,
  };

  const themeValues = [
    { key: "auto", label: "Auto" },
    { key: "light", label: "Light" },
    { key: "dark", label: "Dark" },
  ];

  const themeIcon = () => themeIconMap[mode()];

  const handleThemeChange = (event) => {
    setMode(event.target.value);
  };
  return (
    <div class="flex flex-col justify-between col-span-2 lg:col-span-1">
      <div class="flex items-center mb-6 gap-4">
        <For each={icons}>
          {(icon) => (
            <a href={icon.href}>
              <div class="text-gray-800 dark:text-gray-50 cursor-pointer hover:text-brand dark:hover:text-brand ">
                <icon.svg />
              </div>
            </a>
          )}
        </For>
      </div>
      <div class="relative ">
        {themeIcon()}

        <ChevronDownIcon />
        <select
          value={mode()}
          onChange={handleThemeChange}
          class="w-full focus:outline-none pl-10 py-2 appearance-none flex items-center h-12 border rounded border-gray-700 dark:border-gray-50 text-sm leading-5 dark:bg-gray-900 dark:text-gray-50"
        >
          <For each={themeValues}>
            {(value) => <option value={value.key}>{value.label}</option>}
          </For>
        </select>
      </div>
    </div>
  );
};
