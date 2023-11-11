import { BaseService } from '../services/base.service';
import { container } from '../stuff/containers/dependency-container';
import { Component } from '../stuff/decorators/webcomponent.decorator';
import cssString from './about.component.css';
import templateString from './about.component.html';

@Component({
  selector: "about-component",
  template: templateString,
  styles: cssString,
})
export default class AboutComponent extends HTMLElement {
  constructor() {
    super();
    console.log("AboutComponent constructed!");
    const baseService: BaseService = container.resolve(BaseService);
    console.log("About:", baseService.lalaland);
  }
}
