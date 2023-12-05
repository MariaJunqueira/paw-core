// child.component.ts

import { Component } from '../stuff/decorators/component/component.decorator';
import { Observed } from '../stuff/decorators/observed.decorator';
import templateString from './child.component.html';
import cssString from './child.component.scss';

const componentImports = {
  // "component-selector": () => import("./component-selector/component-selector.component"),
  // other components...
};

@Component({
  selector: 'child-component',
  template: templateString,
  styles: cssString,
  components: componentImports,
  imports: [],
})
export default class ChildComponent {
  @Observed() name = 'Vitor';
  conditionA = true;
  conditionB = false;
  times = 1;

  constructor() {
    console.log('Child constructed!');
    this.conditionA = false;
    this.conditionB = true;
    this.name = 'Pikachu';
    this.times = 2;
  }

  pawInit() {
    console.log('pawInit called');
    setTimeout(() => {
      this.conditionA = true;
      this.conditionB = false;
      this.name = 'Dália';
      this.times = 3;
    }, 1000);
    setTimeout(() => {
      this.conditionA = false;
      this.conditionB = true;
      this.name = 'Mia';
      this.times = 4;
    }, 2000);
    setTimeout(() => {
      this.conditionA = true;
      this.conditionB = false;
      this.name = 'Mia e Dália';
      this.times = 1;
    }, 3000);
  }
}
