import type { Hit as AlgoliaHit } from "algoliasearch";

type Hierarchy = Record<string, string | null>;

export type InternalHit = {
  url: string;
  hierarchy: Hierarchy;
  content: string | null;
  library: string | null;
  framework: string | null;
  type: string;
};

export type Hit = AlgoliaHit<InternalHit>;
