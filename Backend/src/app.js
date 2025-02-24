const express = require('express');
const cors=require('cors')
const aiRoute = require('./routes/ai.routes');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("hello world");
})
app.use('/aiService', aiRoute);
module.exports = app