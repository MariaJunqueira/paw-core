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
  html: string,
  styleId: string,
  data: any = {}
): string {
  const templatedHtml = html.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
    return data[key];
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(templatedHtml, "text/html");
  doc.body.querySelectorAll("*").forEach((el) => {
    if (!el.tagName.includes("-")) {
      el.setAttribute(styleId, "");
    }
  });

  return doc.body.innerHTML;
}

export function getUID(): string {
  return `_${String(Date.now().toString(36) + Math.random().toString(36)).replace(/\./g, '')}`;
}
