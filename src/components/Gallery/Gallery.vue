<script>
import GalleryItem from '@/components/GalleryItem/GalleryItem.vue';

export default {
  name: 'app-gallery',
  components: { GalleryItem },
  props: {
    sets: {
      type: Array,
    },
  },
  methods: {
    goto(set) {
      const { id, title } = set;
      this.$router.push({
        name: 'project',
        params: {
          id: id.toLowerCase(),
          slug: title
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s:]/g, '')
            .split(' ')
            .join('-'),
        },
      });
    },
  },
};
</script>

<template>
  <div :class="$style.container" full-width="true">
    <div v-for="set in sets" :key="set.id" :class="$style.itemWrap">
      <gallery-item
        :photo="set.photo"
        :location="set.location"
        :title="set.title"
        @click="goto(set)"
      />
    </div>
  </div>
</template>

<style module>
.container {
  background-color: var(--white);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  row-gap: 3px;
  width: 100%;
}
.itemWrap {
  flex: 0 1 100%;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  .itemWrap {
    flex: 0 1 33.25%;
  }
}
</style>
