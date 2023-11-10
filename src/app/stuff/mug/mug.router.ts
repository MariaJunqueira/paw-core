const SELECTOR = "mug-router";
export class MugRouter extends HTMLElement {
  static styleId = `_${SELECTOR}-${Date.now()}`;

  constructor() {
    super();
  }
}

if (!customElements.get(SELECTOR)) {
  customElements.define(SELECTOR, MugRouter);
}
