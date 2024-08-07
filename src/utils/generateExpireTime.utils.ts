//10 minutes
const generateExpireTime = (time = 10) =>
  new Date(Date.now() + time * 60 * 1000);
export default generateExpireTime;
