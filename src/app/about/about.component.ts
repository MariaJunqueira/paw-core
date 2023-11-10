import cssString from './about.component.css';
import templateString from './about.component.html';

export class AboutComponent extends HTMLElement {
  constructor() {
    super();

    // Append the HTML content
    this.innerHTML = templateString;

    // Create a <style> element and prefix all CSS rules with the tag name
    const style = document.createElement("style");
    const prefixedCssString = this.prefixCssSelectors(
      cssString,
      "about-component"
    );
    style.textContent = prefixedCssString;

    // Append the <style> element to the component
    this.appendChild(style);
  }

  // A method to prefix all CSS selectors with the custom element tag name
  prefixCssSelectors(css, tagName) {
    return css.replace(
      /(^|\s+)([a-z0-9\[\]\=\"\:\-\_\.]+)(\s*{)/gi,
      `$1${tagName} $2$3`
    );
  }
}

if (!customElements.get("about-component")) {
  customElements.define("about-component", AboutComponent);
}
