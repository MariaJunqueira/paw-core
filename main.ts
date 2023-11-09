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

  // Now `view()` returns a promise because of dynamic import
  match.route.view().then((module) => {
    const safeHTML = DOMPurify.sanitize(module.default);
    document.getElementById("app")!.innerHTML = safeHTML;
  });
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

// Utility function to load HTML content from a file
function loadHtml(path: string): Promise<string | void> {
  return fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .catch((error) => {
      console.error("Error fetching the HTML file:", error);
    });
}
