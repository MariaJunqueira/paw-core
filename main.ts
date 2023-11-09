import DOMPurify from 'dompurify';

type Route = {
  path: string;
  view: () => Promise<{ default: string }>;
};

const navigateTo = (url: string) => {
  history.pushState(null, "", url);
  router();
};

const routes: Route[] = [
  {
    path: "/",
    view: () =>
      import("./src/app/home/home").then((module) => ({
        default: module.default,
      })),
  },
  {
    path: "/about",
    view: () =>
      import("./src/app/about/about").then((module) => ({
        default: module.default,
      })),
  },
  // Add more lazy-loaded routes here
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

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  //  `view()` returns a promise because of dynamic import
  match.route
    .view()
    .then((module) => {
      const safeHTML = DOMPurify.sanitize(module.default);
      document.getElementById("app")!.innerHTML = safeHTML;
    })
    .catch((error) => {
      // Handle loading errors (e.g., show a 404 error message or a fallback view)
      console.error("Error while loading the route view:", error);
      document.getElementById("app")!.innerHTML = "Error loading the view.";
    });
};

window.addEventListener("pagehide", (event) => {
  if (event.persisted) {
    // Page is being cached
  }
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    // Page is restored from the cache
    router(); // Re-run the router or perform necessary updates
  }
});

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
