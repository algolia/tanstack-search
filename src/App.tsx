import { ThemeButton } from "./components/ThemeButton";
import BaseExample from "./examples/base";
import { ThemeProvider } from "./ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <ThemeButton />
      <div className="grid h-dvh w-full place-items-center justify-center">
        <div className="grid gap-8">
          <BaseExample />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
