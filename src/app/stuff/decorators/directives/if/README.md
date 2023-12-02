
# PawCode Framework

## Overview

PawCode is a modern frontend framework designed to simplify the development of web applications. It introduces powerful directives and decorators to enhance your HTML templates and TypeScript components.

## @pawIf Directive

The `@pawIf` directive is a structural directive for conditional rendering of DOM elements. It adds or removes elements from the DOM based on a specified boolean condition.

### Usage

To use the `@pawIf` directive, add it as an attribute to any HTML element within your component's template. The directive evaluates a boolean expression, and the element is rendered in the DOM only if the condition is `true`.

#### Example:

**Template (app.component.html):**
```html
<div @pawIf="{{conditionA}}">
  <div>This content will be shown or hidden based on conditionA.</div>
</div>
```

**Component (app.component.ts):**
```typescript
import templateString from './app.component.html';
import cssString from './app.component.scss';
import { Component } from './stuff/decorators/component/component.decorator';

@Component({
  selector: "app-component",
  template: templateString,
  styles: cssString,
})
export default class AppComponent {
  conditionA = true;

  constructor() {
    console.log("AppComponent constructed!");
    this.conditionA = false;
  }

  pawInit() {
    setTimeout(() => {
      this.conditionA = true;
    }, 2000);
  }
}
```

In this example, `conditionA` is a property of `AppComponent`. The content within the `div` is only present in the DOM when `conditionA` is `true`.

### Implementation Details

- **Directive Logic**: Located in `if.directive.ts`, the directive handles the insertion and removal of elements from the DOM.
- **State Management**: The directive responds to changes in the component's state, ensuring dynamic updates.
- **Lifecycle Integration**: Incorporated within the component lifecycle via `component.decorator.ts`.

### Handling State Changes

The PawCode framework automatically handles the reactivity of the `@pawIf` directive. Changes in component properties will trigger updates in the DOM to reflect the current state.

### Best Practices

- Use `@pawIf` for dynamic content that should appear or disappear based on the application's state.
- Keep the conditions provided to `@pawIf` as straightforward boolean expressions for optimal performance and readability.
