"use strict";(self.webpackChunkmeowpaw=self.webpackChunkmeowpaw||[]).push([[481],{940:(t,e,n)=>{n.r(e),n.d(e,{default:()=>a});var o=n(718);function r(){return function(t,e){const n=t.constructor;n.observedAttributesSet||(n.observedAttributesSet=new Set),n.observedAttributesSet.add(`paw-${String(e)}`);const o=`_${String(e)}`;Object.defineProperty(t,e,{set:function(t){const n=this[o]||t;this[o]={isFirstChange:!0,value:t},this.attributeChangedCallback&&"function"==typeof this.attributeChangedCallback&&this.attributeChangedCallback(e.toString(),n,t,!0)},enumerable:!0,configurable:!0}),t[o]=void 0}}var i=function(t,e,n,o){var r,i=arguments.length,s=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(s=(i<3?r(s):i>3?r(e,n,s):r(e,n))||s);return i>3&&s&&Object.defineProperty(e,n,s),s},s=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let c=class extends HTMLElement{constructor(){super(),this.titles="pawsome",this.autor="Azevedo"}};i([r(),s("design:type",String)],c.prototype,"titles",void 0),i([r(),s("design:type",String)],c.prototype,"description",void 0),c=i([(0,o.w)({selector:"about-component",template:"<section> <h1>About Works!</h1> <h2>{{ titles }}</h2> <p>{{ description }}</p> <p>{{ autor }}</p> </section> ",styles:"section {\n  padding: 20px;\n\n  > h1 {\n    color: red;\n  }\n}\n"}),s("design:paramtypes",[])],c);const a=c}}]);