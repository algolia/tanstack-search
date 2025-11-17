import type { useHits } from "react-instantsearch";

type Hierarchy = Record<string, string | null>;

export type InternalHit = {
  url: string;
  hierarchy: Hierarchy;
  content: string | null;
  library: string | null;
  framework: string | null;
  type: string;
};

export type Hit = ReturnType<typeof useHits<InternalHit>>["items"][0];
