import { Hits, useInstantSearch, useRefinementList } from "react-instantsearch";
import { memo } from "react";
import { Result } from "./Result";
import { capitalize, frameworkOptions } from "../utils";
import { twMerge } from "tailwind-merge";
import type { Hit } from "../types";

export function NoResults() {
  const { results } = useInstantSearch();

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

export function Libraries() {
  const { items, refine } = useRefinementList({
    attribute: "library",
    limit: 50,
    sortBy: ["isRefined:desc", "count:desc", "name:asc"],
  });

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 p-2 min-w-max">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
          Libraries:
        </span>
        <div className="flex gap-1.5">
          {items.map((item) => {
            return (
              <button
                key={item.value}
                onClick={() => refine(item.value)}
                className={twMerge(
                  "px-2 py-0.5 text-xs rounded-full transition-colors font-bold text-white",
                  item.isRefined
                    ? "bg-black dark:bg-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700",
                )}
              >
                {capitalize(item.label)}{" "}
                <span className="tabular-nums">
                  ({item.count.toLocaleString()})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Frameworks() {
  const { items, refine } = useRefinementList({
    attribute: "framework",
    limit: 50,
    sortBy: ["isRefined:desc", "count:desc", "name:asc"],
  });

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 p-2 min-w-max">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
          Frameworks:
        </span>
        <div className="flex gap-1.5">
          {items.map((item) => {
            const framework = frameworkOptions.find(
              (f) => f.value === item.value,
            );

            return (
              <button
                key={item.value}
                onClick={() => refine(item.value)}
                className={twMerge(
                  "px-2 py-0.5 text-xs rounded-full transition-colors font-bold text-white",
                  item.isRefined
                    ? framework?.color || "bg-black dark:bg-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700",
                )}
              >
                {capitalize(item.label)}{" "}
                <span className="tabular-nums">
                  ({item.count.toLocaleString()})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const Results = memo(() => {
  const { results } = useInstantSearch();

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
    <>
      <Libraries />
      <Frameworks />
      <div
        className="max-h-[70dvh] lg:max-h-[60dvh] overflow-y-auto"
        role="listbox"
        aria-label="Search results"
      >
        <NoResults />
        <Hits hitComponent={({ hit }) => <Result hit={hit as Hit} />} />
      </div>
    </>
  );
});
