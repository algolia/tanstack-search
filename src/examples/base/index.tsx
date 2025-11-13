import { Configure, InstantSearch, useHits } from "react-instantsearch";
import Demo from "../../components/Demo";
import { SearchButton } from "../../components/SearchButton";
import { Results } from "../../components/SearchModal";
import { SearchProvider } from "../../SearchContext";
import { searchClient } from "../../utils";
import type { InternalHit } from "../../types";
import { Modal } from "../../components/Modal";

export default function BaseExample() {
  return (
    <Demo title="Basic example">
      <SearchProvider>
        <SearchButton />
        <InstantSearch searchClient={searchClient} indexName="Tanstack DS">
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

  return (
    <Modal>
      <Results hits={items} results={results} />
    </Modal>
  );
}
