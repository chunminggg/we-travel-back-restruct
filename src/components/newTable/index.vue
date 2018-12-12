<template>
  <div>
    <Table
      :loading="loading"
      :data="data"
      ref="table"
      border
      v-bind="$attrs"
      v-on="$listeners"
    ></Table>
    <div v-if="!noPage">
      <Page
        show-total
        class="tablePage"
        :current="pageParams.pageIndex"
        :total="total"
        @on-change="pageChange"
      ></Page>
      <!-- <Page
        show-total
        class="tablePage"
        :current="pageParams.pageIndex"
        :total="total"
        @on-change="pageChange"
        :page-size="1"
      ></Page> -->
    </div>
  </div>
</template>

<script>

export default {
  inheritAttrs: false,
  props: {
    // axios请求的promise
    request: {
      type: Function,
      required: true
    },
    searchParams: {
      type: Object
    },
    noPage: {
      type: Boolean,
      default: false
    },
  },
  created() {
    this.getTableData();
  },
  watch: {
    searchParams(a, b) {
      console.log('变化', a, b);
    }
  },
  methods: {
    // 默认回到第一页
    getTableData(index) {
      if (!index) {
        this.pageParams.pageIndex = 1;
      }
      // this.request(this.searchParams).then(d => {
      //   const data = d.map(v => v.toJSON());
      //   debugger
      //   this.total = data.TotalCount || data.totalCount || data.totalcount;
      //   this.loading = false;
      // });
      this.request(this.searchParams, this.pageParams.pageIndex).then((arr) => {
        this.total = arr[0];
        this.data = arr[1].map(v => v.toJSON());
        this.loading = false;
      }
      );
    },
    pageChange(index) {
      this.pageParams.pageIndex = index;
      this.getTableData(index);
    },
  },
  data() {
    return {
      data: [],
      total: 0,
      pageParams: {
        pageIndex: 1
      },
      loading: false
    };
  }
};
</script>

<style scoped>
  .tablePage{
    float: right;
    margin-top: 10px;
  }
</style>
