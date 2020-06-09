<template>
  <div id="header-wrap">
    <div class="pull-left header-icon"><svg-icon icon-class="menu" class-name="menu-style"></svg-icon></div>
    <div class="pull-right">
      <div class="user-info pull-left">
          <img src="@/assets/images/headphoto.png" alt="">
        系统管理员
      </div>
      <div class="header-icon pull-left">
        <svg-icon icon-class="close" class-name="close-style"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
/**
@description:头部
@createTime:2020-05-26
@create:lijiahui
*/
export default {
  name: 'Header',
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {}
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
    box-shadow: 0 3px 16px 0 rgba(0,0,0,0.1);
    line-height: 47px;
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
