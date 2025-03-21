import { PropsWithChildren } from "react";
import {
  useDesktopMediaQuery,
  useTabletAndBelowMediaQuery,
} from "@/hooks/useMediaQuery";

export const Desktop = ({ children }: PropsWithChildren) => {
  const isDesktop = useDesktopMediaQuery();

  return isDesktop ? children : null;
};

export const TabletAndBelow = ({ children }: PropsWithChildren) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery();

  return isTabletAndBelow ? children : null;
};
