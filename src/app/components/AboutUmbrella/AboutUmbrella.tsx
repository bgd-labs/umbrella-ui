import { InfoIcon } from "lucide-react";

export const AboutUmbrella = () => {
  return (
    <a href="/docs" className="flex items-center justify-center gap-1">
      <InfoIcon className="size-3.5" />
      <div className="flex items-center justify-center text-lg font-normal underline underline-offset-3">
        About Umbrella
      </div>
    </a>
  );
};
