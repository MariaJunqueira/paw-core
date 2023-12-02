import { Route } from "@pawcode/routes";

const routes: Route[] = [
  {
    path: "",
    componentName: "app-component",
    componentPath: () => import("./app.component"),
  },
];

export default routes;
