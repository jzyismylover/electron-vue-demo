
<template>
  <div class="login-container">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm login-form"
      label-position="left"
    >
      <h3 class="title">数据挖掘平台</h3>
      <el-form-item prop="user">
        <el-input
          placeholder="请输入用户名"
          v-model="ruleForm.user"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="pass" type="password">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          show-password
          ><i class="el-icon-lock" slot="prefix"></i
        ></el-input>
      </el-form-item>
      <el-link type="info" class="link" @click="$router.push('/regist')"
        >点击注册</el-link
      >
      <div style="clear: both"></div>
      <el-form-item>
        <el-button type="success" class="btn" @click="login">登录</el-button>
        <el-button type="primary" class="btn" @click="resetForm('ruleForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        user: "",
        pass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    login() {
      this.$router.push("/main");
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;
    input {
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #454545;
    text-align: center;
  }
  .btn {
    margin: 0 5px;
    width: 47%;
  }
}

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  .login-form {
    /*position: absolute;
    left: 0;
    right: 0;*/
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 80px auto;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>

<style>
.link {
  float: right;
  margin-bottom: 20px;
}
</style>
