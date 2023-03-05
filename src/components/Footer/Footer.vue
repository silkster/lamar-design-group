<script>
import eventListenerMixin from '@/mixins/events';
import { mapState } from 'vuex';
import { nextTick } from 'vue';
import logoSmallSvg from '@/assets/logo.png';

export default {
  name: 'app-footer',
  mixins: [eventListenerMixin],
  data() {
    return {
      containerPosition: null,
      footerHeight: 0,
      footerClasses: {},
      isInViewport: false,
      logoSmallSvg,
    };
  },
  computed: {
    ...mapState(['route', 'fontScaleStyle']),
    ...mapState('device', ['screen']),
    ...mapState('company', ['nameSplit']),
    bottomPosition() {
      const { containerPosition } = this;
      return (containerPosition && containerPosition.bottom) || 0;
    },
    isDocumentBottomInViewport() {
      return document.body.scrollHeight <= this.screen.height;
    },
  },
  created() {
    this.footerClasses = {
      [this.$style.container]: true,
    };
  },
  watch: {
    route: {
      immediate: true,
      handler() {
        const vm = this;
        const wait = async () => {
          await nextTick();

          vm.setContainerPosition();
          vm.setIsInViewport();
        };
        wait();
      },
    },
  },
  mounted() {
    const vm = this;
    vm.setContainerPosition();
    vm.setIsInViewport();

    vm.$onResize(() => {
      vm.setContainerPosition();
      vm.setIsInViewport();
    });
  },
  methods: {
    setContainerPosition() {
      const { $refs } = this;
      this.setFooterHeight();
      const bounds =
        ($refs.container && $refs.container.getBoundingClientRect()) || null;
      this.containerPosition = bounds || document.body.scrollHeight;
    },
    setFooterHeight() {
      const { $refs } = this;
      const bounds =
        ($refs.footer && $refs.footer.getBoundingClientRect()) || null;
      this.footerHeight = (bounds && bounds.height) || 200;
    },
    setIsInViewport() {
      this.isInViewport =
        screen.height >=
        this.bottomPosition + this.footerHeight + window.scrollY;
      this.setFooterClasses();
    },
    setFooterClasses() {
      const { $style, isInViewport } = this;
      this.footerClasses = {
        [$style.container]: true,
        ...(isInViewport ? { [$style.fixed]: true } : {}),
      };
    },
    setFontScale() {
      const { screen } = this;
      const baseWidth = 1920;
      const baseScale = 100;
      if (screen.width < baseWidth) {
        const scale = (screen.width / baseWidth) * 100;
        this.fontScale = scale < 50 ? 50 : scale;
      } else {
        this.fontScale = baseScale;
      }
    },
  },
};
</script>

<template>
  <div ref="container"></div>
  <footer :class="footerClasses" ref="footer">
    <div :class="$style.logo">
      <div :class="$style.companyName" :style="fontScaleStyle">
        &copy; 2023
        <span :class="$style.company">
          <span :class="$style.namePrimary">{{ nameSplit[0] }}{{ ' ' }}</span>
          <span :class="$style.nameSecondary">{{ nameSplit[1] }}</span></span
        >
        All rights reserved.
      </div>
    </div>
  </footer>
</template>

<style module>
.container {
  align-items: center;
  box-sizing: border-box;
  background-color: var(--gray50);
  color: var(--gray30);
  display: flex !important;
  height: 197px;
  justify-content: space-evenly;
  line-height: 1;
  padding: 0 3.75% 0 5.8333%;
  max-width: 100%;
  font-size: 24px;
  flex-direction: column;
}
.fixed {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
}
.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
}
.companyName {
  margin: 0 14px;
  letter-spacing: 1px;
  font-size: var(--font-scale);
}
.namePrimary {
  color: var(--black);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
}
.nameSecondary {
  color: var(--black);
  text-transform: uppercase;
}
.contactInfo {
  color: var(--gray40);
  align-items: center;
  font-size: var(--font-scale);
  line-height: 1.4;
  text-align: center;
}
.separator {
  font-size: 75%;
}
.addressLine1,
.addressLine2,
.city,
.state,
.phone {
  padding: 0 3px;
}
.phone {
  border-right: 0;
}
.aiaLogo {
  position: relative;
  width: 15%;
  display: flex;
  justify-content: flex-end;
  width: 35px;
  height: 35px;
}
.aiaLogo a {
  border: 0;
}
.aiaLogo img {
  max-width: 100%;
  max-height: 100%;
}
@media screen and (min-width: 984px) {
  .container {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .logo {
    flex-wrap: nowrap;
  }
  .contactInfo {
    display: flex;
    white-space: nowrap;
    text-align: inherit;
  }
  .company {
    white-space: nowrap;
  }
  .addressLine1,
  .addressLine2,
  .city,
  .state,
  .phone {
    padding: 0 18px;
  }
  .aiaLogo {
    width: 60px;
    height: 60px;
  }
}
</style>
