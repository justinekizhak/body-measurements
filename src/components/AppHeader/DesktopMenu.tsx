import { For, createSignal, onMount } from "solid-js";
import { MenuProps } from "~/interfaces/header";
import gsap from "gsap";
import { useOutsideClick } from "~/hooks/useOutsideClick";

export default (props: MenuProps) => {
  let menu, menuContainer;
  const [menuOpen, setMenuOpen] = createSignal(false);

  const toggleMenu = () => {
    if (!menuOpen()) {
      // Opening
      gsap.fromTo(
        menu,
        { autoAlpha: 0, scale: 0.95 },
        { autoAlpha: 1, scale: 1, duration: 0.2, ease: "ease-out" }
      );
      setMenuOpen(true);
    } else {
      // Closing
      closeMenu();
    }
  };

  const closeMenu = () => {
    gsap.fromTo(
      menu,
      { autoAlpha: 1, scale: 1 },
      { autoAlpha: 0, scale: 0.95, duration: 0.075, ease: "ease-in" }
    );
    setMenuOpen(false);
  };

  onMount(() => {
    gsap.set(menu, { autoAlpha: 0, scale: 0.95 });
    useOutsideClick(menuContainer, () => {
      menuOpen() && closeMenu();
    });
  });

  return (
    <div ref={menuContainer}>
      <button
        type="button"
        class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        id="user-menu-button"
        aria-expanded="false"
        aria-haspopup="true"
        onClick={toggleMenu}
      >
        <span class="sr-only">Open user menu</span>
        <img class="h-8 w-8 rounded-full" src={props.user.photo} alt="" />
      </button>

      <div
        ref={menu}
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
      >
        <For each={props.navItems}>
          {(navItem) => (
            <a
              href={navItem.href}
              class="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabindex="-1"
            >
              {navItem.label}
            </a>
          )}
        </For>
      </div>
    </div>
  );
};
