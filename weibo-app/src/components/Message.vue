<template>
  <div id="gmsg">
    <ul>
      <li v-for="(func,i) of funcs" :key="i" :id="func.id">
        <router-link :to="{name: func.link, params:{tab:func.tab}}">
          <i :class="'iconfont '+ func.icon"></i>
          <span>{{func.title}}</span>
        </router-link>
      </li>
    </ul>
    <msg-list></msg-list>
  </div>
</template>
<script>
import msgList from "./MsgList";
export default {
  data() {
    return {
      funcs: [
        {
          icon: "icon-icon_at",
          title: "@我的GAGA和评论",
          id: "at",
          link: "Notice",
          tab: "atgaga"
        },
        {
          icon: "icon-icon_message",
          title: "收到的评论",
          id: "comment",
          link: "Notice",
          tab: "commme"
        },
        {
          icon: "icon-xihuan1",
          title: "收到的赞",
          id: "like",
          link: "Notice",
          tab: "likeme"
        },
        {
          icon: "icon-email-fill",
          title: "陌生人消息",
          link: "Home",
          id: "msg",
          tab: ""
        }
      ]
    };
  },
  components: {
    msgList
  }
};
</script>
<style scoped>
#gmsg {
  display: flex;
  flex-direction: column;
}
ul {
  list-style: none;
  margin-top: 15px;
  margin-bottom: 20px;
}
ul > li > a {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  text-decoration: none;
  color: #2c3e50;
}
ul > li:not(:first-child) {
  margin-top: 20px;
}
ul > li i {
  height: 50px;
  width: 50px;
  background: linear-gradient(150deg, #b6e3f0 20%, #656f83 100%);
  font-size: 28px;
  color: #fff;
  border-radius: 50%;
}
ul > #comment i {
  box-sizing: border-box;
  padding-top: 2px;
}
ul > #like i {
  font-size: 25px;
}
ul > #msg i {
  font-size: 32px;
}
ul > li span {
  font-size: 18px;
  margin-left: 10px;
}
</style>