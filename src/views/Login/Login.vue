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
            <el-col :span="14">
              <el-input v-model="ruleForm.code" minlength="6" maxlength="6" clearable></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="success" class="block" @click="getSms" :disabled="codeText.status">{{codeText.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block" :disabled="submitDisabled">{{model === "login" ? "登录" : "注册"}}</el-button>
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
// 加密不可逆
import sha1 from 'js-sha1';
import { GetSms, Register, Login } from 'api/login/login';
import { reactive, ref, onMounted } from '@vue/composition-api';
import { stripscript, validateEmail, validatePassword, validateCode } from 'utils/validate';
export default {
  name: 'Login',
  setup (props, { refs, root }) {
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
    const submitDisabled = ref(true);
    const codeText = reactive({
      status: false,
      text: '获取验证码'
    });
    const timer = ref(null);
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
    /************************************************************************************************************************************************************************
     * 声明函数
     */
    // 切换tab
    const toggleMenu = (data => {
      menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
      model.value = data.type;
      // 清空表单
      refs.ruleForm.resetFields();
      // 重置状态
      clearCountDown();
    });
    // 登录注册
    const submitForm = ( formName => {
      refs[formName].validate((valid) => {
        if (valid) {
          model.value === 'login'? login() : register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    });
    // 注册
    const register = ( () => {
      let registerData ={
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: model.value
      };
      Register(registerData).then(response => {
        root.$message({
          message: response.data.message,
          type: 'success'
        });
        toggleMenu(menuTab[0]);
        clearCountDown();
      }).catch(error => {
        console.log(error);
      });
    });
    // 登录
    const login = ( () => {
      let loginData ={
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code
      };
      Login(loginData).then(response => {
        root.$message({
          message: response.data.message,
          type: 'success'
        });
        root.$router.push({name:'Main'});
      }).catch(error => {
        console.log(error);
      });
    });
    // 获取验证码
    const getSms = ( () => {
      if (ruleForm.username === '') {
        root.$message({
          message: '邮箱不能为空',
          type: 'warning'
        });
        return false;
      } 
      let requestData = {
        username: ruleForm.username,
        module: model.value
      };
      updateBtnStatus({
        status: true,
        text: '发送中'
      });
      countDown(10);
      setTimeout(() => {
        GetSms(requestData).then( response => {
          if (response.data.resCode === 0) {
            submitDisabled.value = false;
            console.log(response.data.message);
            root.$message({
              message: response.data.message,
              type: 'success'
            });
          }
        }).catch( error => {
          console.log(error);
        });
      },5000);
    });
    // 倒计时
    const countDown = ((number) => {
      // 判断定时器是否存在，存在就清除
      if (timer.value) { clearInterval(timer.value); }
      let time = ref(number);
      timer.value = setInterval(() => {
        if (time.value === 0) {
          clearInterval(timer.value);
          updateBtnStatus({
            status: false,
            text: '重新获取验证码'
          });
        } else {
          codeText.text = `倒计时${time.value}秒`;
          time.value --;
        }
      },1000);
    });
    // 清除倒计时
    const clearCountDown = ( () => {
      // 重置状态
      updateBtnStatus({
        status: false,
        text: '获取验证码'
      });
      clearInterval(timer.value);
    });
    // 更新按钮状态
    const updateBtnStatus = ((params) => {
      codeText.status = params.status;
      codeText.text = params.text;
    });
    return {
      // 属性1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
      menuTab,
      model,
      rules,
      ruleForm,
      submitDisabled,
      codeText,
      timer,
      //方法11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
      toggleMenu,
      submitForm,
      getSms,
      register,
      login,
      countDown,
      clearCountDown,
      updateBtnStatus
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
<!--
1、尽量方法里面只做一件事，不要混杂很多其他的逻辑
2、很多公用的地方提取出来
-->
