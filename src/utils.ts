import { liteClient } from "algoliasearch/lite";

export const searchClient = liteClient(
  "V3PMI63O0Y",
  "9897da79ff5fd9363a813863973366b8",
);

export const frameworkOptions = [
  { label: "React", value: "react", color: "bg-blue-500" },
  { label: "Preact", value: "preact", color: "bg-blue-400" },
  { label: "Vue", value: "vue", color: "bg-green-500" },
  {
    label: "Angular",
    value: "angular",
    color: "bg-red-500",
  },
  { label: "Solid", value: "solid", color: "bg-blue-600" },
  { label: "Lit", value: "lit", color: "bg-orange-500" },
  {
    label: "Svelte",
    value: "svelte",
    color: "bg-orange-600",
  },
  { label: "Qwik", value: "qwik", color: "bg-purple-500" },
  { label: "Vanilla", value: "vanilla", color: "bg-yellow-500" },
] as const;

export function groupBy<TValue extends Record<string, unknown>>(
  values: TValue[],
  predicate: (value: TValue) => string,
  maxResultsPerGroup?: number,
): Record<string, TValue[]> {
  return values.reduce<Record<string, TValue[]>>((acc, item) => {
    const key = predicate(item);

    if (!Object.prototype.hasOwnProperty.call(acc, key)) {
      acc[key] = [];
    }

    // We limit each section to show 5 hits maximum.
    // This acts as a frontend alternative to `distinct`.
    if (acc[key].length < (maxResultsPerGroup || 5)) {
      acc[key].push(item);
    }

    return acc;
  }, {});
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
