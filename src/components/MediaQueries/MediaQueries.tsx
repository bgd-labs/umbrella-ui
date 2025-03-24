import { PropsWithChildren } from "react";
import {
  useDesktopMediaQuery,
  useMobileMediaQuery,
  useMobileAndTabletMediaQuery,
  useTabletAndDesktopMediaQuery,
} from "@/hooks/useMediaQuery";

export const Desktop = ({ children }: PropsWithChildren) => {
  const isDesktop = useDesktopMediaQuery();

  return isDesktop ? children : null;
};

export const Mobile = ({ children }: PropsWithChildren) => {
  const isMobile = useMobileMediaQuery();

  return isMobile ? children : null;
};

export const MobileAndTablet = ({ children }: PropsWithChildren) => {
  const isMobileAndTablet = useMobileAndTabletMediaQuery();

  return isMobileAndTablet ? children : null;
};

export const TabletAndDesktop = ({ children }: PropsWithChildren) => {
  const isTabletAndDesktop = useTabletAndDesktopMediaQuery();

  return isTabletAndDesktop ? children : null;
};
