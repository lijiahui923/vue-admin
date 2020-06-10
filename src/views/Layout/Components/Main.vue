<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
    <!-- <router-view /> -->
  </div>
</template>

<script>
/**
@description:主页面
@createTime:2020-05-26
@create:lijiahui
*/
export default {
  name: 'Main',
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
#main-wrap {
    height: 100vh;
    // position: fixed;
    // left: $navMenu;
    // top: 47px;
    // right: 0;
    // bottom: 0;
    // border: 15px solid #f7f7f7;
    // box-sizing: border-box;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 15px;
  padding-left: $navMenu + 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.open {
  .main-content{
    padding-left: $navMenu + 15px;
  }
}
.close {
  .main-content{
    padding-left: $navMenuMin + 15px;
  }
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
