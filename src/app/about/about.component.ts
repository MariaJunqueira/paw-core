import cssString from './about.component.css';
import templateString from './about.component.html';

const SELECTOR = "about-component";
export class AboutComponent extends HTMLElement {
  static styleId = `_mp-${Date.now()}`;

  constructor() {
    super();

    // Generate a unique identifier for this instance
    this.setAttribute(AboutComponent.styleId, "");

    // Prefix CSS selectors with the unique identifier
    const scopedCssString = this.scopeCss(cssString);

    // Apply the HTML and CSS
    this.innerHTML = this.scopeHtml(templateString);
    AboutComponent.appendScopedStyle(scopedCssString);
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
            return `${part.trim()}[${AboutComponent.styleId}] `;
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
        el.setAttribute(AboutComponent.styleId, "");
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
}

if (!customElements.get(SELECTOR)) {
  customElements.define(SELECTOR, AboutComponent);
}
