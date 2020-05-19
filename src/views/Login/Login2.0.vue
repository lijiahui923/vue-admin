<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)">{{item.text}}</li>
      </ul>
      <!-- 表单start -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text"  v-model="ruleForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input type="password" minlength="6" maxlength="20" v-model="ruleForm.password" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-form" v-if="model === 'register'">
          <label>确认密码</label>
          <el-input type="password" minlength="6" maxlength="20" v-model="ruleForm.passwords" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6" clearable></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/**
@description:登录页面
@createTime:2020-05-13
@create:lijiahui
*/
import { stripscript, validateEmail, validatePassword, validateCode } from 'utils/validate';
export default {
  name: 'Login',
  props: {},
  components: {},
  data() {
    let checkusername = (rule, value, callback) => {
      // this.ruleForm.username = stripscript(value);
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!validateEmail(value)) {
        callback(new Error('邮箱格式不正确!'));
      } else {
        callback();
      }
    };
    let checkpassword = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value);
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (!validatePassword(value)) {
          callback(new Error('请输入6至20位的字母+数字的密码!'));
        }
        callback();
      }
    };
    let checkpasswords = (rule, value, callback) => {
      this.ruleForm.passwords = stripscript(value);
      if (value === '') {
        callback(new Error('请输入确认密码'));
      } else {
        if (value !== this.ruleForm.password) {
          callback(new Error('两次密码不一致!'));
        }
        callback();
      }
    };
    let checkcode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (!validateCode(value)) {
        callback(new Error('验证码格式错误'));
      } else {
        callback();
      }
    };
    return {
      model: 'login',
      menuTab: [
        { id: 1, text: '登录', current: true, type: 'login' },
        { id: 2, text: '注册', current: false, type: 'register' }
      ],
      ruleForm: {
        username: '',
        password: '',
        passwords: '',
        code: ''
      },
      rules: {
        username: [{ validator: checkusername, trigger: 'blur' }],
        password: [{ validator: checkpassword, trigger: 'blur' }],
        passwords: [{ validator: checkpasswords, trigger: 'blur' }],
        code: [{ validator: checkcode, trigger: 'blur' }]
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    // 设置高光
    toggleMenu (data) {
      this.menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
      this.model = data.type;
      this.$refs.ruleForm.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  color: #fff;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    border-radius: 2px;
  }
  .current {
    background-color: rgba( 0,0,0,.1);
  }
}
.login-form {
  label {
    display: block;
    border-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block{
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
