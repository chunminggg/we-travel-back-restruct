(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b839720"],{"43b2":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Table",{attrs:{columns:t.columns,data:t.data}}),n("Page",{staticStyle:{"margin-top":"10px"},attrs:{total:t.total},on:{"on-change":t.pageChange}})],1)},r=[],i=(n("20a2"),n("b5aa"),n("4aee")),c=n("0e98"),o={data:function(){var t=this;this.$createElement;return{total:0,columns:[{key:"name",title:"名称"},{title:"操作",render:function(e,n){return e("a",{style:"color:red",on:{click:function(){t.deleteItem(n)}}},["删除"])}},{title:"操作",render:function(e,n){return e("a",{on:{click:function(){t.editItem(n)}}},["编辑"])}}],data:[]}},mounted:function(){this.getData()},methods:{getData:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["k"])();case 2:e=t.sent,this.data=e.map(function(t){return Object.assign(t.attributes,{id:t.id})});case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),deleteItem:function(t){var e=this;this.$Modal.confirm({title:"删除",content:"确认删除该条数据吗？",onOk:function(){Object(c["e"])(t.row.id).then(function(t){e.getData(),e.$Message.success("删除成功")},function(t){e.$Message.error("删除失败")})}})},editItem:function(t){this.$router.push("edit_product/".concat(t.row.id))},pageChange:function(t){}}},u=o,s=(n("47fc"),n("048f")),l=Object(s["a"])(u,a,r,!1,null,null,null);l.options.__file="drag-list.vue";e["default"]=l.exports},"47fc":function(t,e,n){"use strict";var a=n("9362"),r=n.n(a);r.a},9362:function(t,e,n){}}]);
//# sourceMappingURL=chunk-4b839720.7409775b.js.map