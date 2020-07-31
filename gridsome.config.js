module.exports = {
  siteName: 'Alex Geenen',
  siteDescription: "Tutorials and Reading Notes",
  siteUrl: 'https://shiftreducer.com',
  titleTemplate: `Shift Reducer - %s`,

  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        ['gridsome-plugin-remark-shiki', {
          theme: 'min-light'
        }],
        "remark-math",
        "remark-html-katex"
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true,
          },
          author: {
            typeName: 'Author',
            create: true,
          },
        }
      },
    },
    // {
    //   use: '@gridsome/plugin-google-analytics',
    //   options: {
    //     id: 'UA-135446199-1',
    //   },
    // },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      },
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Shift Reducer - Alex Geenen',
          feed_url: 'https://shiftreducer.com/feed.xml',
          site_url: 'https://shiftreducer.com',
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: 'https://shiftreducer.com' + node.path,
          author: node.author,
          date: node.date,
        }),
        output: {
          dir: './static',
          name: 'feed.xml',
        },
      },
    },
  ],

  templates: {
    Post: '/:title',
    Tag: '/tag/:id',
    Author: '/author/:id',
  },

  chainWebpack: config => {
    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.unshift(...[
          require('postcss-import'),
          require('postcss-nested'),
          require('tailwindcss'),
        ])

        return options
      })
  },
}
