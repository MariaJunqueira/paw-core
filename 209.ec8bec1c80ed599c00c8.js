"use strict";(self.webpackChunkmeowpaw=self.webpackChunkmeowpaw||[]).push([[209],{209:(t,e,n)=>{function i(t,e,n={}){const i=t.replace(/\{\{\s*(\w+)\s*\}\}/g,((t,e)=>n[e])),r=(new DOMParser).parseFromString(i,"text/html");return r.body.querySelectorAll("*").forEach((t=>{t.tagName.includes("-")||t.setAttribute(e,"")})),r.body.innerHTML}n.r(e),n.d(e,{default:()=>a});const r={"mug-router":()=>n.e(414).then(n.bind(n,414))};let s=class{constructor(){console.log("AppComponent constructed!")}};var o;s=function(t,e,n,i){var r,s=arguments.length,o=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(s<3?r(o):s>3?r(e,n,o):r(e,n))||o);return s>3&&o&&Object.defineProperty(e,n,o),o}([(o={selector:"app-component",template:"<h1>Meow World</h1> <mug-router></mug-router> ",styles:"",components:r},function(t){var e;return(e=class extends HTMLElement{constructor(...e){super(),this._isFullyConstructed=!1;const n=new t(...e);Object.assign(this,n),this.initializeComponent(),"function"==typeof n.pawInit&&n.pawInit.apply(this)}initializeComponent(){this.initializeData(),this.initializeStyles(),function(t){if(t)for(const[e,n]of Object.entries(t))customElements.get(e)||n().then((t=>{customElements.get(e)||customElements.define(e,t.default)})).catch((t=>{console.error(`Error loading component '${e}':`,t)}))}(o.components),this._isFullyConstructed=!0}initializeData(){const t=this.constructor.observedAttributesSet;let e=t?Array.from(t):[];e=e.concat(Object.getOwnPropertyNames(this)),this._data={},this.addEventListener("property-changed",this.handlePropertyChange.bind(this)),e.forEach((t=>this.initializeProperty(t)))}handlePropertyChange(t){this._data[t.detail.property]=t.detail.newValue,this.innerHTML=i(o.template,this.constructor.styleId,this._data)}initializeProperty(t){let e=this[t];this._data[t]=e,this.handleSpecialInitialization(t),this.definePropertyGettersAndSetters(t)}handleSpecialInitialization(t){var e;(null===(e=this[`_${t}`])||void 0===e?void 0:e.isFirstChange)&&(this[`_${t}`].isFirstChange=!1,this._data[t]=this[`_${t}`].value)}definePropertyGettersAndSetters(t){let e=this[t];Object.defineProperty(this,t,{get:()=>e,set:n=>{const i=e;e=n,i!==n&&this.emitPropertyChangedEvent(t,i,n)},enumerable:!0,configurable:!0})}emitPropertyChangedEvent(t,e,n){this.dispatchEvent(new CustomEvent("property-changed",{detail:{property:t,oldValue:e,newValue:n}}))}initializeStyles(){const t=this.constructor.styleId;this.setAttribute(t,"");const e=function(t,e){return t.replace(/([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g,((t,n)=>`${n.split(",").map((t=>t.includes("-")?t.trim():`${t.trim()}[${e}]`)).join(", ")} ${t.endsWith(",")?",":" {"}`))}(o.styles,t);this.innerHTML=i(o.template,t,this._data),this.constructor.appendScopedStyle(e,t)}dispatchPropertyChangedEvent(t,e,n){this.dispatchEvent(new CustomEvent("property-changed",{detail:{name:t,oldValue:e,newValue:n}}))}static get observedAttributes(){return Array.from(this.observedAttributesSet)}attributeChangedCallback(t,e,n){this._isFullyConstructed&&(this.hasOwnProperty(t)&&(this[t]=n),this.dispatchPropertyChangedEvent(t,e,n))}static appendScopedStyle(t,e){if(!document.head.querySelector(`#${e}`)){const n=document.createElement("style");n.id=e,n.textContent=t,document.head.appendChild(n)}}}).styleId=`_${o.selector}-${Date.now()}`,e.observedAttributesSet=t.observedAttributesSet||new Set,e}),function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}("design:paramtypes",[])],s);const a=s}}]);