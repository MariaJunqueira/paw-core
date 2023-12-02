// if.directive.ts

export function PawIfDirective(rootElement) {
  const elements = rootElement.querySelectorAll('[\\@pawIf]');
  elements.forEach(element => {
    if (!element.__pawIfState) {
      const placeholder = document.createComment('@pawIf placeholder');
      element.parentNode.insertBefore(placeholder, element);
      element.__pawIfState = { placeholder };
    }

    const condition = element.getAttribute('@pawIf') === "true";
    const { placeholder } = element.__pawIfState;
    const isAttached = placeholder.nextSibling === element;

    if (condition && !isAttached) {
      placeholder.parentNode.insertBefore(element, placeholder.nextSibling);
    } else if (!condition && isAttached) {
      placeholder.parentNode.removeChild(element);
    }
  });
}
