import AppHeader from './Header.vue';
import vueRouter from 'storybook-vue3-router';
import { action } from '@storybook/addon-actions';
import { routes } from '@/router';

export default {
  title: 'Header',
  component: AppHeader,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AppHeader },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { ...args };
  },
  // Then, the spread values can be accessed directly in the template
  template: `
    <div style="min-height: 1vh; min-width: 1vw; background-color: var(--body-background-color);">
      <app-header />
    </div>
  `,
});

export const Header = Template.bind({});
Header.decorators = [
  vueRouter(routes, (to, from) =>
    action('ROUTE CHANGED')({ to: to, from: from }),
  ),
];
