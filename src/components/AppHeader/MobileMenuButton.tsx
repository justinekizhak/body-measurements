import { createSignal } from "solid-js";
import { MobileMenuProps } from "~/interfaces/header";

export default (props: MobileMenuProps) => {
  const [menuOpen, setMenuOpen] = createSignal(false);
  const toggleMenu = () => {
    props.onChange && props.onChange({ openMenu: !menuOpen() });
    setMenuOpen((prevValue) => !prevValue);
  };
  return (
    <div class="-mr-2 flex items-center sm:hidden">
      <button
        type="button"
        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        aria-controls="mobile-menu"
        aria-expanded="false"
        onClick={toggleMenu}
      >
        <span class="sr-only">Open main menu</span>

        <svg
          class="block h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          classList={{ [menuOpen() ? "hidden" : "block"]: true }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <svg
          class="hidden h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          classList={{ [!menuOpen() ? "hidden" : "block"]: true }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
