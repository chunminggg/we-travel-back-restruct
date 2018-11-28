<template>
    <div>
        <div>
            <Button type="primary" @click="addTheme">添加主题</Button>
        </div>
        <div style="margin-top:10px;">
            <Table :columns="columns" :data="data"></Table>
        </div>
        <Modal title="添加主题" v-model="isShowAddModal" @on-ok="confirmAddTheme">
            <Input v-model="addName" placeholder="输入主题名称"></Input>
            </Modal>
             <Modal title="编辑主题" v-model="isShowEditModal" @on-ok="confirmEditTheme">
            <Input v-model="editName" placeholder="输入主题名称"></Input>
            </Modal>
    </div>
</template>

<script>
import { addTheme, getTheme, deleteTheme, editTheme } from "@/libs/service";
export default {
  data() {
    return {
      data: [],
      editName: "",
      isShowEditModal: false,
      columns: [
        {
          title: "名称",
          render(h, params) {
            return <span>{params.row.attributes.name}</span>;
          }
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
                    this.deleteTheme(params.row.id);
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
    this.getData();
  },
  methods: {
    showEditModal(params) {
      this.isShowEditModal = true;
      this.currentId = params.row.id;
      this.editName = params.row.attributes.name;
    },
    addTheme() {
      this.isShowAddModal = true;
    },
    async confirmEditTheme() {
      let data = await editTheme(this.editName, this.currentId);
      this.$Message.success("修改成功");
      this.getData();
    },
    async confirmAddTheme() {
      let data = await addTheme(this.addName);
      this.$Message.success("添加成功");
      this.addName = "";
      this.getData();
    },
    async getData() {
      let data = await getTheme();
      this.data = data;
    },
    async deleteTheme(id) {
      this.$Modal.confirm({
        content: "确认删除吗",
        onOk: () => {
          deleteTheme(id).then(res => {
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
