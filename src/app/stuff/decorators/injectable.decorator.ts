import { container } from '../containers/dependency-container';

export function Injectable(): any {
  return function (target: any) {
    container.register(target, target);

    // Replace the original class with a proxy class
    return new Proxy(target, {
      construct: (target) => {
        // Always resolve the instance from the container
        return container.resolve(target);
      },
    });
  };
}
