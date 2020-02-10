import React from "react";

export function useOnClickOutside(
  ref: null | React.MutableRefObject<{ current: object; contains: any } | null>,
  handler: any
) {
  React.useEffect(() => {
    const listener = (event: any) => {
      if (ref) {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
