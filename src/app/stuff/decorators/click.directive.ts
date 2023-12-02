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
        const methodArgs = this.parseArguments(methodMatch[2]);

        const method = this.context[methodName];
        if (typeof method === "function") {
          method.apply(this.context, methodArgs);
        }
      }
    }
  }

  private parseArguments(argsString: string): any[] {
    const args = argsString
      .split(/,(?![^\[\]\{\}\(\)]*[\]\}\)])/)
      .map((arg) => arg.trim());

    return args.map((arg) => {
      if (this.isObjectLiteral(arg)) {
        console.warn(
          "Direct object literals are not supported. Please define the object in your component."
        );
        return null; // Or handle this case as you prefer
      }
      return this.parseSingleArgument(arg);
    });
  }

  private isObjectLiteral(arg: string): boolean {
    return arg.trim().startsWith("{") && arg.trim().endsWith("}");
  }

  private parseSingleArgument(arg: string): any {
    console.log("parseSingleArgument", arg);

    // Check for string literals
    if (
      (arg.startsWith("'") && arg.endsWith("'")) ||
      (arg.startsWith('"') && arg.endsWith('"'))
    ) {
      return arg.slice(1, -1);
    }
    // Handle array literals
    else if (arg.startsWith("[") && arg.endsWith("]")) {
      return arg
        .substring(1, arg.length - 1)
        .split(/,(?![^\[\]]*\])/)
        .map(this.parseSingleArgument.bind(this));
    }
    // Handle boolean and numeric literals
    else if (!isNaN(parseFloat(arg))) {
      return parseFloat(arg);
    } else if (arg === "true" || arg === "false") {
      return arg === "true";
    }
    // Treat as a variable reference
    else {
      return this.resolveVariable(arg);
    }
  }
  private resolveVariable(variableName: string) {
    // Attempt to resolve the variable from the component's context
    // Assuming 'this.context' refers to your component instance
    return this.context[variableName];
  }
}

export default PawClickDirective;
