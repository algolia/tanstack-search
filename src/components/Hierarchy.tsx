import { useHits, useInstantSearch, Pagination } from "react-instantsearch";
import { Frameworks, Libraries, NoResults } from "./SearchModal";
import type { Hit, InternalHit } from "../types";
import { SafeLink } from "./Result";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, type PropsWithChildren } from "react";
import { useSearchContext } from "../SearchContext";
import { frameworkOptions, groupBy } from "../utils";
import { Snippet } from "./Snippet";

const Result = ({
  hit,
  isFocused,
  isLastItem = false,
}: {
  hit: Hit;
  isFocused?: boolean;
  isLastItem?: boolean;
}) => {
  const { closeSearch } = useSearchContext();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const link = e.currentTarget as HTMLAnchorElement;
      link.click();
      closeSearch();
    }
  };

  const handleClick = () => {
    closeSearch();
  };

  const ref = useRef<HTMLAnchorElement>(null!);

  useEffect(() => {
    if (isFocused) {
      ref.current?.scrollIntoView({ behavior: "instant", block: "nearest" });
    }
  }, [isFocused]);

  return (
    <SafeLink
      href={hit.url}
      className={twMerge(
        "block p-4 focus:outline-none border-b border-gray-500/10",
        isFocused ? "bg-gray-500/20" : "hover:bg-gray-400/10",
        isLastItem && "border-0",
      )}
      onKeyDown={handleKeyDown}
      onFocus={() => ref.current?.focus()}
      onClick={handleClick}
      role="option"
      aria-selected={isFocused}
      tabIndex={-1}
      ref={ref}
    >
      <article className="flex items-center gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-white">
            <Snippet hit={hit} attribute="hierarchy.lvl1" />
          </h3>
          {["lvl2"].map((lvl) =>
            hit.hierarchy[lvl] ? (
              <p
                key={lvl}
                className="text-sm text-gray-500 dark:text-gray-500 mt-1"
              >
                <Snippet hit={hit} attribute={`hierarchy.${lvl}`} />
              </p>
            ) : null,
          )}
          {hit.content ? (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              <Snippet attribute="content" hit={hit} />
            </p>
          ) : null}
        </div>
      </article>
    </SafeLink>
  );
};

function Group({ group, children }: PropsWithChildren<{ group: string }>) {
  const framework = frameworkOptions.find((f) => f.value === group);

  return (
    <div className={twMerge(framework && "p-4")}>
      {framework && (
        <div
          className={twMerge(
            "inline-flex flex-start items-center gap-1 text-sm font-black bg-white rounded-xl px-2 py-1",
            framework.color,
            framework.fg,
          )}
        >
          {framework.label}
        </div>
      )}
      <div
        className={twMerge(framework && "ml-2 border-l-2", framework?.border)}
      >
        {children}
      </div>
    </div>
  );
}

function Results() {
  const { items } = useHits<InternalHit>();

  const grouped = groupBy(
    items,
    (item) => item.framework ?? item.library ?? "",
  );

  return (
    <>
      {Object.keys(grouped).map((key) => {
        return (
          <Group key={key} group={key}>
            {Object.values(
              groupBy(grouped[key] ?? [], (item) => item.hierarchy.lvl1 ?? ""),
            )
              .flat()
              .map((hit, idx) => (
                <Result
                  key={hit.objectID}
                  hit={hit}
                  isLastItem={idx === (grouped[key] ?? []).length - 1}
                />
              ))}
          </Group>
        );
      })}
    </>
  );
}

export function Hierarchy() {
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
        <Results />
        <Pagination
          padding={2}
          className={twMerge(
            "border-t text-sm dark:border-white/20 px-4 py-3",
            "[&>ul]:w-full [&>ul]:flex [&>ul]:justify-center [&>ul]:gap-2 lg:[&>ul]:gap-4",
            "[&_li>*]:px-3 [&_li>*]:py-1.5",
            "[&_li>span]:cursor-not-allowed",
            "[&_.ais-Pagination-item--selected>*]:bg-emerald-500 [&_.ais-Pagination-item--selected>*]:text-white [&_.ais-Pagination-item--selected>*]:rounded-lg",
          )}
        />
      </div>
    </>
  );
}
