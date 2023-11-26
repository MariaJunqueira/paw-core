import { Component } from "../../stuff/decorators/component/component.decorator";
import cssString from "./email.component.css";
import templateString from "./email.component.html";

@Component({
  selector: "email-component",
  template: templateString,
  styles: cssString,
})
export default class EmailComponent {
  constructor() {
    console.log("EmailComponent constructed!");
  }
}
