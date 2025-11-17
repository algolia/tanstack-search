import { ThemeButton } from "./components/ThemeButton";
import BaseExample from "./examples/base";
import HierarchyExample from "./examples/hierarchy";
import { ThemeProvider } from "./ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <ThemeButton />
      <div className="grid h-dvh w-full place-items-center justify-center">
        <div className="grid gap-8">
          <BaseExample />
          <HierarchyExample />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
