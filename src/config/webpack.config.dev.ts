import webpack from 'webpack';
import path from 'path';

const config: webpack.Configuration = {
    mode: 'development',
    entry: {
        app: [
            'webpack-hot-middleware/client?reload=true',
            './src/app',
        ]
    },
    output: {
        path: path.resolve(__dirname, '../assets'),
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
                    'style-loader',
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
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
};

export default config;
