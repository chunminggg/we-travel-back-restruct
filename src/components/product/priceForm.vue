<template>
    <div>
        <Modal v-model="modal" title="价格编辑" >
            <Input v-model="params.price" placeholder="请输入成人价格" style="width: 300px"></Input>
            <Input v-model="params.childPrice" placeholder="请输入儿童价格" style="width: 300px" class="product"></Input>
            <Input v-model="params.comment" placeholder="请输入备注" style="width: 300px" class="product"></Input>
            <!-- <DatePicker v-model="params.dateRange" placeholder="选择日期" style="width: 300px" type="daterange" class="product"></DatePicker> -->
            <div slot="footer">
                <Button type="error" @click="priceAdd(true)">删除</Button>
                <Button type="primary" @click="priceAdd(false)">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      params: {
        price: "",
        childPrice: "",
        comment: "",
        dateRange: ""
      },
      isEdit:false,
      currentIdx:0,
    };
  },
  methods:{
      configData(params = null,idx=0){
          this.modal = true
          if (params == null) {
              this.isEdit = false
          }
          else{
              this.isEdit = true
              this.params.price = params.price
              this.params.childPrice = params.childPrice
              this.params.comment = params.comment
              this.params.id = params.id
              this.params.startDate = params.startDate
              this.currentIdx = idx

          }
      },
      priceAdd(isDelete){
          if (this.isEdit) {
              this.$emit('priceEdit',this.params,this.currentIdx,isDelete)
          }
          this.modal = false
      }
  }
};
</script>

<style scoped>
.product {
  margin-top: 10px;
}
</style>
