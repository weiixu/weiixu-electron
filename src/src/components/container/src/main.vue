<template>
  <section class="ww-container" :class="{ 'is-vertical': isVertical }">
    <slot></slot>
  </section>
</template>
<script>
export default {
  name: 'WwContainer',

  componentName: 'WwContainer',

  props: {
    direction: String
  },

  computed: {
    isVertical() {
      if (this.direction === 'vertical') {
        return true;
      } else if (this.direction === 'horizontal') {
        return false;
      }
    }
  }
};

</script>
