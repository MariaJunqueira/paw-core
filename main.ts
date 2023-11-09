import DOMPurify from 'dompurify';

type Route = {
  path: string;
  view: () => string;
};

const navigateTo = (url: string) => {
  history.pushState(null, "", url);
  router();
};

const routes: Route[] = [
  { path: "/", view: () => "<h1>Home</h1>" },
  { path: "/about", view: () => "<h1>About</h1>" },
  // Add more routes here
];

const router = async () => {
  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  // Fallback to the first route if no match found
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const safeHTML = DOMPurify.sanitize(match.route.view());
  document.getElementById("app")!.innerHTML = safeHTML;
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).matches("[data-link]")) {
      e.preventDefault();
      navigateTo((e.target as HTMLAnchorElement).href);
    }
  });

  router();
});
