import { container } from '../stuff/containers/dependency-container';
import { Component } from '../stuff/decorators/webcomponent.decorator';
import { HttpRequest } from '../stuff/services/http.request';
import { JsonTreeViewer } from '../stuff/services/json.viewer';
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
  response: string = "paw";
  constructor() {
    super();
    console.log("HomeComponent constructed!");
    const httpRequest: HttpRequest = container.resolve(HttpRequest);
    const jsonTreeViewer: JsonTreeViewer = container.resolve(JsonTreeViewer);
    httpRequest.get("https://pokeapi.co/api/v2/pokemon/1").then((response) => {
      this.response = jsonTreeViewer.render(response);
    });
  }
}
