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
      <div class="price-card">
        <Row :gutter="16">
          <Col span="6" v-for="(item,index) in tagArray" :key="index">
          <Card>
            <div slot="extra">
              <Button type="error" @click.prevent="handleClose(index)">删除</Button>
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
      <label>是否置顶:</label>
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
import { createNewProduct, getTheme, getDestination } from "@/libs/service";
import richEditor from "@/components/productEditor/editor";
import moment from "moment";
import priceForm from '@/components/product/priceForm'
export default {
  components: {
    imageUpload,
    Editor,
    quillEditor,
    richEditor,
    priceForm
  },
  data() {
    return {
      richItems: [
        { content: "", placeHolder: "线路特色" },
        { content: "", placeHolder: "行程介绍" },
        { content: "", placeHolder: "费用说明" },
        { content: "", placeHolder: "预订须知" }
      ],
      singlePriceComment:'',
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
      singleChildPrice: "",
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
      fileArray: []
    };
  },
  created() {
    var _self = this;
    _self.productId = this.$route.params.productId;
    this.getThemeData();
    network.getTodoDetail(
      _self.productId,
      "Product",
      data => {
        _self.richItems = data.detailContent;
        _self.productNumber = data.onleyId;
        _self.productPlace = data.place;
        _self.productDes = data.describe;
        _self.productName = data.name;
        _self.productPrice = data.price;
        _self.imageArray = data.imageArray;
        _self.fileArray = data.fileArray;
        if (data.fileArray == undefined) {
          _self.fileArray = [];
        }
        _self.productStartDate = data.startDate;
        _self.isFollowTeam = data.isFollowTeam || false;
        _self.isFreeTravel = data.isFreeTravel || false;
        _self.tagArray = data.tagArray || [];
        if (data.isRecommend != undefined) {
          _self.isRecommend = data.isRecommend;
        }
        if (data.isSpecialPrice != undefined) {
          _self.isSpecialPrice = data.isSpecialPrice;
        }

        // _self.productEndDate = data.endDate
        _self.productTypeSelected = data.type;
        this.configRichConent();
      },
      error => {
        _self.$Message.error("获取信息失败,请重试");
      }
    );
  },
  methods: {
     handleEditPrice(item){
      this.$refs.priceForm.configData(item)
    },
    configRichConent() {
      this.richItems.map((item, index) => {
        this.$refs[`rich${index}`][0].htmlText = item.content;
      });
    },
    // 获取主题数据
    async getThemeData() {
      let data = await getTheme();
      this.productTypes = data.map(item => {
        return {
          value: item.id,
          label: item.attributes.name
        };
      });
    },
    handleClose(index) {
      this.tagArray.splice(index, 1);
    },
    // 价格添加
    priceAdd() {
       let dict = {
        startDate: moment(this.singleDate[0]).format("YYYY-MM-DD"),
        endDate: moment(this.singleDate[1]).format("YYYY-MM-DD"),
        price: this.singlePrice,
        childPrice: this.singleChildPrice,
        comment:this.singlePriceComment
      };

      this.tagArray.push(dict);
    },
       priceEdit(params,index){
       let dict = {
        startDate: moment(params.dateRange[0]).format("YYYY-MM-DD"),
        endDate: moment(params.dateRange[1]).format("YYYY-MM-DD"),
        price: params.price,
        childPrice: params.childPrice,
        comment:params.comment
      };
      this.$set(this.tagArray,index,dict)
      this.tagArray[index] = dict
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
    getRichContent() {
      this.richItems.map((item, index) => {
        let editorContent = this.$refs[`rich${index}`][0].htmlText;
        item.content = editorContent;
      });
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
        tagArray: _self.tagArray
      };
      debugger;
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
        let data = await createNewProduct(dict);
        this.$Message.success("新建成功");
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
<style lang="less" scoped>
.price-card {
  margin-top: 10px;
}
</style>


