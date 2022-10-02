const express = require('express');
const cors = require('cors')
const app = express();
const startedAt = new Date();
const { processRoll } = require('./src/roll');
const port = process.env.PORT || 3001;

let id = 1;
let rolls = [];

app.use(cors());
app.use(express.json());
app.listen(port, () => console.log(`App listening on port ${port}!`));

app.get('/', (_req, res) => {
    console.log('hit - home');
    res.send('dice roller was started: ' + startedAt.toString());
});

app.post('/api/new-roll', (req, res) => {
    console.log('hit - new roll');
    const rContent = req.body;
    const resultRoll = processRoll(rContent.dices, rContent.advantage);
    let result;
    let details;
    
    if (Array.isArray(resultRoll)) {
        result = [resultRoll[0].result, resultRoll[1].result];
        details = [resultRoll[0].details, resultRoll[1].details]
    } else {
        result = resultRoll.result
        details = resultRoll.details
    }

    rolls = [{id: id, user: rContent.user, result: result, details: details, dices: rContent.dices}, ...rolls].slice(0,8);
    id++;
    res.sendStatus(200);
})

app.get('/api/last-rolls', (_req, res) => {
    console.log('hit - last rolls');
    res.send(JSON.stringify(rolls));
})