"use strict";(self.webpackChunkmeowpaw=self.webpackChunkmeowpaw||[]).push([[403,922],{403:(e,t,n)=>{n.r(t),n.d(t,{default:()=>a});var s=n(25);let o=class{constructor(){this.lalaland=1}};o=function(e,t,n,s){var o,c=arguments.length,r=c<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,n,s);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(r=(c<3?o(r):c>3?o(t,n,r):o(t,n))||r);return c>3&&r&&Object.defineProperty(t,n,r),r}([(0,s.G)()],o);var c=n(905),r=n(41);let l=class extends HTMLElement{constructor(){super(),console.log("AboutComponent constructed!");const e=c.n.resolve(o);console.log("About:",e.lalaland)}};l=function(e,t,n,s){var o,c=arguments.length,r=c<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,n,s);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(r=(c<3?o(r):c>3?o(t,n,r):o(t,n))||r);return c>3&&r&&Object.defineProperty(t,n,r),r}([(0,r.w)({selector:"about-component",template:"<section> <h1>About Works!</h1> </section> ",styles:"section {\n  padding: 20px;\n\n  > h1 {\n    color: red;\n  }\n}\n"}),function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}("design:paramtypes",[])],l);const a=l},905:(e,t,n)=>{n.d(t,{n:()=>s});const s=new class{constructor(){this.dependencies=new Map,this.instances=new Map}register(e,t){this.dependencies.set(e,t)}resolve(e){if(!this.instances.has(e)){this.dependencies.has(e)||this.register(e,e);const t=new(this.dependencies.get(e));this.instances.set(e,t)}return this.instances.get(e)}}},25:(e,t,n)=>{n.d(t,{G:()=>o});var s=n(905);function o(){return function(e){return s.n.register(e,e),new Proxy(e,{construct:e=>s.n.resolve(e)})}}}}]);