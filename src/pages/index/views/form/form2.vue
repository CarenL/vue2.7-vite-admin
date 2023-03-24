<template>
  <a-layout-content
    ><a-button type="primary">表单2</a-button>
    <div :class="$style.test">css变量绑定</div></a-layout-content
  >
</template>

<script>
export default {
  data() {
    return {
      color: '#fff',
    };
  },
  mounted() {
    //https://cn.vuejs.org/api/sfc-css-features.html#scoped-css
    setTimeout(() => {
      this.color = '#0f0';
    }, 2000);
  },
};
</script>

<style module>
.test {
  width: 100px;
  height: 100px;
  margin: 10px;
  color: v-bind(color);
  background: #f00;
}
</style>
