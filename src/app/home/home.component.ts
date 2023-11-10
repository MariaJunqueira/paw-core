import cssString from './home.component.css';
import templateString from './home.component.html';

const SELECTOR = "home-component";
export class HomeComponent extends HTMLElement {
  private uniqueId: string;

  constructor() {
    super();

    // Generate a unique identifier for this instance
    this.uniqueId = "home-" + Date.now();
    this.setAttribute(`${SELECTOR}-unique-id`, this.uniqueId);

    // Prefix CSS selectors with the unique identifier
    const scopedCssString = this.scopeCss(cssString, this.uniqueId);

    const scopedHtmlString = this.scopeHtml(templateString, this.uniqueId);

    // Append the HTML content
    this.innerHTML = scopedHtmlString;

    // Append the scoped CSS
    const style = document.createElement("style");
    style.textContent = scopedCssString;
    this.appendChild(style);

    this.loadAboutComponent();
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
            return `${part.trim()}[${SELECTOR}-unique-id="${uniqueId}"] `;
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
        el.setAttribute(`${SELECTOR}-unique-id`, uniqueId);
      }
    });
    return doc.body.innerHTML;
  }

  async loadAboutComponent() {
    // Dynamically import the AboutComponent
    const { AboutComponent } = await import("../about/about.component");
    if (!customElements.get("about-component")) {
      customElements.define("about-component", AboutComponent);
    }
    // At this point, any <about-component> elements in the DOM will be upgraded
  }
}

if (!customElements.get(SELECTOR)) {
  customElements.define(SELECTOR, HomeComponent);
}
