<template>

  <div>
    <div>
      <Button @click="$parent.isShowAddPriceView = false">返回</Button>
      <Button @click="lastMonth">上个月</Button>
      <Button @click="nextMonth">下个月</Button>
      <span class="nowDate">{{nowDate}}</span>
    </div>
    <calendar ref="tuiCalendar" style="height: 800px;" :useCreationPopup="isShowPopup" :useDetailPopup="isShowPopup" view="month" @afterRenderSchedule="onAfterRenderSchedule" @beforeCreateSchedule="onBeforeCreateSchedule" @beforeDeleteSchedule="onBeforeDeleteSchedule" @beforeUpdateSchedule="onBeforeUpdateSchedule" @clickDayname="onClickDayname" @clickSchedule="onClickSchedule" @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn" :schedules="scheduleList" :scheduleView="scheduleView" />
  </div>
</template>

<script>
import "tui-calendar/dist/tui-calendar.css";
import { Calendar } from "@toast-ui/vue-calendar";
import moment from "moment";
export default {
  components: {
    calendar: Calendar
  },
  data() {
    return {
      scheduleView: ["time"],
      isShowPopup: false,
      calendarList: [
        {
          id: "0",
          name: "home"
        },
        {
          id: "1",
          name: "office"
        }
      ],
      scheduleList: [],
      currentDateItem: {},
      nowDate: ""
    };
  },
  mounted() {
    this.checkDate();
  },
  created() {},
  methods: {
    checkDate() {
      let tzNowDate = this.$refs.tuiCalendar.invoke("getDate");
      this.nowDate = moment(tzNowDate).format("YYYY-MM");
    },
    lastMonth() {
      this.$refs.tuiCalendar.invoke("prev");
       let nextMonth = moment(this.nowDate).subtract(1, 'months'),
      newNext = moment(nextMonth).format('YYYY-MM');
      this.nowDate = newNext
    },
    nextMonth() {
      this.$refs.tuiCalendar.invoke("next");
      let nextMonth = moment(this.nowDate).add(1, 'months'),
      newNext = moment(nextMonth).format('YYYY-MM');
      this.nowDate = newNext
    },
    addSchedult() {
      let params = {
        id: this.scheduleList.length + 1,
        calendarId: "1",
        category: "time",
        dueDateClass: "",
        start: this.currentDateItem.start,
        title: "33333"
      };
      this.scheduleList.push(params);
    },
    onAfterRenderSchedule(e) {
      // implement your code
    },
    onBeforeCreateSchedule(e) {
      this.currentDateItem = e;
      e.guide.clearGuideElement();
      this.$parent.priceModal = true;
      return;
    },
    onBeforeDeleteSchedule(e) {
      // implement your code
    },
    onBeforeUpdateSchedule(e) {
      // implement your code
    },
    onClickDayname(e) {
      // implement your code
    },
    onClickSchedule(e) {
      // implement your code
    },
    onClickTimezonesCollapseBtn(e) {
      // implement your code
    }
  }
};
</script>

<style lang="less" scoped>
.nowDate {
  font-size: 16px;
  margin-left: 20px;
  line-height: 20px;
}
</style>
