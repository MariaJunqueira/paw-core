import { Component } from "../stuff/decorators/component/component.decorator";
import { Observed } from "../stuff/decorators/observed.decorator";
import cssString from "./about.component.css";
import templateString from "./about.component.html";

@Component({
  selector: "about-component",
  template: templateString,
  styles: cssString,
})
export default class AboutComponent {
  @Observed() titles: string = "pawsome";
  @Observed() description: string;
  autor: string = "Azevedo";
  minValue = 10;
  maxValue = 20;
  step = -2;
}
