import { Plus as PlusIcon } from "iconoir-react";
import { FaReact, FaLaravel, FaJs } from "react-icons/fa";
import { Figma } from "@lobehub/icons";
import { cn } from "@/lib/utils";

/**
 * Main-stack logo cloud — the four tools the site is built around
 * (React, Laravel, Figma, JavaScript), separated from the full skill
 * grid. Pattern follows the LogoCloud template: 2-col mobile / 4-col
 * desktop, hairline cell borders with full-bleed top/bottom rules and
 * corner plus-marks, re-colored to the site's border palette.
 */
const STACK = [
  {
    name: "React",
    Icon: FaReact,
    color: "#61DAFB",
    cell: "relative border-r border-b bg-gray-50 dark:bg-white/[0.02]",
    plus: "-right-[12.5px] -bottom-[12.5px]",
    plusVisibility: "",
  },
  {
    name: "Laravel",
    Icon: FaLaravel,
    color: "#FF2D20",
    cell: "border-b md:border-r",
    plus: "-right-[12.5px] -bottom-[12.5px]",
    plusVisibility: "",
  },
  {
    name: "Figma",
    Icon: Figma.Color,
    color: undefined,
    cell: "border-r border-b",
    plus: "-right-[12.5px] -bottom-[12.5px]",
    plusVisibility: "hidden md:block",
  },
  {
    name: "JavaScript",
    Icon: FaJs,
    color: "#F7DF1E",
    cell: "border-b bg-gray-50 dark:bg-white/[0.02]",
  },
];

const MainStack = () => {
  return (
    <div className="relative grid grid-cols-2 border-x border-gray-300 dark:border-white/[0.07] md:grid-cols-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-px left-1/2 w-screen -translate-x-1/2"
      />

      {STACK.map(({ name, Icon, color, cell, plus, plusVisibility }) => (
        <div
          key={name}
          className={cn(
            "relative flex flex-col items-center justify-center gap-3 px-4 py-8 md:p-8",
            cell,
          )}
        >
          <Icon
            aria-hidden="true"
            focusable="false"
            className="h-7 w-7 sm:h-8 sm:w-8"
            style={color ? { color } : undefined}
          />
          <span className="text-xs font-normal text-gray-500 dark:text-white/50">{name}</span>
          {plus && (
            <PlusIcon
              aria-hidden="true"
              focusable="false"
              strokeWidth={1}
              className={cn(
                "absolute z-10 size-6 text-gray-400 dark:text-white/40",
                plus,
                plusVisibility,
              )}
            />
          )}
        </div>
      ))}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px left-1/2 w-screen -translate-x-1/2"
      />
    </div>
  );
};

export default MainStack;
