import cssString from './contact.component.css';
import templateString from './contact.component.html';

const SELECTOR = "contact-component";
export class ContactComponent extends HTMLElement {
  static styleId = `_${SELECTOR}-${Date.now()}`;

  constructor() {
    super();

    // Generate a unique identifier for this instance
    this.setAttribute(ContactComponent.styleId, "");

    // Prefix CSS selectors with the unique identifier
    const scopedCssString = this.scopeCss(cssString);

    // Apply the HTML and CSS
    this.innerHTML = this.scopeHtml(templateString);
    ContactComponent.appendScopedStyle(scopedCssString);
    this.loadHomeComponent();
    this.loadAboutComponent();
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
            return `${part.trim()}[${ContactComponent.styleId}] `;
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
        el.setAttribute(ContactComponent.styleId, "");
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

  async loadAboutComponent() {
    // Dynamically import the AboutComponent
    const { AboutComponent } = await import("../about/about.component");
    if (!customElements.get("about-component")) {
      customElements.define("about-component", AboutComponent);
    }
    // At this point, any <home-component> elements in the DOM will be upgraded
  }

  async loadHomeComponent() {
    // Dynamically import the AboutComponent
    const { HomeComponent } = await import("../home/home.component");
    if (!customElements.get("home-component")) {
      customElements.define("home-component", HomeComponent);
    }
    // At this point, any <home-component> elements in the DOM will be upgraded
  }
}

if (!customElements.get(SELECTOR)) {
  customElements.define(SELECTOR, ContactComponent);
}
