import{g as t,c as e}from"./p-bec3b19e.js";import{g as n}from"./p-58d13c5e.js";import{OVERLAY_BACK_BUTTON_PRIORITY as o}from"./p-f3a0c163.js";let s=0;const a=new WeakMap,i=t=>({create:e=>f(t,e),dismiss:(e,n,o)=>v(document,e,n,t,o),getTop:async()=>b(document,t)}),r=i("ion-alert"),c=i("ion-action-sheet"),d=i("ion-loading"),u=i("ion-picker"),p=i("ion-popover"),l=t=>{"undefined"!=typeof document&&y(document);const e=s++;t.overlayIndex=e,t.hasAttribute("id")||(t.id="ion-overlay-"+e)},f=(t,e)=>"undefined"!=typeof customElements?customElements.whenDefined(t).then(()=>{const n=document.createElement(t);return n.classList.add("overlay-hidden"),Object.assign(n,e),g(document).appendChild(n),n.componentOnReady()}):Promise.resolve(),m='[tabindex]:not([tabindex^="-"]), input:not([type=hidden]), textarea, button, select, .ion-focusable',y=t=>{0===s&&(s=1,t.addEventListener("focus",e=>((t,e)=>{const o=b(e),s=t.target;if(o&&s)if(o===s)o.lastFocus=void 0;else{const t=n(o);if(!t.contains(s))return;const a=t.querySelector(".ion-overlay-wrapper");if(!a)return;if(a.contains(s))o.lastFocus=s;else{const t=o.lastFocus;((t,e)=>{let n=t.querySelector(m);const o=n&&n.shadowRoot;o&&(n=o.querySelector("input:not([type=hidden]), textarea, button, select")||n),n?n.focus():e.focus()})(a,o),t===e.activeElement&&((t,e)=>{const n=Array.from(t.querySelectorAll(m));let o=n.length>0?n[n.length-1]:null;const s=o&&o.shadowRoot;s&&(o=s.querySelector("input:not([type=hidden]), textarea, button, select")||o),o?o.focus():e.focus()})(a,o),o.lastFocus=e.activeElement}}})(e,t),!0),t.addEventListener("ionBackButton",e=>{const n=b(t);n&&n.backdropDismiss&&e.detail.register(o,()=>n.dismiss(void 0,A))}),t.addEventListener("keyup",e=>{if("Escape"===e.key){const e=b(t);e&&e.backdropDismiss&&e.dismiss(void 0,A)}}))},v=(t,e,n,o,s)=>{const a=b(t,o,s);return a?a.dismiss(e,n):Promise.reject("overlay does not exist")},b=(t,e,n)=>{const o=((t,e)=>(void 0===e&&(e="ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker,ion-popover,ion-toast"),Array.from(t.querySelectorAll(e)).filter(t=>t.overlayIndex>0)))(t,e);return void 0===n?o[o.length-1]:o.find(t=>t.id===n)},h=async(n,o,s,a,i)=>{if(n.presented)return;n.presented=!0,n.willPresent.emit();const r=t(n),c=n.enterAnimation?n.enterAnimation:e.get(o,"ios"===r?s:a);await k(n,c,n.el,i)&&n.didPresent.emit(),n.keyboardClose&&n.el.focus()},x=async(n,o,s,i,r,c,d)=>{if(!n.presented)return!1;n.presented=!1;try{n.el.style.setProperty("pointer-events","none"),n.willDismiss.emit({data:o,role:s});const u=t(n),p=n.leaveAnimation?n.leaveAnimation:e.get(i,"ios"===u?r:c);"gesture"!==s&&await k(n,p,n.el,d),n.didDismiss.emit({data:o,role:s}),a.delete(n)}catch(t){console.error(t)}return n.el.remove(),!0},g=t=>t.querySelector("ion-app")||t.body,k=async(t,n,o,s)=>{o.classList.remove("overlay-hidden");const i=n(o.shadowRoot||t.el,s);t.animated&&e.getBoolean("animated",!0)||i.duration(0),t.keyboardClose&&i.beforeAddWrite(()=>{const t=o.ownerDocument.activeElement;t&&t.matches("input, ion-input, ion-textarea")&&t.blur()});const r=a.get(t)||[];return a.set(t,[...r,i]),await i.play(),!0},w=(t,e)=>{let n;const o=new Promise(t=>n=t);return j(t,e,t=>{n(t.detail)}),o},j=(t,e,n)=>{const o=s=>{t.removeEventListener(e,o),n(s)};t.addEventListener(e,o)},B=t=>"cancel"===t||t===A,E=t=>t(),P=(t,n)=>{if("function"==typeof t)return e.get("_zoneGate",E)(()=>{try{return t(n)}catch(t){console.error(t)}})},A="backdrop";export{A as B,l as a,u as b,a as c,x as d,w as e,p as f,c as g,r as h,B as i,d as l,h as p,P as s}