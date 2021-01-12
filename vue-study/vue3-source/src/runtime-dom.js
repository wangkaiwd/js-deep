export const nodeOps = {
  createElement (tag) {
    return document.createElement(tag);
  },
  setTextContent (el, text) {
    el.textContent = text;
  }
};
