"use strict";(self.webpackChunkmeowpaw=self.webpackChunkmeowpaw||[]).push([[620],{79:(e,t,n)=>{n.r(t),n.d(t,{default:()=>a});var o=n(150),s=n(905),c=n(41);const r={"about-component":()=>n.e(339).then(n.bind(n,727))};let l=class extends HTMLElement{constructor(){super(),console.log("HomeComponent constructed!");const e=s.n.resolve(o.b);console.log("1:",e.lalaland),e.lalaland=2,console.log("2:",e.lalaland)}};l=function(e,t,n,o){var s,c=arguments.length,r=c<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,n,o);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(r=(c<3?s(r):c>3?s(t,n,r):s(t,n))||r);return c>3&&r&&Object.defineProperty(t,n,r),r}([(0,c.w)({selector:"home-component",template:"<section> <h1>Home Works!</h1> <about-component></about-component> </section> ",styles:"section{padding:20px}section h1{color:#006400}",components:r}),function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}("design:paramtypes",[])],l);const a=l},150:(e,t,n)=>{n.d(t,{b:()=>s});var o=n(905);let s=class{constructor(){this.lalaland=1}};s=function(e,t,n,o){var s,c=arguments.length,r=c<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,n,o);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(r=(c<3?s(r):c>3?s(t,n,r):s(t,n))||r);return c>3&&r&&Object.defineProperty(t,n,r),r}([function(e){return o.n.register(e,e),new Proxy(e,{construct:e=>o.n.resolve(e)})}],s)},905:(e,t,n)=>{n.d(t,{n:()=>o});const o=new class{constructor(){this.dependencies=new Map,this.instances=new Map}register(e,t){this.dependencies.set(e,t)}resolve(e){if(!this.instances.has(e)){this.dependencies.has(e)||this.register(e,e);const t=new(this.dependencies.get(e));this.instances.set(e,t)}return this.instances.get(e)}}}}]);