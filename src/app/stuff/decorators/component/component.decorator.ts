import { scopeCss, scopeHtml } from "./component.helper";
import { loadDynamicComponents } from "./dynamic-component.loader";

export interface ComponentClass {
  new (...args: any[]): HTMLElement;
  observedAttributesSet?: Set<string>;
  appendScopedStyle: (scopedCssString: string, styleId: string) => void;
  styleId: string;
}

export function Component(options: any): any {
  return function <T extends ComponentClass>(OriginalClass: T) {
    return class extends HTMLElement {
      static styleId = `_${options.selector}-${Date.now()}`;
      static observedAttributesSet =
        OriginalClass.observedAttributesSet || new Set();
      private _isFullyConstructed = false;
      private _data;

      constructor(...args: any) {
        super();

        const instance = new OriginalClass(...args);

        // Copy properties from the instance to 'this'
        Object.assign(this, instance);
        this.initializeData();
        this.initializeStyles();
        loadDynamicComponents(options.components);
        this._isFullyConstructed = true;

        // Dynamically check and call pawInit if it exists
        if (typeof instance["pawInit"] === "function") {
          instance["pawInit"].apply(this);
        }
      }

      private initializeData() {
        const observedAttributes = (
          this.constructor as typeof OriginalClass & ComponentClass
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
          (this.constructor as typeof OriginalClass & ComponentClass).styleId,
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
        let value = this[property];
        Object.defineProperty(this, property, {
          get: () => value,
          set: (newValue) => {
            const oldValue = value;
            value = newValue;

            if (oldValue !== newValue) {
              this.emitPropertyChangedEvent(property, oldValue, newValue);
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
          this.constructor as typeof OriginalClass & ComponentClass
        ).styleId;
        this.setAttribute(styleId, "");
        const scopedCssString = scopeCss(options.styles, styleId);
        this.innerHTML = scopeHtml(options.template, styleId, this._data);
        (
          this.constructor as typeof OriginalClass & ComponentClass
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
    } as unknown as T;
  };
}
