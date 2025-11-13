import { Configure, InstantSearch, useHits } from "react-instantsearch";
import Demo from "../../components/Demo";
import { SearchButton } from "../../components/SearchButton";
import { Results } from "../../components/SearchModal";
import { SearchProvider } from "../../SearchContext";
import { searchClient } from "../../utils";
import { Modal } from "../../components/Modal";
import type { InternalHit } from "../../types";
import { useMemo } from "react";
import { groupBy } from "../../utils";

export default function BaseAlteredExample() {
  return (
    <Demo title="Basic altered example">
      <SearchProvider>
        <SearchButton />
        <InstantSearch
          searchClient={searchClient}
          indexName="Tanstack DS altered"
        >
          <Configure
            attributesToRetrieve={[
              "hierarchy.lvl1",
              "hierarchy.lvl2",
              "hierarchy.lvl3",
              "hierarchy.lvl4",
              "hierarchy.lvl5",
              "hierarchy.lvl6",
              "url",
              "content",
              "type",
              "framework",
            ]}
            attributesToHighlight={[
              "hierarchy.lvl1",
              "hierarchy.lvl2",
              "hierarchy.lvl3",
              "hierarchy.lvl4",
              "hierarchy.lvl5",
              "hierarchy.lvl6",
              "content",
            ]}
            attributesToSnippet={["content:15"]}
            filters="version:latest"
          />

          <Content />
        </InstantSearch>
      </SearchProvider>
    </Demo>
  );
}

function Content() {
  const { items, results } = useHits<InternalHit>();

  const hits = useMemo(() => {
    if (!results?.query) return [];

    const ret = Object.values(
      groupBy(items, (hit) => hit.hierarchy["lvl0"] ?? "", 10),
    ).flat();

    return ret;
  }, [items, results]);

  return (
    <Modal>
      <Results hits={hits} results={results} />
    </Modal>
  );
}
