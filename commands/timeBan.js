const banStore = require('../store/ban');
const tools = require('../utils/tools');

const stopTimer = () => {
  if (banStore.state.timeFd) {
    clearTimeout(banStore.state.timeFd);
    banStore.state.timeFd = null;
  }
};

const resetAndStartTimer = (msg) => {
  if (banStore.state.timer) {
    banStore.state.lastTimerResetTime = Date.now();
    banStore.state.timeFd = setTimeout(() => {
      console.info(`Time elapsed (${banStore.state.timer}s)`);
      msg.channel.send(`Time elapsed (${banStore.state.timer}s)`);
      stopTimer();
    }, banStore.state.timer * 1000);
  }
};

module.exports = {
  name: '!timeban',

  description: 'Get/Set ban phase time for each player',

  resetAndStartTimer,

  stopTimer,

  execute(msg, args) {
    console.info(`Parameters : ${args}`);
    
    if (args.length < 1) {
      if (banStore.state.timer) {
        console.info(`Ban phase limited to ${banStore.state.timer}s`);
        msg.channel.send(`Ban phase limited to ${banStore.state.timer}s`);
        if (banStore.state.isStarted) {
          msg.channel.send(`Current ban remaining time : ${tools.getRemainingTime(banStore.state.lastTimerResetTime, banStore.state.timer)}s`);
          console.info(`Current ban remaining time : ${tools.getRemainingTime(banStore.state.lastTimerResetTime, banStore.state.timer)}s`);
        }
      } else {
        console.info('No time limit set');
        msg.channel.send('No time limit set');
      }
      return;
    }

    const timer = parseInt(args[0], 10);

    if (timer === 0) {
      banStore.state.timer = 0;
      stopTimer();

      console.info('Time limit disable');
      msg.channel.send('Time limit disable');
      return;
    }

    if (!timer) {
      console.info(`Unable to set timer, wrong value : ${args[0]}`);
      msg.channel.send(`Unable to set timer, wrong value : ${args[0]}`);
      return;
    }
    
    banStore.state.timer = timer;
    if (banStore.state.isStarted) {
      resetAndStartTimer(msg);
    }

    console.info(`Ban phase now limited to ${banStore.state.timer}s`);
    msg.channel.send(`Ban phase now limited to ${banStore.state.timer}s`);
  },
};
