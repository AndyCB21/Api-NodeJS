const express = require('express');
const app = express();
const personeRouter = require('./routes/persone');
const prodottiRouter = require('./routes/prodotti');
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: 'https://andycb.eu.auth0.com/api/v2/',
    issuerBaseURL: `https://andycb.eu.auth0.com/`,
});

app.use(express.json())

app.use('/api/prodotti', prodottiRouter)
app.use('/api/persone', checkJwt, personeRouter)

app.listen(3000)