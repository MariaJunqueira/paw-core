export function InterpolatorDirective(element, data) {
  const regex = /{{(.*?)}}/g; // Regular expression to match placeholders
  const originalTextContentMap = new Map(); // Map to store original text content of text nodes

  // Function to interpolate the text content of a node
  function interpolateText(node) {
    node.textContent = node.textContent.replace(regex, (match, key) => {
      const value = data[key.trim()]; // Get the value from the data object
      return value !== undefined ? value : match; // Replace with value or keep the placeholder if not found
    });
  }

  // Function to traverse and interpolate elements
  function traverse(node) {
    if (node.nodeType === 1) {
      // Element node, recursively traverse its child nodes
      for (let i = 0; i < node.childNodes.length; i++) {
        traverse(node.childNodes[i]);
      }
    } else if (node.nodeType === 3) {
      // Text node, interpolate its content and store the original text content
      const originalText = node.textContent;
      originalTextContentMap.set(node, originalText);
      interpolateText(node);
    }
  }

  // Initial interpolation
  traverse(element);

  // Function to reset text nodes to their original state
  function resetTextNodes() {
    originalTextContentMap.forEach((originalText, node) => {
      node.textContent = originalText;
    });
  }

  // Function to re-interpolate text nodes with updated data
  function reinterpolateTextNodes() {
    originalTextContentMap.forEach((originalText, node) => {
      interpolateText(node);
    });
  }

  // Example usage to reset and reinterpolate when a property changes
  function updateOnVariableChange(propertyName, newValue) {
    resetTextNodes();
    data[propertyName] = newValue;
    reinterpolateTextNodes();
  }

  return {
    updateOnVariableChange,
  };
}
