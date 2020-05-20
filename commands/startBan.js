const banStore = require('../store/ban');

module.exports = {
  name: '!startban',

  description: 'Start ban phase',

  execute(msg, args) {
    console.info(`Parameters : ${args}`);
    
    if (args.length < 1) {
      console.info('Missing ban phase name parameter');
      msg.channel.send('Missing ban phase name parameter');
      return;
    }

    const banPhaseName = args.join(' ');
    
    banStore.reset();
    banStore.state.isStarted = true;
    banStore.state.banPhaseName = banPhaseName;
    
    console.info(`Ban phase starting now for ${banStore.state.banPhaseName}`);
    msg.channel.send(`Ban phase starting now for ${banStore.state.banPhaseName}`);
  },
};
