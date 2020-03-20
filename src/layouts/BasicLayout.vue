<!--
 * @Description: 
 * @Author: 志洪
 * @Date: 2020-03-16 17:18:21
 * @LastEditors: 志洪
 * @LastEditTime: 2020-03-20 15:01:26
 -->
<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout class="layout-out" id="components-layout-demo-custom-trigger">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="256px"
      >
        <div class="logo">
          <h1>vue-design-pro</h1>
        </div>
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <Header />
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px'
          }"
        >
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <!-- 权限组件-控制抽屉是否显示 -->
    <Authorized :authority="['admin']">
      <!-- 抽屉组件-显示主题色&布局的设置 -->
      <SettingDrawer />
    </Authorized>
  </div>
</template>
<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import SiderMenu from "./SiderMenu.vue";
import SettingDrawer from "../components/SettingDrawer/index.vue";

export default {
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
  }
};
</script>
<style lang="less" scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
  &:hover {
    cursor: pointer;
    background: gray;
    color: white;
  }
}

.nav-theme-dark {
  /deep/ .logo {
    h1 {
      color: #ffffff;
    }
  }
}

.nav-theme-dark,
.nav-theme-light {
  height: 100%;
  > .layout-out {
    height: 100%;
  }
}
</style>
