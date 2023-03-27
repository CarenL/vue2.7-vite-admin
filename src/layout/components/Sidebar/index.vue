<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <div class="admin-scrollbar">
      <div class="scrollbar-wrapper">
        <!-- <a-menu :default-selected-keys="activeMenu" mode="inline" theme="dark" :inline-collapsed="isCollapse">
          <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
        </a-menu> -->
        <my-menu
          :default-selected-keys="activeMenu"
          :menu="routes"
          theme="dark"
          mode="inline"
          :collapsed="isCollapse"
        ></my-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from './Logo.vue';
// import SidebarItem from './SidebarItem.vue';
import MyMenu from './MyMenu.vue';
import variables from '@/styles/variables.module.scss';

export default {
  components: {
    // SidebarItem,
    Logo,
    MyMenu,
  },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      // return this.seriateRoutes(this.$router.options.routes);
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return [meta.activeMenu];
      }
      return [path];
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
