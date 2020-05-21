const getTimeElapsedSeconds = (refDate) => (Date.now() - refDate) / 1000;
const getRemainingTime = (refDate, timer) => {
  const remainingTime = Math.ceil(timer - getTimeElapsedSeconds(refDate));
  
  return remainingTime > 0 ? remainingTime : 0;
};

module.exports = {
  getTimeElapsedSeconds,
  getRemainingTime,
};