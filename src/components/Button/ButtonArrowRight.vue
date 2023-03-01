<script>
import AppButton from './Button.vue';

export default {
  name: 'button-arrow-right',
  components: { AppButton },
  data() {
    return {
      clickEventName: 'click-button-arrow-right',
    };
  },
  emits: ['click-button-arrow-right'],
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
    <div :class="$style.rightIcon"></div>
  </app-button>
</template>

<style module>
.container {
  position: relative;
  width: 32px;
  height: 32px;
}
.rightIcon:before,
.rightIcon:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 4px;
  background-color: var(--orange);
}
.rightIcon:before {
  transform: rotate(45deg);
  top: 11px;
}
.rightIcon:after {
  transform: rotate(-45deg);
  bottom: 10px;
}
</style>
