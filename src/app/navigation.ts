import routes, { Route } from './routes';
import { parseRouteParams } from './utils/parseRouteParams';

export const navigateTo = (url: string) => {
  history.pushState(null, "", url);
  router();
};

export const router = async () => {
  let match = findMatch(routes, location.pathname);

  if (!match?.route.view) {
    const fallBackRoute = routes.find((route) => route.path === "*");
    return navigateTo(fallBackRoute?.redirectTo || "/");
  }

  const viewHTML = await match.route.view(match.params);
  const appElement = document.getElementById("app");
  if (appElement) appElement.innerHTML = viewHTML;
};

function findMatch(routeArray: Route[], pathname, basePath = "") {
  for (const route of routeArray) {
    // Construct the full path for the current route
    const fullPath = `${basePath}${
      basePath && !basePath.endsWith("/") ? "/" : ""
    }${route.path}`;

    // First, check for matching subroutes
    if (route.kitties) {
      const subMatch = findMatch(route.kitties, pathname, fullPath);
      if (subMatch) return subMatch; // Return if a matching subroute is found
    }

    // Only if no subroutes match, check the current route
    const params = parseRouteParams(fullPath, pathname);
    if (params) {
      return { route, params }; // Return the parent route only if no subroutes matched
    }
  }
  return null; // No match found in this set of routes
}
