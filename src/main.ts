import './styles.scss';

type Route = {
  path: string;
  view: () => Promise<string>;
};

const navigateTo = (url: string) => {
  history.pushState(null, "", url);
  router();
};

const routes: Route[] = [
  {
    path: "/",
    view: () =>
      import("./app/home/home.component").then(() => {
        return `<home-component></home-component>`;
      }), // Assuming HomeComponent is already defined
  },
  {
    path: "/about",
    view: () =>
      import("./app/about/about.component").then(() => {
        return `<about-component></about-component>`;
      }), // Assuming AboutComponent is already defined
  },
  {
    path: "/contact",
    view: () =>
      import("./app/contact/contact.component").then(() => {
        return `<contact-component></contact-component>`;
      }), // Assuming AboutComponent is already defined
  },
  // ... other routes
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

  // Assuming `view()` now just returns the custom element's HTML string
  const viewHTML = await match.route.view();
  const appElement = document.getElementById("app");
  if (appElement) appElement.innerHTML = viewHTML;
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
