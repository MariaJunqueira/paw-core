import { container } from '../stuff/containers/dependency-container';
import { Component } from '../stuff/decorators/webcomponent.decorator';
import { HttpRequest } from '../stuff/services/http.request';
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
    const httpRequest: HttpRequest = container.resolve(HttpRequest);
    httpRequest.get("https://pokeapi.co/api/v2").then((response) => {
      console.log("Response:", response);
    });
  }
}
