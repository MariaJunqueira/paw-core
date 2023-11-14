"use strict";(self.webpackChunkmeowpaw=self.webpackChunkmeowpaw||[]).push([[459,521],{459:(e,t,s)=>{s.r(t),s.d(t,{default:()=>a});const n=new class{constructor(){this.dependencies=new Map,this.instances=new Map}register(e,t){this.dependencies.set(e,t)}resolve(e){if(!this.instances.has(e)){this.dependencies.has(e)||this.register(e,e);const t=new(this.dependencies.get(e));this.instances.set(e,t)}return this.instances.get(e)}};var r=s(41);let i=class{constructor(){this.baseUrl=""}request(e,t,s){return n=this,r=void 0,o=function*(){const n=`${this.baseUrl}${t}`,r={method:e,headers:this.headers,body:s?JSON.stringify(s):null};try{const e=yield fetch(n,r);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return yield e.json()}catch(e){throw console.error("Request error:",e),e}},new((i=void 0)||(i=Promise))((function(e,t){function s(e){try{a(o.next(e))}catch(e){t(e)}}function c(e){try{a(o.throw(e))}catch(e){t(e)}}function a(t){var n;t.done?e(t.value):(n=t.value,n instanceof i?n:new i((function(e){e(n)}))).then(s,c)}a((o=o.apply(n,r||[])).next())}));var n,r,i,o}get(e){return this.request("GET",e)}post(e,t){return this.request("POST",e,t)}put(e,t){return this.request("POST",e,t)}delete(e){return this.request("DELETE",e)}};i=function(e,t,s,n){var r,i=arguments.length,o=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,n);else for(var c=e.length-1;c>=0;c--)(r=e[c])&&(o=(i<3?r(o):i>3?r(t,s,o):r(t,s))||o);return i>3&&o&&Object.defineProperty(t,s,o),o}([function(e){return n.register(e,e),new Proxy(e,{construct:e=>n.resolve(e)})}],i);const o={"about-component":()=>s.e(481).then(s.bind(s,940))};let c=class extends HTMLElement{constructor(){super(),this.response="paw",console.log("HomeComponent constructed!"),n.resolve(i).get("https://pokeapi.co/api/v2/pokemon/1").then((e=>{this.response=JSON.stringify(e)}))}};c=function(e,t,s,n){var r,i=arguments.length,o=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,n);else for(var c=e.length-1;c>=0;c--)(r=e[c])&&(o=(i<3?r(o):i>3?r(t,s,o):r(t,s))||o);return i>3&&o&&Object.defineProperty(t,s,o),o}([(0,r.w)({selector:"home-component",template:"<section> <h1>Home Works!</h1> {{ response }} </section> ",styles:"section{padding:20px}section h1{color:#006400}",components:o}),function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}("design:paramtypes",[])],c);const a=c},41:(e,t,s)=>{function n(e){return function(t){var s;return(s=class extends t{static get observedAttributes(){return Array.from(this.observedAttributesSet)}attributeChangedCallback(e,t,s){this._isFullyConstructed&&(this.hasOwnProperty(e)&&(this[e]=s),this.dispatchPropertyChangedEvent(e,t,s))}constructor(...t){super(...t),this._isFullyConstructed=!1,this.initializeData(),this.initializeStyles(),this.loadDynamicComponents(e.components),this._isFullyConstructed=!0}initializeData(){const e=this.constructor.observedAttributesSet;let t=e?Array.from(e):[];t=t.concat(Object.getOwnPropertyNames(this)),this._data={},this.addEventListener("property-changed",this.handlePropertyChange.bind(this)),t.forEach((e=>this.initializeProperty(e)))}handlePropertyChange(t){this._data[t.detail.property]=t.detail.newValue,this.innerHTML=this.scopeHtml(e.template,this.constructor.styleId,this._data)}initializeProperty(e){let t=this[e];this._data[e]=t,this.handleSpecialInitialization(e),this.definePropertyGettersAndSetters(e)}handleSpecialInitialization(e){var t;(null===(t=this[`_${e}`])||void 0===t?void 0:t.isFirstChange)&&(this[`_${e}`].isFirstChange=!1,this._data[e]=this[`_${e}`].value)}definePropertyGettersAndSetters(e){let t=this[e];Object.defineProperty(this,e,{get:()=>t,set:s=>{const n=t;t=s,n!==s&&this.emitPropertyChangedEvent(e,n,s)},enumerable:!0,configurable:!0})}emitPropertyChangedEvent(e,t,s){this.dispatchEvent(new CustomEvent("property-changed",{detail:{property:e,oldValue:t,newValue:s}}))}initializeStyles(){const t=this.constructor.styleId;this.setAttribute(t,"");const s=this.scopeCss(e.styles,t);this.innerHTML=this.scopeHtml(e.template,t,this._data),this.constructor.appendScopedStyle(s,t)}dispatchPropertyChangedEvent(e,t,s){this.dispatchEvent(new CustomEvent("property-changed",{detail:{name:e,oldValue:t,newValue:s}}))}scopeCss(e,t){return e.replace(/([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g,((e,s)=>`${s.split(",").map((e=>e.includes("-")?e.trim():`${e.trim()}[${t}]`)).join(", ")} ${e.endsWith(",")?",":" {"}`))}scopeHtml(e,t,s={}){const n=e.replace(/\{\{\s*(\w+)\s*\}\}/g,((e,t)=>s[t])),r=(new DOMParser).parseFromString(n,"text/html");return r.body.querySelectorAll("*").forEach((e=>{e.tagName.includes("-")||e.setAttribute(t,"")})),r.body.innerHTML}static appendScopedStyle(e,t){if(!document.head.querySelector(`#${t}`)){const s=document.createElement("style");s.id=t,s.textContent=e,document.head.appendChild(s)}}loadDynamicComponents(e){if(e)for(const[t,s]of Object.entries(e))customElements.get(t)||s().then((e=>{customElements.get(t)||customElements.define(t,e.default)})).catch((e=>{console.error(`Error loading component '${t}':`,e)}))}}).styleId=`_${e.selector}-${Date.now()}`,s.observedAttributesSet=t.observedAttributesSet||new Set,s}}s.d(t,{w:()=>n})}}]);