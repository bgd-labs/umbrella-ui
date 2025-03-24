import { useMediaQuery } from "react-responsive";

export const useDesktopMediaQuery = () =>
  useMediaQuery({ query: "(min-width: 1280px)" });

export const useMobileAndTabletMediaQuery = () =>
  useMediaQuery({ query: "(max-width: 1279px)" });

export const useTabletAndDesktopMediaQuery = () =>
  useMediaQuery({ query: "(min-width: 769px)" });

export const useMobileMediaQuery = () =>
  useMediaQuery({ query: "(max-width: 768px)" });
