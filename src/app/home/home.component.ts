import { container } from "../stuff/containers/dependency-container";
import { Component } from "../stuff/decorators/component/component.decorator";
import { HttpRequest } from "../stuff/services/http.request";
import templateString from "./home.component.html";
import cssString from "./home.component.scss";

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
export default class HomeComponent {
  response: string = "paw";
  constructor() {
    console.log("HomeComponent constructed!");
  }

  pawInit() {
    console.log("HomeComponent initialized!");

    const httpRequest: HttpRequest = container.resolve(HttpRequest);
    httpRequest.get("https://pokeapi.co/api/v2/pokemon/1").then((response) => {
      this.response = JSON.stringify(response);
    });
  }
}
