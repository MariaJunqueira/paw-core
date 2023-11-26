// observed.decorator.ts

export function Observed() {
  return function (target: Object, propertyKey: string | symbol) {
    const constructor = target.constructor as typeof HTMLElement & {
      observedAttributesSet?: Set<string | symbol>;
    };

    if (!constructor.observedAttributesSet) {
      constructor.observedAttributesSet = new Set<string | symbol>();
    }

    constructor.observedAttributesSet.add(`${String(propertyKey)}`);

    // Use a private variable to store the property value
    const privatePropertyName = `_${String(propertyKey)}`;

    // Define a new setter that saves the initial value and calls attributeChangedCallback
    const originalSetter = function (newValue) {
      const oldValue = this[privatePropertyName] || newValue; // Use the initial value if available

      this[privatePropertyName] = { isFirstChange: true, value: newValue };

      if (
        this.attributeChangedCallback &&
        typeof this.attributeChangedCallback === "function"
      ) {
        this.attributeChangedCallback(
          propertyKey.toString(),
          oldValue,
          newValue,
          true
        );
      }
    };

    // Replace the property descriptor with the new setter
    Object.defineProperty(target, propertyKey, {
      set: originalSetter,
      enumerable: true,
      configurable: true,
    });

    // Store the initial value as a property of the instance
    target[privatePropertyName] = undefined;
  };
}
