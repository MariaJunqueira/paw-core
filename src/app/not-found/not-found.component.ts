import cssString from './not-found.component.css';
import templateString from './not-found.component.html';

const SELECTOR = "not-found-component";
export class NotFoundComponent extends HTMLElement {
  static styleId = `_${SELECTOR}-${Date.now()}`;

  constructor() {
    super();

    // Generate a unique identifier for this instance
    this.setAttribute(NotFoundComponent.styleId, "");

    // Prefix CSS selectors with the unique identifier
    const scopedCssString = this.scopeCss(cssString);

    // Apply the HTML and CSS
    this.innerHTML = this.scopeHtml(templateString);
    NotFoundComponent.appendScopedStyle(scopedCssString);
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
            return `${part.trim()}[${NotFoundComponent.styleId}] `;
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
        el.setAttribute(NotFoundComponent.styleId, "");
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
  customElements.define(SELECTOR, NotFoundComponent);
}

// var pathSegmentsToKeep = 0;
//
// var l = window.location;
// l.replace(
//   l.protocol +
//     "//" +
//     l.hostname +
//     (l.port ? ":" + l.port : "") +
//     l.pathname
//       .split("/")
//       .slice(0, 1 + pathSegmentsToKeep)
//       .join("/") +
//     "/?/" +
//     l.pathname
//       .slice(1)
//       .split("/")
//       .slice(pathSegmentsToKeep)
//       .join("/")
//       .replace(/&/g, "~and~") +
//     (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") +
//     l.hash
// );
