<script>
import AppButton from './Button.vue';

export default {
  name: 'close-button',
  components: { AppButton },
  data() {
    return {
      clickEventName: 'click-close-button',
    };
  },
  emits: ['click-close-button'],
  methods: {
    click($event) {
      const { $emit, clickEventName } = this;
      $emit(clickEventName, $event);
    },
  },
};
</script>

<template>
  <app-button
    @click="click"
    :showLabel="false"
    :isPrimary="false"
    :isIcon="true"
    :class="$style.closeButton"
  >
    <div :class="$style.closeIcon"></div>
  </app-button>
</template>

<style module>
.closeButton {
  position: absolute;
  right: 24px;
  top: 10px;
  width: 32px;
  height: 32px;
}
.closeIcon {
  opacity: 0.3;
}
.closeIcon:hover {
  opacity: 1;
}
.closeIcon:before,
.closeIcon:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 2px;
  background-color: #333;
}
.closeIcon:before {
  transform: rotate(45deg);
}
.closeIcon:after {
  transform: rotate(-45deg);
}
</style>
