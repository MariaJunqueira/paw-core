async function loadAndDefineComponent(componentPath, componentName) {
  const module = await componentPath();
  const component = module.default;
  if (!customElements.get(componentName)) {
    customElements.define(componentName, component);
  }
}

export async function handleRoute(route) {
  await loadAndDefineComponent(route.componentPath, route.componentName);
  return `<${route.componentName}></${route.componentName}>`;
}
