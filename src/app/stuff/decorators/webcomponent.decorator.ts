type BaseClass = HTMLElement;

type Constructor = { new (...args: any[]): BaseClass };

export function Component(options: any): any {
  return function <
    T extends Constructor & {
      observedAttributesSet?: Set<string>;
      _lalaland?: string[];
    }
  >(constructor: T) {
    return class extends constructor {
      static styleId = `_${options.selector}-${Date.now()}`;
      static observedAttributesSet =
        constructor.observedAttributesSet || new Set();
      private _isFullyConstructed = false;
      private _data;
      static get observedAttributes() {
        return Array.from(this.observedAttributesSet);
      }

      attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string,
        isFirstChanged: boolean
      ) {
        // Defer execution until the component is fully constructed
        if (this._isFullyConstructed) {
          if (this.hasOwnProperty(name)) {
            this[name] = newValue;
          }

          this.dispatchEvent(
            new CustomEvent("property-changed", {
              detail: { property: name, oldValue, newValue, isFirstChanged },
            })
          );
        }
      }

      constructor(...args: any) {
        super(...args);

        const lalaland = (
          this.constructor as typeof constructor & WebComponentClass
        ).observedAttributesSet;
        let maria: string[] = [];
        if (lalaland?.size) {
          maria = Array.from(lalaland);
        }
        maria = maria.concat(Object.getOwnPropertyNames(this));

        this._data = {
          // Initialize all properties here
          // Example: title: '', description: '', etc.
        };

        this.addEventListener("property-changed", (e: CustomEvent) => {
          // Update the specific property in your data object
          this._data[e.detail.property] = e.detail.newValue;

          // Call scopeHtml with the updated data object
          this.innerHTML = this.scopeHtml(
            options.template,
            styleId,
            this._data
          );
        });

        maria?.forEach((property) => {
          let value = this[property];
          this._data[property] = value;
          if (this[`_${property}`]?.isFirstChange) {
            this[`_${property}`].isFirstChange = false;
            this._data[property] = this[`_${property}`].value;
          }

          Object.defineProperty(this, property, {
            get: () => value,
            set: (newValue) => {
              const oldValue = value;
              value = newValue;

              if (oldValue !== newValue) {
                this.dispatchEvent(
                  new CustomEvent("property-changed", {
                    detail: {
                      property,
                      oldValue,
                      newValue,
                      isFirstChange: false,
                    },
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

        this.innerHTML = this.scopeHtml(options.template, styleId, this._data);

        (
          this.constructor as typeof constructor & WebComponentClass
        ).appendScopedStyle(scopedCssString, styleId);
        this.loadDynamicComponents(options.components);
        this._isFullyConstructed = true;
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
