import { globals, viewport } from '@/util';

const { hasWindow, hasDocument } = globals;

export function debounceAnimation(fn) {
  let timeout;

  return function () {
    const context = this;
    const args = arguments;

    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(() => {
      fn.apply(context, args);
    });
  };
}

const addListener = (element, eventName, handler) => {
  let vm = this;
  if (hasWindow() && hasDocument()) {
    element.addEventListener(eventName, handler);

    if (vm) {
      vm.$once('hook:unmounted', () => {
        element.removeEventListener(eventName, handler);
      });
    }
  }
};

const documentAddListener = (eventName, handler) => {
  addListener(document, eventName, handler);
};

const $onResize = (fn) => {
  if (hasWindow() && typeof fn === 'function') {
    addListener(window, 'resize', () => debounceAnimation(fn).call(this));
  }
};

const { getScreenSize } = viewport;

export default {
  methods: {
    addListener,
    documentAddListener,
    $onResize,
    debounceAnimation,
    getScreenSize,
  },
};
