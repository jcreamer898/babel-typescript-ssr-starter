import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import reactViews from 'express-react-views';    
import App from '../app/app';
import { ssr } from './ssr';
import dotenv from 'dotenv';

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

app.get('/', (req, res) => {
    const initialState = {
        // ...
    };

    const markup = ssr(App, initialState);

    res.render('home', {
        markup,
        initialState,
        env: process.env.NODE_ENV,
    });
});

export default app;
