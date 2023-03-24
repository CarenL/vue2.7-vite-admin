<script lang="jsx">
import Menu from 'ant-design-vue/es/menu';
import Icon from 'ant-design-vue/es/icon';
import { isExternal } from '@/utils/validate';
import AppLink from './Link.vue';
import path from 'path';

const { Item, SubMenu } = Menu;

export default {
  name: 'SMenu',
  components: { Item, SubMenu, AppLink },
  props: {
    menu: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      required: false,
      default: 'light',
    },
    mode: {
      type: String,
      required: false,
      default: 'inline',
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      openKeys: [],
      cachedOpenKeys: [],
      selectedKeys: ['user1'],
    };
  },
  computed: {
    rootSubmenuKeys: (vm) => {
      const keys = [];
      vm.menu.forEach((item) => keys.push(item.path));
      return keys;
    },
  },
  mounted() {
    this.updateMenu();
  },
  watch: {
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat();
        this.openKeys = [];
      } else {
        this.openKeys = this.cachedOpenKeys;
      }
    },
    $route: function () {
      this.updateMenu();
    },
  },
  methods: {
    // select menu item
    onOpenChange(openKeys) {
      // 在水平模式下时执行，并且不再执行后续
      if (this.mode === 'horizontal') {
        this.openKeys = openKeys;
        return;
      }
      // 非水平模式时
      const latestOpenKey = openKeys.find((key) => !this.openKeys.includes(key));
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    updateMenu() {
      const routes = this.$route.matched.concat();
      const { hidden } = this.$route.meta;
      if (routes.length >= 3 && hidden) {
        routes.pop();
        this.selectedKeys = [routes[routes.length - 1].path];
      } else {
        this.selectedKeys = [routes.pop().path];
      }
      const openKeys = [];
      if (this.mode === 'inline') {
        routes.forEach((item) => {
          openKeys.push(item.path);
        });
      }
      //update-begin-author:taoyan date:20190510 for:online表单菜单点击展开的一级目录不对
      if (!this.selectedKeys || this.selectedKeys[0].indexOf(':') < 0) {
        this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys);
      }
      //update-end-author:taoyan date:20190510 for:online表单菜单点击展开的一级目录不对
    },
    //判断是否是唯一的子节点
    hasOneShowingChild(children = [], parent) {
      let onlyOne = false,
        child = null;
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          child = item;
          return true;
        }
      });

      if (showingChildren.length > 1) {
        onlyOne = false;
      }

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        onlyOne = true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        child = { ...parent, path: '', noShowingChildren: true };
        onlyOne = true;
      }

      return {
        onlyOne,
        child,
      };
    },
    //解析路由绝对路径
    resolvePath(routePath, basePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(basePath)) {
        return basePath;
      }
      return path.resolve(basePath, routePath);
    },
    // render
    renderItem(menu, basePath) {
      let { onlyOne, child } = this.hasOneShowingChild(menu.children, menu);
      if (onlyOne && (!child.children || child.noShowingChildren) && !menu.alwaysShow) {
        return this.renderMenuItem(child, this.resolvePath(child.path, basePath));
      } else {
        return this.renderSubMenu(menu, basePath);
      }
    },
    renderMenuItem(menu, basePath) {
      let props = { to: basePath };
      return (
        <Item {...{ key: basePath }}>
          <AppLink {...{ props }}>
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </AppLink>
        </Item>
      );
    },
    renderSubMenu(menu, basePath) {
      const itemArr = [];
      if (!menu.alwaysShow) {
        menu.children.forEach((item) => itemArr.push(this.renderItem(item, this.resolvePath(item.path, basePath))));
      }
      return (
        <SubMenu {...{ key: basePath }}>
          <span slot="title">
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </span>
          {itemArr}
        </SubMenu>
      );
    },
    renderIcon(icon) {
      if (icon === 'none' || icon === undefined) {
        return null;
      }
      const props = {};
      typeof icon === 'object' ? (props.component = icon) : (props.type = icon);
      return <Icon {...{ props }} />;
    },
  },
  render() {
    const { mode, theme, menu, defaultselectedkeys, collapsed } = this;
    const props = {
      mode: mode,
      theme: theme,
      defaultselectedkeys,
      inlineCollapsed: collapsed,
      // openKeys: this.openKeys,
    };
    const on = {
      select: (obj) => {
        this.selectedKeys = obj.selectedKeys;
        this.$emit('select', obj);
      },
      // openChange: this.onOpenChange,
    };

    const menuTree = menu.map((item) => {
      if (item.hidden) {
        return null;
      }
      return this.renderItem(item, item.path);
    });
    return (
      <Menu vModel={this.selectedKeys} {...{ props, on: on }}>
        {menuTree}
      </Menu>
    );
  },
};
</script>
