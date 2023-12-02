import BowlRouter from "@pawcode/routes";

import templateString from "./app.component.html";
import cssString from "./app.component.scss";
import { Component } from "./stuff/decorators/component/component.decorator";

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
  constructor() {
    console.log("AppComponent constructed!");
  }
}
