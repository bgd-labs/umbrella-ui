import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "Umbrella Docs",
  tagline: "Documentation for Umbrella",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://stake.onaave.com/",
  baseUrl: "/docs/",
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
        },
        blog: false,
        pages: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Umbrella",
      logo: {
        alt: "Umbrella Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "User Guide",
        },
        {
          href: "https://github.com/aave-dao/aave-umbrella-ui",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "User Guide",
              to: "/",
            },
          ],
        },
        {
          title: "Links",
          items: [
            {
              label: "Umbrella UI GitHub",
              href: "https://github.com/aave-dao/aave-umbrella-ui",
            },
            {
              label: "Umbrella Contracts GitHub",
              href: "https://github.com/aave-dao/aave-umbrella",
            },
            {
              label: "Stake On Aave",
              href: "/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} by BGD Labs.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
