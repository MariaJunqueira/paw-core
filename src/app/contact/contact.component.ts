import { Component } from '../stuff/decorators/webcomponent.decorator';
import cssString from './contact.component.css';
import templateString from './contact.component.html';

const componentImports = {
  "about-component": () => import("../about/about.component"),
  "home-component": () => import("../home/home.component"),
  "mug-router": () => import("../stuff/mug/mug.router"),
  // other components...
};

@Component({
  selector: "contact-component",
  template: templateString,
  styles: cssString,
  components: componentImports,
})
export default class ContactComponent extends HTMLElement {
  constructor() {
    super();
    console.log("ContactComponent constructed!");
  }
}
