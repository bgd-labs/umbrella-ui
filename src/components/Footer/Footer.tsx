import BGDLogoDarkIcon from "../../../public/images/BGD-logo-dark.svg";
import BGDLogoIcon from "../../../public/images/BGD-logo.svg";
import GithubIcon from "../../../public/images/github.svg";
import TwitterIcon from "../../../public/images/twitter.svg";
import WebIcon from "../../../public/images/web.svg";

import { BugIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Footer = () => {
  return (
    <footer className="mt-5 flex flex-col items-center justify-center gap-10 pt-10 pb-10 md:mt-3">
      <div className="dark:border-main-400 flex items-center gap-3 rounded-xl border-2 px-3 py-1">
        <BGDLogoIcon className="h-[33px] w-[34px] dark:hidden" />
        <BGDLogoDarkIcon className="hidden h-[33px] w-[34px] dark:block dark:text-white" />

        <div className="flex flex-col">
          <div className="text-sm font-semibold">by BGD Labs</div>
          <div className="flex items-center gap-2">
            <a href="https://twitter.com/bgdlabs">
              <TwitterIcon className="hover:text-main-500 size-3.5 dark:text-white" />
            </a>
            <a href="https://github.com/bgd-labs">
              <GithubIcon className="hover:text-main-500 size-3.5 dark:text-white" />
            </a>
            <a href="https://bgdlabs.com">
              <WebIcon className="hover:text-main-500 size-3.5 dark:text-white" />
            </a>
          </div>
        </div>
      </div>
      <div className="-translate-x-0.5">
        <Button
          elevation={1}
          className="gap-2 px-2 py-1 text-xs font-semibold"
          href="https://discord.com/channels/602826299974877205/1377252053721677934"
          target="_blank"
        >
          <BugIcon className="size-4" />
          Report a bug
        </Button>
      </div>
    </footer>
  );
};
