import { DocSearch } from "@docsearch/react";

import Demo from "../../components/Demo";
import { useTheme } from "../../ThemeContext";
import { useLayoutEffect, useState } from "react";

export default function DocSearchAlteredDemo() {
  const { theme } = useTheme();
  const [modalContainer, setModalContainer] = useState<HTMLElement>();

  useLayoutEffect(() => {
    setModalContainer(
      document.getElementById("alteredModalContainer") ?? undefined,
    );
  }, []);

  return (
    <Demo
      title="DocSearch Altered example"
      containerClassName="example--ds-altered"
    >
      <div id="alteredModalContainer" />
      <DocSearch
        theme={theme}
        appId="AW8P45EN3L"
        apiKey="2076be890c7814a0c7a041dd3e7f130f"
        indexName="Tanstack DS altered"
        translations={{
          button: {
            buttonText: "Search...",
          },
          modal: {
            searchBox: {
              placeholderText: "Search...",
            },
            noResultsScreen: {
              noResultsText: "No results found",
              suggestedQueryText:
                "Try adjusting your search or filters to find what you're looking for.",
            },
          },
        }}
        portalContainer={modalContainer}
      />
    </Demo>
  );
}
