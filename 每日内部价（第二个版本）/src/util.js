export default {
  isMoblie:/(iPhone|iPod|iOS|Android)/i.test(navigator.userAgent),
  isPc:!/(iPhone|iPod|iOS|Android)/i.test(navigator.userAgent)

}