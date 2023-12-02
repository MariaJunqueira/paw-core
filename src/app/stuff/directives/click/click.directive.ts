class PawClickDirective {
  private rootElement: HTMLElement;

  constructor(private context: any, rootElement: HTMLElement) {
    // Assuming the context has a property to access the root element
    this.rootElement = rootElement; // Replace 'rootElement' with the actual property name
    this.bindEvent();
  }

  private bindEvent(): void {
    this.rootElement.addEventListener("click", (event) =>
      this.handleEvent(event)
    );
  }

  private handleEvent(event: Event): void {
    const target = event.target as HTMLElement;
    const directiveValue = target.getAttribute("pawClick");

    if (directiveValue) {
      const methodMatch = directiveValue.match(/(\w+)\((.*)\)/);

      if (methodMatch) {
        const methodName = methodMatch[1];
        const methodArgs = this.parseArguments(
          methodMatch[2],
          event.target as HTMLElement
        );

        const method = this.context[methodName];
        if (typeof method === "function") {
          method.apply(this.context, methodArgs);
        }
      }
    }
  }

  private parseArguments(argsString: string, element: HTMLElement): any[] {
    const args = argsString
      .split(/,(?![^\[\]\{\}\(\)]*[\]\}\)])/)
      .map((arg) => arg.trim());

    return args.map((arg) => {
      if (this.isObjectLiteral(arg)) {
        console.warn(
          "Direct object literals are not supported. Please define the object in your component."
        );
        return undefined;
      } else if (this.isArray(arg)) {
        console.warn(
          "Arrays are not supported. Please define the array in your component."
        );
        return undefined;
      } else {
        return this.parseSingleArgument(arg, element);
      }
    });
  }

  private isArray(arg: string): boolean {
    return arg.trim().startsWith("[") && arg.trim().endsWith("]");
  }

  private isObjectLiteral(arg: string): boolean {
    return arg.trim().startsWith("{") && arg.trim().endsWith("}");
  }

  private parseSingleArgument(arg: any, currentElement: HTMLElement): any {
    // Check for string literals
    if (
      (arg.startsWith("'") && arg.endsWith("'")) ||
      (arg.startsWith('"') && arg.endsWith('"'))
    ) {
      return arg.slice(1, -1);
    }
    // Handle boolean and numeric literals
    else if (!isNaN(parseFloat(arg))) {
      return parseFloat(arg);
    } else if (arg === "true" || arg === "false") {
      return arg === "true";
    }
    // Treat as a variable reference
    else {
      return this.resolveVariable(arg, currentElement);
    }
  }

  private resolveVariable(
    variableName: string,
    currentElement: HTMLElement
  ): any {
    // Check if the current element has an attribute 'paw-iterator'
    const iteratorName = currentElement.getAttribute("paw-iterator");
    if (iteratorName && iteratorName === variableName) {
      // If the iterator name matches variableName, return its value
      return this.getIteratorValue(currentElement);
    }

    // If no iterator match, attempt to resolve from the component's context
    return this.context[variableName];
  }

  private getIteratorValue(element: HTMLElement): any {
    // Logic to get the value of the iterator
    return element.getAttribute("paw-index");
  }
}

export default PawClickDirective;
