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
    path: "/",
    componentName: "app-component",
    componentPath: () => import("./app.component"),
  },
];

export default routes;
