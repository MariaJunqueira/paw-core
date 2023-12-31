// component.decorator.ts

import { PawForDirective } from '../directives/for/for.directive';
import { PawIfDirective } from '../directives/if/if.directive';
import { scopeCss, scopeHtml } from './component.helper';
import { loadDynamicComponents } from './dynamic-component.loader';

export interface ComponentClass {
  new(...args: any[]): HTMLElement;
  observedAttributesSet: Set<string>;
  appendScopedStyle: (scopedCssString: string, styleId: string) => void;
  styleId: string;
}

export function Component(options: any): any {
  return function <T extends ComponentClass>(OriginalClass: T) {
    return class extends HTMLElement {
      static styleId = `_${options.selector}-${Date.now()}`;
      static observedAttributesSet = OriginalClass.observedAttributesSet || new Set();
      private _isFullyConstructed = false;
      private _data;
      private originalOptions = options;

      private _instance;

      constructor(...args: any) {
        super();
        this._instance = new OriginalClass(...args);
        Object.assign(this, this._instance);
      }

      connectedCallback() {
        this.initializeData();

        const htmlString = this.originalOptions.template;
        const template = this.handleTemplate(htmlString);

        this.initializeComponent(template);
        if (typeof this._instance["pawInit"] === "function") {
          this._instance["pawInit"].apply(this);
        }
      }

      private handlePropertyChange(e: CustomEvent) {
        if (e.detail.newValue !== e.detail.oldValue) {
          this._data[e.detail.property] = e.detail.newValue;
        }

        const htmlString = this.originalOptions.template;
        const template = this.handleTemplate(htmlString);

        this.innerHTML = scopeHtml(
          template,
          (this.constructor as typeof OriginalClass & ComponentClass).styleId,
          this._data
        );
      }

      private handleTemplate(htmlString: string): string {
        const doc = this.parseHtmlString(htmlString);
        PawForDirective(doc, this._data);
        PawIfDirective(doc, this._data);
        return doc.body.innerHTML;
      }

      private parseHtmlString(htmlString: string): Document {
        const parser = new DOMParser();
        return parser.parseFromString(htmlString, "text/html");
      }

      private initializeComponent(template) {
        this.initializeData();
        this.initializeStyles(template);
        loadDynamicComponents(options.components);
        this._isFullyConstructed = true;
      }

      private initializeData() {
        const observedAttributes = (this.constructor as typeof OriginalClass & ComponentClass).observedAttributesSet;
        let properties = observedAttributes ? Array.from(observedAttributes) : [];
        properties = properties.concat(Object.getOwnPropertyNames(this));

        this._data = {};
        this.addEventListener("property-changed", this.handlePropertyChange.bind(this));
        properties.forEach((property) => this.initializeProperty(property));
      }

      private initializeStyles(template) {
        const styleId = (this.constructor as typeof OriginalClass & ComponentClass).styleId;
        this.setAttribute(styleId, "");
        const scopedCssString = scopeCss(options.styles, styleId);
        this.innerHTML = scopeHtml(template, styleId, this._data);
        (this.constructor as typeof OriginalClass & ComponentClass).appendScopedStyle(scopedCssString, styleId);
      }

      static appendScopedStyle(scopedCssString: string, styleId: string) {
        if (!document.head.querySelector(`#${styleId}`)) {
          const styleTag = document.createElement('style');
          styleTag.id = styleId;
          styleTag.textContent = scopedCssString;
          document.head.appendChild(styleTag);
        }
      }

      private initializeProperty(property: string) {
        let value = this[property];
        this._data[property] = value;

        // Handle Special Initialization
        if (this[`_${property}`]?.isFirstChange) {
          this[`_${property}`].isFirstChange = false;
          this._data[property] = this[`_${property}`].value;
        }

        // Define Propert Getters And Setters
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

      attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
      ) {
        if (this._isFullyConstructed) {
          if (this.hasOwnProperty(name)) {
            this[name] = newValue;
          }
          this.dispatchPropertyChangedEvent(name, oldValue, newValue);
        }
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

    } as unknown as T;
  };
}
