import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";
import SunIcon from "../../../public/images/sun.svg";
import MoonIcon from "../../../public/images/moon.svg";

export const ThemeToggleButton = () => {
  const { setTheme } = useTheme();

  return (
    <>
      <Button elevation={1} size="lg" onClick={() => setTheme("dark")} outerClassName="dark:hidden">
        <SunIcon className="size-5" />
      </Button>
      <Button
        elevation={1}
        size="lg"
        onClick={() => setTheme("light")}
        outerClassName="hidden dark:block"
      >
        <MoonIcon className="size-5" />
      </Button>
    </>
  );
};
