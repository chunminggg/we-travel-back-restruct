(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-615f4de8"],{"0eb4":function(t,e,n){},"35f5":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("error-content",{attrs:{code:"404",desc:"Oh~~您的页面好像飞走了~",src:t.src}})},c=[],o=n("c436"),s=n.n(o),a=n("9454"),i={name:"error_404",components:{errorContent:a["a"]},data:function(){return{src:s.a}}},u=i,l=n("048f"),f=Object(l["a"])(u,r,c,!1,null,null,null);f.options.__file="404.vue";e["default"]=f.exports},9454:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"error-page"},[n("div",{staticClass:"content-con"},[n("img",{attrs:{src:t.src,alt:"404"}}),n("div",{staticClass:"text-con"},[n("h4",[t._v(t._s(t.code))]),n("h5",[t._v(t._s(t.desc))])]),n("back-btn-group",{staticClass:"back-btn-group"})],1)])},c=[],o=(n("0eb4"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Button",{attrs:{size:"large",type:"text"},on:{click:t.backHome}},[t._v("返回首页")]),n("Button",{attrs:{size:"large",type:"text"}},[t._v("返回上一页("+t._s(t.second)+"s)")])],1)}),s=[],a=(n("aba3"),{name:"backBtnGroup",data:function(){return{second:5,timer:null}},methods:{backHome:function(){this.$router.replace({name:this.$config.homeName})},backPrev:function(){this.$router.go(-1)}},mounted:function(){var t=this;this.timer=setInterval(function(){0===t.second?t.backPrev():t.second--},1e3)},beforeDestroy:function(){clearInterval(this.timer)}}),i=a,u=n("048f"),l=Object(u["a"])(i,o,s,!1,null,null,null);l.options.__file="back-btn-group.vue";var f=l.exports,d={name:"error_content",components:{backBtnGroup:f},props:{code:String,desc:String,src:String}},p=d,v=Object(u["a"])(p,r,c,!1,null,null,null);v.options.__file="error-content.vue";e["a"]=v.exports},aba3:function(t,e,n){n("9add")("replace",2,function(t,e,n){return[function(r,c){"use strict";var o=t(this),s=void 0==r?void 0:r[e];return void 0!==s?s.call(r,o,c):n.call(String(o),r,c)},n]})},c436:function(t,e,n){t.exports=n.p+"img/error-404.94756dcf.svg"}}]);
//# sourceMappingURL=chunk-615f4de8.2eda1c34.js.map