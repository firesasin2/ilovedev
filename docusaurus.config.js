// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'I Love Development',
  tagline: '김은국',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://firesasin2.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/ilovedev/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'firesasin2', // Usually your GitHub org/user name.
  projectName: 'ilovedev', // Usually your repo name.

  deploymentBranch: 'gh-pages',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/kek_photo_2024-01-24_20-12-23.jpg',
      navbar: {
        title: 'I Love Development',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'dropdown',
            to: '/go/go', label: 'Go', position: 'left', 
            items: [
              {to: '/go/go', label: 'Go'},
              {to: '/go/standardlibrary', label: '내장라이브러리'},
              {to: '/go/make', label: '빌드'},
            ],
          },
          {
            type: 'dropdown',
            to: '/wauth/design', label: 'wauth', position: 'left', 
            items: [
              {to: '/wauth/design', label: '설계(구조)'},
              {to: '/wauth/libinfo', label: 'libinfo.go'},
              {to: '/wauth/libutool', label: 'libutool.go'},
              {to: '/wauth/init', label: 'init.go'},
              {to: '/wauth/main', label: 'main.go'},
              {to: '/wauth/manager', label: 'manager'},
              {to: '/wauth/handler', label: 'handler'},
            ],
          },
          {
            type: 'dropdown',
            to: '/mongodb/replicaset', label: 'MongoDB', position: 'left', 
            items: [
              {to: '/mongodb/mongodb', label: 'MongoDB'},
              {to: '/mongodb/replicaset', label: 'ReplicaSet'},
              {to: '/mongodb/sharding', label: 'Sharding'},
            ],
          },
          
          // {to: '/wauth/makefile', label: '미들웨어', position: 'left'},
          // {to: '/wauth/makefile', label: 'historytype.csv', position: 'left'},
          // {to: '/wauth/makefile', label: '핸들러', position: 'left'},
          // {to: '/wauth/makefile', label: '로그인/로그아웃 API', position: 'left'},
          // {to: '/wauth/makefile', label: '/api/valid', position: 'left'},
          // {to: '/wauth/makefile', label: '라이선스', position: 'left'},
        ],
      },
      // footer: {
      //   style: 'dark',
      //   links: [
      //     {
      //       title: 'Docs',
      //       items: [
      //         {
      //           label: 'Tutorial',
      //           to: '/docs/intro',
      //         },
      //       ],
      //     },
      //   ],
      //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      // },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
