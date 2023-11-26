export function loadDynamicComponents(
  components: Record<string, () => Promise<any>>
) {
  if (!components) return;
  for (const [name, importFn] of Object.entries(components)) {
    if (!customElements.get(name)) {
      importFn()
        .then((module) => {
          if (!customElements.get(name)) {
            customElements.define(name, module.default);
          }
        })
        .catch((error) => {
          console.error(`Error loading component '${name}':`, error);
        });
    }
  }
}
