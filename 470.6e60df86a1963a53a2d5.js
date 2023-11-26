"use strict";(self.webpackChunkmeowpaw=self.webpackChunkmeowpaw||[]).push([[470],{470:(t,e,n)=>{n.r(e),n.d(e,{default:()=>r});var i=n(131);const o={"about-component":()=>n.e(481).then(n.bind(n,940)),"home-component":()=>n.e(521).then(n.bind(n,459)),"mug-router":()=>n.e(414).then(n.bind(n,414))};let s=class extends HTMLElement{constructor(){super(),this.titles="titlela",this.description="description",console.log("ContactComponent constructed!")}};s=function(t,e,n,i){var o,s=arguments.length,r=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(s<3?o(r):s>3?o(e,n,r):o(e,n))||r);return s>3&&r&&Object.defineProperty(e,n,r),r}([(0,i.w)({selector:"contact-component",template:'<section> <h1>Contact Works!</h1> <a href="/contact/email" data-link>Email Contact</a> <about-component paw-titles="{{ titles }}" paw-description="{{ description }}"></about-component> <mug-router></mug-router> </section> ',styles:"section {\n  padding: 20px;\n\n  > h1 {\n    color: black;\n  }\n}\n",components:o}),function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}("design:paramtypes",[])],s);const r=s},131:(t,e,n)=>{function i(t,e,n={}){const i=t.replace(/\{\{\s*(\w+)\s*\}\}/g,((t,e)=>n[e])),o=(new DOMParser).parseFromString(i,"text/html");return o.body.querySelectorAll("*").forEach((t=>{t.tagName.includes("-")||t.setAttribute(e,"")})),o.body.innerHTML}function o(t){return function(e){var n;return(n=class extends e{static get observedAttributes(){return Array.from(this.observedAttributesSet)}attributeChangedCallback(t,e,n){this._isFullyConstructed&&(this.hasOwnProperty(t)&&(this[t]=n),this.dispatchPropertyChangedEvent(t,e,n))}constructor(...e){super(...e),this._isFullyConstructed=!1,this.initializeData(),this.initializeStyles(),this.loadDynamicComponents(t.components),this._isFullyConstructed=!0}initializeData(){const t=this.constructor.observedAttributesSet;let e=t?Array.from(t):[];e=e.concat(Object.getOwnPropertyNames(this)),this._data={},this.addEventListener("property-changed",this.handlePropertyChange.bind(this)),e.forEach((t=>this.initializeProperty(t)))}handlePropertyChange(e){this._data[e.detail.property]=e.detail.newValue,this.innerHTML=i(t.template,this.constructor.styleId,this._data)}initializeProperty(t){let e=this[t];this._data[t]=e,this.handleSpecialInitialization(t),this.definePropertyGettersAndSetters(t)}handleSpecialInitialization(t){var e;(null===(e=this[`_${t}`])||void 0===e?void 0:e.isFirstChange)&&(this[`_${t}`].isFirstChange=!1,this._data[t]=this[`_${t}`].value)}definePropertyGettersAndSetters(t){let e=this[t];console.log(t,this[t]),Object.defineProperty(this,t,{get:()=>e,set:n=>{const i=e;e=n,i!==n&&this.emitPropertyChangedEvent(t.replace("paw-",""),i,n)},enumerable:!0,configurable:!0})}emitPropertyChangedEvent(t,e,n){this.dispatchEvent(new CustomEvent("property-changed",{detail:{property:t,oldValue:e,newValue:n}}))}initializeStyles(){const e=this.constructor.styleId;this.setAttribute(e,"");const n=function(t,e){return t.replace(/([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g,((t,n)=>`${n.split(",").map((t=>t.includes("-")?t.trim():`${t.trim()}[${e}]`)).join(", ")} ${t.endsWith(",")?",":" {"}`))}(t.styles,e);this.innerHTML=i(t.template,e,this._data),this.constructor.appendScopedStyle(n,e)}dispatchPropertyChangedEvent(t,e,n){this.dispatchEvent(new CustomEvent("property-changed",{detail:{name:t,oldValue:e,newValue:n}}))}static appendScopedStyle(t,e){if(!document.head.querySelector(`#${e}`)){const n=document.createElement("style");n.id=e,n.textContent=t,document.head.appendChild(n)}}loadDynamicComponents(t){if(t)for(const[e,n]of Object.entries(t))customElements.get(e)||n().then((t=>{customElements.get(e)||customElements.define(e,t.default)})).catch((t=>{console.error(`Error loading component '${e}':`,t)}))}}).styleId=`_${t.selector}-${Date.now()}`,n.observedAttributesSet=e.observedAttributesSet||new Set,n}}n.d(e,{w:()=>o})}}]);