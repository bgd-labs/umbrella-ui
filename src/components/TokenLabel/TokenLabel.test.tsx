import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TokenLabel, mapTokenTypeToLabel } from "./TokenLabel";
import { TokenType } from "@/types/token";

describe("mapTokenTypeToLabel", () => {
  it("should return correct label for rebasing token", () => {
    expect(mapTokenTypeToLabel("a")).toBe("rebasing");
  });

  it("should return correct label for non-rebasing token", () => {
    expect(mapTokenTypeToLabel("stata")).toBe("non-rebasing");
  });

  it("should return correct label for staked token", () => {
    expect(mapTokenTypeToLabel("stk")).toBe("staked");
  });

  it("should return undefined for undefined input", () => {
    expect(mapTokenTypeToLabel(undefined)).toBe(undefined);
  });

  it("should return undefined for underlying token type", () => {
    expect(mapTokenTypeToLabel("underlying" as TokenType)).toBe(undefined);
  });
});

describe("TokenLabel", () => {
  it("should render null when type is not provided", () => {
    const { container } = render(<TokenLabel />);
    expect(container.firstChild).toBeNull();
  });

  it("should render null when type is underlying", () => {
    const { container } = render(<TokenLabel type="underlying" />);
    expect(container.firstChild).toBeNull();
  });

  it("should render null when type is native", () => {
    const { container } = render(<TokenLabel type="native" />);
    expect(container.firstChild).toBeNull();
  });

  it("should render Rebasing label for a token type", () => {
    render(<TokenLabel type="a" />);
    expect(screen.getByText("Rebasing")).toBeInTheDocument();
    expect(screen.getByText("Rebasing")).toHaveClass("text-main-500", "text-sm", "leading-4");
  });

  it("should render Non-rebasing label for stata token type", () => {
    render(<TokenLabel type="stata" />);
    expect(screen.getByText("Non-rebasing")).toBeInTheDocument();
    expect(screen.getByText("Non-rebasing")).toHaveClass("text-main-500", "text-sm", "leading-4");
  });

  it("should render Staked label for stk token type", () => {
    render(<TokenLabel type="stk" />);
    expect(screen.getByText("Staked")).toBeInTheDocument();
    expect(screen.getByText("Staked")).toHaveClass("text-main-500", "text-sm", "leading-4");
  });
});
