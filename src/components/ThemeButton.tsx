import { useCallback } from "react";
import { HiMoon, HiSun } from "react-icons/hi2";
import { useTheme } from "../ThemeContext";

export function ThemeButton() {
  const { theme, changeTheme } = useTheme();

  const handleThemeChange = useCallback(() => {
    changeTheme(theme === "dark" ? "light" : "dark");
  }, [theme, changeTheme]);

  return (
    <button
      className="inline-flex items-center gap-2 justify-between p-2 text-left bg-gray-500/10 rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300 absolute top-6 right-12"
      onClick={handleThemeChange}
    >
      <span>{theme === "dark" ? <HiSun /> : <HiMoon />}</span>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
