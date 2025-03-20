import { useState } from "react";

export const useCopyToClipboard = ({ closeDelay = 500 }: { closeDelay?: number } = {}) => {
  const [status, setStatus] = useState<"copied" | "failed" | "none">("none");

  const copyToClipboard = async (text: string) => {
    try {
      setStatus("none");
      await navigator.clipboard.writeText(text);
      setStatus("copied");

      if (closeDelay) {
        await new Promise((resolve) => setTimeout(resolve, closeDelay));
        setStatus("none");
      }
    } catch (error) {
      setStatus("failed");
    }
  };

  return { status, copyToClipboard };
};
