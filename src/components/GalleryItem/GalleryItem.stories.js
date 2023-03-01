import GalleryItem from './GalleryItem.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'GalleryItem',
  component: GalleryItem,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { GalleryItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template:
    '<div style="position: relative; width: 100%;"><gallery-item style="width: 640px" /></div>',
});

export const GalleryItemStory = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
GalleryItemStory.args = {
  ratioDimensions: {
    height: 480,
    width: 640,
  },
};
