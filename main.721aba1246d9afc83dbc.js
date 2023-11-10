(()=>{"use strict";var e,t,n={},o={};function r(e){var t=o[e];if(void 0!==t)return t.exports;var a=o[e]={exports:{}};return n[e](a,a.exports,r),a.exports}r.m=n,r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,n)=>(r.f[n](e,t),t)),[])),r.u=e=>e+"."+{79:"32555b4f038b07c6c96b",274:"6c44c2b3d097e4c2507d",414:"3d88989d85daa66749fa",470:"17e6f5af9cb478404aa2",571:"213070cd52f04d60040e",727:"3ad52c829487c47d41eb"}[e]+".js",r.miniCssF=e=>{},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="meowpaw:",r.l=(n,o,a,i)=>{if(e[n])e[n].push(o);else{var d,c;if(void 0!==a)for(var s=document.getElementsByTagName("script"),u=0;u<s.length;u++){var p=s[u];if(p.getAttribute("src")==n||p.getAttribute("data-webpack")==t+a){d=p;break}}d||(c=!0,(d=document.createElement("script")).charset="utf-8",d.timeout=120,r.nc&&d.setAttribute("nonce",r.nc),d.setAttribute("data-webpack",t+a),d.src=n),e[n]=[o];var l=(t,o)=>{d.onerror=d.onload=null,clearTimeout(f);var r=e[n];if(delete e[n],d.parentNode&&d.parentNode.removeChild(d),r&&r.forEach((e=>e(o))),t)return t(o)},f=setTimeout(l.bind(null,void 0,{type:"timeout",target:d}),12e4);d.onerror=l.bind(null,d.onerror),d.onload=l.bind(null,d.onload),c&&document.head.appendChild(d)}},r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="/",(()=>{var e={179:0};r.f.j=(t,n)=>{var o=r.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var a=new Promise(((n,r)=>o=e[t]=[n,r]));n.push(o[2]=a);var i=r.p+r.u(t),d=new Error;r.l(i,(n=>{if(r.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;d.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",d.name="ChunkLoadError",d.type=a,d.request=i,o[1](d)}}),"chunk-"+t,t)}};var t=(t,n)=>{var o,a,[i,d,c]=n,s=0;if(i.some((t=>0!==e[t]))){for(o in d)r.o(d,o)&&(r.m[o]=d[o]);c&&c(r)}for(t&&t(n);s<i.length;s++)a=i[s],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0},n=self.webpackChunkmeowpaw=self.webpackChunkmeowpaw||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();const a=[{path:"/",view:()=>r.e(79).then(r.bind(r,79)).then((()=>"<home-component></home-component>"))},{path:"/contact",view:()=>r.e(470).then(r.bind(r,470)).then((()=>"<contact-component></contact-component>")),kitties:[{path:"/email",view:()=>r.e(274).then(r.bind(r,274)).then((()=>"<email-component></email-component>"))}]},{path:"/about/:id",view:()=>r.e(727).then(r.bind(r,727)).then((()=>"<about-component></about-component>"))},{path:"/404",view:()=>r.e(571).then(r.bind(r,571)).then((()=>"<not-found-component></not-found-component>"))},{path:"*",redirectTo:"/404"}],i=(e,t)=>{const n=e.split("/").filter((e=>""!==e)),o=t.split("/").filter((e=>""!==e));if(n.length!==o.length)return null;let r={};for(let e=0;e<n.length;e++)if(n[e].startsWith(":"))r[n[e].substring(1)]=o[e];else if(n[e]!==o[e])return null;return r},d=e=>{history.pushState(null,"",e),c()},c=async()=>{let e=s(a,location.pathname);if(!e?.route.view)return function(){const e=a.find((e=>"*"===e.path));d(e?.redirectTo||"/")}();const t=document.getElementById("app");t&&await async function(e,t){if(t?.parentRoute?.view){const n=await t.parentRoute.view(t.params);e.innerHTML=n}else if(t.route.view){const n=await t.route.view(t.params);return void(e.innerHTML=n)}if(t?.route.view){const n=await t.route.view(t.params),o=e.querySelector("mug-router");o&&(o.innerHTML=n)}}(t,e)};function s(e,t,n=""){for(const o of e){const e=`${n}${n.endsWith("/")?"":"/"}${o.path}`;if(o.kitties){const n=s(o.kitties,t,e);if(n)return{...n,parentRoute:o}}const r=i(e,t);if(r)return{route:o,params:r}}return null}window.addEventListener("pagehide",(e=>{e.persisted})),window.addEventListener("pageshow",(e=>{e.persisted&&c()})),window.addEventListener("popstate",c),document.addEventListener("DOMContentLoaded",(()=>{document.body.addEventListener("click",(e=>{e.target.matches("[data-link]")&&(e.preventDefault(),d(e.target.href))})),c()}));const u=document.createElement("base");u.href=function(){const e=window.location.pathname.split("/");return(e.length>1?`/${e[1]}/`:"/").replace("//","/")}(),document.head.prepend(u)})();