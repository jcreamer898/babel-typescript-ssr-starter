import express from 'express';

export const ApiRouter = express.Router();

ApiRouter.get('/events', (req, res) => {
    res.json([{
        id: 1,
        name: 'foo'
    }]);
});
