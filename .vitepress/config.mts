import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'CHOKAPP',
  description: 'App Discovery & Sharing Platform Documentation',
  lang: 'en',

  head: [['link', { rel: 'icon', href: '/logo.svg' }]],

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Architecture', link: '/architecture/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/guide/' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Project Structure', link: '/guide/project-structure' },
          ],
        },
        {
          text: 'Client',
          items: [
            { text: 'Flutter Client Guide', link: '/guide/client/' },
            { text: 'Responsive UI', link: '/guide/client/responsive' },
            { text: 'State Management', link: '/guide/client/state-management' },
            { text: 'Routes', link: '/guide/client/routes' },
          ],
        },
        {
          text: 'Server',
          items: [
            { text: 'Go Server Guide', link: '/guide/server/' },
            { text: 'API Reference', link: '/guide/server/api' },
            { text: 'Database', link: '/guide/server/database' },
          ],
        },
        {
          text: 'Admin',
          items: [
            { text: 'Admin Overview', link: '/guide/admin/' },
            { text: 'Authentication', link: '/guide/admin/auth' },
            { text: 'Submission Workflow', link: '/guide/admin/submission' },
          ],
        },
        {
          text: 'Data Management',
          items: [
            { text: 'App Data Format', link: '/guide/data/' },
            { text: 'CI Scripts', link: '/guide/data/ci' },
            { text: 'Submission Flow', link: '/guide/data/submission' },
          ],
        },
      ],
      '/architecture/': [
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/architecture/' },
            { text: 'Data Flow', link: '/architecture/data-flow' },
            { text: 'Component Design', link: '/architecture/components' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/maicarons/chokapp' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 CHOKAPP',
    },

    editLink: {
      pattern: 'https://github.com/maicarons/chokapp/edit/main/doc/:path',
      text: 'Edit this page on GitHub',
    },
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh-CN/' },
          { text: '指南', link: '/zh-CN/guide/' },
          { text: '架构', link: '/zh-CN/architecture/' },
        ],
        sidebar: {
          '/zh-CN/guide/': [
            {
              text: '快速开始',
              items: [
                { text: '概述', link: '/zh-CN/guide/' },
                { text: '快速开始', link: '/zh-CN/guide/quick-start' },
              ],
            },
          ],
        },
      },
    },
  },
})
