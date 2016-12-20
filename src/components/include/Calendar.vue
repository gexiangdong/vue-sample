/**
 * 日历
 */
<template>
  <div class="calendar" v-on:touchstart="touchStart" v-on:touchmove="touchMove">
    <table>
      <thead>
        <tr>
          <th class="weekend">日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th class="weekend">六</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeks">
          <td v-for="day in week" v-bind:class="{othermonth:day.otherMonth, weekend:(day.weekDay == 6 || day.weekDay == 0)}" v-on:click="clickedOnDay(day.year, day.month, day.date)">
            <span class="daylabel">{{ day.label }}</span>
            <component v-bind:is="day.component"></component>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
var touchTimeoutHandle = null
var touchStartX = null
var touchStartY = null
var touchEndX = null
var touchEndY = null
var year = null
var month = null

export default {
  name: 'Calendar',
  data () {
    return {
      weeks: []
    }
  },
  created () {
    var y
    var m
    if (typeof this.year === 'undefined' || this.year === null) {
      y = new Date().getFullYear()
    } else {
      y = parseInt(this.year)
    }
    if (typeof this.month === 'undefined' || this.month === null) {
      m = new Date().getMonth() + 1
    } else {
      m = parseInt(this.month)
    }
    this.changeMonth(y, m)
  },
  methods: {
    showRedPoint (itemId) {
      for (var i = 0; i < this.$store.state.redPointIds.length; i++) {
        if (this.$store.state.redPointIds[i] === itemId) {
          return true
        }
      }
      return false
    },
    changeMonth (y, m) {
      year = parseInt(y)
      month = parseInt(m)
      this.$emit('monthChanged', year, month)
      // 重新计算日期
      while (this.weeks.length > 0) {
        this.weeks.pop()
      }
      var d = new Date(year, month - 1, 1)
      d = new Date(d.getTime() - d.getDay() * 24 * 3600 * 1000)
      var week = []
      while (true) {
        var day = {label: d.getDate(), otherMonth: d.getMonth() !== (month - 1), weekDay: d.getDay(), year: d.getFullYear(), month: d.getMonth(), date: d.getDate()}
        if (typeof this.cellHandler !== 'undefined' && this.cellHandler !== null) {
          day.component = this.cellHandler(d.getFullYear(), d.getMonth(), d.getDate())
        }
        week.push(day)
        if (d.getDay() === 6) {
          this.weeks.push(week)
          week = []
          if (d.getMonth() >= month || (d.getMonth() === 0 && d.getFullYear() > year)) {
            break
          }
        }
        d = new Date(d.getTime() + 24 * 3600 * 1000)
      }
      console.log(this.weeks.length)
    },
    touchStart () {
      touchStartX = window.event.touches[0].clientX
      touchStartY = window.event.touches[0].clientY
    },
    touchMove () {
      // console.log('toucheMove ' + window.event.touches[0].clientX)
      if (touchTimeoutHandle !== null) {
        window.clearTimeout(touchTimeoutHandle)
      }
      touchEndX = window.event.touches[0].clientX
      touchEndY = window.event.touches[0].clientY
      touchTimeoutHandle = window.setTimeout(this.touchEventEnd, 50)
    },
    touchEventEnd () {
      var dy = touchEndY - touchStartY
      var dx = touchEndX - touchStartX
      if (dx < -50 || dx > 50) {
        // 横向滑动太多，此次无效
        return
      }
      if (dy > 150) {
        // 向下滑动
        month += 1
        if (month === 13) {
          month = 1
          year += 1
        }
        this.changeMonth(year, month)
      } else if (dy < -150) {
        // 向上滑动
        month -= 1
        if (month === 0) {
          year -= 1
          month = 12
        }
        this.changeMonth(year, month)
      }
    },
    clickedOnDay (y, m, d) {
      this.$emit('dayClicked', y, m + 1, d)
    }
  },
  props: ['year', 'month', 'cellHandler'] // 从父组件接收的参数
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calendar table {width: 100%; border-collapse:collapse;}
.calendar td, .calendar th {border: 1px solid #DDD; padding:2px;}
.calendar td {cursor: pointer;}
.calendar th {background-color: #EEE}
.calendar tr td:first-child {border-left: none; width: 15%;}
.calendar tr td:last-child {border-right: none; width: 15%;}
.calendar tr th:first-child {border-left: none; width: 15%;}
.calendar tr th:last-child {border-right: none; width: 15%;}
.calendar thead th {font-size:18px; text-align: center;}
.calendar table tbody {font-size:14px; font-weight:normal;}
.calendar table tbody td {vertical-align:top; height: 50px;}
.calendar table td {width:14%;}
.calendar .daylabel{display:block; margin-bottom:3px;}
td.othermonth {color:#999;}
td.weekend {background-color:#EEE;}

</style>
