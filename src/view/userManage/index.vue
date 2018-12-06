<template>
  <div>
    <!-- <div>
      <Button type="primary" @click="addDestination">添加用户</Button>
    </div> -->
    <div style="margin-top:10px;">
      <Table :columns="columns" :data="data"></Table>
    </div>
    <Modal title="添加用户" v-model="isShowAddModal" @on-ok="confirmaddDestination">
      <Input v-model="addName" placeholder="输入订单名称"></Input>
    </Modal>
    <Modal title="编辑" v-model="isShowEditModal" @on-ok="confirmeditDestination">
      <Input v-model="editName" placeholder="输入姓名"></Input>
    </Modal>
  </div>
</template>

<script>
import {
  getUsers
} from "@/libs/service";
export default {
  data() {
    return {
      relateId: "",
      editRelateId: "",
      data: [
        {
          a: 1
        }
      ],
      editName: "",
      themeData: [],
      isShowEditModal: false,
      columns: [
        {
          title: "名称",
          key:'aa'
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return (
              <div>
                <i-button
                  type="error"
                  onClick={() => {
                    this.deleteDestination(params.row.objectId);
                  }}
                >
                  删除
                </i-button>
                <i-button
                  type="primary"
                  style="margin-left:10px"
                  onClick={() => {
                    this.showEditModal(params);
                  }}
                >
                  编辑
                </i-button>
              </div>
            );
          }
        }
      ],
      isShowAddModal: false,
      addName: "",
      currentId: null
    };
  },
  mounted() {
    this.getUsers();  
  },
  methods: {
    async getUsers() {
      let data = await getUsers();
      this.userData = data.map(v => v.toJSON());
      this.relateId = this.themeData[0].objectId;
    },
    showEditModal(params) {
      this.isShowEditModal = true;
      this.currentId = params.row.objectId;
      this.editRelateId = params.row.targetType.objectId;
      this.editName = params.row.name;
    },
    addDestination() {
      this.isShowAddModal = true;
    },
    async confirmeditDestination() {
      let data = await editDestination(
        this.editName,
        this.currentId,
        this.editRelateId
      );
      this.$Message.success("修改成功");
      this.getData();
    },
    async confirmaddDestination() {
      let data = await addDestination(this.addName, this.relateId);
      this.$Message.success("添加成功");
      this.addName = "";
      this.getData();
    },
    async getData() {
      let data = await getDestination();
      this.data = data.map(v => v.toJSON());
    },
    async deleteDestination(objectId) {
      this.$Modal.confirm({
        content: "确认删除吗",
        onOk: () => {
          deleteDestination(objectId).then(res => {
            this.getData();
            this.$Message.success("删除成功");
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
