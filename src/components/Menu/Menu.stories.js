import vueRouter from 'storybook-vue3-router';
import { action } from '@storybook/addon-actions';
import AppMenu from './Menu.vue';
import { routes } from '@/router';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Menu',
  component: AppMenu,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
    // onClick: {},
    // size: {
    //   control: { type: 'select' },
    //   options: ['small', 'medium', 'large'],
    // },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AppMenu },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="position: relative;padding: 0;height: 175px; background-color: #fff;display: flex;align-items: center;justify-content: flex-end;">
      <app-menu v-bind="args" />
    </div>
  `,
});

export const Menu = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Menu.args = {
  // primary: true,
  // label: 'Button',
};
Menu.decorators = [
  vueRouter(routes, (to, from) =>
    action('ROUTE CHANGED')({ to: to, from: from }),
  ),
];
