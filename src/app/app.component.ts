// app.component.ts

import BowlRouter from '@pawcode/routes';

import templateString from './app.component.html';
import cssString from './app.component.scss';
import { Component } from './stuff/decorators/component/component.decorator';

const componentImports = {
  "child-component": () => import("./child/child.component"),
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
    console.log("pawInit called");

    this.conditionA = true;
    this.conditionB = false;
    this.name = "Vitor";
    this.times = 3;

    setTimeout(() => {
      this.conditionA = false;
      this.conditionB = true;
      this.name = "Dália";
      this.times = 2;
    }, 1000);

    setTimeout(() => {
      this.conditionA = true;
      this.conditionB = false;
      this.name = "Mia";
      this.times = 3;
    }, 2000);

    setTimeout(() => {
      this.conditionA = false;
      this.conditionB = true;
      this.name = "Mia e Dália";
      this.times = 4;
    }, 3000);

  }
}
