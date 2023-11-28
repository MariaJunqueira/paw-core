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
        const template = this.processPawForElements(this._data);

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

      processPawForElements(variables = {}) {
        let htmlString = this.originalOptions.template;
        // Parse the HTML string into a DOM element
        const doc = this.parseHtmlString(htmlString);
        const elements = doc.querySelectorAll("[pawFor]");

        elements.forEach((element) => {
          let pawForValue = this.replacePlaceholders(
            element.getAttribute("pawFor"),
            variables
          );

          const loopParams = this.parseLoopParameters(pawForValue);
          if (loopParams) {
            this.executeLoop(element, loopParams);
          }
        });

        // Return the processed HTML as a string
        return doc.body.innerHTML;
      }

      private executeLoop(element, loopParams) {
        const [
          fullMatch,
          iterator,
          start,
          comparisonOperator,
          end,
          incrementExpression,
          simpleIncrement,
          compoundIncrement,
          compoundValue,
        ] = loopParams;

        const startIndex = parseInt(start, 10);
        const endIndex = parseInt(end, 10);
        let stepValue;

        if (simpleIncrement === "++") {
          stepValue = 1;
        } else if (simpleIncrement === "--") {
          stepValue = -1;
        } else if (compoundIncrement && compoundValue) {
          stepValue =
            compoundIncrement === "+="
              ? parseInt(compoundValue, 10)
              : -parseInt(compoundValue, 10);
        } else {
          throw new Error(
            `Unsupported increment expression: ${incrementExpression}`
          );
        }

        for (
          let i = startIndex;
          this.evaluateCondition(i, comparisonOperator, endIndex);
          i += stepValue
        ) {
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

      private parseHtmlString(htmlString) {
        const parser = new DOMParser();
        return parser.parseFromString(htmlString, "text/html");
      }

      /*
        let\s+:
        - Matches the literal word 'let' followed by one or more whitespace characters.
        - Used to identify the start of a loop declaration.

        ([a-zA-Z_$][\w$]*):
        - Capturing group for the loop variable name.
        - Matches a letter (a-z or A-Z), an underscore (_), or a dollar sign ($) at the beginning.
        - Followed by zero or more word characters (which include letters, digits, underscores) or dollar signs.
        - Follows the rules for valid JavaScript variable names.

        \s*=\s*:
        - Matches the assignment operator '=' with optional whitespace on both sides.

        (-?\d+):
        - Capturing group for the loop start value.
        - Matches an optional minus sign (-) to allow negative numbers.
        - Followed by one or more digits (\d), capturing an integer.

        ;:
        - Matches the literal semicolon, a delimiter in the loop syntax.

        \s*\1\s*:
        - Uses \1 to refer back to the first capturing group (the loop variable name).
        - Ensures that the same variable is used in the loop condition.
        - Surrounding \s* allows optional whitespace.

        ([<>]=?|==):
        - Capturing group for the comparison operator.
        - Matches '<' or '>' followed by an optional '=' (less than, greater than, less than or equal to, greater than or equal to).
        - Or '==' for equality comparison.

        (-?\d+):
        - Another capturing group, similar to the fourth step, capturing an integer that represents the loop end condition.

        ;:
        - Another literal semicolon delimiter.

        \s*\1:
        - Again, refers to the loop variable name with optional whitespace.

        ((\+\+|--)|(\+=|-=)\s*(-?\d+)):
        - The final and most complex part, a capturing group for the increment/decrement expression.
        - Consists of two alternatives:
            - (\+\+|--) matches either '++' or '--' for simple increments or decrements by 1.
            - (\+=|-=)\s*(-?\d+) matches either '+=' or '-=', followed by an optional space and then an integer (positive or negative). 
            - This is for increments/decrements by a specific value.
      */
      private parseLoopParameters(pawForValue) {
        const loopRegex =
          /let\s+([a-zA-Z_$][\w$]*)\s*=\s*(-?\d+);\s*\1\s*([<>]=?|==)\s*(-?\d+);\s*\1((\+\+|--)|(\+=|-=)\s*(-?\d+))/;
        if (loopRegex.test(pawForValue)) {
          return pawForValue.match(loopRegex);
        }
        return null;
      }

      private replacePlaceholders(pawForValue, variables) {
        Object.keys(variables).forEach((key) => {
          const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
          pawForValue = pawForValue.replace(regex, variables[key]);
        });
        return pawForValue;
      }

      private evaluateCondition(i, operator, value) {
        console.log(i, operator, value);

        switch (operator) {
          case "<":
            return i < value;
          case ">":
            return i > value;
          case "<=":
            return i <= value;
          case ">=":
            return i >= value;
          case "==":
            return i == value;
          case "===":
            return i === value;
          default:
            throw new Error(`Unsupported operator: ${operator}`);
        }
      }

      private handlePropertyChange(e: CustomEvent) {
        const template = this.processPawForElements(this._data);

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
