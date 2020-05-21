const timeBan = require('./timeBan');
const banStore = require('../store/ban');

module.exports = {
  name: '!endban',

  description: 'End ban phase',

  execute(msg, args) {
    console.info(`Parameters : ${args}`);
    
    if (!banStore.state.isStarted) {
      console.info('Ban phase not started (!startban)');
      msg.channel.send('Ban phase not started (!startban)');
      return;
    }

    timeBan.stopTimer();
    
    msg.channel.send(`Ban list for ${banStore.state.banPhaseName} :`);
    console.info(`Ban list for ${banStore.state.banPhaseName} :`);
    
    banStore.state.banList.forEach((banItem) => {
      msg.channel.send(`- ${banItem.banned} (by ${banItem.by})`);
      console.info(`- ${banItem.banned} (by ${banItem.by})`);  
    });

    banStore.reset();
  },
};
