import { Dialog, DialogBackdrop } from "@headlessui/react";
import { MdClose, MdSearch } from "react-icons/md";
import { type PropsWithChildren } from "react";
import { SearchBox } from "react-instantsearch";
import { useSearchContext } from "../SearchContext";

const submitIconComponent = () => {
  return <MdSearch />;
};

const resetIconComponent = () => {
  return <MdClose />;
};

export function Modal({ children }: PropsWithChildren) {
  const { isOpen, closeSearch } = useSearchContext();

  return (
    <Dialog
      open={isOpen}
      onClose={closeSearch}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="min-h-screen text-center">
        <DialogBackdrop className="fixed inset-0 bg-black/60 xl:bg-black/30" />
        <div className="inline-block w-[98%] xl:w-full max-w-2xl mt-8 overflow-hidden text-left align-middle transition-all transform bg-white/80 dark:bg-black/80 shadow-xl rounded-lg xl:rounded-xl divide-y divide-gray-500/20 backdrop-blur-lg dark:border dark:border-white/20">
          <div className="flex justify-between items-center gap-2">
            <SearchBox
              placeholder="Search..."
              classNames={{
                root: "w-full",
                form: "text-xl flex items-center gap-2 px-4",
                input:
                  "flex-1 p-4 pl-0 outline-none font-bold [&::-webkit-search-cancel-button]:hidden bg-transparent",
                submit: "p-2",
                reset: "p-2",
              }}
              submitIconComponent={submitIconComponent}
              resetIconComponent={resetIconComponent}
              autoFocus
            />
          </div>
          {children}
        </div>
      </div>
    </Dialog>
  );
}
