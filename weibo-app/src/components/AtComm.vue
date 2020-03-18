<template>
  <div id="atcomm">
    <notice-body v-for="i of 8" :key="i" class="item" :gaga="gaga"></notice-body>
  </div>
</template>
<script>
import noticeBody from "./NoticeBody";
export default {
  data() {
    return {
      gaga: {
        uname: "波比",
        date: "1583375150049",
        content:
          "<a href='javascript:;' class='at-name'>@Cynoan </a>都几点了还早",
        avatar: "2.jpg",
        originAuthor: "Cynoan",
        originAvatar: "avatar.jpg",
        originContent: "又是早起的一天",
        at: "Cynoan"
      }
    };
  },
  props: {
    atcomms: { default: "" }
  },
  components:{
    noticeBody
  }
};
</script>
<style scoped>
#atcomm {
  background-color: #fff;
}
#atcomm > .item {
  box-sizing: border-box;
  margin-top: 10px;
}
</style>