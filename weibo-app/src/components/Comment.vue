<template>
  <div id="comment">
    <gaga-body
      v-for="(comm,i) of comms"
      :key="i"
      :isComment="true"
      :gaga="comm"
      @click.native="showActions(comm)"
    ></gaga-body>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>
<script>
import gagaBody from "./GagaBody";
export default {
  data() {
    return {
      actions: [
        { name: "回复", method: () => { this.showWrite()} },
        { name: "转发", method: () => {} },
        { name: "复制", method: () => {} }
      ],
      sheetVisible: false,
      selectComm: ""
    };
  },
  created() {
    
  },
  components: {
    gagaBody
  },
  props: {
    comms: { default: "" }
  },
  methods: {
    showActions(comm) {
      this.selectComm = comm;
      this.sheetVisible = !this.sheetVisible;
    },
    showWrite() {
      this.$emit("commComm", this.selectComm);
    }
  }
};
</script>
<style scoped>
#comment >>> .user-name {
  font-weight: normal;
}
#comment >>> .txt {
  line-height: 18px !important;
}
#comment > #gbody {
  border-bottom: 1px solid #ccc;
}
</style>