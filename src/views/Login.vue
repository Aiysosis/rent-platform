<template>
  <div class="login">
    <el-dialog title="Tips" :visible="dialogVisible" width="30%">
      <span>展示页面使用Mock模拟数据，您可以随意输入用户名和密码并直接点击登录，我们会随机生成用户信息用作展示。</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">Cool</el-button>
      </span>
    </el-dialog>
    <div class="login-box wow fadeInLeft">
      <div class="left">
        <div class="head-bar">
          <div class="icon" @click="goBack()"></div>
        </div>
        <div class="main">
          <div class="main-title">Login</div>
          <div class="main-form">
            <input :class="{ 'login-input': true, 'login-input-err': this.userNameErr }" placeholder="Username" @focus="resetErr" v-model="userName" />
            <div class="input-check" v-show="userNameErr">{{ this.userNameInfo }}</div>
            <input :class="{ 'login-input': true, 'login-input-err': this.pswErr }" placeholder="Password" type="password" @focus="resetErr" v-model="password" />
            <div class="input-check" v-show="pswErr">{{ this.pswInfo }}</div>
          </div>
          <div class="main-lower">
            <div class="login-btn" @click="login()">Login</div>
            <div class="register" @click="goRegister()">Register</div>
          </div>
        </div>
        <div class="bottom">
          <div class="bottom-text"></div>
          <div class="bottom-text">Contact us</div>
        </div>
      </div>
      <div class="right">
        <div class="title">Find Anything You Need</div>
        <div class="content">Eiusmod temporl incididunt utys labore dolore magna aliqua sed enimaud lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </div>
    </div>
  </div>
</template>

<script>
import { WOW } from "wowjs";
import API from "../service/index.js";
var qs = require("qs");
export default {
  mounted() {
    this.$nextTick(() => {
      // 在dom渲染完后,再执行动画
      const wow = new WOW({
        live: false,
      });
      wow.init();
    });
  },
  data() {
    return {
      userNameInfo: "", //用户名错误提示
      pswInfo: "", //密码错误提示
      userName: "",
      password: "",
      dialogVisible: true,
    };
  },
  computed: {
    userNameErr: function () {
      return this.userNameInfo != "";
    },
    pswErr: function () {
      return this.pswInfo != "";
    },
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    goRegister() {
      this.$router.push("/register");
    },
    login() {
      if (this.userName == "") {
        this.userNameInfo = "用户名不能为空";
        return;
      }
      if (this.password == "") {
        this.pswInfo = "请输入密码";
        return;
      }

      let data = {
        nickName: this.userName,
        password: this.password,
      };

      API.user
        .login(data)
        .then((res) => {
          console.log(res);
          if (res.data.code === -1) {
            this.pswInfo = "用户名或密码错误";
          } else {
            let token = res.data.token;
            API.user.getInfo(token).then((res) => {
              const user = res.data;
              this.$store.commit("LOGIN", token); //mutation LOGIN
              this.$store.commit("USER", user);
              this.$store.commit("LOGIN"); //mutation LOGIN
              let redirect = decodeURIComponent(this.$route.query.redirect || "/");
              this.$router.push(redirect);
            });
          }
        })
        .catch((err) => {
          this.pswInfo = "用户名或密码错误";
          console.log(err);
        });
    },

    resetErr() {
      this.userNameInfo = "";
      this.pswInfo = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  background-color: whitesmoke;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //overflow-x: hidden;
  .login-box {
    height: 600px;
    width: 960px;
    border-radius: 15px;
    background-color: gray;
    display: flex;
    flex-direction: row;
    .left {
      height: 100%;
      width: 35%;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .head-bar {
        width: 100%;
        height: 35px;
        padding-top: 10px;
        padding-left: 10px;
        .icon {
          height: 25px;
          width: 25px;
          background-image: url("../assets/back.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transition: all 0.3s ease;

          &:hover {
            transform: scale(1.2);
          }
        }
      }

      .main {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-left: 12%;
        padding-right: 12%;
        margin-bottom: 50px;
        transition: all 0.3s ease;
        .main-title {
          font-size: 34px;
          color: rgb(49, 49, 49);
          //margin-bottom: 20px;
        }
        .main-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          .login-input {
            width: 100%;
            height: 44px;
            border-radius: 22px;
            outline: none;
            border: 1px solid #e5e5e5;
            margin-top: 20px;
            transition: 0.2s ease-in-out;
            font-size: 15px;
            color: #222222;
            padding-left: 20px;
            padding-right: 10px;
            transition: all 0.3s ease;
            &:focus {
              border: #2f80eb 1px solid;
            }
          }

          .login-input-err {
            border: #eb3c2f 1px solid;
          }

          .input-check {
            user-select: none;
            width: 100%;
            padding-left: 20px;
            margin-top: 3px;
            font-size: 0.3rem;
            color: rgb(248, 52, 52);
          }
        }

        .main-lower {
          //padding-left: 10px;
          padding-right: 10px;
          margin-top: 20px;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          .register {
            user-select: none;
            font-size: 13px;
            color: gray;
            transition: all 0.3s ease;

            &:hover {
              color: #276ac2;
            }
          }
          .login-btn {
            user-select: none;
            width: 80px;
            height: 36px;
            border-radius: 18px;
            font-size: 15.6px;
            background-color: #2f80eb;
            color: white;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-right: 20px;
            transition: all 0.3s ease;

            &:hover {
              background-color: #276ac2;
            }
          }
        }
      }

      .bottom {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 12%;
        padding-right: 12%;
        padding-bottom: 15px;
        .bottom-text {
          user-select: none;
          font-size: 13px;
          color: gray;
          transition: all 0.3s ease;

          &:hover {
            color: #276ac2;
          }
        }
      }
    }
    .right {
      height: 100%;
      width: 65%;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      background-color: lightblue;
      background-image: url("../assets/img/bg-banner-custome.jpg");
      background-size: cover;
      background-position: 80% 50%;
      background-repeat: no-repeat;
      padding: 30px;
      padding-left: 40px;
      .title {
        font-size: 30px;
        margin-top: 20%;
      }
      .content {
        margin-top: 25px;
        color: gray;
        font-size: 15.6px;
        width: 300px;
      }
    }
  }
}
</style>
