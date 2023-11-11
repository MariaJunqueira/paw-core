type BaseClass = HTMLElement;

type Constructor = { new (...args: any[]): BaseClass };

export function Component(options: any): any {
  return function <T extends Constructor>(constructor: T) {
    return class extends constructor {
      static styleId = `_${options.selector}-${Date.now()}`;
      constructor(...args: any) {
        super(...args);
        const styleId = (
          this.constructor as typeof constructor & WebComponentClass
        ).styleId;
        this.setAttribute(styleId, "");
        // Scope CSS and HTML
        const scopedCssString = this.scopeCss(options.styles, styleId);
        this.innerHTML = this.scopeHtml(options.template, styleId);
        (
          this.constructor as typeof constructor & WebComponentClass
        ).appendScopedStyle(scopedCssString, styleId);
        // Load dynamic components
      }

      scopeCss(css: string, styleId: string): string {
        return css.replace(
          /([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g,
          (match, selector) => {
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
          }
        );
      }

      scopeHtml(html: string, styleId: string): string {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        doc.body.querySelectorAll("*").forEach((el) => {
          if (!el.tagName.includes("-")) {
            el.setAttribute(styleId, "");
          }
        });
        return doc.body.innerHTML;
      }

      static appendScopedStyle(scopedCssString: string, styleId: string) {
        if (!document.head.querySelector(`#${styleId}`)) {
          const styleTag = document.createElement("style");
          styleTag.id = styleId;
          styleTag.textContent = scopedCssString;
          document.head.appendChild(styleTag);
        }
      }
    } as unknown as T;
  };
}
interface WebComponentClass {
  appendScopedStyle: (scopedCssString: string, styleId: string) => void;
  styleId;
  string;
}
