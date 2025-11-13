import { DocSearch } from "@docsearch/react";
import "@docsearch/css";

import Demo from "../../components/Demo";
import { useTheme } from "../../ThemeContext";

export default function DocSearchDemo() {
  const { theme } = useTheme();
  return (
    <Demo title="DocSearch Example">
      <DocSearch
        theme={theme}
        appId="V3PMI63O0Y"
        apiKey="9897da79ff5fd9363a813863973366b8"
        indexName="Tanstack DS"
      />
    </Demo>
  );
}
