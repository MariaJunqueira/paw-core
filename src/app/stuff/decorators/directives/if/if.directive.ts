// if.directive.ts

export function PawIfDirective(rootElement) {
  const elements = rootElement.querySelectorAll('[\\@pawIf]');
  elements.forEach(element => {
    if (!element.__pawIfState) {
      const placeholder = document.createComment('@pawIf placeholder');
      element.parentNode.insertBefore(placeholder, element);
      element.__pawIfState = { placeholder };
    }

    const conditionAttr = element.getAttribute('@pawIf');
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

function evaluateCondition(value: string): boolean {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return Boolean(value);
}
