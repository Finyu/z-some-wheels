### 日期转为农历格式

:::demo 该方法用以把日期转为农历
```html
<template>
    2020-6-1 => {{toLunar('2020-6-1')}}
</template>

<script>
  var CalendarData = new Array(20)
  var madd = new Array(12)
  function init() {
    CalendarData[0] = 0x41A95 //公元2001年
    CalendarData[1] = 0xD4A
    CalendarData[2] = 0xDA5
    CalendarData[3] = 0x20B55
    CalendarData[4] = 0x56A
    CalendarData[5] = 0x7155B
    CalendarData[6] = 0x25D
    CalendarData[7] = 0x92D
    CalendarData[8] = 0x5192B
    CalendarData[9] = 0xA95
    CalendarData[10] = 0xB4A
    CalendarData[11] = 0x416AA
    CalendarData[12] = 0xAD5
    CalendarData[13] = 0x90AB5
    CalendarData[14] = 0x4BA
    CalendarData[15] = 0xA5B
    CalendarData[16] = 0x60A57
    CalendarData[17] = 0x52B
    CalendarData[18] = 0xA93
    CalendarData[19] = 0x40E95
    madd[0] = 0
    madd[1] = 31
    madd[2] = 59
    madd[3] = 90
    madd[4] = 120
    madd[5] = 151
    madd[6] = 181
    madd[7] = 212
    madd[8] = 243
    madd[9] = 273
    madd[10] = 304
    madd[11] = 334 //今年某月已过天数！
  }
  init()
  const toLunar = function (TheDate){
    TheDate = new Date(TheDate)
    var tgString = "甲乙丙丁戊己庚辛壬癸"
    var dzString = "子丑寅卯辰巳午未申酉戌亥"
    var numString = "一二三四五六七八九十"
    var monString = "正二三四五六七八九十冬腊"
    var weekString = "日一二三四五六"
    var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪"
    var cYear
    var cMonth
    var cDay
    var cHour
    var cDateString
    var Browser = navigator.appName
    function GetBit(m, n) {
      return (m >> n) & 1
    } //n月是大月还是小月?
    function e2c() {
      var total, m, n, k
      var isEnd = false
      var tmp = TheDate.getYear()
      if (tmp < 1900) tmp += 1900 //无用！
      total = (tmp - 2001) * 365 + Math.floor((tmp - 2001) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 23 //2001年1月23是除夕该句计算到起始年正月初一的天数
      if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) total++ //当年是闰年且已过2月再加一天！
      for (m = 0;; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12 //起始年+m闰月吗？
        for (n = k; n >= 0; n--) {
          if (total <= 29 + GetBit(CalendarData[m], n)) //已找到农历年!
          {
            isEnd = true
            break
          }
          total = total - 29 - GetBit(CalendarData[m], n) //寻找农历年！
        }
        if (isEnd) break
      }
      cYear = 2001 + m //农历年
      cMonth = k - n + 1 //农历月
      cDay = total //农历日
      if (k == 12) //闰年！
      {
        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) //该月就是闰月！
        cMonth = 1 - cMonth
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) cMonth-- //该月是闰月后某个月！
      }
      cHour = Math.floor((TheDate.getHours() + 1) / 2)
    }
    function GetcDateString() {
      var tmp = ""
      tmp += tgString.charAt((cYear - 4) % 10)
      //年干
      tmp += dzString.charAt((cYear - 4) % 12) //年支
      tmp += "年("
      tmp += sx.charAt((cYear - 4) % 12)
      tmp += ")"
      if (cMonth < 1) {
        tmp += "闰"
        tmp += monString.charAt( - cMonth - 1) // 闰几月！
      } else tmp += monString.charAt(cMonth - 1)
      tmp += "月"
      tmp += (cDay < 11) ? "初": ((cDay < 20) ? "十": ((cDay < 30) ? "廿": "卅")) // 初几！
      if (cDay % 10 != 0 || cDay == 10) tmp += numString.charAt((cDay - 1) % 10)
      if (cHour == 12) tmp += "夜"
      tmp += dzString.charAt((cHour) % 12)
      tmp += "时" //几时！
      cDateString = tmp
      return tmp
    }
    e2c()
    GetcDateString()
    return cDateString
  }
  export default { 
    methods: {
      toLunar: toLunar
    }
  }
</script>

```
:::