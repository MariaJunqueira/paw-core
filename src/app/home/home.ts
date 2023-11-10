const homeStyles = `
  <style>
    /* Scoped styles for Home component */
    .home {
      padding: 20px;
      background-color: #f0f0f0;
    }
    h1 {
      color: green;
    }
    /* ... more styles ... */
  </style>
`;

const homeTemplate = `
  <div class="home">
    <h1>Home</h1>
    <!-- other HTML content -->
  </div>
`;

export class HomeComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = homeStyles + homeTemplate;
  }
}

customElements.define("home-component", HomeComponent);
