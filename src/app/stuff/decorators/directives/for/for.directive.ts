// for.directive.ts

export function PawForDirective(rootElement, variables) {
  // console.log(variables);

  let rendered = rootElement;
  const elements = rootElement.querySelectorAll('[\\@pawFor]');

  elements.forEach(element => {
    // Ensure the element is part of the DOM
    if (!element.parentNode) {
      console.warn('Element with pawFor is not in the DOM', element);
      return;
    }

    if (!element.__pawForState) {
      const placeholder = document.createComment('@pawFor placeholder');
      element.parentNode.insertBefore(placeholder, element);
      element.__pawForState = { placeholder, originalElement: element.cloneNode(true) };
      element.remove(); // Remove the element after storing its state
    }

    const { placeholder, originalElement } = element.__pawForState;
    let pawForValue = replacePlaceholders(
      element.getAttribute("@pawFor"),
      variables
    );
    const loopParams = parseLoopParameters(pawForValue);
    clearLoopElements(placeholder);

    rendered = renderLoopElements(placeholder, originalElement, loopParams);
  });
  // console.log(rendered);

  return rendered.innerHTML;
}

function replacePlaceholders(pawForValue, variables) {
  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    pawForValue = pawForValue.replace(regex, variables[key]);
  });
  // console.log('replacePlaceholders', pawForValue);

  return pawForValue;
}

function parseLoopParameters(pawForValue) {
  const loopRegex = /let\s+([a-zA-Z_$][\w$]*)\s*=\s*(-?\d+);\s*\1\s*([<>]=?|==)\s*(-?\d+);\s*\1((\+\+|--)|(\+=|-=)\s*(-?\d+))/;
  const match = pawForValue.match(loopRegex);
  if (!match) {
    throw new Error('Invalid pawFor syntax');
  }

  return {
    iterator: match[1],
    start: parseInt(match[2], 10),
    comparisonOperator: match[3],
    end: parseInt(match[4], 10),
    incrementExpression: match[5],
    simpleIncrement: match[6],
    compoundIncrement: match[7],
    compoundValue: parseInt(match[8], 10) || 0
  };
}

function renderLoopElements(placeholder, originalElement, loopParams) {
  const { iterator, start, comparisonOperator, end, incrementExpression, simpleIncrement, compoundIncrement, compoundValue } = loopParams;

  let index = start;
  while (evaluateCondition(index, comparisonOperator, end)) {
    const clonedElement = originalElement.cloneNode(true);
    clonedElement.innerHTML = clonedElement.innerHTML.replace(new RegExp(`{{\\s*${iterator}\\s*}}`, "g"), index.toString());

    // Mark the element as generated by pawFor
    clonedElement.setAttribute('pawForGenerated', '');
    placeholder.parentNode.insertBefore(clonedElement, placeholder);

    if (simpleIncrement) {
      index += (simpleIncrement === '++') ? 1 : -1;
    } else if (compoundIncrement) {
      index += (compoundIncrement === '+=' ? compoundValue : -compoundValue);
    }
  }

  return placeholder.parentNode;
}

function evaluateCondition(index, operator, value) {
  switch (operator) {
    case "<":
      return index < value;
    case ">":
      return index > value;
    case "<=":
      return index <= value;
    case ">=":
      return index >= value;
    case "==":
      return index == value;
    case "===":
      return index === value;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

function clearLoopElements(placeholder) {
  // Traverse next siblings starting from the placeholder
  let nextElement = placeholder.nextSibling;

  while (nextElement) {
    // Check if the next sibling is a generated element
    if (nextElement.nodeType === Node.ELEMENT_NODE && nextElement.hasAttribute('pawForGenerated')) {
      const toRemove = nextElement;
      nextElement = nextElement.nextSibling;
      toRemove.remove();
    } else {
      // Break the loop if the next sibling is not a generated element
      break;
    }
  }
}
