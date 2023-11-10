import routes from './routes';

export const navigateTo = (url: string) => {
  history.pushState(null, "", url);
  router();
};

export const router = async () => {
  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  // Assuming `view()` now just returns the custom element's HTML string
  const viewHTML = await match.route.view();
  const appElement = document.getElementById("app");
  if (appElement) appElement.innerHTML = viewHTML;
};
