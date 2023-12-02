# PawClickDirective

PawClickDirective is a custom directive designed for handling click events and dynamically invoking methods with arguments on a specified context, typically a component in a web application. It's tailored to support special syntax and functionalities like interpreting certain strings as variable references, handling iterator values, and warning against unsupported direct object literals or arrays.

## Features

- **Event Handling**: Listens for click events on the root element and handles them according to the `pawClick` attribute on the target element.
- **Dynamic Method Invocation**: Dynamically invokes methods defined in the component's context based on the `pawClick` attribute value.
- **Argument Parsing**: Parses the arguments from the `pawClick` attribute and supports various types including strings, numbers, booleans, and references to component's context variables.
- **Iterator Support**: Supports resolving iterator values based on custom attributes like paw-iterator.
- **Warnings for Unsupported Types**: Provides console warnings for direct object literals `{}` and arrays `[]`, which are not supported directly in the `pawClick` attribute.

## Usage

1. Initialization:

The directive is initialized by passing the component context and a root element. The component context should contain the methods to be invoked, and the root element is where the click events are listened for.

```javascript
new PawClickDirective(componentContext, rootElement);
```

2. HTML Setup:

In your HTML, use the `pawClick` attribute to specify the method to be called on click events. The method name and arguments are enclosed in parentheses.

```html
<button pawClick="methodName('arg1', 'arg2')">Click Me</button>
```

To use a variable from the component's context as an argument, simply put its name:

```html
<button pawClick="methodName(variableName)">Click Me</button>
```

3. Iterator Support:

If using iterators, set the `paw-iterator` attribute on the element with the iterator name, and use the `paw-index` attribute to specify the iterator value.

```html
<div paw-iterator="iteratorName" paw-index="1">...</div>
```

## Limitations

- Direct usage of object literals `{}` and arrays `[]` in the `pawClick` attribute is not supported. They should be predefined in the component's context.
- The directive is designed to work within a specific framework or setup where the `pawClick`, `paw-iterator`, and related attributes are recognized and handled accordingly.
  Example

```javascript
// In your component
class MyComponent {
  myMethod(arg) {
    console.log(arg);
  }
}
```

```html
<!-- In your HTML -->
<button pawClick="myMethod('Hello, World!')">Click Me</button>
```
