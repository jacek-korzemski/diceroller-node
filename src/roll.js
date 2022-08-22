const _ = require('lodash');

const processRoll = (cmd, advantage) => {
    cmd = cmd.replace(/ /gi, '');
    cmd = cmd.toLowerCase();

    if (cmd.indexOf('+') !== -1) {
        let dices = cmd.split('+');
        console.log(dices, advantage ? 'with advantage' : 'without advantage');
        return rollDices(dices, advantage);
    }

    console.log([cmd], advantage ? 'with advantage' : 'without advantage');
    return rollDices([cmd], advantage);
}

const rollDices = (dices, advantage) => {
    let result = 0;
    let partialResults = [];
    dices.forEach((roll) => {
        if (roll.indexOf('d') === -1) {
            result += parseInt(roll);
            partialResults.push(parseInt(roll));
        } else if (/^d([0-9]*?)/.test(roll)) {
            roll = roll.replace(/d/, '');
            roll = parseInt(roll);
            roll = _.random(1, roll);
            result += roll;
            partialResults.push(roll);
        } else {
            let multipleDices = roll.split('d');
            
            let semiresult = 0;

            for (let i = 0; i < multipleDices[0]; i++) {
                let semiRoll = _.random(1, multipleDices[1])
                semiresult+= semiRoll;
                partialResults.push(semiRoll);
            }
            
            result += semiresult;
            
        }
    })

    if (!advantage) {
        return {result: result, details: partialResults};
    }

    let firstRoll = {result: result, details: partialResults};
    let secondRoll = rollDices(dices, false);

    return [firstRoll, secondRoll];
}

module.exports.processRoll = processRoll;