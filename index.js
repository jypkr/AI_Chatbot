// 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

const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const configuration = new Configuration({
    organization: "org-8pPvwfYZFpRShBov7Y64FSpQ",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3080;

app.post('/', async (req, res) => {
    const { message } = req.body;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
    res.json({
        data: response.data.choices[0].text
    })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});