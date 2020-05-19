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
              <el-button type="success" class="block" @click="getSms">获取验证码</el-button>
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
import { GetSms } from 'api/login/login';
import { reactive, ref, onMounted } from '@vue/composition-api';
import { stripscript, validateEmail, validatePassword, validateCode } from 'utils/validate';
export default {
  name: 'Login',
  setup (props, { refs }) {
    let checkusername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!validateEmail(value)) {
        callback(new Error('邮箱格式不正确!'));
      } else {
        callback();
      }
    };
    let checkpassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
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
      ruleForm.passwords = stripscript(value);
      if (value === '') {
        callback(new Error('请输入确认密码'));
      } else {
        if (value !== ruleForm.password) {
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
    const model = ref('login');
    const menuTab = reactive([
        { id: 1, text: '登录', current: true, type: 'login' },
        { id: 2, text: '注册', current: false, type: 'register' }
      ]);
    const rules = reactive({
        username: [{ validator: checkusername, trigger: 'blur' }],
        password: [{ validator: checkpassword, trigger: 'blur' }],
        passwords: [{ validator: checkpasswords, trigger: 'blur' }],
        code: [{ validator: checkcode, trigger: 'blur' }]
      });
      const ruleForm = reactive({
        username: '',
        password: '',
        passwords: '',
        code: ''
      });
    /**
     * 生命周期
     */
    // 挂载完成后
    onMounted(() => {});
    /**
     * 声明函数
     */
    const toggleMenu = (data => {
      menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
      model.value = data.type;
    });
    const submitForm = ( formName => {
      refs[formName].validate((valid) => {
        console.log(valid);
        // if (valid) {
        //   alert('submit!');
        // } else {
        //   console.log("error submit!!");
        //   return false;
        // }
      });
    });
    const getSms = ( () => {
      GetSms();
    });
    return {
      // 属性
      menuTab,
      model,
      rules,
      ruleForm,
      //方法
      toggleMenu,
      submitForm,
      getSms
    }
  },
  props: {},
  components: {},
  computed: {},
  watch: {}
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
