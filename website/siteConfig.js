const siteConfig = {
  title: "Next Dapp Alpha",
  tagline: "Next.js + Recoil + Firebase + Web3",
  url: "https://warashibe.github.io/next-dapp/",
  baseUrl: "/next-dapp/",

  projectName: "next-dapp",
  organizationName: "warashibe",

  headerLinks: [
    { doc: "quick-start", label: "Tutorial" },
    { doc: "bind", label: "API" },
    { href: "https://github.com/warashibe/next-dapp", label: "Github" }
  ],

  headerIcon: "img/favicon.ico",
  footerIcon: "img/favicon.ico",
  favicon: "img/favicon.ico",

  colors: {
    primaryColor: "#03414D",
    secondaryColor: "#00AC95"
  },

  copyright: `Copyright © ${new Date().getFullYear()} Warashibe, Inc.`,

  highlight: {
    theme: "default"
  },

  scripts: ["https://buttons.github.io/buttons.js"],

  onPageNav: "separate",

  cleanUrl: true,

  ogImage: "img/undraw_online.svg",
  twitterImage: "img/undraw_tweetstorm.svg",

  repoUrl: "https://github.com/warashibe/next-dapp"
}

module.exports = siteConfig
