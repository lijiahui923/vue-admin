<template>
  <div id="main-wrap">
        <router-view />
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
@import 'styles/config.scss';
#main-wrap {
    position: fixed;
    left: $navMenu;
    top: 47px;
    right: 0;
    bottom: 0;
    border: 30px solid #f7f7f7;
    box-sizing: border-box;
}
</style>
