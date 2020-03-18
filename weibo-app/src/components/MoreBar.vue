<template>
  <div id="morebar">
    <div id="myself">
      <img src="../assets/avatar.jpg" id="user_avatar" />
      <span id="user_name">Cynoan</span>
      <div>
        <p id="intro">欢迎关注/苍南人/不是专门发摄影的账号/喜欢摄影后期剪辑/MADer/会修手机/没钱玩数码了</p>
      </div>
    </div>
    <ul>
      <li v-for="(item,i) of moreList" :key="i" @click="closeMask()">
        <router-link :to="item.to" class="link">
          <i :class="'iconfont '+item.pic"></i>
          <span>{{item.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  mounted() {},
  data() {
    return {
      moreList: [
        {
          pic: "icon-icon_message_fill",
          title: "我的评论和赞",
          to: "/MyCommsAndLikes"
        },
        { pic: "icon-icon_star_fill", title: "收藏", to: "/MyFavorites" },
        // { pic: "icon-icon_invite_fill", title: "草稿箱", to: "/" },
        { pic: "icon-icon_work_fill", title: "设置", to: "/" },
        { pic: "icon-dengchu-box-kuai", title: "退出账户", to: "/" }
      ]
    };
  },
  methods: {
    closeMask() {
      this.obj.more.style.transform = "rotate(0)";
      this.obj.more.style.animation = "";
      this.obj.morebar.style.left = "-300px";
      this.obj.morebar.style.boxShadow = "none";
      this.obj.morebar.style.display = "none";
      this.obj.mask.style.display = "none";
    }
  },
  props:{
    obj:{ default:{} }
  }
};
</script>
<style scoped>
#morebar {
  display: none;
  box-sizing: border-box;
  position: absolute;
  width: 300px;
  height: 100vh;
  box-shadow: none;
  top: 0;
  left: -300px;
  z-index: 999;
  background-color: #f3f5f5;
}
#myself {
  display: flex;
  flex-flow: column nowrap;
  width: 300px;
  height: 213px;
  background: linear-gradient(150deg, #59d4f7 20%, #315ba8 100%);
  text-align: center;
}
#user_avatar {
  width: 70px;
  height: 70px;
  margin: 30px auto 10px;
  border-radius: 50%;
  box-shadow: 0 0 10 -5px #f2f2f2;
}
#user_name {
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  letter-spacing: 1px;
}
#myself > div:last-child {
  display: flex;
  align-items: center;
  height: 50px;
  margin-top: 10px;
  padding: 0 15px;
}
#intro {
  height: 44px;
  overflow: hidden;
  color: #ffffff;
  text-align: left;
  line-height: 22px;
  font-size: 14px;
  letter-spacing: 1px;
}
ul {
  padding-top: 10px;
  padding-left: 0;
  list-style: none;
}
ul > li > .link {
  display: flex;
  justify-content: left;
  align-items: center;
  line-height: 50px;
  height: 50px;
  margin: 10px 0;
  padding-left: 5px;
}
ul > li > .link i {
  font-size: 28px;
  margin: 0 15px;
}
ul > li > .link span {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  color: #333333;
}
</style>