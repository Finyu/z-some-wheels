
// 将日期格式转化为YYYY-MM-DD hh:mm:ss 字符串形式
const formateDateTime = val => {
  if (!val) return val
  // console.log(val)
  let year = val.getFullYear()
  let month = val.getMonth() + 1
  let day = val.getDate()
  let hour = val.getHours()
  let minute = val.getMinutes()
  let second = val.getSeconds()

  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

function formateDate (date) {
  if (!date) return date
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let d = date.getDate()
  return year + '-' + (month < 10 ? '0' + month : month) + '-' + (d < 10 ? '0' + d : d)
}
export { formateDateTime, formateDate }
