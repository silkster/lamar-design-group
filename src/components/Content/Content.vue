<script>
export default {
  name: 'app-content',
  props: {
    isFullWidth: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    containerClasses() {
      const { $style, isFullWidth } = this;
      return {
        [$style.container]: true,
        [$style.fullWidth]: isFullWidth,
      };
    },
  },
};
</script>

<template>
  <div :class="containerClasses">
    <slot></slot>
  </div>
</template>

<style module>
.container {
  position: relative;
  max-width: 90%;
  padding: 32px;
  margin: 0 auto;
}
.container h1 {
  margin-bottom: 0;
}
.fullWidth {
  max-width: unset;
}

@media screen and (min-width: 1025px) {
  .container {
    max-width: 960px;
    padding: 68px 0;
    margin: 0 auto;
  }
}
</style>
