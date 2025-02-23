
const { generateContent } = require('../Services/ai.service');
const reviewCode = async (req, res) => {
    const code = req.body.code;
    if (!code) {
        return res.status(400).send("prompt is required!!");
    }
    const response = await generateContent(code);
    res.send(response)
}
module.exports = { reviewCode };