// src/utils/parseRouteParams.js
export const parseRouteParams = (routePattern, urlPath) => {
  const routeParts = routePattern.split("/");
  const pathParts = urlPath.split("/");

  if (routeParts.length !== pathParts.length) {
    return null; // Route pattern does not fully match the path
  }

  let params = {};

  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(":")) {
      params[routeParts[i].substring(1)] = pathParts[i];
    } else if (routeParts[i] !== pathParts[i]) {
      return null; // Mismatch between route pattern and path
    }
  }

  return params;
};
