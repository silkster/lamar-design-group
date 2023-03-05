<script>
import AppButton from '@/components/Button/Button.vue';
import AppSlider from '@/components/Slider/Slider.vue';
import AppContent from '@/components/Content/Content.vue';

export default {
  name: 'Home',
  components: {
    AppButton,
    AppContent,
    AppSlider,
  },
  methods: {
    gotoContact() {
      this.$router.push({ name: 'Contact' });
    },
  },
};
</script>

<template>
  <app-slider :nav-container-class="$style.sliderNavContainer" />
  <app-content :class="$style.container">
    <h1>Architectural Design & More!</h1>
    <p>
      Designing homes takes time and so do websites. We appreciate your patience
      while our new home is under construction and assure you that Lamar Design
      Group remains ready to tackle all your architectural design and rendering
      needs.
    </p>
    <div :class="$style.buttonContainer">
      <app-button
        :class="$style.inquireButton"
        size="medium"
        @click="gotoContact"
        label="Inquire"
      />
    </div>
  </app-content>
</template>

<style module>
.container {
  text-align: left;
  max-width: 1060px;
}
.container h1 {
  margin-bottom: 20px !important;
}
.container p {
  font-size: var(--p-font-size-special);
}
.inquireButton {
  margin: 0 auto;
}
.buttonContainer {
  padding: 40px 0;
}
.sliderNavContainer {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

@media screen and (min-width: 768px) {
  .container h1 {
    margin-bottom: 34px !important;
  }
  .container p {
    font-size: var(--p-font-size-special-large);
  }
  .buttonContainer {
    padding: 80px 0 92px;
  }
}
</style>
