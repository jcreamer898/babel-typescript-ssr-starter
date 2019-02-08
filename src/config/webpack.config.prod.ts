import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: webpack.Configuration = {
    mode: 'production',
    entry: {
        app: [
            './src/app',
        ]
    },
    output: {
        path: path.resolve(__dirname, '../public/assets'),
        filename: '[name].web.js',
        publicPath: '/assets'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css?$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, },
                    { loader: 'css-loader', options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    'postcss-loader'
                ]
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
            }),
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
    ]
};

export default config;
