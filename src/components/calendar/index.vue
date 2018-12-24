<template>

  <div>
    <div>
      <Button @click="rebackView">返回</Button>
      <Button @click="lastMonth">上个月</Button>
      <Button @click="nextMonth">下个月</Button>
      <span class="nowDate">{{nowDate}}</span>
    </div>
    <calendar ref="tuiCalendar" style="height: 800px;" :useCreationPopup="isShowPopup" :useDetailPopup="isShowPopup" view="month" @beforeCreateSchedule="onBeforeCreateSchedule" @clickSchedule="onClickSchedule" :schedules="scheduleList" :scheduleView="scheduleView" />
    <Modal v-model="priceModal" title="价格添加" @on-ok="priceAdd">
      <Form ref="formInline" :model="addParams"  inline>
        <FormItem prop="price">
          <Input v-model="addParams.price" placeholder="请输入成人价格" style="width: 300px"></Input>
        </FormItem>
         <FormItem prop="commission">
          <Input v-model="addParams.commission" placeholder="请输入佣金" style="width: 300px"></Input>
        </FormItem>
          <FormItem prop="comment">
            <Input v-model="addParams.comment" placeholder="请输入成人价格备注" style="width: 300px" class="product"></Input>
        </FormItem>
          <FormItem prop="childPrice">
      <Input v-model="addParams.childPrice" placeholder="请输入儿童价格" style="width: 300px" class="product"></Input>
        </FormItem>
          <FormItem prop="childComment">
          <Input v-model="addParams.childComment" placeholder="请输入儿童价格备注" style="width: 300px"></Input>
        </FormItem>
      </Form>
    </Modal>
    <price-form ref="priceForm" @priceEdit="priceEdit"></price-form>
  </div>

</template>

<script>
import "tui-calendar/dist/tui-calendar.css";
import { Calendar } from "@toast-ui/vue-calendar";
import uuidv1 from "uuid/v1";
import moment from "moment";
import priceForm from "@/components/product/priceForm";
export default {
  props: ["tagArray"],
  components: {
    calendar: Calendar,
    priceForm
  },
  data() {
    return {
      priceModal: false,
      scheduleView: ["time"],
      isShowPopup: false,
      addParams: {
        price: "",
        childPrice: "",
        comment: "",
        childComment:'',
        commission:'',
      },
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
    configPriceView() {
      if (this.tagArray.length) {
        this.tagArray.map(item => {
          let nowDate = moment(item.startDate);
          let info = {
            id: item.id,
            calendarId: "1",
            category: "time",
            dueDateClass: "",
            start: nowDate._d,
            title: item.price
          };
          this.scheduleList.push(info);
        });
      }
    },
    rebackView() {
      this.$parent.isShowAddPriceView = false;
    },
    checkDate() {
      let tzNowDate = this.$refs.tuiCalendar.invoke("getDate");
      this.nowDate = moment(tzNowDate).format("YYYY-MM");
    },
    lastMonth() {
      this.$refs.tuiCalendar.invoke("prev");
      let nextMonth = moment(this.nowDate).subtract(1, "months"),
        newNext = moment(nextMonth).format("YYYY-MM");
      this.nowDate = newNext;
    },
    nextMonth() {
      this.$refs.tuiCalendar.invoke("next");
      let nextMonth = moment(this.nowDate).add(1, "months"),
        newNext = moment(nextMonth).format("YYYY-MM");
      this.nowDate = newNext;
    },
    priceEdit(obj, currentIdx, isDelete) {
      if (isDelete) {
        this.tagArray.splice(currentIdx, 1);
        this.scheduleList.splice(currentIdx, 1);
        return;
      }
      this.$set(this.tagArray, currentIdx, obj);
      this.$set(this.scheduleList[currentIdx], "title", obj.price);
      this.scheduleList.push({});
      this.scheduleList.splice(this.scheduleList.length - 1, 1);
    },
    // 价格添加
    priceAdd() {
      let singleId = uuidv1();
      let info = {
        id: singleId,
        calendarId: "1",
        category: "time",
        dueDateClass: "",
        start: this.currentDateItem.start,
        title: this.addParams.price
      };
      let dict = {
        startDate: moment(this.currentDateItem.start.toDate()).format(
          "YYYY-MM-DD"
        ),
        childPrice: this.addParams.childPrice,
        comment: this.addParams.comment,
        price: this.addParams.price,
        childComment:this.addParams.childComment,
        commission:this.addParams.commission,
        id: singleId
      };
      this.tagArray.push(dict);
      this.scheduleList.push(info);
    },
    onBeforeCreateSchedule(e) {
      this.currentDateItem = e;
      e.guide.clearGuideElement();
      this.priceModal = true;
      return;
    },
    onClickSchedule(e) {
      let currentIdx = 0;
      this.tagArray.map((item, index) => {
        if (item.id == e.schedule.id) {
          currentIdx = index;
        }
      });
      let singleItem = this.tagArray[currentIdx];
      this.$refs.priceForm.configData(singleItem, currentIdx);
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
.price-card {
  margin-top: 10px;
}
</style>
