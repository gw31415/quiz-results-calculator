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
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sass`,
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		`gatsby-plugin-offline`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `QuizResults Calculator`,
				short_name: `QCalc`,
				start_url: `/`,
				display: `standalone`,
				icon: `src/images/icon.png`,
			},
		},
	],
}
