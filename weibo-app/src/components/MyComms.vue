<template>
  <div id="mycomms">
    <notice-body v-for="(gaga,i) of gagas" :key="i" class="item" :gaga="gaga" :isMyComms="true"></notice-body>
  </div>
</template>
<script>
import noticeBody from "./NoticeBody";
export default {
  data() {
    return {
      gagas: [
        {
          uname: "Cynoan",
          date: "1583375150049",
          content:
            "回复<a href='javascript:;' class='at-name'>@Cynoan</a>:你啊个啥子哦",
          avatar: "avatar.jpg",
          commAuthor: "波比",
          commContent: "啊啊啊啊啊啊啊",
          originAuthor: "布朗尼",
          originContent: "上班咯",
          originAvatar: "bln.jpg",
          isComm: true
        },
        {
          uname: "Cynoan",
          date: "1583375150049",
          content: "你是猪哦",
          avatar: "avatar.jpg",
          originAuthor: "波比",
          originContent: "困困困困困困困困困困困困困困困困困困困困困😴",
          originAvatar: "2.jpg",
          isComm: false
        },
        {
          uname: "Cynoan",
          date: "1583375150049",
          content: "你是猪哦",
          avatar: "avatar.jpg",
          originAuthor: "波比",
          originContent: "困困困困困困困困困困困困困困困困困困困困困😴",
          originAvatar: "2.jpg",
          isComm: false
        },
        {
          uname: "Cynoan",
          date: "1583375150049",
          content:
            "回复<a href='javascript:;' class='at-name'>@Cynoan</a>:你啊个啥子哦",
          avatar: "avatar.jpg",
          commAuthor: "波比",
          commContent: "啊啊啊啊啊啊啊",
          originAuthor: "布朗尼",
          originContent: "上班咯",
          originAvatar: "bln.jpg",
          isComm: true
        }
      ]
    };
  },
  components:{
    noticeBody
  }
};
</script>
<style scoped>
#mycomms {
  background-color: #fff;
}
#mycomms > .item {
  box-sizing: border-box;
  margin-top: 10px;
}
</style>