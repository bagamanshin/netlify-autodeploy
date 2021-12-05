export default function getFullTime(dt: Date) {
  return `
  ${(`0${dt.getDate()}`).slice(-2)}.${(`0${dt.getMonth() + 1}`).slice(-2)}.${dt.getFullYear()}
  ${(`0${dt.getHours()}`).slice(-2)}:${(`0${dt.getMinutes()}`).slice(-2)}:${(`0${dt.getSeconds()}`).slice(-2)}`;
}
