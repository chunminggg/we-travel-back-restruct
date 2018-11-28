<template>
    <div>
        <kendo-editor :ref="'editor'+idx" :execute="excute" :resizable-content="true" :resizable-toolbar="true" v-model="htmlText" style="height:280px" rows="10" cols="30">
            <Upload action="" :format="['jpg','jpeg','png']" style="display:none"  :before-upload="beforeImageUpload">
                <Button ghost icon="ios-cloud-upload-outline" >Upload files</Button>
            </Upload>
        </kendo-editor>

    </div>
</template>
<script>
import "@progress/kendo-ui";
import "@progress/kendo-theme-default/dist/all.css";

import { Editor } from "@progress/kendo-editor-vue-wrapper";
import { EditorTool } from "@progress/kendo-editor-vue-wrapper";
import { EditorInstaller } from "@progress/kendo-editor-vue-wrapper";
import Vue from "vue";
Vue.use(EditorInstaller);
import { uploadFile } from "@/libs/service";
export default {
  props: ["idx","value"],
  components: {
    Editor
  },
  data() {
    return {
      htmlText: ""
    };
  },
  methods: {
    excute(e) {
      if (e.name == "insertimage") {
        e.preventDefault();
        e.sender.element.find(".ivu-upload-input").click();
      }
    },
    getEditor(){

    },
    async beforeImageUpload(file) {
      let data = await uploadFile(file)
      let url = data.attributes.url;
        this.$refs[`editor${this.idx}`]
          .kendoWidget()
          .paste(`<img src="${url}" />`);
      return false;
    }
  }
};
</script>

<style>
</style>
