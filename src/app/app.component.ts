import templateString from "./app.component.html";
import cssString from "./app.component.scss";
import { Component } from "./stuff/decorators/component/component.decorator";

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
export default class AppComponent extends HTMLElement {
  constructor() {
    super();
    console.log("AppComponent constructed!");
  }
}
