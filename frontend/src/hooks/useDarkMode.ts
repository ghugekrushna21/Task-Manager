import { useEffect, useState } from "react";

const DART_MODE_SETTING_KEY = "darkMode";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(DART_MODE_SETTING_KEY);
    if (saved !== null) return saved === "true";

    return matchMedia("(prefers-color-schemes:dark)").matches;
  });

  useEffect(() => {
    isDark
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");

    localStorage.setItem(DART_MODE_SETTING_KEY, isDark.toString());
  }, [isDark]);

  const toggle = () => setIsDark(!isDark);

  return { isDark, toggle };
};

export default useDarkMode;
