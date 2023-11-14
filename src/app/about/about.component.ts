import { Observed } from '../stuff/decorators/observed.decorator';
import { Component } from '../stuff/decorators/webcomponent.decorator';
import cssString from './about.component.css';
import templateString from './about.component.html';

@Component({
  selector: "about-component",
  template: templateString,
  styles: cssString,
})
export default class AboutComponent extends HTMLElement {
  @Observed() title: string = "pawsome";
  @Observed() description: string;
  autor: string = "Azevedo";

  constructor() {
    super();
    // console.log(this.title);
    // console.log("AboutComponent constructed!");
    // console.log("About:", this.title);
  }
}
