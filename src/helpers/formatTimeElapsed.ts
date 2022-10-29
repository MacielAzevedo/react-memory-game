export const formatTimeElapsed = (seconds: number) => {
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  let secStrings = `${seconds < 10 ? "0" + seconds : seconds}`;
  let minStrings = `${minutes < 10 ? "0" + minutes : minutes}`;

  return `${minStrings}:${secStrings}`;
};