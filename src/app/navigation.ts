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

      if (Object.keys(params).length > 0 || location.pathname === route.path) {
        return { route, isMatch: true, params };
      }

      return { route, isMatch: false, params: {} };
    })
    .find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = { route: routes[0], isMatch: true, params: {} };
  }

  const viewHTML = await match.route.view(match.params);
  const appElement = document.getElementById("app");
  if (appElement) appElement.innerHTML = viewHTML;
};
