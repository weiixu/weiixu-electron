<template>
  <header class="ww-header" :style="{ minHeight: height }">
    <slot></slot>
  </header>
</template>
<script>
export default {
  name: 'WwHeader',

  componentName: 'WwHeader',

  props: {
    height: {
      type: String,
      default: '3rem'
    }
  }
};

</script>
