import cssString from './about.component.css';
import templateString from './about.component.html';

const SELECTOR = "about-component";
export class AboutComponent extends HTMLElement {
  private uniqueId: string;

  constructor() {
    super();

    // Generate a unique identifier for this instance
    this.uniqueId = `${Date.now()}`;
    this.setAttribute(`${SELECTOR}-${this.uniqueId}`, "");

    // Prefix CSS selectors with the unique identifier
    const scopedCssString = this.scopeCss(cssString, this.uniqueId);

    const scopedHtmlString = this.scopeHtml(templateString, this.uniqueId);

    // Append the HTML content
    this.innerHTML = scopedHtmlString;

    // Append the scoped CSS
    const style = document.createElement("style");
    style.textContent = scopedCssString;
    this.appendChild(style);
  }

  // Scope the CSS by prefixing selectors with the unique identifier and excluding nested custom elements
  scopeCss(css, uniqueId) {
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
            return `${part.trim()}[${SELECTOR}-${uniqueId}] `;
          })
          .join(", ");
        return `${scopedSelector} ${match.endsWith(",") ? "," : " {"}`;
      }
    );
  }

  // Method to add the unique ID to all elements in the HTML string
  scopeHtml(html, uniqueId) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    // Iterate over all elements
    doc.body.querySelectorAll("*").forEach((el) => {
      // Check if the element is a custom element (has a hyphen in the tag name)
      if (!el.tagName.includes("-")) {
        // Apply the unique ID only to non-custom elements
        el.setAttribute(`${SELECTOR}-${uniqueId}`, "");
      }
    });
    return doc.body.innerHTML;
  }
}

if (!customElements.get(SELECTOR)) {
  customElements.define(SELECTOR, AboutComponent);
}
