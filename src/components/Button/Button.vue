<script>
import { mapState } from 'vuex';

export default {
  name: 'app-button',

  props: {
    label: {
      type: String,
    },
    showLabel: {
      type: Boolean,
      required: false,
      default: true,
    },
    isPrimary: {
      type: Boolean,
      default: true,
    },
    isIcon: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
      default: 'medium',
    },
    backgroundColor: {
      type: String,
    },
  },

  emits: ['click'],

  computed: {
    ...mapState(['fontScaleStyle']),
    buttonSize() {
      const { size } = this;
      return `button${size[0].toUpperCase()}${size.substr(1)}`;
    },
    classes() {
      const { $style, buttonSize } = this;
      return {
        [$style.button]: true,
        [$style.buttonPrimary]: this.isPrimary,
        [$style.buttonSecondary]: !this.isPrimary && !this.isIcon,
        [$style.buttonIcon]: this.isIcon,
        [$style[buttonSize]]: true,
      };
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<template>
  <button type="button" :class="classes" @click="onClick">
    <span v-if="showLabel" :class="$style.buttonText">{{ label }}</span>
    <slot></slot>
  </button>
</template>

<style module>
.button {
  border: 0;
  border-radius: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 42px;
  padding: 0 16px 0 22px;
  min-width: 210px;
}
.button,
.buttonText {
  color: var(--button-text-color);
  font-family: var(--button-font-family);
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--button-letter-spacing);
  text-transform: var(--button-text-transform);
}
.buttonMedium,
.buttonMedium .buttonText {
  font-size: 1.25rem;
}
.buttonLarge,
.buttonLarge .buttonText {
  font-size: 1.5rem;
}

.buttonPrimary,
.buttonPrimary .buttonText {
  color: var(--button-text-color);
  background-color: var(--button-background-color);
}
.buttonSecondary,
.buttonSecondary .buttonText {
  color: #333;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
}
.buttonIcon {
  background-color: transparent;
  border: none;
  box-shadow: none;
  min-width: unset;
  height: auto;
  padding: 0;
}
@media screen and (min-width: 480px) {
  .button:not(.buttonIcon) {
    min-width: 240px;
  }
}
@media screen and (min-width: 768px) {
  .button:not(.buttonIcon) {
    min-width: 280px;
    height: 50px;
  }
}
@media screen and (min-width: 1025px) {
  .button:not(.buttonIcon) {
    min-width: 306px;
  }
}
</style>
