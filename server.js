const express = require('express');
const cors = require('cors')
const app = express();
const startedAt = new Date();

const roll = (option) => {
    switch (option) {
        case 'd4':
            return random(1,4);
        case '2d4':
            return random(2,8);
        case '3d4':
            return random(3,12);
        case '4d4':
            return random(4,16);
        case '5d4':
            return random(5,20);
        
        case 'd6':
            return random(1,6);
        case '2d6':
            return random(2,12);
        case '3d6':
            return random(3,18);
        case '4d6':
            return random(4,24);
        case '5d6':
            return random(5,30);

        case 'd8':
            return random(1,8);
        case '2d8':
            return random(2,16);
        case '3d8':
            return random(3,24);
        case '4d8':
            return random(4,32);
        case '5d8':
            return random(5,40);

        case 'd10':
            return random(1,10);
        case '2d10':
            return random(2,20);
        case '3d10':
            return random(3,30);
        case '4d10':
            return random(4,40);
        case '5d10':
            return random(5,50);

        
        case 'd12':
            return random(1,12);
        case '2d12':
            return random(2,24);
        case '3d12':
            return random(3,36);
        case '4d12':
            return random(4,48);
        case '5d12':
            return random(5,60);

                
        case 'd20':
            return random(1,20);
        case '2d20':
            return random(2,40);
        case '3d20':
            return random(3,60);
        case '4d20':
            return random(4,80);
        case '5d20':
            return random(5,100);
    }
}

const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

let id = 1;
let rolls = [];

app.use(cors());
app.use(express.json());
app.listen(8084);

app.get('/', (req, res) => {
    res.send('dice roller was started: ' + startedAt.toString());
});

app.post('/api/new-roll', (req, res) => {
    const rContent = req.body;
    rolls = [{id: id, user: rContent.user, result: roll(rContent.dices), dices: rContent.dices}, ...rolls].slice(0,8);
    id++;
    res.sendStatus(200);
})

app.get('/api/last-rolls', (req, res) => {
    res.send(JSON.stringify(rolls));
})