<template>
  <div class='calendar-monthBox'>
    <div class='calendar-weekBox'>
      <i class='calendar-week' v-for='item in weeks' :key='item'>{{item}}</i>
    </div>
    <div class='calendar-dateBox'>
      <div class='calendar-dateBox-row' v-for='(todo, index) in new Array(row)' :style='{height: `calc(100% / ${row})`}' :key='index'>
        <i class='calendar-date'
          @click='dateClick(item)'
          v-for='(item, ind) in monthData.slice((index) * 7, (index + 1) * 7)'
          :key='ind'>
          <p class='calendar-dateL'>{{item != undefined ? item.date + 1 : ''}}</p>
          <p class='calendar-dateL-remark'>{{item != undefined ? item.dater : ''}}</p>
        </i>
      </div>
    </div>
  </div>
</template>

<script>
import {toLunar} from './timeRun.js'
export default {
  name: 'z-month',
  props: ['month'],
  data(){
    return {
      weeks: ['一','二','三','四','五','六','日'],
      monthData: [],
      row: 6
    }
  },
  methods: {
    dateClick(data){
      if (data && data != undefined) {
        this.$emit('dateClick', this.month + '-' + (data.date + 1))
      }
    }
  },
  created(){
    let arr = new Array(42)
    let x = new Date(this.month).getDay() || 7 // 当前月第一天是星期几
    let time = new Date(this.month).getTime() // 获取第一天的时间戳
    let timelimit = 24 * 60 * 60 * 1000 // 一天的时间戳
    let state = true
    for (let i = 0; i < 42; i++) {
      let date = new Date(timelimit * i + time)
      if (date.getDate() == 1 && i > 0) {
        this.row = Math.ceil((i + x - 1) / 7) // 开始计算本月跨越几周
        break
      }
      arr[i + x - 1] = {}
      arr[i + x - 1].date = i
      arr[i + x - 1].dater = subsringDate(toLunar(date))
    }
    this.monthData = arr
    function subsringDate(text) {
      if (text.indexOf('闰') >= 0) {
        let x = text.indexOf('闰')
        if (text.indexOf('初一') >= 0) {
          return text.substring(x, x + 3)
        } else {
          return text.substring(x + 3, x + 5)
        }
      } else {
        let x = text.indexOf('月')
        if (text.indexOf('初一') >= 0) {
          return text.substring(x - 1, x + 1)
        } else {
          return text.substring(x + 1, x + 3)
        }
      }
      return text.substring(6,12)
    }
  }
}
</script>