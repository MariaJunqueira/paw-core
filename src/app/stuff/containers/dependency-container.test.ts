import { describe, expect } from '@jest/globals';

import { container } from './dependency-container';

describe("DependencyContainer", () => {
  describe("register method", () => {
    it("should register a dependency", () => {
      const token = "SomeDependency";
      container.register(token, MockDependency);
      expect(container.resolve(token)).toBeInstanceOf(MockDependency);
    });
  });

  describe("resolve method", () => {
    it("should resolve a registered dependency", () => {
      const token = "AnotherDependency";
      container.register(token, MockDependency);
      expect(container.resolve(token)).toBeInstanceOf(MockDependency);
    });

    it("should auto-register and resolve an unregistered dependency", () => {
      class SomeClass {}

      const instance = container.resolve(SomeClass);

      expect(instance).toBeInstanceOf(SomeClass);
      expect(container.resolve(SomeClass)).toBe(instance); // Test singleton behavior
    });
  });
});

class MockDependency {
  constructor() {}
}
