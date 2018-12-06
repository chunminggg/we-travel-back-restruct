<template>

    <div>
        <calendar ref="calendar" style="height: 800px;" view="month" @clickDayname="onClickDayname" @clickSchedule="onClickSchedule" />
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
    };
  },
  mounted() {
  },
  methods: {
   onClickDayname(e){
       debugger
   },
   onClickSchedule(e) {

    },
  }
};
</script>

<style>
</style>
