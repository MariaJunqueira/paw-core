export type Route = {
  path: string; // Path of the route
  view?: (params?: any) => Promise<string>; // The view function that returns the component as a string
  redirectTo?: string; // URL to redirect to (for fallback routes)
  kitties?: Route[]; // Subroutes
  componentName?: string;
  componentPath?: any;
};

const routes: Route[] = [
  {
    path: "",
    componentName: "app-component",
    componentPath: () => import("./app.component"),
    kitties: [
      {
        path: "/",
        componentName: "home-component",
        componentPath: () => import("./home/home.component"),
      },
      {
        path: "/contact",
        componentName: "contact-component",
        componentPath: () => import("./contact/contact.component"),
        kitties: [
          {
            path: "/email",
            componentName: "email-component",
            componentPath: () => import("./contact/email/email.component"),
          },
        ],
      },
      {
        path: "/about/:id",
        componentName: "about-component",
        componentPath: () => import("./about/about.component"),
      },
      {
        path: "/404",
        componentName: "not-found-component",
        componentPath: () => import("./not-found/not-found.component"),
      },
      // ... other routes
    ],
  },
  {
    path: "*", // Fallback route
    redirectTo: "/404",
  },
];

export default routes;
