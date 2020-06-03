<template>
  <div id="layout">
      <LayoutHeader />
      <LayoutMain />
      <LayoutNav />
  </div>
</template>

<script>
/**
@description:面板
@createTime:2020-05-26
@create:lijiahui
*/
import LayoutHeader from './Components/Header';
import LayoutMain from './Components/Main';
import LayoutNav from './Components/Nav';
export default {
  name: 'Layout',
  components: { LayoutHeader, LayoutMain, LayoutNav},
  setup () {

  },
  props: {},
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
#layout {
    background-color: #f7f7f7;
}
</style>
