const timeBan = require('./timeBan');
const banStore = require('../store/ban');

module.exports = {
  name: '!ban',

  description: 'Perform ban',

  execute(msg, args) {
    console.info(`Parameters : ${args}`);
    
    if (!banStore.state.isStarted) {
      console.info('Ban phase not started (!startban)');
      msg.channel.send('Ban phase not started (!startban)');
      return;
    }
    
    if (args.length < 1) {
      console.info('Missing ban parameter');
      msg.channel.send('Missing ban parameter');
      return;
    }

    timeBan.stopTimer();
    
    const banned = args.join(' ');
    const user = msg.member.nickname || msg.member.user.username;
    
    banStore.state.banList.push({
      banned,
      by: user,
    });
    
    msg.channel.send(`${user} banned [${banned}]`);
    console.info(`${user} banned [${banned}]`);
    
    timeBan.resetAndStartTimer(msg);
  },
};
