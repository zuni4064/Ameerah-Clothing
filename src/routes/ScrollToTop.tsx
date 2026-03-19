import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, [location.pathname]);

  return null;
}

