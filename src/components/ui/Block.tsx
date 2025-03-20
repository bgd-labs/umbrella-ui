import { Children, cloneElement } from "react";
import { cn } from "@/utils/cn";

export type BlockProps = {
  children: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3 | 4;
  zIndex?: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
  outerClassName?: string;
  isHovered?: boolean;
  isClicked?: boolean;
  hoverAnimation?: boolean;
  activeAnimation?: boolean;
  isInline?: boolean;
};

/**
 * Returns the classnames for the root block component based on its props.
 *
 * @param {Object} props - The component props.
 * @param {0 | 1 | 2 | 3 | 4} [props.elevation] - The elevation level of the block, affecting its margin-right and margin-top. Ranges from 0 to 4.
 * @param {0 | 1 | 2 | 3 | 4 | 5} [props.zIndex] - The z-index of the block, useful for stacking. Ranges from 0 to 5.
 * @param {"danger" | "warning" | "success"} [props.type] - Optional type for thematic styling.
 */
export const getBlockClassnames = ({
  elevation = 2,
  zIndex,
}: {
  elevation?: BlockProps["elevation"];
  zIndex?: BlockProps["zIndex"];
}) => {
  return cn(
    "block relative grow overflow-hidden before:w-[1px] before:z-10 before:h-full before:bg-block-border before:absolute before:bottom-0 before:left-0 after:w-full after:h-[1px] after:bg-block-border after:absolute after:bottom-0 after:left-0 -mb-[1px]",
    "after:bg-main-700 before:bg-main-700",
    {
      ["-mr-[1px] after:hidden before:hidden"]: elevation === 0,
      ["-mt-[4px] -mr-[5px] before:top-[4px] after:-left-[4px]"]: elevation === 1,
      ["-mt-[8px] -mr-[9px] before:top-[8px] after:-left-[8px]"]: elevation === 2,
      ["-mt-[12px] -mr-[13px] before:top-[12px] after:-left-[12px]"]: elevation === 3,
      ["-mt-[16px] -mr-[17px] before:top-[16px] after:-left-[16px]"]: elevation === 4,
      ["md:z-0"]: zIndex === 0,
      ["md:z-10"]: zIndex === 1,
      ["md:z-20"]: zIndex === 2,
      ["md:z-30"]: zIndex === 3,
      ["md:z-40"]: zIndex === 4,
      ["md:z-50"]: zIndex === 5,
    },
  );
};

/**
 * Renders the base block component internals with the main styling.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the block.
 * @param {string} [props.className] - Optional additional CSS classes for custom styling.
 * @param {0 | 1 | 2 | 3 | 4} [props.elevation] - The elevation level of the block, affecting its margin-right and margin-top. Ranges from 0 to 4.
 * @param {boolean} [props.isHovered] - Indicates if the block is currently hovered. True if hovered, false otherwise.
 * @param {boolean} [props.isClicked] - Indicates if the block is currently clicked. True if clicked, false otherwise.
 * @param {"danger" | "warning" | "success"} [props.type] - Optional type for thematic styling.
 * @param {boolean} [props.hoverAnimation] - Enables hover animation. True to enable, false to disable.
 * @param {boolean} [props.activeAnimation] - Enables animation when the block is active (e.g., clicked). True to enable, false to disable.
 */
export const BlockBase = ({
  children,
  className,
  elevation = 2,
  isHovered,
  isClicked,
  hoverAnimation,
  activeAnimation,
}: BlockProps) => {
  return (
    <span
      className={cn(
        "will-change[transform] ease-cubic-bezier[.3,.7,.4,1] grid grow transition-transform",
        {
          ["grid-cols-[4px_1fr] grid-rows-[1fr_4px]"]: elevation === 1,
          ["grid-cols-[8px_1fr] grid-rows-[1fr_8px]"]: elevation === 2,
          ["grid-cols-[12px_1fr] grid-rows-[1fr_12px]"]: elevation === 3,
          ["grid-cols-[16px_1fr] grid-rows-[1fr_16px]"]: elevation === 4,
          // hover effects
          // css
          ["duration-150 hover:-translate-x-[2px] hover:translate-y-[2px]"]:
            hoverAnimation && elevation === 1,
          ["duration-200 hover:-translate-x-[4px] hover:translate-y-[4px]"]:
            hoverAnimation && elevation === 2,
          ["duration-250 hover:-translate-x-[6px] hover:translate-y-[6px]"]:
            hoverAnimation && elevation === 3,
          ["duration-300 hover:-translate-x-[8px] hover:translate-y-[8px]"]:
            hoverAnimation && elevation === 4,
          // js
          ["-translate-x-[2px] translate-y-[2px] duration-150"]: isHovered && elevation === 1,
          ["-translate-x-[4px] translate-y-[4px] duration-200"]: isHovered && elevation === 2,
          ["-translate-x-[6px] translate-y-[6px] duration-250"]: isHovered && elevation === 3,
          ["-translate-x-[8px] translate-y-[8px] duration-300"]: isHovered && elevation === 4,
          // active effects
          // css
          ["duration-150 active:-translate-x-[4px] active:translate-y-[4px]"]:
            activeAnimation && elevation === 1,
          ["duration-200 active:-translate-x-[8px] active:translate-y-[8px]"]:
            activeAnimation && elevation === 2,
          ["duration-250 active:-translate-x-[12px] active:translate-y-[12px]"]:
            activeAnimation && elevation === 3,
          ["duration-300 active:-translate-x-[16px] active:translate-y-[16px]"]:
            activeAnimation && elevation === 4,
          // js
          ["-translate-x-[4px] translate-y-[4px] duration-150"]: isClicked && elevation === 1,
          ["-translate-x-[8px] translate-y-[8px] duration-200"]: isClicked && elevation === 2,
          ["-translate-x-[12px] translate-y-[12px] duration-250"]: isClicked && elevation === 3,
          ["-translate-x-[16px] translate-y-[16px] duration-300"]: isClicked && elevation === 4,
        },
      )}
    >
      <span
        className={cn(
          "border-block-border bg-block-left skew-y-[-45deg] border-t",
          "border-main-950 bg-main-100 dark:border-main-500 dark:bg-main-950",
          {
            ["hidden"]: elevation === 0,
            ["translate-y-[2px]"]: elevation === 1,
            ["translate-y-[4px]"]: elevation === 2,
            ["translate-y-[6px]"]: elevation === 3,
            ["translate-y-[8px]"]: elevation === 4,
          },
        )}
      />
      <span
        className={cn(
          "border-block-border dark:bg-main-950 border bg-white px-4 py-2",
          "border-main-950 dark:border-main-500",
          { ["border-b-0"]: elevation === 0 },
          className,
        )}
      >
        {children}
      </span>
      <span className="relative">
        <span
          className={cn(
            "bg-block-border absolute bottom-0 left-0 z-10 w-[1px] origin-bottom-left -translate-y-[1px] skew-x-[-45deg]",
            "bg-main-950 dark:bg-main-500",
            {
              ["hidden"]: elevation === 0,
              ["h-[4px]"]: elevation === 1,
              ["h-[8px]"]: elevation === 2,
              ["h-[12px]"]: elevation === 3,
              ["h-[16px]"]: elevation === 4,
            },
          )}
        />
      </span>
      <span
        className={cn(
          "border-block-border bg-block-bottom skew-x-[-45deg] border-r",
          "border-main-950 bg-main-300 dark:border-main-500 dark:bg-main-950",
          {
            ["hidden"]: elevation === 0,
            ["h-[4px] -translate-x-[2px]"]: elevation === 1,
            ["h-[8px] -translate-x-[4px]"]: elevation === 2,
            ["h-[12px] -translate-x-[6px]"]: elevation === 3,
            ["h-[16px] -translate-x-[8px]"]: elevation === 4,
          },
        )}
      />
    </span>
  );
};

/**
 * Renders a block component with customizable elevation, zIndex, hover, and active animations.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the block.
 * @param {0 | 1 | 2 | 3 | 4} [props.elevation=2] - The elevation level of the block, affecting its margin-right and margin-top. Ranges from 0 to 4.
 * @param {0 | 1 | 2 | 3 | 4 | 5} [props.zIndex] - The z-index of the block, useful for stacking. Ranges from 0 to 5.
 * @param {string} [props.className] - Optional additional CSS classes for custom styling.
 * @param {"danger" | "warning" | "success"} [props.type] - Optional type for thematic styling.
 * @param {boolean} [props.hoverAnimation] - (CSS) Enables hover animation. True to enable, false to disable.
 * @param {boolean} [props.activeAnimation] - (CSS) Enables animation when the block is active (e.g., clicked). True to enable, false to disable.
 * @param {boolean} [props.isHovered] - (JS) Indicates if the block is currently hovered. True if hovered, false otherwise.
 * @param {boolean} [props.isClicked] - (JS) Indicates if the block is currently clicked. True if clicked, false otherwise.
 */
export const Block = ({
  children,
  elevation,
  className,
  outerClassName,
  hoverAnimation,
  activeAnimation,
  isHovered,
  isClicked,
  zIndex,
}: BlockProps) => {
  return (
    <div className={cn(getBlockClassnames({ elevation, zIndex }), outerClassName)}>
      <BlockBase
        className={className}
        elevation={elevation}
        isHovered={isHovered}
        isClicked={isClicked}
        hoverAnimation={hoverAnimation}
        activeAnimation={activeAnimation}
      >
        {children}
      </BlockBase>
    </div>
  );
};

/**
 * Renders a row of blocks with a decreasing z-index for each child.
 * It accepts a maximum of 5 children.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children to be rendered, max 5.
 * @param {string} [props.className] - Optional additional CSS classes.
 */
export const BlocksRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  if (Children.count(children) > 5) throw new Error("Max 5 children allowed");

  const zOrderedChildren = Children.map(children, (child, index) => {
    // @ts-expect-error TODO Fix me
    return cloneElement(child as React.ReactElement, { zIndex: 5 - index });
  });

  return (
    <div className={cn("relative z-0 flex flex-col justify-end md:flex-row", className)}>
      {zOrderedChildren}
    </div>
  );
};

/**
 * Renders a column of blocks, stacking children vertically.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children to be rendered within the column.
 * @param {string} [props.className] - Optional additional CSS classes to customize the appearance.
 */
export const BlocksColumn = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("relative z-0 flex flex-col", className)}>{children}</div>;
};
