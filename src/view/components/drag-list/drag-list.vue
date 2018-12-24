<template>
  <div>
    <Card title="产品过滤">
      <Row :gutter="16">
        <Col span="6">
        <Select v-model="params.themeSelected" placeholder="主题过滤" @on-change="themeChange" clearable>
          <Option v-for="item in productTypes" :key="item.value" :value="item.value">{{item.label}}</Option>
        </Select>
        </Col>
      </Row>
    </Card>
    <Table
      :columns="columns"
      :data="data"
      style="margin-top:10px;"
    >

    </Table>
    <Page
      :total="total"
      @on-change="pageChange"
      style="margin-top:10px;"
    ></Page>
  </div>
</template>

<script>
import { getProductList, deleteProduct, getTheme } from "@/libs/service";
export default {
  data() {
    let that = this
    return {
      params:{
        themeSelected:''
      },
      total: 0,
      productTypes: [],
      columns: [
        {
          key: "name",
          title: "名称"
        },
        {
          key:'type',
          title:'所属主题',
          render(h,params){
            let themeName = that.productTypes.find(item => params.row.type == item.value)
            return (<span>{themeName.label}</span>)
          }
        },
        {
          key:'price',
          title:'价格'
        },
        {
          title: "操作",
          render: (h, params) => {
            return (
              <div>
                <i-button
                  type="primary"
                  onClick={() => {
                    this.editItem(params);
                  }}
                  size="small"
                >
                  编辑
                </i-button>
                <i-button
                  type="error"
                  size="small"
                  style="margin-left:10px;"
                  onClick={() => {
                    this.deleteItem(params);
                  }}
                >
                  删除
                </i-button>
              </div>
            );
          }
        }
      ],
      data: []
    };
  },
  mounted() {
    this.getData();
    this.getThemeData();
  },
  methods: {
    async getData() {
      let data = await getProductList(this.params);
      this.data = data.map(item => {
        return Object.assign(item.attributes, { id: item.id });
      });
    },
    themeChange(value){
      this.params.themeSelected = value || ''
      this.getData()
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
    deleteItem(params) {
      this.$Modal.confirm({
        title: "删除",
        content: "确认删除该条数据吗？",
        onOk: () => {
          deleteProduct(params.row.id).then(
            data => {
              this.getData();
              this.$Message.success("删除成功");
            },
            error => {
              this.$Message.error("删除失败");
            }
          );
        }
      });
    },
    editItem(params) {
      this.$router.push(`edit_product/${params.row.id}`);
    },
    pageChange(pageIndex) {}
  }
};
</script>

<style>
</style>
