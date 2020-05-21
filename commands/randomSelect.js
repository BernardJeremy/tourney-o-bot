const timeBan = require('./timeBan');
const banStore = require('../store/ban');

module.exports = {
  name: '!randselect',

  description: 'Randomly select an item in given array',

  execute(msg, args) {
    console.info(`Parameters : ${args}`);
    
    if (args.length < 1) {
      console.info('Missing list parameter');
      msg.channel.send('Missing list parameter');
      return;
    }

    const argsString = args.join(' ');

    const listString = argsString.substring(
      argsString.lastIndexOf('[') + 1, 
      argsString.lastIndexOf(']')
    );

    if (!listString || argsString.indexOf('[') === -1 ||  argsString.indexOf(']') === -1) {
      msg.channel.send(`Unable to select an item, wrong array parameter : ${argsString}`);
      console.info(`Unable to select an item, wrong array parameter : ${argsString}`);
      return;
    }

    const possibilities = listString.split(',');

    const selected = possibilities[Math.floor(Math.random() * possibilities.length)];
    const seed = Math.floor(Math.random() * (999999999 - 11111111 + 1)) + 11111111; // Artificial seed

    msg.channel.send(`${selected} (${seed})`);
    console.info(`${selected} (${seed})`);
  },
};
