type Route = {
  path: RegExp | string;
  view?: (params?: any) => Promise<string>;
  redirectTo?: string;
};

const routes: Route[] = [
  {
    path: "/",
    view: () =>
      import("./home/home.component").then(
        () => `<home-component></home-component>`
      ), // Assuming HomeComponent is already defined
  },
  {
    path: "/contact",
    view: () =>
      import("./contact/contact.component").then(
        () => `<contact-component></contact-component>`
      ), // Assuming AboutComponent is already defined
  },
  {
    path: "/about/:id",
    view: () =>
      import("./about/about.component").then(
        () => `<about-component></about-component>`
      ),
  },
  {
    path: "/404",
    view: () =>
      import("./not-found/not-found.component").then(
        () => `<not-found-component></not-found-component>`
      ),
  },
  {
    path: "*", // Fallback route
    redirectTo: "/404",
  },
  // ... other routes
];

export default routes;
