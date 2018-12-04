<template>
  <footer class="ww-footer" :style="{ minHeight:height }">
    <slot></slot>
  </footer>
</template>
<script>
export default {
  name: 'WwFooter',
  componentName: 'WwFooter',
  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
};

</script>
