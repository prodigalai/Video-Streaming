import { useEffect, RefObject } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop(ref: RefObject<HTMLElement>) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, ref]);
}
