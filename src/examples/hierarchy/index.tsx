import { Configure, InstantSearch } from "react-instantsearch";
import Demo from "../../components/Demo";
import { SearchButton } from "../../components/SearchButton";
import { SearchProvider } from "../../SearchContext";
import { searchClient } from "../../utils";
import { Modal } from "../../components/Modal";
import { Hierarchy } from "../../components/Hierarchy";

export default function HierarchyExample() {
  return (
    <Demo title="Hierarchy example">
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
              "framework",
              "library",
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
  return (
    <Modal>
      <Hierarchy />
    </Modal>
  );
}
