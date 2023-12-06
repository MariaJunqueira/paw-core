export function scopeCss(css: string, styleId: string): string {
  return css.replace(/([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g, (match, selector) => {
    const scopedSelector = selector
      .split(",")
      .map((part) => {
        if (part.includes("-")) {
          return part.trim();
        }
        return `${part.trim()}[${styleId}]`;
      })
      .join(", ");
    return `${scopedSelector} ${match.endsWith(",") ? "," : " {"}`;
  });
}

export function scopeHtml(
  html: HTMLElement,
  styleId: string,
  data: any = {}
): string {
  html.querySelectorAll("*").forEach((el) => {
    if (!el.tagName.includes("-")) {
      el.setAttribute(styleId, "");
    }
  });

  return html.innerHTML;
}

export function replaceVariables(html: HTMLElement, data: any = {}) {
  const regex = /{{(.*?)}}/g; // Regular expression to match placeholders

  function interpolateText(node) {
    node.textContent = node.textContent.replace(regex, (match, key) => {
      const value = data[key.trim()]; // Get the value from the data object
      return value !== undefined ? value : match; // Replace with value or keep the placeholder if not found
    });
  }

  function traverse(node) {
    if (node.nodeType === 1) {
      // Element node, recursively traverse its child nodes
      for (let i = 0; i < node.childNodes.length; i++) {
        traverse(node.childNodes[i]);
      }
    } else if (node.nodeType === 3) {
      // Text node, interpolate its content
      interpolateText(node);
    }
  }

  traverse(html);

  return html;

  // // console.log(html, data.times);

  // html.innerHTML = html.innerHTML.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
  //   return data[key];
  // });

  // console.log(html.innerHTML);
  // return html;

}
