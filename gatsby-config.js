module.exports = {
  pathPrefix: "/quiz-results-calculator",
  siteMetadata: {
    title: `小テスト結果計算`,
    description: `小テストの結果を統計的に調べます`,
    author: `Yuki Okugawa`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
