// if.directive.ts

export function PawIfDirective(rootElement, variables) {
  const elements = rootElement.querySelectorAll('[\\@pawIf]');

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
    conditionAttr = replacePlaceholders(conditionAttr, variables);
    const condition = evaluateCondition(conditionAttr);

    const { placeholder } = element.__pawIfState;
    const isAttached = placeholder.nextSibling === element;

    if (condition && !isAttached) {
      placeholder.parentNode.insertBefore(element, placeholder.nextSibling);
    } else if (!condition && isAttached) {
      placeholder.parentNode.removeChild(element);
    }
  });
}

function replacePlaceholders(pawIfValue, variables) {
  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    pawIfValue = pawIfValue.replace(regex, variables[key]);
  });
  return pawIfValue;
}

function evaluateCondition(value: string): boolean {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return Boolean(value);
}
