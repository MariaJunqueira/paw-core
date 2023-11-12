import { describe, expect, test } from '@jest/globals';

import { container } from '../containers/dependency-container';
import { Injectable } from './injectable.decorator';

describe("Injectable decorator", () => {
  test("should register the class with the container", () => {
    @Injectable()
    class TestClass {}

    expect(container.resolve(TestClass)).toBeInstanceOf(TestClass);
  });

  test("should return a proxy class that resolves instances from the container", () => {
    @Injectable()
    class TestClass {}

    const instance1 = new TestClass();
    const instance2 = new TestClass();

    expect(instance1).toBeInstanceOf(TestClass);
    expect(instance2).toBeInstanceOf(TestClass);
    expect(instance1).toBe(instance2);
  });
});
