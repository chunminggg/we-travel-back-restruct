<template>
  <div>
    <!-- <div>
      <Button type="primary" @click="addDestination">添加用户</Button>
    </div> -->
    <Form inline>
      <FormItem>
        <Input
          style="width:300px;"
          v-model="searchParams.id"
          placeholder="请输入订单号"
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
      <NewTable
        ref="table"
        :request="request"
        :searchParams="searchParams"
        :columns="columns"
      ></NewTable>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import NewTable from '@/components/newTable';
import {
  getOrders,
  handleOrder
} from "@/libs/service";
export default {
  components: {
    NewTable
  },
  data() {
    return {
      relateId: "",
      editRelateId: "",
      editName: "",
      themeData: [],
      isShowEditModal: false,
      request: getOrders,
      searchParams: {
        id: '',
        phone: ''
      },
      columns: [
        {
          title: '订单号',
          key: 'objectId'
        },
        {
          title: "姓名",
          key: 'name'
        },
        {
          title: "手机号",
          key: 'phoneNumber'
        },
        {
          title: '产品名称',
          render: (h, params) => {
            return <span>{params.row.targetProduct.name}</span>
          }
        },
        {
          title: '价格',
          render: (h, params) => {
            return <span>{params.row.targetProduct.price}</span>
          }
        },
        {
          title: "出发日期",
          key: 'startDate'
        },
        {
          title: '出发城市',
          key: 'startPlace'
        },
        {
          title: '成人数量',
          key: 'firstCount'
        },
        {
          title: '儿童数量',
          key: 'secondCount'
        },
        {
          title: "操作",
          key: "action",
          width: 138,
          render: (h, params) => {
            if (params.row.ifHandle) {
              return <span>已处理</span>
            }
            return (
              <div>
                <i-button
                  type="primary"
                  onClick={() => {
                    this.handle(params.row.objectId);
                  }}
                >
                  标记为已处理
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
  methods: {
    handle(id) {
      handleOrder(id).then(data => {
        this.$refs.table.getTableData();
      });
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
