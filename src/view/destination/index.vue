<template>
    <div>
        <div>
            <Button type="primary" @click="addDestination">添加目的地</Button>
        </div>
        <div style="margin-top:10px;">
            <Table :columns="columns" :data="data"></Table>
        </div>
        <Modal title="添加目的地" v-model="isShowAddModal" @on-ok="confirmaddDestination">
            <Input v-model="addName" placeholder="输入目的地名称"></Input>
            <Select v-model="relateId" placeholder="关联分类" clearable style="margin-top:10px">
                <Option v-for="item in themeData" :key="item.id" :value="item.id">
                    {{item.attributes.name}}
                    </Option>
            </Select>
            </Modal>
             <Modal title="编辑目的地" v-model="isShowEditModal" @on-ok="confirmeditDestination">
            <Input v-model="editName" placeholder="输入目的地名称"></Input>
             <Select v-model="relateId" clearable style="margin-top:10px">
                <Option v-for="item in themeData" :key="item.id" :value="item.id">
                    {{item.attributes.name}}
                    </Option>
            </Select>
            </Modal>
    </div>
</template>

<script>
import {
  addDestination,
  getDestination,
  deleteDestination,
  editDestination,
  getTheme
} from "@/libs/service";
export default {
  data() {
    return {
      relateId: "",
      editRelateId: "",
      data: [],
      editName: "",
      themeData: [],
      isShowEditModal: false,
      columns: [
        {
          title: "名称",
          render:(h, params)=> {
            return <span>{params.row.attributes.name}</span>;
          }
        },
        {
            title:'关联分类',
            render:(h,params)=>{
                let name = ''
                this.themeData.map(item =>{
                    if (item.id == params.row.attributes.targetType.id) {
                        name = item.attributes.name
                    }
                })
                return (<span>{name}</span>)
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
                    this.deleteDestination(params.row.id);
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
    this.getThemeData();
    this.getData();
  },
  methods: {
    async getThemeData() {
      let data = await getTheme();
      this.themeData = data;
      this.relateId = this.themeData[0].id
    },
    showEditModal(params) {
      this.isShowEditModal = true;
      this.currentId = params.row.id;
      this.editRelateId = params.row.attributes.targetType.id
      this.editName = params.row.attributes.name;
    },
    addDestination() {
      this.isShowAddModal = true;
    },
    async confirmeditDestination() {
      let data = await editDestination(this.editName, this.currentId,this.editRelateId);
      this.$Message.success("修改成功");
      this.getData();
    },
    async confirmaddDestination() {
      let data = await addDestination(this.addName,this.relateId);
      this.$Message.success("添加成功");
      this.addName = "";
      this.getData();
    },
    async getData() {
      let data = await getDestination();
      this.data = data;
    },
    async deleteDestination(id) {
      this.$Modal.confirm({
        content: "确认删除吗",
        onOk: () => {
          deleteDestination(id).then(res => {
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
