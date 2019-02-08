import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import reactViews from 'express-react-views';    
import dotenv from 'dotenv';
import { HomeRouter } from './routes/home';
import { ApiRouter } from './routes/api';

dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
    silent: true
});

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.set('views', `${__dirname}/views`);

app.use(express.static(path.resolve(__dirname, '../public')))

if (process.env.NODE_ENV !== 'development') {
    app.set('view engine', 'js');
    app.engine(
        'js',
        reactViews.createEngine({
            transformViews: false,
        }),
    );
} else {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const config = require('../config/webpack.config.dev').default;
    const webpackHotMiddleware = require('webpack-hot-middleware');
    
    const compiler = webpack(config);
    app.use(webpackMiddleware(compiler, {
        publicPath: '/assets',
    }));
    app.use(webpackHotMiddleware(compiler));

    app.set('view engine', 'tsx');
    app.engine(
        'tsx',
        reactViews.createEngine({
            transformViews: false,
            beautify: true,
        }),
    );
}

app.use('/', HomeRouter);
app.use('/api', ApiRouter);

export default app;
