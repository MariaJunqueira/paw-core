"use strict";(self.webpackChunkmeowpaw=self.webpackChunkmeowpaw||[]).push([[465],{465:(e,t,n)=>{n.r(t),n.d(t,{AboutComponent:()=>o});const s="about-component";class o extends HTMLElement{uniqueId;constructor(){super(),this.uniqueId=`${Date.now()}`,this.setAttribute(`${s}-${this.uniqueId}`,"");const e=this.scopeCss("section {\n  padding: 20px;\n\n  > h1 {\n    color: red;\n  }\n}\n",this.uniqueId),t=this.scopeHtml("<section> <h1>About Works!</h1> </section> ",this.uniqueId);this.innerHTML=t;const n=document.createElement("style");n.textContent=e,this.appendChild(n)}scopeCss(e,t){return e.replace(/([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g,((e,n)=>`${n.split(",").map((e=>e.includes("-")?e.trim():`${e.trim()}[${s}-${t}] `)).join(", ")} ${e.endsWith(",")?",":" {"}`))}scopeHtml(e,t){const n=(new DOMParser).parseFromString(e,"text/html");return n.body.querySelectorAll("*").forEach((e=>{e.tagName.includes("-")||e.setAttribute(`${s}-${t}`,"")})),n.body.innerHTML}}customElements.get(s)||customElements.define(s,o)}}]);