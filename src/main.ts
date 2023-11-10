import './styles.scss';

import { navigateTo, router } from './app/navigation';

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

function getBasePath() {
  // This assumes that your SPA is served from a path that matches the repository name
  const pathArray = window.location.pathname.split("/");
  const basePath = pathArray.length > 1 ? `/${pathArray[1]}/` : "/";

  return basePath.replace("//", "/");
}

const base = document.createElement("base");
base.href = getBasePath();
document.head.prepend(base);
