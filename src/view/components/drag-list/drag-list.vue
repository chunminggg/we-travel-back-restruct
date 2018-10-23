<template>
  <div>
    <Table :columns="columns" :data="data">

    </Table>
    <Page :total="total" @on-change="pageChange" style="margin-top:10px;"></Page>
  </div>
</template>

<script>
import { getProductList, deleteProduct } from "@/libs/service";
export default {
  data() {
    return {
      total: 0,
      columns: [
        {
          key: "name",
          title: "名称"
        },
        {
          title: "操作",
          render: (h, params) => {
            return (
              <a
                style="color:red"
                onClick={() => {
                  this.deleteItem(params);
                }}
              >
                删除
              </a>
            );
          }
        },
        {
          title: "操作",
          render: (h, params) => {
            return (
              <a
                onClick={() => {
                  this.editItem(params);
                }}
              >
                编辑
              </a>
            );
          }
        }
      ],
      data: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let data = await getProductList();
      this.data = data.map(item => {
        return Object.assign(item.attributes, { id: item.id });
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
      this.$router.push(`edit_product/${params.row.id}`)
    },
    pageChange(pageIndex) {}
  }
};
</script>

<style>
</style>
