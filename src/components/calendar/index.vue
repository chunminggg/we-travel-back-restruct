<template>

    <div>
        <calendar ref="calendar" style="height: 800px;" :useCreationPopup="isShowPopup" :useDetailPopup="isShowPopup" view="month" @afterRenderSchedule="onAfterRenderSchedule" @beforeCreateSchedule="onBeforeCreateSchedule" @beforeDeleteSchedule="onBeforeDeleteSchedule" @beforeUpdateSchedule="onBeforeUpdateSchedule" @clickDayname="onClickDayname" @clickSchedule="onClickSchedule" @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn" :schedules="scheduleList" :scheduleView="scheduleView" />
    </div>
</template>

<script>
import "tui-calendar/dist/tui-calendar.css";
import { Calendar } from "@toast-ui/vue-calendar";
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
      currentDateItem: {}
    };
  },
  mounted() {},
  methods: {
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

<style>
</style>
