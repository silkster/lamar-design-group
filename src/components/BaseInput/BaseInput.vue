<script>
import device from '@/mixins/device.js';

export default {
  mixins: [device],
  props: {
    errorMessage: [String],
    hasError: {
      type: Boolean,
      default: false,
    },
    inputAutocomplete: [String],
    inputClass: [String],
    inputId: [String],
    inputMaxLength: [Number],
    inputName: [String],
    iconName: {
      type: String,
      default: '',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    label: [String],
    modelValue: [String, Number],
    validIcon: {
      type: String,
      default: 'icon-check',
    },
  },
  emits: ['update:modelValue'],
  computed: {
    inputClasses() {
      const { $style, hasError, inputClass } = this;
      return {
        [$style.input]: true,
        [$style.error]: hasError,
        ...(inputClass ? { [inputClass]: true } : {}),
      };
    },
    actionFromType() {
      const { inputType } = this;
      return inputType === 'password' ? 'show' : 'hide';
    },
    numberInputMode() {
      const { inputType } = this;
      return inputType === 'tel' ? 'numeric' : false;
    },
  },
  methods: {
    fieldIcon(iconName = 'icon-check') {
      return require(`@/assets/svg/${iconName}.svg`);
    },
    changeType() {
      const { inputType } = this;
      switch (inputType) {
        case 'text':
          this.$emit('changeInputType', 'password');
          break;
        case 'password':
          this.$emit('changeInputType', 'text');
          break;
        default:
          break;
      }
    },
  },
};
</script>

<template>
  <div :class="$style.formGroup">
    <input
      :id="inputId"
      :name="inputName"
      :type="inputType"
      :inputmode="numberInputMode"
      :class="inputClasses"
      required
      :value="modelValue"
      :autocomplete="inputAutocomplete"
      :maxlength="inputMaxLength"
      @keypress="$emit('keypress', $event)"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
    <label :class="$style.label" :for="inputName">
      {{ label }}
    </label>
    <span v-if="hasError" :class="$style.errorMessage">
      {{ errorMessage }}
    </span>
    <img
      v-if="isValid"
      :class="iconValid"
      :src="fieldIcon(validIcon)"
      alt="Valid Input"
    />
    <img
      v-if="iconName"
      :class="$style.iconCard"
      :src="fieldIcon(iconName)"
      alt="Card Type Icon"
    />
  </div>
</template>

<style module>
.formGroup {
  position: relative;
  z-index: var(--z-index-content);
  margin: 0 0 space(5);
}

.input {
  position: relative;
  z-index: var(--z-index-content-level-1);
  height: 40px;
  background-color: transparent;
}

.input:focus + .label,
.input:valid + .label {
  transform: scale(0.8) translate(0, -35px);
  left: 0;
  color: var(--gray-dark);
}

.input.small {
  width: 105px;
}
.input::placeholder {
  visibility: hidden;
}

.label {
  color: var(--gray-medium);
  font-family: var(--font-family);
  font-size: 1rem;
  font-style: normal;
  font-weight: var(--font-weight-light);
  left: 10px;
  line-height: 24px;
  pointer-events: none;
  position: absolute;
  text-align: start;
  top: 10px;
  transition: 0.3s;
  transform-origin: 0 0;
  transform: scale(1) translate(0, 0);
  z-index: var(--z-index-content-level-2);
}

.errorMessage {
  color: #ff626a;
  display: block;
  font-family: var(--font-family);
  font-size: 0.75rem;
  font-style: italic;
  font-weight: 400;
  line-height: 0.875rem;
  margin-top: space(1);
  text-align: start;
}

.iconValid,
.iconCard {
  position: absolute;
  right: 0;
}

.iconValid {
  width: 15px;
  top: 50%;
}

.iconCard {
  width: 45px;
  top: -3px;
}
</style>
