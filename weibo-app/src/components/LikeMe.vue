<template>
  <div id="likeme">
    <notice-body v-for="(gaga,i) of gagas" :key="i" class="item" :gaga="gaga" :isLikeMe="true"></notice-body>
  </div>
</template>
<script>
import noticeBody from "./NoticeBody";
export default {
  data() {
    return {
      gagas: [
        {
          uname: "波比",
          date: "1583375150049",
          avatar: "2.jpg",
          commAuthor: "Cynoan",
          commContent: "啊啊啊啊啊啊啊",
          originAuthor: "布朗尼",
          originContent: "上班咯",
          originAvatar: "bln.jpg",
          isComm: true
        },
        {
          uname: "波比",
          date: "1583375150049",
          avatar: "2.jpg",
          originAuthor: "Cynoan",
          originContent: "困困困困困困困困困困困困困困困困困困困困困😴",
          originAvatar: "avatar.jpg",
          isComm: false
        },
        {
          uname: "波比",
          date: "1583375150049",
          avatar: "2.jpg",
          originAuthor: "Cynoan",
          originContent: "困困困困困困困困困困困困困困困困困困困困困😴",
          originAvatar: "avatar.jpg",
          isComm: false
        },
        {
          uname: "波比",
          date: "1583375150049",
          avatar: "2.jpg",
          commAuthor: "Cynoan",
          commContent: "啊啊啊啊啊啊啊",
          originAuthor: "布朗尼",
          originContent: "上班咯",
          originAvatar: "bln.jpg",
          isComm: true
        },
      ]
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
#likeme {
  background-color: #fff;
}
#likeme > .item {
  box-sizing: border-box;
  margin-top: 10px;
}
</style>