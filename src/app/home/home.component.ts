import { BaseService } from '../services/base.service';
import { container } from '../stuff/containers/dependency-container';
import { Component } from '../stuff/decorators/webcomponent.decorator';
import templateString from './home.component.html';
import cssString from './home.component.scss';

const componentImports = {
  "about-component": () => import("../about/about.component"),
  // other components...
};

@Component({
  selector: "home-component",
  template: templateString,
  styles: cssString,
  components: componentImports,
})
export default class HomeComponent extends HTMLElement {
  constructor() {
    super();
    console.log("HomeComponent constructed!");
    const baseService: BaseService = container.resolve(BaseService);
    console.log("1:", baseService.lalaland);
    baseService.lalaland = 2;
    console.log("2:", baseService.lalaland);
  }
}
