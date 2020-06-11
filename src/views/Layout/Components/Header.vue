<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuSate"><svg-icon icon-class="menu" class-name="menu-style"></svg-icon></div>
    <div class="pull-right">
      <div class="user-info pull-left">
          <img src="@/assets/images/headphoto.png" alt="">
          {{username}}
      </div>
      <div class="header-icon pull-left" @click="exit">
        <svg-icon icon-class="close" class-name="close-style"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import { removeToken, removeUsername } from "utils/app";
/**
@description:头部
@createTime:2020-05-26
@create:lijiahui
*/
export default {
  name: 'Header',
  props: {},
  components: {},
  setup (props, { root }) {
    const username = computed ( () => {
      return root.$store.state.username;
    });
    const navMenuSate = () => {
      root.$store.commit('set_isCollapse');
    }
    const exit = () => {
      console.log(1);
      removeToken('token');
      removeUsername('username');
      root.$router.push({name:'Login'});
    }
    return {
      username,
      navMenuSate,
      exit
    }
  }
};
</script>
<style lang="scss" scoped>
#header-wrap {
    position: fixed;
    top: 0;
    right: 0;
    left: $navMenu;
    height: 47px;
    background-color: #fff;
    @include webkit(box-shadow, 0 3px 16px 0 rgba(0,0,0,0.1));
    @include webkit(transition, all .3s ease 0s);
    line-height: 47px;
}
.open {
  #header-wrap{
    left: $navMenu;
  }
}
.close {
  #header-wrap{
    left: $navMenuMin;
  }
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -2px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info {
  display: inline-flex;
  height: 100%;
  padding: 0 28px;
  border-right: 1px solid #ededed;
  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 4px 22px;
    line-height: 47px;
  }
}
</style>
