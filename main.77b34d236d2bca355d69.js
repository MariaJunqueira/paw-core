(()=>{"use strict";var e,t,n={},o={};function r(e){var t=o[e];if(void 0!==t)return t.exports;var a=o[e]={exports:{}};return n[e](a,a.exports,r),a.exports}r.m=n,r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,n)=>(r.f[n](e,t),t)),[])),r.u=e=>e+"."+{274:"ded0830cfc21aab57220",414:"7a9d7d2d205a6072213a",459:"1534494c952f9ca52bd1",462:"ed3434ad63489a66f027",470:"101895f5a50f88e7aee5",481:"010dea566d99b69aa825",521:"df953c42288f642843db",571:"9d263bd35ebf63e54fa0",940:"af4f06dd21ac898b5535"}[e]+".js",r.miniCssF=e=>{},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="meowpaw:",r.l=(n,o,a,i)=>{if(e[n])e[n].push(o);else{var c,u;if(void 0!==a)for(var d=document.getElementsByTagName("script"),p=0;p<d.length;p++){var s=d[p];if(s.getAttribute("src")==n||s.getAttribute("data-webpack")==t+a){c=s;break}}c||(u=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,r.nc&&c.setAttribute("nonce",r.nc),c.setAttribute("data-webpack",t+a),c.src=n),e[n]=[o];var l=(t,o)=>{c.onerror=c.onload=null,clearTimeout(f);var r=e[n];if(delete e[n],c.parentNode&&c.parentNode.removeChild(c),r&&r.forEach((e=>e(o))),t)return t(o)},f=setTimeout(l.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=l.bind(null,c.onerror),c.onload=l.bind(null,c.onload),u&&document.head.appendChild(c)}},r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="/",(()=>{var e={179:0};r.f.j=(t,n)=>{var o=r.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var a=new Promise(((n,r)=>o=e[t]=[n,r]));n.push(o[2]=a);var i=r.p+r.u(t),c=new Error;r.l(i,(n=>{if(r.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;c.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",c.name="ChunkLoadError",c.type=a,c.request=i,o[1](c)}}),"chunk-"+t,t)}};var t=(t,n)=>{var o,a,[i,c,u]=n,d=0;if(i.some((t=>0!==e[t]))){for(o in c)r.o(c,o)&&(r.m[o]=c[o]);u&&u(r)}for(t&&t(n);d<i.length;d++)a=i[d],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0},n=self.webpackChunkmeowpaw=self.webpackChunkmeowpaw||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var a=function(e,t,n,o){return new(n||(n=Promise))((function(r,a){function i(e){try{u(o.next(e))}catch(e){a(e)}}function c(e){try{u(o.throw(e))}catch(e){a(e)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}u((o=o.apply(e,t||[])).next())}))};const i=[{path:"",componentName:"app-component",componentPath:()=>r.e(462).then(r.bind(r,462)),kitties:[{path:"/",componentName:"home-component",componentPath:()=>r.e(521).then(r.bind(r,459))},{path:"/contact",componentName:"contact-component",componentPath:()=>r.e(470).then(r.bind(r,470)),kitties:[{path:"/email",componentName:"email-component",componentPath:()=>r.e(274).then(r.bind(r,274))}]},{path:"/about/:id",componentName:"about-component",componentPath:()=>r.e(940).then(r.bind(r,940))},{path:"/404",componentName:"not-found-component",componentPath:()=>r.e(571).then(r.bind(r,571))}]},{path:"*",redirectTo:"/404"}];var c=function(e,t,n,o){return new(n||(n=Promise))((function(r,a){function i(e){try{u(o.next(e))}catch(e){a(e)}}function c(e){try{u(o.throw(e))}catch(e){a(e)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}u((o=o.apply(e,t||[])).next())}))};const u=e=>{history.pushState(null,"",e),d()},d=()=>c(void 0,void 0,void 0,(function*(){const e=location.pathname;let t=function(e,t){return e.find((e=>{if(e.path===t)return!0;const n=e.path.split("/"),o=t.split("/");return n.length===o.length&&n.every(((e,t)=>e.startsWith(":")||e===o[t]))}))}(s,e);if(!t)return function(){const e=i.find((e=>"*"===e.path));u((null==e?void 0:e.redirectTo)||"/")}();const n=document.getElementById("app");n&&(yield p(n,t))}));function p(e,t){var n;return c(this,void 0,void 0,(function*(){if((null==t?void 0:t.parentRoute)&&(yield p(e,t.parentRoute)),null===(n=null==t?void 0:t.route)||void 0===n?void 0:n.componentPath){const n=yield function(e){return a(this,void 0,void 0,(function*(){return yield function(e,t){return a(this,void 0,void 0,(function*(){const n=(yield e()).default;customElements.get(t)||customElements.define(t,n)}))}(e.componentPath,e.componentName),`<${e.componentName}></${e.componentName}>`}))}(t.route);if(t.parentRoute){const t=e.querySelectorAll("mug-router");t[t.length-1].innerHTML=n}else e.innerHTML=n}}))}const s=function e(t,n="",o){let r=[];for(const a of t){const t="/"===n||""===n?a.path:`${n}${"/"===a.path?"":`${a.path}`}`,i={route:a,parentRoute:o};r.push(Object.assign({path:t},i)),a.kitties&&(r=r.concat(e(a.kitties,t,i)))}return r}(i);window.addEventListener("pagehide",(e=>{e.persisted})),window.addEventListener("pageshow",(e=>{e.persisted&&d()})),window.addEventListener("popstate",d),document.addEventListener("DOMContentLoaded",(()=>{document.body.addEventListener("click",(e=>{e.target.matches("[data-link]")&&(e.preventDefault(),u(e.target.href))})),d()}))})();