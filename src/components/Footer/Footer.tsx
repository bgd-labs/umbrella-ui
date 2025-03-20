import BGDLogoIcon from "../../../public/images/BGD-logo.svg";
import TwitterIcon from "../../../public/images/twitter.svg";
import GithubIcon from "../../../public/images/github.svg";
import WebIcon from "../../../public/images/web.svg";

export const Footer = () => {
  return (
    <footer className="mt-5 flex items-center justify-center pt-5 pb-10 md:mt-10">
      <div className="flex items-center gap-3 rounded-xl border-2 px-3 py-1">
        <BGDLogoIcon className="h-[33px] w-[34px] dark:text-white" />

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
    </footer>
  );
};
