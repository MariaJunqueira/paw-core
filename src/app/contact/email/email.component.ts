import { Component } from '../../stuff/decorators/webcomponent.decorator';
import cssString from './email.component.css';
import templateString from './email.component.html';

@Component({
  selector: "email-component",
  template: templateString,
  styles: cssString,
})
export default class EmailComponent extends HTMLElement {
  constructor() {
    super();
    console.log("EmailComponent constructed!");
  }
}
