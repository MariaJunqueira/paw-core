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
      private originalOptions = options;

      constructor(...args: any) {
        super();

        const instance = new OriginalClass(...args);

        // Copy properties from the instance to 'this'
        Object.assign(this, instance);
        const template = this.processPawForElements();

        this.initializeComponent(template);

        // Dynamically check and call pawInit if it exists
        if (typeof instance["pawInit"] === "function") {
          instance["pawInit"].apply(this);
        }
      }

      private initializeComponent(template) {
        this.initializeData();
        this.initializeStyles(template);
        loadDynamicComponents(options.components);
        this._isFullyConstructed = true;
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

      processPawForElements() {
        const htmlString = this.originalOptions.template;
        // Parse the HTML string into a DOM element
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        const elements = doc.querySelectorAll("[pawFor]");

        elements.forEach((element) => {
          const pawForValue = element.getAttribute("pawFor");
          const loopRegex = /let\s+(\w+)\s*=\s*(\d+);\s*\1\s*<\s*(\d+);/;

          if (loopRegex.test(pawForValue)) {
            const [fullMatch, iterator, start, end] =
              pawForValue.match(loopRegex);

            for (let i = parseInt(start); i < parseInt(end); i++) {
              const clonedElement = element.cloneNode(true);

              if (clonedElement instanceof HTMLElement) {
                clonedElement.innerHTML = clonedElement.innerHTML.replace(
                  new RegExp(`{{\\s*${iterator}\\s*}}`, "g"),
                  i.toString()
                );
                element.parentNode.insertBefore(clonedElement, element);
              }
            }

            element.parentNode.removeChild(element);
          }
        });

        // Return the processed HTML as a string
        return doc.body.innerHTML;
      }

      private handlePropertyChange(e: CustomEvent) {
        const template = this.processPawForElements();

        // Handle property change event
        this._data[e.detail.property] = e.detail.newValue;

        this.innerHTML = scopeHtml(
          template || options.template,
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

      private initializeStyles(template) {
        const styleId = (
          this.constructor as typeof OriginalClass & ComponentClass
        ).styleId;
        this.setAttribute(styleId, "");
        const scopedCssString = scopeCss(options.styles, styleId);

        this.innerHTML = scopeHtml(
          template || options.template,
          styleId,
          this._data
        );
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
