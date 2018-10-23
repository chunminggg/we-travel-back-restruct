<style scoped>
.product {
  margin-top: 10px;
}

.myAlert {
  margin-top: 30px;
}

.imageUpload {
  margin-bottom: 30px;
}
</style>

<template>
  <div class="content">
    <h2>产品发布</h2>
    <Input v-model="productNumber" placeholder="" class="product">
    <span slot="prepend">产品编号</span>
    </Input>
    <Input v-model="productName" placeholder="" class="product">
    <span slot="prepend">产品名称</span>
    </Input>
    <Input v-model="productPlace" placeholder="" class="product">
    <span slot="prepend">出发城市</span>
    </Input>
    <Input v-model="productPrice" placeholder="" class="product">
    <span slot="prepend">产品价格</span>
    </Input>
    <Input v-model="productDes" placeholder="" class="product">
    <span slot="prepend">产品描述</span>
    </Input>
    <Input v-model="productStartDate" placeholder="" class="product">
    <span slot="prepend">开始时间</span>
    </Input>
    <div class="product">
      <Button type="info" class="product" @click="priceSelect">价格添加</Button>
      <div class="priceTag">
        <Tag class="tagView" v-for="(item,index) in tagArray" :key="index" closable @on-close="handleClose(index)">{{item.date}} ￥{{item.price}}</Tag>
      </div>
    </div>
    <div class="product">
      <label>是否特价:</label>
      <i-switch v-model="isRecommend"></i-switch>
      <label>是否推荐:</label>
      <i-switch v-model="isSpecialPrice"></i-switch>
      <label>是否跟团游</label>
      <i-switch v-model="isFollowTeam"></i-switch>
      <label>是否自由行</label>
      <i-switch v-model="isFreeTravel"></i-switch>
    </div>
    <Select v-model="productTypeSelected" class="product" placeholder="请选择产品类型">
      <Option v-for="(item,index) in productTypes" :value="item.value" :key="index">{{ item.label }}</Option>
    </Select>
    <Alert class="myAlert" type="warning">产品详情滚动图（至少传一张)</Alert>
    <image-upload class="product imageUpload" @send-image="getImageArray" :uploadList="imageArray">
    </image-upload>
    <div v-for="(richItem, index) in richItems" :key="index" class="myProduct">
      <Alert>{{richItem.placeHolder}}</Alert>
      <quill-editor v-model="richItem.content"></quill-editor>
    </div>
    <Button type="success" long @click="submitData" class="product">确认提交</Button>
    <!-- <Button type="error" long @click="elseSubmitData" class="product">另存为</Button> -->

    <Modal v-model="priceModal" title="价格添加" @on-ok="priceAdd">
      <Input v-model="singlePrice" placeholder="请输入价格" style="width: 300px"></Input>
      <DatePicker v-model="singleDate" type="date" placeholder="选择日期" style="width: 300px" class="product"></DatePicker>
    </Modal>
  </div>
</template>

<script>
import imageUpload from "@/components/product/imageUpload";
import network from "@/components/product/network.js";
import Editor from "_c/editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import { saveEditProduct,getProductDetail } from "@/libs/service";
export default {
  components: {
    imageUpload,
    Editor,
    quillEditor
  },
  data() {
    return {
      richItems: [
        { content: "", placeHolder: "线路特色" },
        { content: "", placeHolder: "行程介绍" },
        { content: "", placeHolder: "费用说明" },
        { content: "", placeHolder: "预订须知" }
      ],
     id:'',
      productId: "",
      //产品编号
      productNumber: "",
      //产品名称
      productName: "",
      //产品描述
      productDes: "",
      //产品价格
      productPrice: "",
      // 出发城市
      productPlace: "",
      productStartDate: "",
      productEndDate: "",
      //是否推荐
      isRecommend: false,
      isSpecialPrice: false,
      isFollowTeam: false,
      isFreeTravel: false,
      // 模态框
      priceModal: false,
      //是否特价
      //价格添加
      singlePrice: "",
      singleDate: "",
      tagArray: [],
      //日期格式设置
      dateOption1: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      dateOption2: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      productTypes: [
        {
          value: 1,
          label: "巴厘岛"
        },
        {
          value: 2,
          label: "沙巴岛"
        },
        {
          value: 3,
          label: "芽庄"
        },
        {
          value: 4,
          label: "马尔代夫"
        },
        {
          value: 5,
          label: "普吉岛"
        },
        {
          value: 6,
          label: "长滩岛"
        },
        {
          value: 7,
          label: "帕劳"
        },
        {
          value: 8,
          label: "大溪地"
        },
        {
          value: 9,
          label: "苏梅岛"
        }
      ],
      productTypeSelected: "",
      imageArray: [],
      fileArray: []
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.getData(this.productId)
  },
  methods: {
      async getData(productId){
        let info = await getProductDetail(productId)
        this.id = info.id
        let data = info.attributes
        this.richItems = data.detailContent;
        this.productNumber = data.onleyId;
        this.productPlace = data.place;
        this.productDes = data.describe;
        this.productName = data.name;
        this.productPrice = data.price;
        this.imageArray = data.imageArray;
        this.fileArray = data.fileArray;
        if (data.fileArray == undefined) {
          this.fileArray = [];
        }
        this.productStartDate = data.startDate;
        this.isFollowTeam = data.isFollowTeam || false;
        this.isFreeTravel = data.isFreeTravel || false;
        this.tagArray = data.tagArray || [];
        if (data.isRecommend != undefined) {
          this.isRecommend = data.isRecommend;
        }
        if (data.isSpecialPrice != undefined) {
          this.isSpecialPrice = data.isSpecialPrice;
        }
        this.productTypeSelected = data.type;
      },
    handleClose(index) {
      this.tagArray.splice(index, 1);
    },
    // 价格添加
    priceAdd() {
      let dict = {
        date: this.singleDate.toLocaleDateString(),
        price: this.singlePrice
      };

      this.tagArray.push(dict);
    },
    //价格选择
    priceSelect() {
      this.priceModal = true;
    },
    getRichTextArray(data) {
      this.richItems[data.index].content = data.content;
    },
    getImageArray(data) {
      this.imageArray = data;
    },
    getFileArray(data) {
      this.fileArray = data;
    },
    getNowData() {
      var _self = this;
      var dict = {
        startDate: _self.productStartDate,
        // endDate: _self.productEndDate,
        name: _self.productName,
        describe: _self.productDes,
        type: _self.productTypeSelected,
        place: _self.productPlace,
        onleyId: _self.productNumber,
        price: _self.productPrice,
        imageArray: _self.imageArray,
        fileArray: _self.fileArray,
        detailContent: _self.richItems,
        isRecommend: _self.isRecommend,
        isSpecialPrice: _self.isSpecialPrice,
        isFollowTeam: _self.isFollowTeam,
        isFreeTravel: _self.isFreeTravel,
        tagArray: _self.tagArray,
        id:_self.id,
      };
      return dict;
    },
    // 另存为
    elseSubmitData() {
      var _self = this;
      let dict = this.getNowData();

      network.uploadProdut("", dict, function() {
        _self.$Message.success("另存为成功");
        _self.$router.push("/productManage");
      });
    },
    async submitData() {
      try {
        var dict = this.getNowData();
        if (!this.imageArray.length) {
          this.$Message.error("请上传图片至少一张");
        }
        let data = await saveEditProduct(dict);
        debugger
        this.$Message.success("保存成功");
        this.$nextTick(()=>{
          this.$router.go(0)
        })
      } catch (error) {
        this.$Message.warning("操作失败");
      }
    }
  }
};
</script>


