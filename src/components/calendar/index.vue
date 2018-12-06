<template>

    <div>
        <calendar ref="calendar" style="height: 800px;" view="month" @afterRenderSchedule="onAfterRenderSchedule" @beforeCreateSchedule="onBeforeCreateSchedule" @beforeDeleteSchedule="onBeforeDeleteSchedule" @beforeUpdateSchedule="onBeforeUpdateSchedule" @clickDayname="onClickDayname" @clickSchedule="onClickSchedule" @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn" :schedules="scheduleList" :scheduleView="scheduleView" />
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
      scheduleList: [
        {
          id: "1",
          calendarId: "1",
          title: "my schedule",
          category: "time",
          dueDateClass: "",
          start: "2018-12-18T22:30:00+09:00",
          end: "2018-12-19T02:30:00+09:00"
        },
        {
          id: "2",
          calendarId: "1",
          title: "second schedule",
          category: "time",
          dueDateClass: "",
          start: "2018-12-18T17:30:00+09:00",
          end: "2018-12-19T17:31:00+09:00"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    onAfterRenderSchedule(e) {
      // implement your code
      debugger;
    },
    onBeforeCreateSchedule(e) {
      let params = {
        id: this.scheduleList.length + 1,
        calendarId: "1",
        category: "time",
        dueDateClass: "",
        start: e.start,
        title: e.title
      };
      this.scheduleList.push(params);
    },
    onBeforeDeleteSchedule(e) {
      // implement your code
      debugger;
    },
    onBeforeUpdateSchedule(e) {
      // implement your code
      debugger;
    },
    onClickDayname(e) {
      // implement your code
      debugger;
    },
    onClickSchedule(e) {
      // implement your code
      debugger;
    },
    onClickTimezonesCollapseBtn(e) {
      // implement your code
      debugger;
    }
  }
};
</script>

<style>
</style>
