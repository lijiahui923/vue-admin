<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
@description:登录页面
@createTime:2020-05-13
@create:lijiahui
*/
export default {
  name: 'Login',
  props: {},
  components: {},
  data() {
    return {
      menuTab: [
        { id: 1, text: '登录', current: true },
        { id: 2, text: '注册', current: false }
      ]
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    toggleMenu (data) {
      this.menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
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
    background-color: rgba(0,0,0,.1);
  }
}
</style>
