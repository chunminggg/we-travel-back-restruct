<template>
    <div style="margin-top:15px;">
        <Card title="价格列表">
            <Row :gutter="16">
                <Col span="3"> 出发日期
                </Col>
                <Col span="2"> 成人价格
                </Col>
                <Col span="4"> 成人价格备注
                </Col>
                <Col span="2"> 佣金
                </Col>

                <Col span="2"> 儿童价格
                </Col>
                <Col span="4"> 儿童价格备注
                </Col>
            </Row>
            <div v-for="(item,index) in tagArray" :key="index" style="margin-top:10px;">
                <Row :gutter="16">
                    <Col span="3">
                    <DatePicker type="date" placeholder="出发日期" v-model="item.startDate"></DatePicker>
                    </Col>
                    <Col span="2">
                    <Input v-model="item.price"></Input>
                    </Col>
                    <Col span="4">
                    <Input v-model="item.comment"></Input>
                    </Col>
                    <Col span="2">
                    <Input v-model="item.commission"></Input>
                    </Col>
                    <Col span="2">
                    <Input v-model="item.childPrice"></Input>
                    </Col>
                    <Col span="4">
                    <Input v-model="item.childComment"></Input>
                    </Col>
                    <Col span="2">
                    <Button type="error" @click="removeTagPrice(index)">删除</Button>
                    </Col>
                </Row>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
  props: ["tagArray"],
  methods: {
    //   分页效果
    pagination(pageSize, pageIndex, array) {
      let offsetSize = (pageIndex - 1) * pageSize;
      return offset + pageSize >= array.length
        ? array.slice(offset, array.length)
        : array.slice(offset, offset + pageSize);
    },
    removeTagPrice(index) {
      //   this.$emit('removeTagPrice',index)
      this.$Modal.confirm({
        title: "提醒",
        content: "确认删除吗",
        onOk: () => {
          this.tagArray.splice(index, 1);
        }
      });
    },
  
  }
};
</script>

<style>
</style>
