import{n as r}from"./p-d3c87a7d.js";function a(a,t,s){if(null==s&&(s=r),i=a.length){if((t=+t)<=0||i<2)return+s(a[0],0,a);if(t>=1)return+s(a[i-1],i-1,a);var i,e=(i-1)*t,n=Math.floor(e),u=+s(a[n],n,a);return u+(+s(a[n+1],n+1,a)-u)*(e-n)}}function t(r,a){switch(arguments.length){case 0:break;case 1:this.range(r);break;default:this.range(a).domain(r)}return this}var s=Array.prototype,i=s.map,e=s.slice;export{t as i,i as m,e as s,a as t}