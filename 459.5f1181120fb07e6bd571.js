"use strict";(self.webpackChunkmeowpaw=self.webpackChunkmeowpaw||[]).push([[459],{459:(e,t,n)=>{n.r(t),n.d(t,{default:()=>a});const s=new class{constructor(){this.dependencies=new Map,this.instances=new Map}register(e,t){this.dependencies.set(e,t)}resolve(e){if(!this.instances.has(e)){this.dependencies.has(e)||this.register(e,e);const t=new(this.dependencies.get(e));this.instances.set(e,t)}return this.instances.get(e)}};var r=n(718);let o=class{constructor(){this.baseUrl=""}request(e,t,n){return s=this,r=void 0,c=function*(){const s=`${this.baseUrl}${t}`,r={method:e,headers:this.headers,body:n?JSON.stringify(n):null};try{const e=yield fetch(s,r);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return yield e.json()}catch(e){throw console.error("Request error:",e),e}},new((o=void 0)||(o=Promise))((function(e,t){function n(e){try{a(c.next(e))}catch(e){t(e)}}function i(e){try{a(c.throw(e))}catch(e){t(e)}}function a(t){var s;t.done?e(t.value):(s=t.value,s instanceof o?s:new o((function(e){e(s)}))).then(n,i)}a((c=c.apply(s,r||[])).next())}));var s,r,o,c}get(e){return this.request("GET",e)}post(e,t){return this.request("POST",e,t)}put(e,t){return this.request("POST",e,t)}delete(e){return this.request("DELETE",e)}};o=function(e,t,n,s){var r,o=arguments.length,c=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,s);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c}([function(e){return s.register(e,e),new Proxy(e,{construct:e=>s.resolve(e)})}],o);const c={"about-component":()=>n.e(481).then(n.bind(n,940))};let i=class extends HTMLElement{constructor(){super(),this.response="paw",console.log("HomeComponent constructed!"),s.resolve(o).get("https://pokeapi.co/api/v2/pokemon/1").then((e=>{this.response=JSON.stringify(e)}))}};i=function(e,t,n,s){var r,o=arguments.length,c=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,s);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c}([(0,r.w)({selector:"home-component",template:"<section> <h1>Home Works!</h1> {{ response }} </section> ",styles:"section{padding:20px}section h1{color:#006400}",components:c}),function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}("design:paramtypes",[])],i);const a=i}}]);