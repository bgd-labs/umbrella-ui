"use client";
import Link from "next/link";
import { BlockBase, getBlockClassnames, type BlockProps } from "@/components/ui/Block";
import { cn } from "@/utils/cn";
import { LoaderCircle } from "lucide-react";
import React, { ComponentProps } from "react";

export type ButtonProps = BlockProps & {
  href?: string | object;
  target?: ComponentProps<typeof Link>["target"];
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
  size?: "sm" | "md" | "lg";
  primary?: boolean;
  outerClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
};

/**
 * Renders a clickable block component, optionally wrapped in a next/link.
 *
 * This component combines the functionalities of a block component with optional click handling,
 * and when provided, wraps the content in a navigable link. It supports all `BlockProps` along with
 * additional properties to control navigation and interaction behaviors.
 *
 * @param {Object} props - The component props.
 * @param {string | object} [props.href] - The URL or location object to navigate to when the block is clicked. If provided, the block will be wrapped in a `<Link>` component.
 * @param {boolean} [props.replace] - When `true`, clicking the block will replace the current entry in the history stack instead of adding a new one. Only applies if `href` is provided.
 * @param {boolean} [props.scroll] - Controls the scroll behavior on navigation. Only applies if `href` is provided.
 * @param {boolean} [props.prefetch] - If `true`, prefetches the page for faster navigation. Only applies if `href` is provided.
 * @param {"sm" | "md" | "lg"} [props.size] - Sets size of button. Default is `md`
 * @param {() => void} [props.onClick] - An optional click event handler that is called when the block is clicked.
 * @param {boolean} [props.isClicked] - Optionally controls the active (clicked) state of the block for styling or behavior customization.
 * @param {boolean} [props.isHovered] - Optionally controls the hover state of the block for styling or behavior customization.
 * @param {boolean} [props.hoverAnimation=true] - Determines if the hover animation is enabled. Defaults to `true`.
 * @param {boolean} [props.activeAnimation=true] - Determines if the active (click) animation is enabled. Defaults to `true`.
 * @param {...BlockProps} props - Additional props inherited from `BlockProps` for styling and layout of the block component.
 *
 * @returns {React.ReactElement} The rendered clickable block component, optionally wrapped in a `<Link>` if `href` is provided.
 */
export const Button = ({
  href,
  target,
  replace,
  scroll,
  prefetch,
  size = "md",
  onClick,
  elevation: elevationProp,
  zIndex,
  primary = false,
  isClicked,
  isHovered,
  hoverAnimation = true,
  activeAnimation = true,
  className,
  outerClassName,
  disabled = false,
  loading = false,
  children,
  ...props
}: ButtonProps) => {
  const finalHoverAnimation = isHovered !== undefined ? isHovered : hoverAnimation;
  const finalActiveAnimation = isClicked !== undefined ? isClicked : activeAnimation;

  const elevation = disabled ? 0 : elevationProp;

  const blockBase = (
    <BlockBase
      elevation={elevation}
      hoverAnimation={disabled ? false : finalHoverAnimation}
      activeAnimation={disabled ? false : finalActiveAnimation}
      isClicked={isClicked}
      isHovered={isHovered && !disabled}
      className={cn(
        "flex cursor-pointer items-center justify-center leading-5",
        {
          ["min-w-[110px] px-2 py-1.5"]: size === "md",
          ["px-2 py-2"]: size === "lg",
          ["bg-main-950 dark:bg-main-900 text-white dark:text-white"]: primary && !disabled,
          ["text-main-950 dark:bg-main-950 bg-white dark:text-white"]: !primary && !disabled,
          ["bg-main-300 cursor-not-allowed border-b border-transparent text-white"]: disabled,
        },
        className,
      )}
      {...props}
    >
      {loading ? <LoaderCircle className="size-5 animate-spin text-stone-400" /> : children}
    </BlockBase>
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        target={target}
        replace={replace}
        scroll={scroll}
        prefetch={prefetch}
        className={cn(getBlockClassnames({ elevation, zIndex }), "inline-flex", outerClassName)}
        onClick={onClick}
      >
        {blockBase}
      </Link>
    );
  }

  return (
    <button
      className={cn(getBlockClassnames({ elevation, zIndex }), "inline-flex", outerClassName)}
      onClick={onClick}
      disabled={disabled}
    >
      {blockBase}
    </button>
  );
};
