/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type Ref,
  useRef,
  useEffect,
} from "react";
import { Highlight } from "react-instantsearch";
import { twMerge } from "tailwind-merge";
import { useSearchContext } from "../SearchContext";
import { frameworkOptions } from "../utils";
import { Snippet } from "./Snippet";

const SafeLink = forwardRef(
  (
    {
      href,
      children,
      className,
      onKeyDown,
      role,
      "aria-selected": ariaSelected,
      tabIndex,
      ...props
    }: AnchorHTMLAttributes<HTMLAnchorElement>,
    ref: Ref<HTMLAnchorElement>,
  ) => {
    return (
      <a
        href={href}
        className={className}
        onKeyDown={onKeyDown}
        role={role}
        aria-selected={ariaSelected}
        tabIndex={tabIndex}
        ref={ref}
        target="_blank"
        {...props}
      >
        {children}
      </a>
    );
  },
);

export const Result = ({
  hit,
  isFocused,
}: {
  hit: any;
  isFocused?: boolean;
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
        isFocused ? "bg-gray-500/20" : "hover:bg-gray-500/10",
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
            <Highlight hit={hit} attribute="hierarchy.lvl1" />
          </h3>
          {["lvl2", "lvl3", "lvl4", "lvl5", "lvl6"].map((lvl) =>
            hit.hierarchy[lvl] ? (
              <p
                key={lvl}
                className="text-sm text-gray-500 dark:text-gray-500 mt-1"
              >
                <Highlight hit={hit} attribute={`hierarchy.${lvl}`} />
              </p>
            ) : null,
          )}
          {hit.content ? (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              <Snippet attribute="content" hit={hit} />
            </p>
          ) : null}
        </div>
        {(() => {
          const framework = frameworkOptions.find((f) =>
            hit.url.includes(`/framework/${f.value}`),
          );
          if (!framework) return null;

          return (
            <div className="flex-none">
              <div className="flex items-center gap-1 text-xs font-black bg-white rounded-xl px-2 py-1 dark:bg-black">
                {framework.label}
              </div>
            </div>
          );
        })()}
      </article>
    </SafeLink>
  );
};
