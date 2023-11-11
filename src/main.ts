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
