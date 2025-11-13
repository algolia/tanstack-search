import type { PropsWithChildren } from "react";

type Props = {
  title: string;
  containerClassName?: string;
};

export default function Demo({
  title,
  containerClassName,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={`dark:text-white p-8 ${containerClassName ? containerClassName : ""}`}
    >
      <h3 className="text-center text-gray-900 dark:text-gray-100 mb-4 -mt-4 text-[0.9rem]">
        {title}
      </h3>
      <div className="flex justify-center items-center min-h-[60px]">
        {children}
      </div>
    </div>
  );
}
