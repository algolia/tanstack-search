import { createElement } from "react";
import type { Hit } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPropertyByPath(hit: Record<string, any>, path: string) {
  const parts = path.split(".");

  return parts.reduce((prev, current) => {
    const attribute = current as keyof Hit;
    if (prev[attribute]) return prev[attribute];
    return "";
  }, hit);
}

type SnippetProps = {
  hit: Hit;
  attribute: string;
  tagName?: string;
  [prop: string]: unknown;
};

export function Snippet({ hit, attribute, tagName = "span" }: SnippetProps) {
  const content =
    getPropertyByPath(hit, `_snippetResult.${attribute}.value`) ||
    getPropertyByPath(hit, attribute);

  return createElement(tagName, {
    dangerouslySetInnerHTML: {
      __html: content,
    },
  });
}
