import { Component } from '../stuff/decorators/webcomponent.decorator';
import templateString from './home.component.html';
import cssString from './home.component.scss';

const componentImports = {
  "about-component": () => import("../about/about.component"),
  // other components...
};

@Component({
  selector: "home-component",
  template: templateString,
  styles: cssString,
  components: componentImports,
})
export class HomeComponent extends HTMLElement {
  constructor() {
    super();
    console.log("HomeComponent constructed!");

    // Your component's constructor logic, if any
  }
  // Your component implementation...
}

// function WebComponent(options: {}): any | void {
//   return class extends HTMLElement {
//     fuel: number = 50;
//     isEmpty(): boolean {
//       return this.fuel == 0;
//     }
//   };
// }
