// if.directive.ts

export function PawIfDirective(rootElement, variables) {
  const elements = rootElement.querySelectorAll('[\\@pawIf]');
  const bindings = new Map();

  elements.forEach(element => {
    // Ensure the element is part of the DOM
    if (!element.parentNode) {
      console.warn('Element with pawIf is not in the DOM', element);
      return;
    }

    if (!element.__pawIfState) {
      const placeholder = document.createComment('@pawIf placeholder');
      element.parentNode.insertBefore(placeholder, element);
      element.__pawIfState = { placeholder };
    }

    let conditionAttr = element.getAttribute('@pawIf');
    const type = determineType(conditionAttr);

    if (type === 'variable') {
      const variableName = conditionAttr.trim();
      bindings.set(element, variableName);
      updateElementVisibility(element, variables[variableName]);
    } else {
      const evaluatedCondition = evaluateLiteralCondition(conditionAttr);
      updateElementVisibility(element, evaluatedCondition);
    }
  });

  // Check if the attribute is a variable name, boolean, or string
  function determineType(attr) {
    if (attr === 'true' || attr === 'false') return 'boolean';
    if (attr.match(/^[\w\d_]+$/)) return 'variable';
    return 'literal';
  }

  function evaluateLiteralCondition(value) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    // Additional logic for string literals or other types
    return value;
  }

  // Function to update element visibility
  function updateElementVisibility(element, value) {
    const { placeholder } = element.__pawIfState;
    const isAttached = placeholder.nextSibling === element;
    const condition = evaluateCondition(value);

    if (condition && !isAttached) {
      placeholder.parentNode.insertBefore(element, placeholder.nextSibling);
    } else if (!condition && isAttached) {
      placeholder.parentNode.removeChild(element);
    }
  }

  // Optimized function to update element visibility on variable change
  function updateOnVariableChange(variableName, newValue) {
    // Collect elements that need updating
    const elementsToUpdate = [];
    bindings.forEach((vName, element) => {
      if (vName === variableName) {
        elementsToUpdate.push({ element, newValue });
      }
    });
    // Batch DOM updates
    elementsToUpdate.forEach(({ element, newValue }) => {
      updateElementVisibility(element, newValue);
    });
  }

  function evaluateCondition(value: string): boolean {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return Boolean(value);
  }

  // Return an object that allows for updating on variable changes
  return {
    updateOnVariableChange
  };
}
