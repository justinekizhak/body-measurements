import { For } from "solid-js";
import { MenuProps } from "~/interfaces/header";

export default (props: MenuProps) => {
  return (
    <div ref={props.ref} class="" id="mobile-menu">
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src={props.user.photo}
              alt="user-photo"
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">
              {props.user.name}
            </div>
            <div class="text-sm font-medium text-gray-500">
              {props.user.email}
            </div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <For each={props.navItems}>
            {(navItem) => (
              <a
                href={navItem.href}
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                {navItem.label}
              </a>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
