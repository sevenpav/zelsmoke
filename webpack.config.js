const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { getDirBasenames } = require('./utils.js');

const isDev = process.env.NODE_ENV === 'development';

const pages = getDirBasenames(path.resolve('./src/pages'))

const instances = pages.map(page => {
	return new HtmlWebpackPlugin({
		template:`./pages/${page}/${page}.pug`,
		filename: `${page}.html`,
		hash: true,
		chunks: ['main', page]
	})
});

const entries = pages.reduce((acc, page) => {
	acc[page] = `./pages/${page}/${page}.js`;

	return acc;
}, { main: './main.js' });

const optimization = {
	minimizer: [
		new UglifyJsPlugin({
			uglifyOptions: {
				output: {
					comments: false
				}
			}
		}),
		new OptimizeCSSAssetsPlugin({})
	]
};

const config = {
	context: path.resolve(__dirname, 'src'),
	entry: entries,
	devtool: 'inline-source-map',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase: './dist',
		watchContentBase: true,
		clientLogLevel: 'none',
		compress: true
	},
	optimization: isDev ? {} : optimization,
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer')()
							]
						}
					},
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [
								path.resolve(__dirname, './src/assets/scss/vars.scss'),
								path.resolve(__dirname, './src/assets/scss/mixins.scss')
							]
						}
					}
				]
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: './',
						},
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {

							disable: isDev,
							pngquant: {
								quality: '95-100'
							},
							svgo: {
								cleanupIDs: true
							}
						}
					}
				]
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: [':src', ':href']
					}
				}
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
					pretty: isDev
				}
			}
		]
	},
	plugins: [
		...instances,
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new CleanWebpackPlugin(['dist']),
		!isDev && new CopyWebpackPlugin([{
			from: './assets/php/order.php',
			to: './'
		}]),
		!isDev && new CopyWebpackPlugin([{
			from: './assets/img/logo.png',
			to: './'
		}]),
		!isDev && new CopyWebpackPlugin([{
			from: './assets/seo/**',
			to: './[name].[ext]'
		}])
	].filter(Boolean)
};

module.exports = config;