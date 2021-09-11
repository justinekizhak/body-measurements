import { onMount, onCleanup } from "solid-js";

type Handler = (data: any) => void;

export function useOutsideClick(
  ref: HTMLElement | undefined,
  handler: Handler
) {
  const isVisible = (elem) =>
    !!elem &&
    !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

  const listener = (event) => {
    // Do nothing if clicking ref's element or descendent elements
    if (ref && !ref.contains(event.target) && isVisible(ref)) {
      // or use: event.target.closest(selector) === null
      handler(event);
    }
  };

  onMount(() => {
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
  });

  onCleanup(() => {
    document.removeEventListener("mousedown", listener);
    document.removeEventListener("touchstart", listener);
  });
}
