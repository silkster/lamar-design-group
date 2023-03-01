import AppFooter from './Footer.vue';

export default {
  title: 'Footer',
  component: AppFooter,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AppFooter },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { ...args };
  },
  // Then, the spread values can be accessed directly in the template
  template: '<app-footer />',
});

export const Footer = Template.bind({});
