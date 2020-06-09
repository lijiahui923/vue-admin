<template>
  <div id="nav-wrap">
    <el-menu
    class="el-menu-vertical-demo"
    background-color="transparent"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    router>
      <!-- 1、小知识就是用template标签的时候key不要写在上面会报错因为template不是一个真正的标签
           2、不建议v-for和v-if在一起使用（就是不要写在同一个标签上）
       -->
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!-- 子菜单 -->
            <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">
              <i :class="subItem.meta.icon"></i>
              {{subItem.meta.name}}
            </el-menu-item>
        </el-submenu>
      </template>
      <svg-icon icon-class="console" class-name="console-style"></svg-icon>
    </el-menu>
  </div>
</template>

<script>
/**
@description:菜单
@createTime:2020-05-26
@create:lijiahui
*/
import { ref, reactive } from '@vue/composition-api';
export default {
  name: 'Nav',
  props: {},
  setup (props, {root}) {
    const isCollapse = ref(false);
    const routers = reactive(root.$router.options.routes);
    // 方法*****************************************************************************************************************************
    const handleOpen = (key, keyPath) => {console.log(key,keyPath);};
    const handleClose = (key, keyPath) => {console.log(key,keyPath);};
    return {
      // 属性
      isCollapse,
      routers,
      // 方法
      handleOpen,
      handleClose
    }
  }
};
</script>
<style lang="scss" scoped>
#nav-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: $navMenu;
    height: 100vh;
    background-color: #344a5f;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: $navMenu;
  height: 100vh;
}
</style>
