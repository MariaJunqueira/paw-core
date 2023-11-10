type Route = {
  path: string;
  view: () => Promise<string>;
};

const routes: Route[] = [
  {
    path: "/",
    view: () =>
      import("./home/home.component").then(() => {
        return `<home-component></home-component>`;
      }), // Assuming HomeComponent is already defined
  },
  {
    path: "/about",
    view: () =>
      import("./about/about.component").then(() => {
        return `<about-component></about-component>`;
      }), // Assuming AboutComponent is already defined
  },
  {
    path: "/contact",
    view: () =>
      import("./contact/contact.component").then(() => {
        return `<contact-component></contact-component>`;
      }), // Assuming AboutComponent is already defined
  },
  // ... other routes
];

export default routes;
