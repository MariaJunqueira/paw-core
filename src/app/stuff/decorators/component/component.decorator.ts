import { scopeCss, scopeHtml } from "./component.helper";
import { ComponentClass } from "./component.interface";
import { Constructor } from "./component.type";

export function Component(options: any): any {
  return function <
    T extends Constructor & {
      observedAttributesSet?: Set<string>;
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
        newValue: string
      ) {
        // Defer execution until the component is fully constructed
        if (this._isFullyConstructed) {
          if (this.hasOwnProperty(name)) {
            this[name] = newValue;
          }

          this.dispatchPropertyChangedEvent(name, oldValue, newValue);
        }
      }

      constructor(...args: any) {
        super(...args);
        this.initializeData();
        this.initializeStyles();
        this.loadDynamicComponents(options.components);
        this._isFullyConstructed = true;
      }

      private initializeData() {
        const observedAttributes = (
          this.constructor as typeof constructor & ComponentClass
        ).observedAttributesSet;
        let properties = observedAttributes
          ? Array.from(observedAttributes)
          : [];
        properties = properties.concat(Object.getOwnPropertyNames(this));

        this._data = {}; // Initialize data as required

        this.addEventListener(
          "property-changed",
          this.handlePropertyChange.bind(this)
        );
        properties.forEach((property) => this.initializeProperty(property));
      }

      private handlePropertyChange(e: CustomEvent) {
        // Handle property change event
        this._data[e.detail.property] = e.detail.newValue;

        this.innerHTML = scopeHtml(
          options.template,
          (this.constructor as typeof constructor & ComponentClass).styleId,
          this._data
        );
      }

      private initializeProperty(property: string) {
        let value = this[property];
        this._data[property] = value;

        this.handleSpecialInitialization(property);
        this.definePropertyGettersAndSetters(property);
      }

      private handleSpecialInitialization(property: string) {
        if (this[`_${property}`]?.isFirstChange) {
          this[`_${property}`].isFirstChange = false;
          this._data[property] = this[`_${property}`].value;
        }
      }

      private definePropertyGettersAndSetters(property: string) {
        // property = property.replace("paw-", "");
        let value = this[property];
        console.log(property, this[property]);

        Object.defineProperty(this, property, {
          get: () => value,
          set: (newValue) => {
            const oldValue = value;
            value = newValue;

            if (oldValue !== newValue) {
              this.emitPropertyChangedEvent(
                property.replace("paw-", ""),
                oldValue,
                newValue
              );
            }
          },
          enumerable: true,
          configurable: true,
        });
      }

      private emitPropertyChangedEvent(
        property: string,
        oldValue: any,
        newValue: any
      ) {
        this.dispatchEvent(
          new CustomEvent("property-changed", {
            detail: {
              property,
              oldValue,
              newValue,
            },
          })
        );
      }

      private initializeStyles() {
        const styleId = (
          this.constructor as typeof constructor & ComponentClass
        ).styleId;
        this.setAttribute(styleId, "");
        const scopedCssString = scopeCss(options.styles, styleId);
        this.innerHTML = scopeHtml(options.template, styleId, this._data);
        (
          this.constructor as typeof constructor & ComponentClass
        ).appendScopedStyle(scopedCssString, styleId);
      }

      private dispatchPropertyChangedEvent(
        name: string,
        oldValue: string,
        newValue: string
      ) {
        this.dispatchEvent(
          new CustomEvent("property-changed", {
            detail: {
              name,
              oldValue,
              newValue,
            },
          })
        );
      }

      private static appendScopedStyle(
        scopedCssString: string,
        styleId: string
      ) {
        if (!document.head.querySelector(`#${styleId}`)) {
          const styleTag = document.createElement("style");
          styleTag.id = styleId;
          styleTag.textContent = scopedCssString;
          document.head.appendChild(styleTag);
        }
      }

      private loadDynamicComponents(
        components: Record<string, () => Promise<any>>
      ) {
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
