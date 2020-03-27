<template>
  <div id="item-header">
    <img :src="gaga.avatar" class="user-avatar" />
    <div class="head-title">
      <div>
        <span class="user-name">{{gaga.nickname}}</span>
        <i class="iconfont icon-icon_copyto" v-if="isCommMe">&nbsp;回复</i>
        <i class="iconfont icon-icon_delete_fill" v-if="isMyComms">&nbsp;删除</i>
        <div class="like-comm" v-if="isComment">
          <span class="like-count">{{gaga.likes}}</span>
          <i class="iconfont icon-xihuan"></i>
        </div>
      </div>
      <span class="pub-time">{{new Date(parseInt(gaga.date)).toLocaleTimeString()}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    isComment: { default: false },
    isCommMe: { default: false },
    isMyComms: { default: false },
    gaga: {
      default: {
        uname: "今日热门生活",
        date: "1583375150049",
        content: "又被自己可爱到了！",
        relay: 300,
        comment: 75,
        like: 225,
        avatar: "jrrmsh.jpg",
        isRelay: true,
        originAuthor: "Cynoan",
        originContent: "又是早起的一天"
      }
    }
  }
};
</script>
<style scoped>
#item-header {
  display: flex;
  height: 42px;
  align-items: center;
  padding: 0 15px;
  justify-content: space-between;
}
.head-title {
  box-sizing: border-box;
  display: flex;
  height: 42px;
  width: 100%;
  margin-left: 10px;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}
.user-avatar {
  box-sizing: border-box;
  flex: none;
  border: 1px solid #aaa;
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.head-title > div {
  display: flex;
  justify-content: space-between;
}
.head-title > div > i {
  font-size: 1rem;
  margin-right: 5px;
}
.user-name {
  font-size: 0.98rem;
  font-weight: bold;
}
.pub-time {
  font-size: 0.8rem;
}
.like-comm {
  display: flex;
  height: 21px;
  line-height: 21px;
}
.like-count {
  font-weight: bold;
  font-size: 0.8rem;
  margin-right: -20px;
}
.like-comm > i {
  display: block;
  width: 40px;
  height: 21px;
  line-height: 21px;
  font-size: 0.98rem;
  font-weight: bold;
  text-align: right;
  padding-right: 5px;
}
</style>