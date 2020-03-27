<template>
  <div>
    <h1>上传测试</h1>
    <div class="upload-container">
      <div class="imgBox">
        <input type="file" class="inputstyle" name="file" @change="PreviewImage" />
        <img :src="imageUrl" alt class="fileImg" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: "",
      imageUrl: ""
    };
  },
  mounted() {
    this.axios
      .get("/upload/token")
      .then(res => {
        this.token = res.data.data.token;
        console.log(this.token);
      })
      .catch(err => {
        console.error(err);
      });
  },
  methods: {
    //          上传头像
    PreviewImage(event) {
      var addr = "http://q7fplcgtx.bkt.clouddn.com/image/";

      let url = "http://upload-z2.qiniu.com/";
      let param = new FormData(); //创建form对象
      param.append("file", event.target.files[0]); //通过append向form对象添加数据
      param.append("token", this.token); //添加form表单中其他数据
      let options = {
        headers: { "Content-Type": "multipart/form-data" }
      }; //添加请求头

      this.axios
        .post(url, param, options)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style scoped>
</style>