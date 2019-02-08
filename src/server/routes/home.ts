import express from 'express';
import {ssr} from '../ssr';
import App from '../../app/app';

export const HomeRouter = express.Router();

HomeRouter.get('/', (req, res) => {
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
