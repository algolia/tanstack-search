import { DocSearch } from "@docsearch/react";
import "@docsearch/css/dist/style.css";
import { useTheme } from "../../ThemeContext";
import Demo from "../../components/Demo";

export default function DocSearchExample() {
  const { theme } = useTheme();

  return (
    <Demo title="DocSearch">
      <DocSearch
        appId="V3PMI63O0Y"
        apiKey="9897da79ff5fd9363a813863973366b8"
        indices={[
          {
            name: "Tanstack DS",
            searchParameters: {
              filters: "version:latest",
            },
          },
        ]}
        theme={theme}
      />
    </Demo>
  );
}
