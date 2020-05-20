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

    msg.channel.send(`Banlist for ${banStore.state.banPhaseName} :`);
    console.info(`Banlist for ${banStore.state.banPhaseName} :`);
    
    banStore.state.banList.forEach((banItem) => {
      msg.channel.send(`- ${banItem.banned} (by ${banItem.by})`);
      console.info(`- ${banItem.banned} (by ${banItem.by})`);  
    });

    banStore.reset();
  },
};
