import{n as f}from"./p-d3c87a7d.js";function r(r,a){var n,o=r.length,e=o,s=-1,c=0;if(null==a)for(;++s<o;)isNaN(n=f(r[s]))?--e:c+=n;else for(;++s<o;)isNaN(n=f(a(r[s],s,r)))?--e:c+=n;if(e)return c/e}const a=function(f){for(var r=f.length/6|0,a=new Array(r),n=0;n<r;)a[n]="#"+f.slice(6*n,6*++n);return a}("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");export{a as A,r as m}