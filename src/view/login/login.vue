<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>

        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import { mapActions } from "vuex";
import { userLogin } from "@/libs/service";
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    async handleSubmit({ userName, password }) {
      try {
        let data = await userLogin(userName, password);
        localStorage.setItem("userName", data.mobilePhoneNumber);
        this.$router.push({
          name: this.$config.homeName
        });
        // this.handleLogin({ userName, password }).then(res => {
        //   this.getUserInfo().then(res => {
        //     this.$router.push({
        //       name: this.$config.homeName
        //     });
        //   });
        // });
      } catch (error) {
        this.$Message.error("登陆失败");
      }
    }
  }
};
</script>

<style>
</style>
