import { Component } from "../stuff/decorators/component/component.decorator";
import cssString from "./not-found.component.css";
import templateString from "./not-found.component.html";

@Component({
  selector: "not-found-component",
  template: templateString,
  styles: cssString,
})
export default class NotFoundComponent extends HTMLElement {
  constructor() {
    super();
    console.log("NotFoundComponent constructed!");
  }
}
