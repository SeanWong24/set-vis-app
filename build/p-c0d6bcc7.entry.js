import{r as s,h as t,H as i}from"./p-ddbb1df8.js";import{g as o}from"./p-bec3b19e.js";import"./p-58d13c5e.js";import"./p-6497746f.js";import"./p-f3a0c163.js";import{m as e}from"./p-dd44f41f.js";import{u as n}from"./p-c3981dce.js";const r=class{constructor(t){s(this,t),this.visible=!1,this.autoHide=!0,this.onClick=()=>e.toggle(this.menu)}connectedCallback(){this.visibilityChanged()}async visibilityChanged(){this.visible=await n(this.menu)}render(){const s=o(this),e=this.autoHide&&!this.visible;return t(i,{onClick:this.onClick,"aria-hidden":e?"true":null,class:{[s]:!0,"menu-toggle-hidden":e}},t("slot",null))}};r.style=":host(.menu-toggle-hidden){display:none}";export{r as ion_menu_toggle}