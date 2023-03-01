import AppPhotoInfo from './PhotoInfo.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'PhotoInfo',
  component: AppPhotoInfo,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AppPhotoInfo },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="position: relative;">
      <app-photo-info v-bind="args" />
      <div style="background-color: #fff;height:400px;">&nbsp;</div>
    </div>`,
});

export const Default = Template.bind({});
Default.args = {};

export const RenderingInfo = Template.bind({});
RenderingInfo.args = {
  caption: 'Delivery Fall 2022',
  credit: 'Rendering: Jeremy Potter, AIA',
};
