export const parseRouteParams = (routePattern, urlPath) => {
  const routeParts = routePattern.split("/");
  const pathParts = urlPath.split("/");

  let params = {};

  routeParts.forEach((part, index) => {
    if (part.startsWith(":")) {
      const paramName = part.slice(1); // remove the ':' character
      params[paramName] = pathParts[index];
    }
  });

  return params;
};
