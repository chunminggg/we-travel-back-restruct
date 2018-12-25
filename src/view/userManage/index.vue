<template>
  <div>
    <!-- <div>
      <Button type="primary" @click="addDestination">添加用户</Button>
    </div> -->
    <Form inline>
      <FormItem>
        <Input
          style="width:300px;"
          v-model="searchParams.name"
          placeholder="请输入姓名"
        ></Input>
      </FormItem>
      <FormItem>
        <Input
          style="width:300px;"
          v-model="searchParams.phone"
          placeholder="请输入手机号"
        ></Input>
      </FormItem>
      <FormItem>
        <Button @click="handleSearch">查询</Button>
      </FormItem>
    </Form>
    <div style="margin-top:10px;">
      <!-- <Table
        :columns="columns"
        :data="userData"
      ></Table>
      <Page
        show-total
        class="tablePage"
        :current="current"
        :total="total"
        @on-change="pageChange"
      ></Page> -->
      <NewTable
        ref="table"
        :request="request"
        :searchParams="searchParams"
        :columns="columns"
      ></NewTable>
    </div>
    <!-- <Modal title="添加用户" v-model="isShowAddModal" @on-ok="confirmaddDestination">
      <Input v-model="addName" placeholder="输入订单名称"></Input>
    </Modal> -->
    <!-- <Modal
      title="编辑姓名"
      v-model="isShowEditModal"
      @on-ok="sureEdit"
    >
      <Input
        v-model="editName"
        placeholder="输入姓名"
      ></Input>
    </Modal> -->
  </div>
</template>

<script>
import moment from 'moment';
import NewTable from '@/components/newTable';
import {
  getUsers,
  deleteUser,
  changeUserType
} from "@/libs/service";
export default {
  components: {
    NewTable
  },
  data() {
    return {
      relateId: "",
      editRelateId: "",
      userData: [],
      editName: "",
      themeData: [],
      isShowEditModal: false,
      request: getUsers,
      searchParams: {
        name: '',
        phone: ''
      },
      columns: [
        {
          title: "名称",
          key: 'name'
        },
        {
          title: "商户名称",
          key: 'sellerName'
        },
        {
          title: "手机号",
          key: 'mobilePhoneNumber'
        },
        {
          title: '注册时间',
          key: 'createdAt',
          render: (h, params) => {
            return <span>{moment(params.row.createdAt).format('YYYY-MM-DD HH:ss')}</span>
          }
        }, {
          title: "账户类型",
          key: "action",
          render: (h, params) => {
            const ifSeller = params.row.ifSeller;
            return (
              <button-group>
                <i-button
                  onClick={() => {
                    changeUserType(params.row.objectId, false).then(d => this.handleSearch());
                  }}
                  type={!ifSeller ? "primary" : null}
                >
                  普通用户
                    </i-button>
                <i-button
                  onClick={() => {
                    changeUserType(params.row.objectId, true).then(d => this.handleSearch());
                  }}
                  type={ifSeller ? "primary" : null}
                >
                  商户
                    </i-button>
              </button-group>
            );
          }
        }
        // {
        //   title: "操作",
        //   key: "action",
        //   render: (h, params) => {
        //     return (
        //       <div>
        //         <i-button
        //           type="error"
        //           onClick={() => {
        //             this.delete(params.row.objectId);
        //           }}
        //         >
        //           删除
        //         </i-button>
        //         <i-button
        //           type="primary"
        //           style="margin-left:10px"
        //           onClick={() => {
        //             this.showEditModal(params);
        //           }}
        //         >
        //           编辑
        //         </i-button>
        //       </div>
        //     );
        //   }
        // }
      ],
      isShowAddModal: false,
      addName: "",
      currentId: null
    };
  },
  methods: {
    pageChange(index) {
      this.current = index;
      this.loading = true;
      this.$emit("on-change", index);
    },
    handleSearch() {
      this.$refs.table.getTableData();
    },
    showEditModal(params) {
      this.isShowEditModal = true;
      this.currentId = params.row.objectId;
      this.editName = params.row.name;
    },
    // addDestination() {
    //   this.isShowAddModal = true;
    // },
    // async sureEdit() {
    //   let data = await editDestination(
    //     this.editName,
    //     this.currentId,
    //     this.editRelateId
    //   );
    //   this.$Message.success("修改成功");
    //   this.getUsers();
    // },
    // async confirmaddDestination() {
    //   let data = await addDestination(this.addName, this.relateId);
    //   this.$Message.success("添加成功");
    //   this.addName = "";
    //   this.getUsers();
    // },
    // async delete(objectId) {
    //   this.$Modal.confirm({
    //     content: "确认删除吗",
    //     onOk: () => {
    //       deleteUser(objectId).then(res => {
    //         this.getUsers();
    //         this.$Message.success("删除成功");
    //       });
    //     }
    //   });
    // }
  }
};
</script>

<style>
</style>
