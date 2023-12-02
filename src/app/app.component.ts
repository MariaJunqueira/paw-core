import templateString from './app.component.html';
import cssString from './app.component.scss';
import { Component } from './stuff/decorators/component/component.decorator';

const componentImports = {
  "mug-router": () => import("./stuff/mug/mug.router"),
  // other components...
};

@Component({
  selector: "app-component",
  template: templateString,
  styles: cssString,
  components: componentImports,
})
export default class AppComponent {
  name = "Vitor Azevedo";
  conditionA = true;
  conditionB = false;

  constructor() {
    console.log("AppComponent constructed!");
    this.conditionA = false;
    this.conditionB = true;
    this.name = "Dália";
  }

  pawInit() {
    setTimeout(() => {
      this.conditionA = true;
      this.conditionB = false;
    }, 2000);

    setTimeout(() => {
      this.conditionA = false;
      this.conditionB = true;
      this.name = "Maria Junqueira";
    }, 3000);

    setTimeout(() => {
      this.conditionA = true;
      this.conditionB = false;
    }, 4000);
  }

}
