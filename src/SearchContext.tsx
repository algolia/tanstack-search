import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
  useMemo,
} from "react";

type SearchContextType = {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen: open,
      openSearch: () => setOpen(true),
      closeSearch: () => setOpen(false),
    }),
    [open],
  );

  return <SearchContext value={value}>{children}</SearchContext>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useSearchContext() {
  const ctx = useContext(SearchContext);

  if (ctx === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return ctx;
}
