<script>
import { mapState } from 'vuex';
import namedRoutes from '@/router/namedRoutes';
import AppButton from '@/components/Button/Button.vue';
import CloseButton from '@/components/Button/CloseButton.vue';
import burgerSrc from '@/assets/burger.png';

const { home, contact } = namedRoutes;

export default {
  name: 'app-menu',
  components: {
    AppButton,
    CloseButton,
  },
  data() {
    return {
      activeLink: null,
      burgerSrc,
      menuOn: false,
      menuItems: [
        {
          ...home,
          displayName: 'Home',
          isActive: true,
        },
        {
          ...contact,
          displayName: 'Contact',
          isActive: false,
        },
      ],
    };
  },
  computed: {
    ...mapState(['route']),
    menuClasses() {
      const { $style, menuOn } = this;
      return {
        [$style.menu]: true,
        [$style.menuOn]: menuOn,
      };
    },
  },
  watch: {
    route: {
      immediate: true,
      handler(route) {
        const name = (route && route.name) || 'home';
        this.setActiveItem(name);
      },
    },
  },
  methods: {
    showMenu() {
      this.menuOn = true;
    },
    hideMenu() {
      this.menuOn = false;
    },
    setActiveItem(routeName) {
      const { menuItems } = this;
      menuItems
        .filter((item) => item.isActive)
        .forEach((item) => {
          item.isActive = false;
        });
      const item = menuItems.find((item) => item.name === routeName);
      if (item) {
        item.isActive = true;
      }
    },
    getItemStyles(name) {
      const { $style, route } = this;
      let isActive = route.name === name;
      if (route.name === 'Portfolio') {
        isActive = name.toLowerCase() === route.params.pagetype;
      }
      return {
        [$style.item]: true,
        ...(isActive ? { [$style.active]: true } : {}),
      };
    },
  },
};
</script>

<template>
  <div :class="$style.menuWrap">
    <div :class="menuClasses" @mouseleave="hideMenu">
      <div
        v-for="item in menuItems"
        :class="getItemStyles(item.name)"
        :key="item.name"
      >
        <router-link :to="item.path" @click="hideMenu" :class="$style.link">{{
          item.displayName
        }}</router-link>
      </div>
      <close-button @click-close-button="hideMenu" />
    </div>
  </div>
  <div :class="$style.container">
    <div :class="$style.burgerWrap">
      <app-button
        @click="$emit('createAccount')"
        :showLabel="false"
        :isPrimary="false"
        :isIcon="true"
      >
        <img :src="burgerSrc" alt="Menu" @click="showMenu" />
      </app-button>
    </div>
  </div>
</template>

<style module>
.container {
  position: relative;
  align-self: flex-start;
  padding: 16px 16px 0 0;
}
.burgerWrap {
  position: relative;
}
.menuWrap {
  position: absolute;
  top: 0;
  right: 0;
  width: 230px;
  height: 385px;
  pointer-events: none;
}
.menu {
  align-items: flex-start;
  background-color: var(--white);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 365px;
  justify-content: center;
  padding: 0 30px;
  pointer-events: all;
  position: absolute;
  right: 0;
  top: -365px;
  transition: top 0.33s, box-shadow 0.5s, opacity 0.5s;
  width: 210px;
  z-index: var(--z-index-fixed-menu);
}
.menuOn {
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.5);
  top: 0;
}
.item {
  font-family: var(--font-family);
  font-size: 1.5rem;
  height: 30px;
  text-align: left;
  white-space: nowrap;
}
.link {
  color: var(--header-menu-link-color);
  cursor: pointer;
  display: block;
  text-decoration: none;
}
.item:hover .link,
.active .link {
  color: var(--text-color-menu-hover);
}
</style>
