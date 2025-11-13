import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>("light");

  const value = useMemo(
    () => ({
      theme,
      changeTheme: (theme: Theme) => setTheme(theme),
    }),
    [theme],
  );

  useLayoutEffect(() => {
    const $el = document.documentElement;

    if (theme === "dark") {
      $el.classList.add("dark");
    } else {
      $el.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("useTheme must be used inside of ThemeProvider");
  }

  return ctx;
}
