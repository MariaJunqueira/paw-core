import templateString from './app.component.html';
import cssString from './app.component.scss';

const SELECTOR = "app-component";
export class AppComponent extends HTMLElement {
  static styleId = `_${SELECTOR}-${Date.now()}`;

  constructor() {
    super();

    // Generate a unique identifier for this instance
    this.setAttribute(AppComponent.styleId, "");

    // Prefix CSS selectors with the unique identifier
    const scopedCssString = this.scopeCss(cssString);

    // Apply the HTML and CSS
    this.innerHTML = this.scopeHtml(templateString);
    AppComponent.appendScopedStyle(scopedCssString);
  }

  // Scope the CSS by prefixing selectors with the unique identifier and excluding nested custom elements
  scopeCss(css) {
    return css.replace(
      /([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g,
      (match, selector) => {
        // Scope each selector with the unique ID, excluding selectors for custom elements
        const scopedSelector = selector
          .split(",")
          .map((part) => {
            // Check if the selector is for a custom element (contains '-')
            if (part.includes("-")) {
              // If it's a custom element selector, leave it unmodified
              return part.trim();
            }
            // Otherwise, apply the unique ID scoping
            return `${part.trim()}[${AppComponent.styleId}] `;
          })
          .join(", ");
        return `${scopedSelector} ${match.endsWith(",") ? "," : " {"}`;
      }
    );
  }

  // Method to add the unique ID to all elements in the HTML string
  scopeHtml(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    // Iterate over all elements
    doc.body.querySelectorAll("*").forEach((el) => {
      // Check if the element is a custom element (has a hyphen in the tag name)
      if (!el.tagName.includes("-")) {
        // Apply the unique ID only to non-custom elements
        el.setAttribute(AppComponent.styleId, "");
      }
    });
    return doc.body.innerHTML;
  }

  static appendScopedStyle(scopedCssString) {
    if (!document.head.querySelector(`#${this.styleId}`)) {
      const styleTag = document.createElement("style");
      styleTag.id = this.styleId;
      styleTag.textContent = scopedCssString;
      document.head.appendChild(styleTag);
    }
  }

  async loadMugRouter() {
    // Dynamically import the AboutComponent
    const { MugRouter } = await import("./stuff/mug/mug.router");
    if (!customElements.get("mug-router")) {
      customElements.define("mug-router", MugRouter);
    }
    // At this point, any <home-component> elements in the DOM will be upgraded
  }
}

if (!customElements.get(SELECTOR)) {
  customElements.define(SELECTOR, AppComponent);
}
