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
    <div v-if="!isShowAddPriceView">

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
        <Button type="info" class="product" @click="priceSelect">价格视图</Button>
        <div class="price-card">
          <Row :gutter="16">
            <Col span="6" v-for="(item,index) in tagArray" :key="index">
            <Card>
              <div slot="extra">
                <Button type="error" @click="handleClose(index)">删除</Button>
                <Button type="primary" style="margin-left:10px;" @click="handleEditPrice(item)">编辑</Button>
              </div>
              <div>
                成人票价:{{item.price}}
              </div>
              <div>
                儿童票价:{{item.childPrice}}
              </div>
              <div>
                备注:{{item.comment}}
              </div>
              <div>
                <div>开始日期：{{item.startDate}}</div>
                <div>结束日期：{{item.endDate}}</div>
              </div>
            </Card>

            </Col>
          </Row>
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
        <!-- <quill-editor v-model="richItem.content"></quill-editor> -->
        <rich-editor :ref="'rich'+index" :idx="index"></rich-editor>
      </div>
      <Button type="success" long @click="submitData" class="product">确认提交</Button>
      <Button type="error" long @click="elseSubmitData" class="product">另存为</Button>
    </div>
    <div v-if="isShowAddPriceView">
      <div>
        
      </div>
      <price-view ref="holePriceView"></price-view>
    </div>
    <Modal v-model="priceModal" title="价格添加" @on-ok="priceAdd">
      <Input v-model="singlePrice" placeholder="请输入成人价格" style="width: 300px"></Input>
      <Input v-model="singleChildPrice" placeholder="请输入儿童价格" style="width: 300px" class="product"></Input>
      <Input v-model="singlePriceComment" placeholder="请输入备注" style="width: 300px" class="product"></Input>
      <DatePicker v-model="singleDate" placeholder="选择日期" style="width: 300px" type="daterange" class="product"></DatePicker>
    </Modal>
    <price-form ref="priceForm" @priceEdit="priceEdit"></price-form>
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
import { saveEditProduct, getProductDetail, getTheme } from "@/libs/service";
import moment from "moment";
import richEditor from "@/components/productEditor/editor";
import priceForm from "@/components/product/priceForm";
import priceView from "@/components/calendar/index";
export default {
  components: {
    imageUpload,
    Editor,
    quillEditor,
    richEditor,
    priceForm,
    priceView
  },
  data() {
    return {
      isShowAddPriceView: false,
      richItems: [
        { content: "", placeHolder: "线路特色" },
        { content: "", placeHolder: "行程介绍" },
        { content: "", placeHolder: "费用说明" },
        { content: "", placeHolder: "预订须知" }
      ],
      id: "",
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
      productTypes: [],
      productTypeSelected: "",
      imageArray: [],
      fileArray: [],
      singlePriceComment: "",
      singleChildPrice: ""
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.getThemeData();
    this.getData(this.productId);
  },
  methods: {
    handleEditPrice(item) {
      this.$refs.priceForm.configData(item);
    },
    async getThemeData() {
      let data = await getTheme();
      this.productTypes = data.map(item => {
        return {
          value: item.id,
          label: item.attributes.name
        };
      });
    },
    async getData(productId) {
      let info = await getProductDetail(productId);
      this.id = info.id;
      let data = info.attributes;
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
      this.configRichConent();
    },
    configRichConent() {
      this.richItems.map((item, index) => {
        this.$refs[`rich${index}`][0].htmlText = item.content;
      });
    },
    getRichContent() {
      this.richItems.map((item, index) => {
        let editorContent = this.$refs[`rich${index}`][0].htmlText;
        item.content = editorContent;
      });
    },
    handleClose(index) {
      this.tagArray.splice(index, 1);
    },
    // 价格添加
    priceAdd() {
      this.$refs.holePriceView.addSchedult()
      return
      let dict = {
        startDate: moment(this.singleDate[0]).format("YYYY-MM-DD"),
        endDate: moment(this.singleDate[1]).format("YYYY-MM-DD"),
        price: this.singlePrice,
        childPrice: this.singleChildPrice,
        comment: this.singlePriceComment
      };

      this.tagArray.push(dict);
    },
    priceEdit(params, index) {
      let dict = {
        startDate: moment(params.dateRange[0]).format("YYYY-MM-DD"),
        endDate: moment(params.dateRange[1]).format("YYYY-MM-DD"),
        price: params.price,
        childPrice: params.childPrice,
        comment: params.comment
      };
      this.$set(this.tagArray, index, dict);
      this.tagArray[index] = dict;
    },
    //价格选择
    priceSelect() {
      this.isShowAddPriceView = true;
      // this.priceModal = true;
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
      this.getRichContent();
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
        id: _self.id
      };
      return dict;
    },
    // 另存为
    elseSubmitData() {
      var _self = this;
      let dict = this.getNowData();

      network.uploadProdut("", dict, function() {
        _self.$Message.success("操作成功");
        _self.$router.push("/components/drag_list_page");
      });
    },
    async submitData() {
      try {
        var dict = this.getNowData();
        if (!this.imageArray.length) {
          this.$Message.error("请上传图片至少一张");
        }
        let data = await saveEditProduct(dict);
        this.$Message.success("保存成功");
        this.$nextTick(() => {
          this.$router.go(0);
        });
      } catch (error) {
        this.$Message.warning("操作失败");
      }
    }
  }
};
</script>


<style scoped lang="less">
.price-card {
  margin-top: 10px;
}
</style>
