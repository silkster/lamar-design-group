export const hasGlobal = () => {
  return typeof global === 'object';
};

export const hasWindow = () => {
  return typeof window === 'object';
};

export const hasDocument = () => {
  return hasWindow() && typeof document === 'object';
};

export const isLocalhost = () => {
  return (
    hasDocument() &&
    document.location &&
    document.location.host.indexOf('//localhost') > -1
  );
};

export const hasClass = ($el, className) => {
  if ($el) {
    if ($el.classList && $el.classList.contains) {
      return $el.classList.contains(className);
    }
    let classes = ` ${$el.classes} `;
    return classes.indexOf(` ${className} `) > -1;
  }
  return false;
};

export default {
  hasClass,
  hasDocument,
  hasGlobal,
  hasWindow,
  isLocalhost,
};
