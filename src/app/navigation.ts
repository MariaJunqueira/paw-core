import { handleRoute } from "./routeHandler";
import routes, { Route } from "./routes";

export const navigateTo = (url: string) => {
  history.pushState(null, "", url);
  router();
};

export const router = async () => {
  const pathname = location.pathname;
  let match = findMatch(allRoutes, pathname);

  if (!match) {
    return navigateToFallback();
  }

  const appElement = document.getElementById("app");
  if (!appElement) {
    return;
  }
  // Start from the topmost parent and render downwards
  await renderMatchedContent(appElement, match);
};

function findMatch(routeArray, pathname) {
  return routeArray.findLast((route) => {
    if (route.path === pathname || route.path === pathname.replaceAll("/", ""))
      return true;

    const routePattern = route.path.split("/");
    const pathSegments = pathname.split("/");

    if (routePattern.length !== pathSegments.length) {
      return false; // The route and pathname have a different number of segments
    }

    return routePattern.every((segment, index) => {
      return segment.startsWith(":") || segment === pathSegments[index];
    });
  });
}

async function renderMatchedContent(appElement, match) {
  if (match?.parentRoute) {
    // Recursively call until the topmost parent is reached
    await renderMatchedContent(appElement, match.parentRoute);
  }

  // Render the current route's view inside <mug-router> or the appElement for the topmost parent
  if (match?.route?.componentPath) {
    const viewHTML = await handleRoute(match.route);
    if (match.parentRoute) {
      const mugRouterElement = appElement.querySelectorAll("mug-router");
      mugRouterElement[mugRouterElement.length - 1].innerHTML = viewHTML;
    } else {
      appElement.innerHTML = viewHTML;
    }
  }
}

function navigateToFallback() {
  const fallBackRoute = routes.find((route) => route.path === "*");
  if (fallBackRoute) {
    navigateTo(fallBackRoute?.redirectTo || "/");
  }
}

export type Match = {
  route: Route;
  params: Record<string, string>;
  parentRoute?: Match;
  subRoute?: Match;
};

function generateRouteList(routeArray, basePath = "", parentRoute?: any) {
  let routeList: any = [];

  for (const route of routeArray) {
    const fullPath =
      basePath === "/" || basePath === ""
        ? route.path
        : `${basePath}${route.path === "/" ? "" : `${route.path}`}`;

    // Construct the route object including the parent
    const routeWithParent = { route, parentRoute };

    // Add the route along with its parent
    routeList.push({ path: fullPath, ...routeWithParent });

    if (route.kitties) {
      // Include subroutes with the current route as their parent
      routeList = routeList.concat(
        generateRouteList(route.kitties, fullPath, routeWithParent)
      );
    }
  }

  return routeList;
}

const allRoutes = generateRouteList(routes);
