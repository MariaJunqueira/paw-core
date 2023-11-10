import routes, { Route } from './routes';
import { parseRouteParams } from './utils/parseRouteParams';

export const navigateTo = (url: string) => {
  history.pushState(null, "", url);
  router();
};

export const router = async () => {
  let match = findMatch(routes, location.pathname);

  if (!match?.route.view) {
    return navigateToFallback();
  }

  const appElement = document.getElementById("app");
  if (!appElement) {
    return;
  }
  await renderMatchedContent(appElement, match);
};

async function renderMatchedContent(appElement: HTMLElement, match: Match) {
  if (match?.parentRoute?.view) {
    const parentHtml = await match.parentRoute.view(match.params);
    appElement.innerHTML = parentHtml;
  } else if (match.route.view) {
    const innerHTML = await match.route.view(match.params);
    appElement.innerHTML = innerHTML;
    return;
  }

  // If there's a subroute match, render its view inside the parent component's placeholder
  if (match?.route.view) {
    const subrouteViewHTML = await match.route.view(match.params);
    const subroutePlaceholder = appElement.querySelector(
      "#subroute-placeholder"
    );
    if (subroutePlaceholder) {
      subroutePlaceholder.innerHTML = subrouteViewHTML;
    }
  }
}

function findMatch(routeArray: Route[], pathname: string, basePath = "") {
  for (const route of routeArray) {
    const fullPath = `${basePath}${basePath.endsWith("/") ? "" : "/"}${
      route.path
    }`;

    if (route.kitties) {
      const subMatch = findMatch(route.kitties, pathname, fullPath);
      if (subMatch) return { ...subMatch, parentRoute: route };
    }

    const params = parseRouteParams(fullPath, pathname);
    if (params) {
      return { route, params };
    }
  }
  return null;
}

function navigateToFallback() {
  const fallBackRoute = routes.find((route) => route.path === "*");
  navigateTo(fallBackRoute?.redirectTo || "/");
}

export type Match = {
  route: Route; // The matched route
  params: Record<string, string>; // Parameters extracted from the URL
  parentRoute?: Route; // The parent route if this is a subroute match
};
