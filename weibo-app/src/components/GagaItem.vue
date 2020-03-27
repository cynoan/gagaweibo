<template>
  <div class="item">
    <gaga-body :gaga="gaga"></gaga-body>
    <div class="item-bottom">
      <div>
        <i class="iconfont icon-zhuanhuan" id="relay" @click.stop="relayIt"></i>
        <span class="count">{{gaga.relay}}</span>
      </div>
      <div>
        <i class="iconfont icon-icon_message" id="comment"></i>
        <span class="count">{{gaga.comment}}</span>
      </div>
      <div>
        <i
          :class="isLike?'iconfont icon-xihuan1':'iconfont icon-xihuan'"
          id="like"
          @click.stop="likeIt()"
          :gid="gaga.gid"
        ></i>
        <span class="count">{{likeNum}}</span>
      </div>
      <div>
        <i class="iconfont icon-star" id="star"></i>
      </div>
    </div>
  </div>
</template>
<script>
import gagaBody from "./GagaBody";
export default {
  data() {
    return {
      isLike: "",
      likeNum: "",
    };
  },
  components: {
    gagaBody
  },
  props: {
    gaga: { default: "" }
  },
  created() {
    this.isLike = this.gaga.isLike;
    this.likeNum = this.gaga.likes;
  },
  methods: {
    likeIt() {
      var likeIcon = document.querySelector(`i#like[gid='${this.gaga.gid}']`);
      var data = "";
      if (!this.isLike) {
        likeIcon.style.animation = "like 0.15s";
        likeIcon.addEventListener("webkitAnimationEnd", () => {
          likeIcon.style.animation = "";
        });
        this.likeNum += 1;
        data = this.qs.stringify({
          gid: this.gaga.gid,
          uid: this.$store.state.uid,
          date: new Date().getTime(),
          state: 1
        });
      } else {
        this.likeNum -= 1;
        data = this.qs.stringify({
          gid: this.gaga.gid,
          uid: this.$store.state.uid,
          state: 0
        });
      }
      this.axios
        .post("/upload/newlike", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
      this.isLike = !this.isLike;
    },
    relayIt() {
      this.$emit("relay", 
        {
          gid:this.gaga.gid,
          uid:this.gaga.uid,
          content:this.gaga.content,
          nickname:this.gaga.nickname,
          avatar:this.gaga.avatar,
          originAuthor: this.gaga.originAuthor,
          originContent: this.gaga.originContent,
          originAvatar: this.gaga.originAvatar,
          originGid: this.gaga.originGid,
          originUid: this.gaga.originUid,
          latestGid: this.gaga.latestGid,
          isRelay: 1
        }
      );
    }
  }
};
</script>
<style scoped>
.item {
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  margin-top: 4px;
}
.item >>> .txt {
  line-height: 24px;
}
.item-bottom {
  display: flex;
  height: 1.875rem;
  padding-left: 71px;
  margin-bottom: 8px;
  margin-top: 8px;
}
.item-bottom > div {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
}
.item-bottom > div > i {
  position: absolute;
  font-size: 1.125rem;
  text-align: center;
  line-height: 1.875rem;
  width: 1.875rem;
}
.item-bottom #relay {
  font-size: 0.96rem;
}
.item-bottom #comment {
  font-size: 1.05rem;
}
.item-bottom #like {
  font-size: 0.95rem;
  font-weight: bold;
  opacity: 0.8;
}
.item-bottom #star {
  font-size: 1.2rem;
}
.item-bottom > div > span {
  font-size: 1rem;
  font-weight: normal;
  opacity: 1;
  line-height: 1.875rem;
  margin-left: 1.75rem;
}
.icon-xihuan1:before {
  color: #cf0000;
}
</style>