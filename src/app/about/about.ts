const aboutStyles = `
  <style>
    /* Scoped styles for About component */
    .about {
      padding: 20px;
      background-color: #f0f0f0;
    }
    h1 {
        color: purple;
      }
    /* ... more styles ... */
  </style>
`;

const aboutTemplate = `
  <div class="about">
    <h1>About</h1>
    <!-- other HTML content -->
  </div>
`;

export class AboutComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = aboutStyles + aboutTemplate;
  }
}

customElements.define("about-component", AboutComponent);
