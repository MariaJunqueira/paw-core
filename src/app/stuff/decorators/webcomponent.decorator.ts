type BaseClass = HTMLElement;

type Constructor = { new (...args: any[]): BaseClass };

export function Component(options: any): any {
  return function <T extends Constructor>(constructor: T) {
    return class extends constructor {
      static styleId = `_${options.selector}-${Date.now()}`;
      constructor(...args: any) {
        super(...args);

        this.addEventListener("property-changed", (e: CustomEvent) => {
          if (e.detail.newValue !== e.detail.oldValue) {
            const data = {};
            data[e.detail.property] = e.detail.newValue;
            this.innerHTML = this.scopeHtml(options.template, styleId, data);
          }
        });

        const data = {};
        // Get properties of the component
        Object.getOwnPropertyNames(this).forEach((property) => {
          let value = this[property];
          data[property] = value;

          Object.defineProperty(this, property, {
            get: () => value,
            set: (newValue) => {
              const oldValue = value;
              value = newValue;
              if (oldValue !== newValue) {
                this.dispatchEvent(
                  new CustomEvent("property-changed", {
                    detail: { property, oldValue, newValue },
                  })
                );
              }
            },
            enumerable: true,
            configurable: true,
          });
        });

        const styleId = (
          this.constructor as typeof constructor & WebComponentClass
        ).styleId;
        this.setAttribute(styleId, "");
        // Scope CSS and HTML
        const scopedCssString = this.scopeCss(options.styles, styleId);

        this.innerHTML = this.scopeHtml(options.template, styleId, data);

        (
          this.constructor as typeof constructor & WebComponentClass
        ).appendScopedStyle(scopedCssString, styleId);
        this.loadDynamicComponents(options.components);
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

      scopeHtml(html: string, styleId: string, data: any = {}): string {
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

      static appendScopedStyle(scopedCssString: string, styleId: string) {
        if (!document.head.querySelector(`#${styleId}`)) {
          const styleTag = document.createElement("style");
          styleTag.id = styleId;
          styleTag.textContent = scopedCssString;
          document.head.appendChild(styleTag);
        }
      }

      loadDynamicComponents(components: Record<string, () => Promise<any>>) {
        if (!components) return;
        for (const [name, importFn] of Object.entries(components)) {
          if (!customElements.get(name)) {
            importFn()
              .then((module) => {
                if (!customElements.get(name)) {
                  customElements.define(name, module.default);
                }
              })
              .catch((error) => {
                console.error(`Error loading component '${name}':`, error);
              });
          }
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
