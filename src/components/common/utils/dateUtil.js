import moment from 'moment'

export default {
  // 时间转字符串（年月日）dateFormat
  getFormateDateYMD: (date) => {
    if (!date || typeof (date) === 'undefined') {
      return ''
    }
    return moment(date).format('YYYY-MM-DD')
  },
  // 时间转字符串（年月日时分）dateFormatTime\dateFormatAll
  getFormateDateYMDHM: (date) => {
    if (!date || typeof (date) === 'undefined') {
      return ''
    }
    return moment(date).format('YYYY-MM-DD HH:mm')
  },
  // 时间转字符串（年月日时分）dateFormatTime\dateFormatAll
  getFormateDateYMDHMS: (date) => {
    if (!date || typeof (date) === 'undefined') {
      return ''
    }
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  },
  // 时间转字符串（时分秒）dateFormatFull
  getFormateDateHMS: (date) => {
    if (!date) {
      return ''
    }
    return moment(date).format('HH:mm:ss')
  },
  // 开始时间转字符串（年月日00：00：00）dateFormatHourMinSeStart
  getFormateDateStartDate: (date) => {
    if (!date || typeof (date) === 'undefined') {
      return ''
    }
    return moment(date).format('YYYY-MM-DD 00:00:00')
  },
  // 结束时间转字符串（年月日23：59：59）dateFormatHourMinSeEnd
  getFormateDateEndDate: (date) => {
    if (!date || typeof (date) === 'undefined') {
      return ''
    }
    return moment(date).format('YYYY-MM-DD 23:59:59')
  },
  // 字符串转时间
  formatDate: (dateStr) => {
    return moment(dateStr).format()
  },
  // 数据集日期格式化
  dateFormatByDataSetCode: (time) => {
    if (time === '' || time === null) {
      return ''
    }
    return moment(time).format('YYYYMMDD')
  },
  // ==============================================================下面是时间范围取值==============================================================
  /***
   * 获得当前时间
   */
  getCurrentDate: function () {
    return new Date()
  },
  /***
   * 获得本周起止时间
   */
  getCurrentWeek: function () {
    // 起止日期数组
    let startStop = []
    // 获取当前时间
    let currentDate = this.getCurrentDate()
    // 返回date是一周中的某一天
    let week = currentDate.getDay()
    // 返回date是一个月中的某一天
    // let month = currentDate.getDate()
    // 一天的毫秒数
    let millisecond = 1000 * 60 * 60 * 24
    // 减去的天数
    let minusDay = week !== 0 ? week - 1 : 6
    // alert(minusDay);
    // 本周 周一
    let monday = new Date(currentDate.getTime() - (minusDay * millisecond))
    // 本周 周日
    let sunday = new Date(monday.getTime() + (6 * millisecond))
    // 添加本周时间
    startStop.push(monday) // 本周起始时间
    // 添加本周最后一天时间
    startStop.push(sunday) // 本周终止时间
    // 返回
    return startStop
  },
  /***
   * 获得本月的起止时间
   */
  getCurrentMonth: function () {
    // 起止日期数组
    let startStop = []
    // 获取当前时间
    let currentDate = this.getCurrentDate()
    // 获得当前月份0-11
    let currentMonth = currentDate.getMonth()
    // 获得当前年份4位年
    let currentYear = currentDate.getFullYear()
    // 求出本月第一天
    let firstDay = new Date(currentYear, currentMonth, 1)
    // 当为12月的时候年份需要加1
    // 月份需要更新为0 也就是下一年的第一个月
    if (currentMonth === 11) {
      currentYear++
      currentMonth = 0 // 就为
    } else {
      // 否则只是月份增加,以便求的下一月的第一天
      currentMonth++
    }
    // 一天的毫秒数
    let millisecond = 1000 * 60 * 60 * 24
    // 下月的第一天
    let nextMonthDayOne = new Date(currentYear, currentMonth, 1)
    // 求出上月的最后一天
    let lastDay = new Date(nextMonthDayOne.getTime() - millisecond)
    // 添加至数组中返回
    startStop.push(firstDay)
    startStop.push(lastDay)
    // 返回
    return startStop
  },
  /**
   * 得到本季度开始的月份
   * aram month 需要计算的月份
   ***/
  getQuarterSeasonStartMonth: function (month) {
    // let quarterMonthStart = 0
    let spring = 0 // 春
    let summer = 3 // 夏
    let fall = 6 // 秋
    let winter = 9 // 冬
    // 月份从0-11
    if (month < 3) {
      return spring
    }
    if (month < 6) {
      return summer
    }
    if (month < 9) {
      return fall
    }
    return winter
  },
  /**
   * 获得该月的天数
   * param year年份
   * param month月份
   * */
  getMonthDays: function (year, month) {
    // 本月第一天 1-31
    let relativeDate = new Date(year, month, 1)
    // 获得当前月份0-11
    let relativeMonth = relativeDate.getMonth()
    // 获得当前年份4位年
    let relativeYear = relativeDate.getFullYear()
    // 当为12月的时候年份需要加1
    // 月份需要更新为0 也就是下一年的第一个月
    if (relativeMonth === 11) {
      relativeYear++
      relativeMonth = 0
    } else {
      // 否则只是月份增加,以便求的下一月的第一天
      relativeMonth++
    }
    // 一天的毫秒数
    let millisecond = 1000 * 60 * 60 * 24
    // 下月的第一天
    let nextMonthDayOne = new Date(relativeYear, relativeMonth, 1)
    // 返回得到上月的最后一天,也就是本月总天数
    return new Date(nextMonthDayOne.getTime() - millisecond).getDate()
  },
  /**
   * 获得本季度的起止日期
   */
  getCurrentSeason: function (currentDate) {
    // 起止日期数组
    let startStop = []
    // 获取当前时间
    // let currentDate = this.getCurrentDate()
    // 获得当前月份0-11
    let currentMonth = currentDate.getMonth()
    // 获得当前年份4位年
    let currentYear = currentDate.getFullYear()
    // 获得本季度开始月份
    let quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth)
    // 获得本季度结束月份
    let quarterSeasonEndMonth = quarterSeasonStartMonth + 2
    // 获得本季度开始的日期
    let quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1)
    // 获得本季度结束的日期
    let quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, this.getMonthDays(currentYear, quarterSeasonEndMonth))
    // 加入数组返回
    startStop.push(quarterSeasonStartDate)
    startStop.push(quarterSeasonEndDate)
    // 返回
    return startStop
  },
  /***
   * 得到本年的起止日期
   *
   */
  getCurrentYear: function () {
    // 起止日期数组
    let startStop = []
    // 获取当前时间
    let currentDate = this.getCurrentDate()
    // 获得当前年份4位年
    let currentYear = currentDate.getFullYear()

    // 本年第一天
    let currentYearFirstDate = new Date(currentYear, 0, 1)
    // 本年最后一天
    let currentYearLastDate = new Date(currentYear, 11, 31)
    // 添加至数组
    startStop.push(currentYearFirstDate)
    startStop.push(currentYearLastDate)
    // 返回
    return startStop
  },
  /**
   * 返回上一个月的第一天Date类型
   * param year 年
   * param month 月
   **/
  getPriorMonthFirstDay: function (year, month) {
    // 年份为0代表,是本年的第一月,所以不能减
    if (month === 0) {
      month = 11 // 月份为上年的最后月份
      year-- // 年份减1
      return new Date(year, month, 1)
    }
    // 否则,只减去月份
    month--
    return new Date(year, month, 1)
  },
  /**
   * 获得上一月的起止日期
   * ***/
  getPreviousMonth: function () {
    // 起止日期数组
    let startStop = []
    // 获取当前时间
    let currentDate = this.getCurrentDate()
    // 获得当前月份0-11
    let currentMonth = currentDate.getMonth()
    // 获得当前年份4位年
    let currentYear = currentDate.getFullYear()
    // 获得上一个月的第一天
    let priorMonthFirstDay = this.getPriorMonthFirstDay(currentYear, currentMonth)
    // 获得上一月的最后一天
    let priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), this.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()))
    // 添加至数组
    startStop.push(priorMonthFirstDay)
    startStop.push(priorMonthLastDay)
    // 返回
    return startStop
  },
  /**
   * 获得上一周的起止日期
   * **/
  getPreviousWeek: function () {
    // 起止日期数组
    let startStop = []
    // 获取当前时间
    let currentDate = this.getCurrentDate()
    // 返回date是一周中的某一天
    let week = currentDate.getDay()
    // 返回date是一个月中的某一天
    // let month = currentDate.getDate()
    // 一天的毫秒数
    let millisecond = 1000 * 60 * 60 * 24
    // 减去的天数
    let minusDay = week !== 0 ? week - 1 : 6
    // 获得当前周的第一天
    let currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay))
    // 上周最后一天即本周开始的前一天
    let priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond)
    // 上周的第一天
    let priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6))
    // 添加至数组
    startStop.push(priorWeekFirstDay)
    startStop.push(priorWeekLastDay)

    return startStop
  },
  /**
   * 得到上季度的起始日期
   * year 这个年应该是运算后得到的当前本季度的年份
   * month 这个应该是运算后得到的当前季度的开始月份
   * */
  getPriorSeasonFirstDay: function (year, month) {
    let quarterStartMonth = 0
    let spring = 0 // 春
    let summer = 3 // 夏
    let fall = 6 // 秋
    let winter = 9 // 冬
    // 月份从0-11
    if (month < 3) {
      year--
      quarterStartMonth = winter
    }

    if (month > 2 && month < 6) {
      quarterStartMonth = spring
    }

    if (month > 5 && month < 9) {
      quarterStartMonth = summer
    }
    if (month > 8) {
      quarterStartMonth = fall
    }

    return new Date(year, quarterStartMonth, 1)
  },
  /**
   * 得到上季度的起止日期
   * **/
  getPreviousSeason: function () {
    // 起止日期数组
    let startStop = []
    // 获取当前时间
    let currentDate = this.getCurrentDate()
    // 获得当前月份0-11
    let currentMonth = currentDate.getMonth()
    // 获得当前年份4位年
    let currentYear = currentDate.getFullYear()
    // 上季度的第一天
    let priorSeasonFirstDay = this.getPriorSeasonFirstDay(currentYear, currentMonth)
    // 上季度的最后一天
    let priorSeasonLastDay = new Date(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2, this.getMonthDays(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2))
    // 添加至数组
    startStop.push(priorSeasonFirstDay)
    startStop.push(priorSeasonLastDay)
    return startStop
  },
  /**
   * 得到去年的起止日期
   * **/
  getPreviousYear: function () {
    // 起止日期数组
    let startStop = []
    // 获取当前时间
    let currentDate = this.getCurrentDate()
    // 获得当前年份4位年
    let currentYear = currentDate.getFullYear()
    currentYear--
    let priorYearFirstDay = new Date(currentYear, 0, 1)
    let priorYearLastDay = new Date(currentYear, 11, 1)
    // 添加至数组
    startStop.push(priorYearFirstDay)
    startStop.push(priorYearLastDay)
    return startStop
  },
  /**
   * 得到去年的当前季度
   * **/
  getLastYear: function () {
    // 昨日时间
    let currentDate = this.getCurrentDate()
    currentDate.setFullYear(currentDate.getFullYear() - 1)
    return this.getCurrentSeason(currentDate)
  }
}
