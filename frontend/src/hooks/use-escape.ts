import * as R from "ramda";
import { useEffect, useRef } from "react";
import { createGlobalState } from "react-use";

const useGlobalPriority = createGlobalState<number>(0);
/**
 * Hook for handling the escape key press.
 *
 * This hook ensures that only the latest mounted instance of the handler is called.
 */
export function useEscape(handler: (e: KeyboardEvent) => void) {
  const [latestPriority, setLatestPriority] = useGlobalPriority();
  const priorityRef = useRef(latestPriority + 1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Check if this is the latest mounted instance
        if (priorityRef.current === latestPriority) {
          handler(e);
        }
      }
    };

    setLatestPriority(R.inc);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      setLatestPriority(R.dec);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handler, latestPriority]);
}
