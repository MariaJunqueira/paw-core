import routes from './routes';
import { parseRouteParams } from './utils/parseRouteParams';

export const navigateTo = (url: string) => {
  history.pushState(null, "", url);
  router();
};

export const router = async () => {
  let match = routes
    .map((route) => {
      const params = parseRouteParams(route.path, location.pathname);

      if (params) {
        return { route, isMatch: true, params };
      }

      return { route, isMatch: false, params: {} };
    })
    .find((potentialMatch) => potentialMatch.isMatch);

  if (!match?.route.view) {
    const fallBackRoute = routes.find((route) => route.path === "*");
    return navigateTo(fallBackRoute?.redirectTo || "/");
  }

  const viewHTML = await match.route.view(match.params);
  const appElement = document.getElementById("app");
  if (appElement) appElement.innerHTML = viewHTML;
};
