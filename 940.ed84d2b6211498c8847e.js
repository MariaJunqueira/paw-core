"use strict";(self.webpackChunkmeowpaw=self.webpackChunkmeowpaw||[]).push([[940,481],{940:(t,e,n)=>{function i(){return function(t,e){const n=t.constructor;n.observedAttributesSet||(n.observedAttributesSet=new Set),n.observedAttributesSet.add(e);const i=`_${String(e)}`;Object.defineProperty(t,e,{set:function(t){const n=this[i]||t;this[i]={isFirstChange:!0,value:t},this.attributeChangedCallback&&"function"==typeof this.attributeChangedCallback&&this.attributeChangedCallback(e.toString(),n,t,!0)},enumerable:!0,configurable:!0}),t[i]=void 0}}n.r(e),n.d(e,{default:()=>c});var s=n(41),r=function(t,e,n,i){var s,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,n,o):s(e,n))||o);return r>3&&o&&Object.defineProperty(e,n,o),o},o=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let a=class extends HTMLElement{constructor(){super(),this.title="pawsome",this.autor="Azevedo"}};r([i(),o("design:type",String)],a.prototype,"title",void 0),r([i(),o("design:type",String)],a.prototype,"description",void 0),a=r([(0,s.w)({selector:"about-component",template:"<section> <h1>About Works!</h1> <h2>{{ title }}</h2> <p>{{ description }}</p> <p>{{ autor }}</p> </section> ",styles:"section {\n  padding: 20px;\n\n  > h1 {\n    color: red;\n  }\n}\n"}),o("design:paramtypes",[])],a);const c=a},41:(t,e,n)=>{function i(t){return function(e){var n;return(n=class extends e{static get observedAttributes(){return Array.from(this.observedAttributesSet)}attributeChangedCallback(t,e,n){this._isFullyConstructed&&(this.hasOwnProperty(t)&&(this[t]=n),this.dispatchPropertyChangedEvent(t,e,n))}constructor(...e){super(...e),this._isFullyConstructed=!1,this.initializeData(),this.initializeStyles(),this.loadDynamicComponents(t.components),this._isFullyConstructed=!0}initializeData(){const t=this.constructor.observedAttributesSet;let e=t?Array.from(t):[];e=e.concat(Object.getOwnPropertyNames(this)),this._data={},this.addEventListener("property-changed",this.handlePropertyChange.bind(this)),e.forEach((t=>this.initializeProperty(t)))}handlePropertyChange(e){this._data[e.detail.property]=e.detail.newValue,this.innerHTML=this.scopeHtml(t.template,this.constructor.styleId,this._data)}initializeProperty(t){let e=this[t];this._data[t]=e,this.handleSpecialInitialization(t),this.definePropertyGettersAndSetters(t)}handleSpecialInitialization(t){var e;(null===(e=this[`_${t}`])||void 0===e?void 0:e.isFirstChange)&&(this[`_${t}`].isFirstChange=!1,this._data[t]=this[`_${t}`].value)}definePropertyGettersAndSetters(t){let e=this[t];Object.defineProperty(this,t,{get:()=>e,set:n=>{const i=e;e=n,i!==n&&this.emitPropertyChangedEvent(t,i,n)},enumerable:!0,configurable:!0})}emitPropertyChangedEvent(t,e,n){this.dispatchEvent(new CustomEvent("property-changed",{detail:{property:t,oldValue:e,newValue:n}}))}initializeStyles(){const e=this.constructor.styleId;this.setAttribute(e,"");const n=this.scopeCss(t.styles,e);this.innerHTML=this.scopeHtml(t.template,e,this._data),this.constructor.appendScopedStyle(n,e)}dispatchPropertyChangedEvent(t,e,n){this.dispatchEvent(new CustomEvent("property-changed",{detail:{name:t,oldValue:e,newValue:n}}))}scopeCss(t,e){return t.replace(/([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g,((t,n)=>`${n.split(",").map((t=>t.includes("-")?t.trim():`${t.trim()}[${e}]`)).join(", ")} ${t.endsWith(",")?",":" {"}`))}scopeHtml(t,e,n={}){const i=t.replace(/\{\{\s*(\w+)\s*\}\}/g,((t,e)=>n[e])),s=(new DOMParser).parseFromString(i,"text/html");return s.body.querySelectorAll("*").forEach((t=>{t.tagName.includes("-")||t.setAttribute(e,"")})),s.body.innerHTML}static appendScopedStyle(t,e){if(!document.head.querySelector(`#${e}`)){const n=document.createElement("style");n.id=e,n.textContent=t,document.head.appendChild(n)}}loadDynamicComponents(t){if(t)for(const[e,n]of Object.entries(t))customElements.get(e)||n().then((t=>{customElements.get(e)||customElements.define(e,t.default)})).catch((t=>{console.error(`Error loading component '${e}':`,t)}))}}).styleId=`_${t.selector}-${Date.now()}`,n.observedAttributesSet=e.observedAttributesSet||new Set,n}}n.d(e,{w:()=>i})}}]);