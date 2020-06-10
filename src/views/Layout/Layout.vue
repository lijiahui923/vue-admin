<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
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
import { computed } from '@vue/composition-api';
export default {
  name: 'Layout',
  components: { LayoutHeader, LayoutMain, LayoutNav},
  setup (props, { root }) {
    const menuStatus = computed (() => root.$store.state.isCollapse);
    return {
      menuStatus
    }
  }
};
</script>
<style lang="scss" scoped>
#layout {
    background-color: #f7f7f7;
}
</style>
