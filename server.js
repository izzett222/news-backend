const express = require('express');
const dotenv = require('dotenv')
const axios = require('axios')
const cors = require('cors')
const app = express();
dotenv.config()
const key = process.env.KEY
app.use(cors())
app.get('/trending', async (req, res) => {
    try {
        const data = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${key}`)
        res.status(200).json({ articles: data.data.articles });
    } catch (error) {
        res.status(500).json({ error: "server error" })
    }

});
app.get('/sources', async (req, res) => {
    try {
        const data = await axios.get(`https://newsapi.org/v2/top-headlines/sources?country=us&pageSize=15&apiKey=${key}`)
        res.status(200).json({ sources: data.data.sources });
    } catch (error) {
        res.status(500).json({ error: "server error" })
    }

});
app.get('/articles', async (req, res) => {
    try {
        const source = req.query.source;
        if (source) {
            const data = await axios.get(`https://newsapi.org/v2/everything?sources=${source}&pageSize=20&apiKey=${key}`)
            res.status(200).json({ articles: data.data.articles });
        } else {
            res.status(500).json({ error: "source not provided" })
        }

    } catch (error) {
        res.status(500).json({ error: "server error" })
    }

});
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});