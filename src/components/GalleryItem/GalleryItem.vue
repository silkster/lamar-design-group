<script>
export default {
  name: 'gallery-item',
  props: {
    backgroundColor: {
      type: String,
      default: 'var(--white)',
    },
    photo: {
      type: String,
    },
    zoomIn: {
      type: Boolean,
      default: false,
    },
    ratioDimensions: {
      type: Object,
      default() {
        return {
          width: 638,
          height: 425,
        };
      },
    },
    title: {
      type: String,
      default: 'Gallery Item Title',
    },
    location: {
      type: String,
    },
  },
  computed: {
    ratio() {
      const { height, width } = this.ratioDimensions;
      return (height / width) * 100;
    },
    itemClasses() {
      const { $style, zoomIn } = this;
      return {
        [$style.item]: true,
        [$style.zoomIn]: zoomIn,
      };
    },
    itemStyle() {
      const { backgroundColor, ratio, photo } = this;
      return {
        backgroundColor,
        ...(photo ? { backgroundImage: `url(${photo})` } : {}),
        paddingTop: `${ratio}%`,
      };
    },
  },
};
</script>

<template>
  <div :class="$style.container">
    <div :class="itemClasses" :style="itemStyle">
      <div :class="$style.caption">
        <h2>{{ title }}</h2>
        <p v-if="location">{{ location }}</p>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  box-sizing: border-box;
  position: relative;
  width: 100%;
}
.item {
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
.zoomIn {
  background-size: auto;
  background-position: center;
}
.caption {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  color: var(--white);
}
.caption:hover,
.caption.on {
  opacity: 1;
}
.caption h2 {
  color: var(--white);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-med);
  text-align: center;
  margin: 0;
}
.caption p {
  color: var(--white);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-small);
  text-align: center;
  margin: 8px 0 0 0;
}
</style>
