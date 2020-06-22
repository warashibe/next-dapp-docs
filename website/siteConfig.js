const siteConfig = {
  title: "Next Dapp",
  tagline: "A Dapp Development Kit",
  url: "https://warashibe.github.io/next-dapp/",
  baseUrl: "/next-dapp/",

  projectName: "next-dapp",
  organizationName: "warashibe",

  headerLinks: [
    { doc: "quick-start", label: "Tutorial" },
    { doc: "bind", label: "API" }
  ],

  headerIcon: "img/favicon.ico",
  footerIcon: "img/favicon.ico",
  favicon: "img/favicon.ico",

  colors: {
    primaryColor: "#03414D",
    secondaryColor: "#A0F6D2"
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
