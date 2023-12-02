// app.component.ts

import BowlRouter from '@pawcode/routes';

import templateString from './app.component.html';
import cssString from './app.component.scss';
import { Component } from './stuff/decorators/component/component.decorator';

const componentImports = {
  // "component-selector": () => import("./component-selector/component-selector.component"),
  // other components...
};

@Component({
  selector: "app-component",
  template: templateString,
  styles: cssString,
  components: componentImports,
  imports: [BowlRouter],
})
export default class AppComponent {
  conditionA = true;
  conditionB = false;
  name = "Vitor";
  times = 1;

  constructor() {
    console.log("AppComponent constructed!");
    this.conditionA = false;
    this.conditionB = true;
    this.name = "Maria";
    this.times = 2;
  }

  pawInit() {
    setTimeout(() => {
      this.conditionA = true;
      this.conditionB = false;
      this.name = "Dália";
      this.times = 3;
    }, 2000);

    setTimeout(() => {
      this.conditionA = false;
      this.conditionB = true;
      this.name = "Mia";
      this.times = 4;
    }, 3000);

    setTimeout(() => {
      this.conditionA = true;
      this.conditionB = false;
      this.name = "Mia e Dália";
      this.times = 1;
    }, 4000);
  }
}
