"use client";
import clsx from "clsx";
import { categories, type CategoryKey } from "../lib/galleryData";

export function FilterChips({
  active,
  onChange,
}: {
  active: CategoryKey | "all";
  onChange: (c: CategoryKey | "all") => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {(["all", ...Object.keys(categories)] as (CategoryKey | "all")[]).map(
        (key) => (
          <button
            key={key}
            type="button"
            aria-pressed={active === key}
            data-active={active === key}
            className={clsx(
              "chip border px-3 py-1 text-sm",
              active === key ? "font-semibold underline" : ""
            )}
            onClick={() => onChange(key)}
          >
            {key === "all" ? "All" : categories[key as CategoryKey]}
          </button>
        )
      )}
    </div>
  );
}
