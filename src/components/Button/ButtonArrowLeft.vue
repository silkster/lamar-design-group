<script>
import AppButton from './Button.vue';

export default {
  name: 'button-arrow-left',
  components: { AppButton },
  data() {
    return {
      clickEventName: 'click-button-arrow-left',
    };
  },
  emits: ['click-button-arrow-left'],
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
    :class="$style.container"
  >
    <div :class="$style.leftIcon"></div>
  </app-button>
</template>

<style module>
.container {
  position: relative;
  width: 32px;
  height: 32px;
}
.leftIcon:before,
.leftIcon:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 4px;
  background-color: var(--orange);
}
.leftIcon:before {
  transform: rotate(45deg);
  bottom: 10px;
}
.leftIcon:after {
  transform: rotate(-45deg);
  top: 11px;
}
</style>
