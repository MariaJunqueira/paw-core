"use strict";(self.webpackChunkmeowpaw=self.webpackChunkmeowpaw||[]).push([[571],{571:(e,t,n)=>{n.r(t),n.d(t,{NotFoundComponent:()=>o});const s="not-found-component";class o extends HTMLElement{static styleId=`_${s}-${Date.now()}`;constructor(){super(),this.setAttribute(o.styleId,"");const e=this.scopeCss("section {\n  padding: 20px;\n\n  > h1 {\n    color: red;\n  }\n}\n");this.innerHTML=this.scopeHtml("<section> <h1>Not found</h1> </section> "),o.appendScopedStyle(e)}scopeCss(e){return e.replace(/([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g,((e,t)=>`${t.split(",").map((e=>e.includes("-")?e.trim():`${e.trim()}[${o.styleId}] `)).join(", ")} ${e.endsWith(",")?",":" {"}`))}scopeHtml(e){const t=(new DOMParser).parseFromString(e,"text/html");return t.body.querySelectorAll("*").forEach((e=>{e.tagName.includes("-")||e.setAttribute(o.styleId,"")})),t.body.innerHTML}static appendScopedStyle(e){if(!document.head.querySelector(`#${this.styleId}`)){const t=document.createElement("style");t.id=this.styleId,t.textContent=e,document.head.appendChild(t)}}}customElements.get(s)||customElements.define(s,o)}}]);