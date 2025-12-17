# Tanstack Search improvement exploration

Example app is deployed [here](https://tanstack-search.netlify.app/)

`APP_ID` - `V3PMI63O0Y`
`SEARCH_API_KEY` - `9897da79ff5fd9363a813863973366b8`
`INDEX_NAME` - `Tanstack DS`

## Proposed changes

> The index configuration from the test/playground index we've been using is included in this repo as `index_configuration.json`

#### Ranking and Sorting

Update the `TEXTUAL` ranking as follows:

```ts
"proximity",
"words",
"filters",
"typo",
"attribute",
"exact",
"custom",
```

Add custom ranking as follows:

```ts
"desc(weight.pageRank)",
"desc(weight.level)",
"asc(weight.position)",
```

#### Typo-tolerance

Min chars to accept 1 typo

`3 -> 5`

Min chars to accept 2 typos

`7 -> 9`

#### Snippeting

Content

`10 -> 20`

> `10` is fine, it kind of depends on how much content you think should be displayed per result

Snippet text

`'' -> '...'`

> Optional, but feel like the `...` elludes to it not being the end of content

#### Special characters

Add `'-"` to "Separators characters to index"

#### UI changes

Added a `<Snippet />` component that actually utilizes the snippeting from the search engine. Basic working component as such:

```tsx
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
```

The main part here is using the `_snippetResult` property on a `hit`

And then used within a result like so for each snippetable attribute:

```tsx
<Snippet hit={hit} attribute="hierarchy.lvl1" />
```

#### Crawler changes

The record extractor was modified to behave like so:

```ts
    recordExtractor: ({ helpers, url }) => {
        const knownLibraries = [
          "config",
          "form",
          "optimistic",
          "pacer",
          "query",
          "ranger",
          "react-charts",
          "router",
          "start",
          "store",
          "table",
          "virtual",
          "db",
          "devtools",
        ];
        // Check if current page in an API Reference page
        const isReferencePage = url.pathname.includes("/reference/");

        const pathParts = url.pathname.split("/").filter(Boolean);
        const library = knownLibraries.includes(pathParts[0])
          ? pathParts[0]
          : null;
        const version = library ? pathParts[1] || "latest" : null;

        let framework = null;
        const frameworkIndex = pathParts.indexOf("framework");
        if (frameworkIndex !== -1 && pathParts.length > frameworkIndex + 1) {
          framework = pathParts[frameworkIndex + 1];
        }

        let pageRank = 100;

        // Make sure `latest` version is ranked highest
        if (version !== "latest") {
          pageRank = 50;
        }

        // Rank API reference pages lowest (optional) - Meant to decluter the amount of text spat out to the user
        if (isReferencePage) {
          pageRank = 0;
        }

        const records = helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: "",
              // Use the `framework` as `lvl0` - the "highest" in the hierarchy
              defaultValue: framework || library || "Documentation",
            },
            // Using `:first` here incase there are multiple `h1`s on a page
            lvl1: ["header h1", "article h1", "main h1:first", "h1:first"],
            // Preface selectors with `.styled-markdown-content` to make sure we're only grabbing from content sections
            lvl2: [".styled-markdown-content h2", "article h2", "main h2"],
            lvl3: [".styled-markdown-content h3", "article h3", "main h3"],
            lvl4: [".styled-markdown-content h4", "article h4", "main h4"],
            lvl5: [".styled-markdown-content h5", "article h5", "main h5"],
            lvl6: [".styled-markdown-content h6", "article h6", "main h6"],
            content: [
              ".styled-markdown-content p, .styled-markdown-content li",
              "article p, article li",
              "main p, main li",
            ],
            // Make sure to use the custom page rank
            pageRank,
          },
          aggregateContent: true,
          recordVersion: "v3",
        });

        return records.map((record) => ({
          ...record,
          ...(library ? { library } : {}),
          ...(framework ? { framework } : {}),
          ...(version ? { version } : {}),
        }));
      }
```
