<script>
import { mapGetters } from 'vuex';
import AppSlider from '@/components/Slider/Slider.vue';
import AppContent from '@/components/Content/Content.vue';
import PhotoInfo from '@/components/PhotoInfo/PhotoInfo.vue';

export default {
  name: 'project-content',
  components: {
    AppContent,
    AppSlider,
    PhotoInfo,
  },
  props: {
    pagetype: {
      type: String,
    },
    id: {
      type: String,
    },
    slug: {
      type: String,
    },
  },
  data() {
    return {
      project: null,
      inProgress: false,
    };
  },
  computed: {
    photos() {
      const { photo, photos } = this.project;
      return photos || (photo && [photo]) || [];
    },
    title() {
      const { project } = this;
      return (project && project.title) || '';
    },
    location() {
      const { project } = this;
      return (project && project.location) || null;
    },
    caption() {
      const { project } = this;
      return project.inProgress ? '' : 'Project Description';
    },
    photoCredit() {
      const { project } = this;
      const { photography } = project;
      return photography.name ? null : photography;
    },
    photoCreditInfo() {
      const { project } = this;
      const { photography } = project;
      return photography.name ? photography : null;
    },
    articleTitle() {
      const { project } = this;
      return (project && project.editorial && project.editorial.title) || null;
    },
    byLine() {
      const { project } = this;
      return (project && project.editorial && project.editorial.name) || '';
    },
    isFixed() {
      return true;
    },
    showContent() {
      return !this.inProgress;
    },
  },
  watch: {
    id: {
      immediate: true,
      handler(id) {
        const getProject = this.getProject(id);
        this.project = getProject(id);
        this.inProgress = this.project.inProgress || false;
      },
    },
  },
  methods: {
    ...mapGetters('portfolio', ['getProject']),
    gotoGallery() {
      const { $router, pagetype } = this;
      $router.push({ path: `/portfolio/${pagetype}` });
    },
  },
};
</script>

<template>
  <app-slider
    :photos="photos"
    :is-fixed="isFixed"
    :container-class="$style.paralaxed"
  />
  <div :class="$style.container">
    <div :class="$style.paralaxedSpace"></div>
    <div :class="$style.topContent">
      <photo-info
        :credit="photoCredit"
        :credit-info="photoCreditInfo"
        :caption="caption"
        :in-progress="inProgress"
        @back-to-gallery="gotoGallery"
      />

      <template v-if="showContent">
        <app-content>
          <h1>{{ title }}</h1>
          <p>{{ location }}</p>
          <div :class="$style.content">
            <h2 vif="articleTitle">{{ articleTitle }}</h2>
            <p v-if="project.editorial">
              by
              <a :href="project.editorial.url" target="_blank">{{ byLine }}</a>
            </p>
            <div v-html="project.copy"></div>
          </div>
        </app-content>
      </template>
    </div>
  </div>
</template>

<style module>
.container {
  width: 100% !important;
  z-index: var(--z-index-content);
  pointer-events: none;
}
.content {
  margin-bottom: 60px;
}
.container p {
  text-align: left !important;
  color: var(--text-color-alt);
  font-size: var(--p-font-size);
  font-weight: var(--font-weight-light);
}
.photoCredit {
  padding: 10px;
  text-align: right;
  font-weight: var(--font-weight-bold);
}
.paralaxed {
  position: relative;
}
.paralaxedSpace {
  display: none;
  pointer-events: none;
}
.topContent {
  background-color: var(--gray-light);
  pointer-events: all;
}
@media screen and (min-width: 1024px) {
  .paralaxed {
    z-index: var(--z-index-base);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 54px;
  }
  .paralaxedSpace {
    height: calc(100vh - 54px);
    pointer-events: none;
    display: block;
  }
}
</style>
