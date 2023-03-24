<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="less">
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;

  > .ant-layout-content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
  }

  .el-table {
    background: #f3f3f3;
    .el-table__header {
      tr,
      th {
        background-color: #fcfcfc;
        color: #4c4a4a;
      }
    }
  }

  .el-pagination {
    margin: 20px 0;
    text-align: right;
  }
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="less">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
