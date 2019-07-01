const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { getDirectoriesBasenames } = require('./build/utils.js')

const isDev = process.env.NODE_ENV.trim() === 'development'
const pages = getDirectoriesBasenames(path.resolve('./src/pages'))

const instances = pages.map(page => {
  return new HtmlWebpackPlugin({
    template: `./pages/${page}/${page}.pug`,
    filename: `${page}.html`,
    chunks: ['common', page]
  })
})

const entries = pages.reduce((acc, page) => {
  acc[page] = `./pages/${page}/${page}.js`

  return acc
}, {})

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: entries,
  devtool: 'inline-source-map',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.scss', '.pug'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: {
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
  },
  devServer: {
    hot: false,
    open: true
  },
  mode: !isDev ? 'production' : 'development',
  watch: isDev,
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')()]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
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
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: isDev,
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              pngquant: {
                quality: '65-90',
                strip: true
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
    new MiniCssExtractPlugin('css/[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    !isDev &&
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'src/public'),
          to: path.resolve(__dirname, 'dist')
        }
      ])
  ].filter(Boolean)
}

module.exports = config
