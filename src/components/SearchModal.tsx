import { useHits } from "react-instantsearch";
import { memo } from "react";
import { type SearchResults } from "algoliasearch-helper";
import type { Hit } from "../types";
import { Result } from "./Result";

function NoResults() {
  const { results } = useHits();

  if (results?.__isArtificial || (results?.nbHits ?? 0) > 0) {
    return null;
  }

  return (
    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
      <p className="text-lg font-medium">No results found</p>
      <p className="mt-2 text-sm">
        Try adjusting your search or filters to find what you're looking for.
      </p>
    </div>
  );
}

type ResultsProps = {
  hits: Hit[];
  results: SearchResults<Hit> | undefined;
};

export const Results = memo(({ hits, results }: ResultsProps) => {
  if (!results?.query) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        <p className="text-lg font-medium">Search TanStack</p>
        <p className="mt-2 text-sm">
          Start typing to search through our documentation, guides, and more.
        </p>
      </div>
    );
  }

  return (
    <div
      className="max-h-[70dvh] lg:max-h-[60dvh] overflow-y-auto"
      role="listbox"
      aria-label="Search results"
    >
      <NoResults />
      {hits.map((hit) => (
        <Result key={hit.objectID} hit={hit} />
      ))}
    </div>
  );
});
