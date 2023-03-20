import { useEffect, RefObject, ReactNode } from "react";

export default function useOutsideClick(
  refs: Array<RefObject<HTMLElement> | undefined>,
  handler?: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!handler) return;

      if (
        event.target === document.getElementsByTagName("html")[0] &&
        event.clientX >= document.documentElement.offsetWidth
      )
        return;

      let containedToAnyRefs = false;
      for (const rf of refs) {
        if (rf && rf.current && rf.current.contains(event.target as Node)) {
          containedToAnyRefs = true;
          break;
        }
      }

      if (!containedToAnyRefs) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, handler]);
}
