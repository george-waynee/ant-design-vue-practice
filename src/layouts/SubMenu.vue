<!--
 * @Description: 
 * @Author: 志洪
 * @Date: 2020-03-18 22:30:11
 * @LastEditors: 志洪
 * @LastEditTime: 2020-03-19 00:06:09
 -->
// recommend use functional component

<template functional>
  <a-sub-menu :key="props.menuInfo.path">
    <span slot="title">
      <a-icon
        v-if="props.menuInfo.meta.icon"
        :type="props.menuInfo.meta.icon"
      /><span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.path"
        @click="
          () =>
            parent.$router.push({ path: item.path, query: parent.$route.query })
        "
      >
        <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: {
    menuInfo: {
      type: Object,
      default: function() {
        return {};
      }
    }
  }
};
</script>
