const timerStore = require('../store/timer');

module.exports = {
  name: '!timer',

  description: 'Handle (start/stop) a timer, in seconds',

  execute(msg, args) {
    console.info(`Parameters : ${args}`);

    if (args.length < 1) {
      if (!timerStore.state.isStarted) {
        console.info('No ongoing timer');
        msg.channel.send('No ongoing timer');
        return;
      }

      msg.channel.send(`A timer of ${timerStore.state.timeoutValue}s is ongoing`);
      console.info(`A timer of ${timerStore.state.timeoutValue}s is ongoing`);
      return;
    }

    const timerValue = parseInt(args[0], 10);

    if (timerValue === 0) {
      timerStore.reset();

      console.info('Timer disabled');
      msg.channel.send('Timer disabled');
      return;
    }

    if (!timerValue) {
      console.info(`Unable to set timer, wrong value : ${args[0]}`);
      msg.channel.send(`Unable to set timer, wrong value : ${args[0]}`);
      return;
    }

    timerStore.reset();
    timerStore.state.timeoutValue = timerValue;
    timerStore.state.isStarted = true;

    timerStore.state.timeoutObj = setTimeout(() => {
      console.info(`Timer : ${timerValue}s elapsed !`);
      msg.channel.send(`Timer : ${timerValue}s elapsed !`);
      timerStore.reset();
    }, timerValue * 1000);

    msg.channel.send(`Timer (${timerStore.state.timeoutValue}s) started`);
    console.info(`Timer (${timerStore.state.timeoutValue}s) started`);
  },
};
