const _ = require('lodash');

const processRoll = (cmd, advantage) => {
    cmd = cmd.replace(/ /, '');
    cmd = cmd.toLowerCase();

    if (cmd.indexOf('+') !== -1) {
        let dices = cmd.split('+');
        return rollDices(dices, advantage);
    }

    return rollDices([cmd], advantage);
}

const rollDices = (dices, advantage) => {
    console.log(dices, advantage);
    let result = 0;
    let partialResults = [];
    dices.forEach((roll) => {
        if (roll.indexOf('d') === -1) {
            result += parseInt(roll);
            partialResults.push(parseInt(roll));
            console.log(partialResults);
        } else if (roll.startsWith('d')) {
            roll = roll.replace(/d/, '');
            roll = parseInt(roll);
            roll = _.random(1, roll);
            result += roll;
            partialResults.push(roll);
            console.log(partialResults);
        } else {
            let multipleDices = roll.split('d');
            
            let semiresult = 0;

            for (let i = 0; i < multipleDices[0]; i++) {
                let semiRoll = _.random(1, multipleDices[1])
                semiresult+= semiRoll;
                partialResults.push(semiRoll);
            }
            
            result += semiresult;
            
            console.log(partialResults);
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