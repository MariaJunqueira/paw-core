"use strict";(self.webpackChunkmeowpaw=self.webpackChunkmeowpaw||[]).push([[462],{462:(t,e,n)=>{n.r(e),n.d(e,{default:()=>a});var r=n(538);const i={"mug-router":()=>n.e(414).then(n.bind(n,414))};let s=class extends HTMLElement{constructor(){super(),console.log("AppComponent constructed!")}};s=function(t,e,n,r){var i,s=arguments.length,a=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,r);else for(var o=t.length-1;o>=0;o--)(i=t[o])&&(a=(s<3?i(a):s>3?i(e,n,a):i(e,n))||a);return s>3&&a&&Object.defineProperty(e,n,a),a}([(0,r.w)({selector:"app-component",template:'<nav> <a href="/" data-link>Home</a> <a href="/about/1" data-link>About</a> <a href="/contact" data-link>Contact</a> </nav> <mug-router></mug-router> ',styles:"",components:i}),function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}("design:paramtypes",[])],s);const a=s},538:(t,e,n)=>{function r(t,e,n={}){const r=t.replace(/\{\{\s*(\w+)\s*\}\}/g,((t,e)=>n[e])),i=(new DOMParser).parseFromString(r,"text/html");return i.body.querySelectorAll("*").forEach((t=>{t.tagName.includes("-")||t.setAttribute(e,"")})),i.body.innerHTML}function i(t){return function(e){var n;return(n=class extends e{static get observedAttributes(){return Array.from(this.observedAttributesSet)}attributeChangedCallback(t,e,n){this._isFullyConstructed&&(this.hasOwnProperty(t)&&(this[t]=n),this.dispatchPropertyChangedEvent(t,e,n))}constructor(...e){super(...e),this._isFullyConstructed=!1,this.initializeData(),this.initializeStyles(),function(t){if(t)for(const[e,n]of Object.entries(t))customElements.get(e)||n().then((t=>{customElements.get(e)||customElements.define(e,t.default)})).catch((t=>{console.error(`Error loading component '${e}':`,t)}))}(t.components),this._isFullyConstructed=!0}initializeData(){const t=this.constructor.observedAttributesSet;let e=t?Array.from(t):[];e=e.concat(Object.getOwnPropertyNames(this)),this._data={},this.addEventListener("property-changed",this.handlePropertyChange.bind(this)),e.forEach((t=>this.initializeProperty(t)))}handlePropertyChange(e){this._data[e.detail.property]=e.detail.newValue,this.innerHTML=r(t.template,this.constructor.styleId,this._data)}initializeProperty(t){let e=this[t];this._data[t]=e,this.handleSpecialInitialization(t),this.definePropertyGettersAndSetters(t)}handleSpecialInitialization(t){var e;(null===(e=this[`_${t}`])||void 0===e?void 0:e.isFirstChange)&&(this[`_${t}`].isFirstChange=!1,this._data[t]=this[`_${t}`].value)}definePropertyGettersAndSetters(t){let e=this[t];console.log(t,this[t]),Object.defineProperty(this,t,{get:()=>e,set:n=>{const r=e;e=n,r!==n&&this.emitPropertyChangedEvent(t.replace("paw-",""),r,n)},enumerable:!0,configurable:!0})}emitPropertyChangedEvent(t,e,n){this.dispatchEvent(new CustomEvent("property-changed",{detail:{property:t,oldValue:e,newValue:n}}))}initializeStyles(){const e=this.constructor.styleId;this.setAttribute(e,"");const n=function(t,e){return t.replace(/([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g,((t,n)=>`${n.split(",").map((t=>t.includes("-")?t.trim():`${t.trim()}[${e}]`)).join(", ")} ${t.endsWith(",")?",":" {"}`))}(t.styles,e);this.innerHTML=r(t.template,e,this._data),this.constructor.appendScopedStyle(n,e)}dispatchPropertyChangedEvent(t,e,n){this.dispatchEvent(new CustomEvent("property-changed",{detail:{name:t,oldValue:e,newValue:n}}))}static appendScopedStyle(t,e){if(!document.head.querySelector(`#${e}`)){const n=document.createElement("style");n.id=e,n.textContent=t,document.head.appendChild(n)}}}).styleId=`_${t.selector}-${Date.now()}`,n.observedAttributesSet=e.observedAttributesSet||new Set,n}}n.d(e,{w:()=>i})}}]);