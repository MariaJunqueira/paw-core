// for.directive.ts

export function PawForDirective(rootElement, variables) {
  console.log('PawForDirective');
  const elements = rootElement.querySelectorAll('[\\@pawFor]');
  const bindings = new Map();

  elements.forEach(element => {
    // Initialize state and setup bindings
    setupPawForState(element);
    const loopParams = parseAndEvaluateLoopParameters(element, variables);
    updateLoopContent(element.__pawForState.placeholder, element.__pawForState.originalElement, loopParams, variables);
    bindings.set(element, loopParams); // Assume loopParams contains variable dependencies
  });

  // Function to update loop content when a variable changes
  function updateOnVariableChange(variableName, newValue) {
    // Update the variable in the variables object
    variables[variableName] = newValue;

    // Update the content of all elements
    bindings.forEach((params, element) => {
      // Assuming that any loop might depend on any variable
      const updatedLoopParams = parseAndEvaluateLoopParameters(element, variables);
      updateLoopContent(element.__pawForState.placeholder, element.__pawForState.originalElement, updatedLoopParams, variables);
    });
  }

  function setupPawForState(element) {
    // Initialize state for new elements
    if (!element.__pawForState && element.parentNode) {
      const placeholder = document.createComment('@pawFor placeholder');
      element.parentNode.insertBefore(placeholder, element);
      element.__pawForState = {
        placeholder,
        originalElement: element.cloneNode(true),
        originalContent: element.innerHTML // Store the original content
      };
      element.remove();
    } else if (!element.parentNode) {
      console.warn('Element has no parent node, might have been removed from DOM', element);
    }
  }

  function parseAndEvaluateLoopParameters(element, variables) {
    let pawForValue = replacePlaceholders(element.getAttribute("@pawFor"), variables);
    return parseLoopParameters(pawForValue, variables);
  }

  // In updateLoopContent, make sure you're passing the element that has __pawForState
  function updateLoopContent(placeholder, elementWithState, loopParams, variables) {
    clearLoopElements(placeholder);
    renderLoopElements(placeholder, elementWithState, loopParams, variables);
  }

  function replacePlaceholders(pawForValue, variables) {
    Object.keys(variables).forEach((key) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      pawForValue = pawForValue.replace(regex, variables[key]);
    });
    return pawForValue;
  }

  function parseLoopParameters(pawForValue, variables) {
    const loopRegex = /let\s+([a-zA-Z_$][\w$]*)\s*=\s*([^;]+);\s*\1\s*([<>]=?|==)\s*([^;]+);\s*\1(\+\+|--|\+=|-=\s*[^;]+)/;
    const match = pawForValue.match(loopRegex);
    if (!match) {
      throw new Error('Invalid pawFor syntax');
    }

    // Retrieve or parse values
    const start = parseValue(match[2], variables);
    const end = parseValue(match[4], variables);
    const increment = parseIncrement(match[5], variables);


    return {
      iterator: match[1],
      start,
      comparisonOperator: match[3],
      end,
      incrementExpression: increment.expression,
      incrementValue: increment.value
    };
  }

  function parseValue(value, variables) {
    // Check if value is a variable
    if (variables.hasOwnProperty(value.trim())) {
      return variables[value.trim()];
    }
    return parseInt(value, 10);
  }

  function parseIncrement(incrementExpression, variables) {
    let expression, value;
    if (incrementExpression.includes('+=')) {
      expression = '+=';
      value = parseValue(incrementExpression.split('+=')[1], variables);
    } else if (incrementExpression.includes('-=')) {
      expression = '-=';
      value = parseValue(incrementExpression.split('-=')[1], variables);
    } else if (incrementExpression === '++') {
      expression = '++';
      value = 1;
    } else if (incrementExpression === '--') {
      expression = '--';
      value = -1;
    } else {
      throw new Error('Invalid increment expression in pawFor');
    }

    return { expression, value };
  }


  function renderLoopElements(placeholder, elementWithState, loopParams, variables) {
    const { iterator, start, comparisonOperator, end, incrementExpression, incrementValue } = loopParams;
    let index = start;
    let currentElement = placeholder.nextSibling;

    let originalContent = elementWithState.innerHTML; // Default to originalElement content
    if (elementWithState.__pawForState?.originalContent) {
      originalContent = elementWithState.__pawForState.originalContent; // Correctly access originalContent
    }

    while (evaluateCondition(index, comparisonOperator, end)) {
      // Check if the currentElement matches the loop index
      if (currentElement && currentElement.nodeType === Node.ELEMENT_NODE && currentElement.hasAttribute('pawForGenerated') && currentElement.getAttribute('pawForIndex') == index.toString()) {
        // Update existing element
        updateElementContent(currentElement, originalContent, iterator, index, variables);
        currentElement = currentElement.nextSibling;
      } else {
        // Insert new element
        const clonedElement = elementWithState.cloneNode(true); // Clone elementWithState instead of originalElement
        updateElementContent(clonedElement, originalContent, iterator, index, variables);
        clonedElement.setAttribute('pawForGenerated', '');
        clonedElement.setAttribute('pawForIndex', index.toString());
        placeholder.parentNode.insertBefore(clonedElement, currentElement);
      }

      // Increment loop index
      index = getNextIndex(index, incrementExpression, incrementValue);
    }

    // Remove any remaining generated elements
    while (currentElement && currentElement.hasAttribute && currentElement.hasAttribute('pawForGenerated')) {
      const toRemove = currentElement;
      currentElement = currentElement.nextSibling;
      toRemove.remove();
    }
  }

  function updateElementContent(element, originalElement, iterator, index, variables) {

    // Update element content based on the original template and current index
    element.innerHTML = originalElement.replace(new RegExp(`{{\\s*${iterator}\\s*}}`, "g"), index.toString());
    // Update other placeholders in the element
    element.innerHTML = replacePlaceholders(element.innerHTML, variables);
  }

  function getNextIndex(index, incrementExpression, incrementValue) {
    switch (incrementExpression) {
      case '++':
        return index + 1;
      case '--':
        return index - 1;
      case '+=':
        return index + incrementValue;
      case '-=':
        return index - incrementValue;
      default:
        throw new Error('Invalid increment expression in pawFor');
    }
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

  return {
    updateOnVariableChange
  }
}
