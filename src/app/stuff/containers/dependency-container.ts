class DependencyContainer {
  private dependencies = new Map<any, any>();
  private instances = new Map<any, any>();

  register(token: any, dependency: any): void {
    this.dependencies.set(token, dependency);
  }

  resolve<T>(token: any): T {
    if (!this.instances.has(token)) {
      if (!this.dependencies.has(token)) {
        this.register(token, token);
      }
      const dependencyConstructor = this.dependencies.get(token);
      const instance = new dependencyConstructor();
      this.instances.set(token, instance);
    }
    return this.instances.get(token) as T;
  }
}

export const container = new DependencyContainer();
