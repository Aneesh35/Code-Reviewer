const express = require('express');
const { reviewCode } = require('../Controller/ai.controller')
const aiRouter = express.Router();
aiRouter.post("/get-review", reviewCode)
module.exports = aiRouter