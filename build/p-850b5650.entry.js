import{r as t,h as e,H as i}from"./p-ddbb1df8.js";import"./p-bec3b19e.js";import"./p-58d13c5e.js";import"./p-f3a0c163.js";import{l as n}from"./p-d5d1c985.js";import{s as a}from"./p-38942298.js";function r(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}function o(t){let e=t,i=t;function n(t,e,n,a){for(null==n&&(n=0),null==a&&(a=t.length);n<a;){const r=n+a>>>1;i(t[r],e)<0?n=r+1:a=r}return n}return 1===t.length&&(e=(e,i)=>t(e)-i,i=function(t){return(e,i)=>r(t(e),i)}(t)),{left:n,center:function(t,i,a,r){null==a&&(a=0),null==r&&(r=t.length);const o=n(t,i,a,r-1);return o>a&&e(t[o-1],i)>-e(t[o],i)?o-1:o},right:function(t,e,n,a){for(null==n&&(n=0),null==a&&(a=t.length);n<a;){const r=n+a>>>1;i(t[r],e)>0?a=r:n=r+1}return n}}}const s=o(r).right;function l(t,e){let i;if(void 0===e)for(const e of t)null!=e&&(i<e||void 0===i&&e>=e)&&(i=e);else{let n=-1;for(let a of t)null!=(a=e(a,++n,t))&&(i<a||void 0===i&&a>=a)&&(i=a)}return i}function u(t,e){let i;if(void 0===e)for(const e of t)null!=e&&(i>e||void 0===i&&e>=e)&&(i=e);else{let n=-1;for(let a of t)null!=(a=e(a,++n,t))&&(i>a||void 0===i&&a>=a)&&(i=a)}return i}function c(t,e,i){const n=t[e];t[e]=t[i],t[i]=n}function h(t,e,i){if(n=(t=Float64Array.from(function*(t,e){if(void 0===e)for(let e of t)null!=e&&(e=+e)>=e&&(yield e);else{let i=-1;for(let n of t)null!=(n=e(n,++i,t))&&(n=+n)>=n&&(yield n)}}(t,i))).length){if((e=+e)<=0||n<2)return u(t);if(e>=1)return l(t);var n,a=(n-1)*e,o=Math.floor(a),s=l(function t(e,i,n=0,a=e.length-1,o=r){for(;a>n;){if(a-n>600){const r=a-n+1,s=i-n+1,l=Math.log(r),u=.5*Math.exp(2*l/3),c=.5*Math.sqrt(l*u*(r-u)/r)*(s-r/2<0?-1:1);t(e,i,Math.max(n,Math.floor(i-s*u/r+c)),Math.min(a,Math.floor(i+(r-s)*u/r+c)),o)}const r=e[i];let s=n,l=a;for(c(e,n,i),o(e[a],r)>0&&c(e,n,a);s<l;){for(c(e,s,l),++s,--l;o(e[s],r)<0;)++s;for(;o(e[l],r)>0;)--l}0===o(e[n],r)?c(e,n,l):(++l,c(e,l,a)),l<=i&&(n=l+1),i<=l&&(a=l-1)}return e}(t,o).subarray(0,o+1));return s+(u(t.subarray(o+1))-s)*(a-o)}}o((function(t){return null===t?NaN:+t}));var f={value:()=>{}};function d(){for(var t,e=0,i=arguments.length,n={};e<i;++e){if(!(t=arguments[e]+"")||t in n||/[\s.]/.test(t))throw new Error("illegal type: "+t);n[t]=[]}return new p(n)}function p(t){this._=t}function m(t,e){return t.trim().split(/^|\s+/).map((function(t){var i="",n=t.indexOf(".");if(n>=0&&(i=t.slice(n+1),t=t.slice(0,n)),t&&!e.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:i}}))}function v(t,e){for(var i,n=0,a=t.length;n<a;++n)if((i=t[n]).name===e)return i.value}function w(t,e,i){for(var n=0,a=t.length;n<a;++n)if(t[n].name===e){t[n]=f,t=t.slice(0,n).concat(t.slice(n+1));break}return null!=i&&t.push({name:e,value:i}),t}function g(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t)}return this}p.prototype=d.prototype={constructor:p,on:function(t,e){var i,n=this._,a=m(t+"",n),r=-1,o=a.length;if(!(arguments.length<2)){if(null!=e&&"function"!=typeof e)throw new Error("invalid callback: "+e);for(;++r<o;)if(i=(t=a[r]).type)n[i]=w(n[i],t.name,e);else if(null==e)for(i in n)n[i]=w(n[i],t.name,null);return this}for(;++r<o;)if((i=(t=a[r]).type)&&(i=v(n[i],t.name)))return i},copy:function(){var t={},e=this._;for(var i in e)t[i]=e[i].slice();return new p(t)},call:function(t,e){if((i=arguments.length-2)>0)for(var i,n,a=new Array(i),r=0;r<i;++r)a[r]=arguments[r+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(r=0,i=(n=this._[t]).length;r<i;++r)n[r].value.apply(e,a)},apply:function(t,e,i){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var n=this._[t],a=0,r=n.length;a<r;++a)n[a].value.apply(e,i)}},d("start","end","cancel","interrupt");const y=class{constructor(e){t(this,e),this.variableOptions=["Elevation","MaxTemperature","MinTemperature","Precipitation","Wind","RelativeHumidity","Solar"],this.colorScheme=["#2222ee","#bbd9e9","#fdae61","#f32a2c"],this.timeBy="Month",this.textureDefinitions=['this.textures.lines().orientation("4/8").size(1000)','this.textures.lines().orientation("2/8").size(10)','this.textures.lines().orientation("8/8").size(10)','this.textures.lines().orientation("6/8").size(10)']}async connectedCallback(){this.SQL=await a({locateFile:t=>"./assets/sql.js/"+t})}render(){var t;return e(i,null,e("ion-header",null,e("ion-toolbar",{color:"primary"},e("ion-title",null,"Weather Vis"," - "+((null===(t=this.file)||void 0===t?void 0:t.name)||"No File Opened")),e("ion-buttons",{slot:"start"},e("ion-back-button",{defaultHref:"/"})),e("ion-buttons",{slot:"end"},e("ion-button",{title:"Open",onClick:()=>this.fileInputElement.click()},e("ion-icon",{slot:"icon-only",name:"open"}))))),e("ion-content",{class:"ion-padding"},e("ion-item",{disabled:!this.file},e("ion-label",null,"Variables"),e("ion-select",{multiple:!0,onIonChange:async({detail:t})=>{this.selectedVariables=t.value,this.updateData(1),this.updateData(2)}},this.variableOptions.map(t=>e("ion-select-option",null,t)))),e("ion-item",{disabled:!this.file},e("ion-label",null,"Time By"),e("ion-select",{value:this.timeBy,onIonChange:async({detail:t})=>{this.timeBy=t.value,this.updateData(1),this.updateData(2)}},e("ion-select-option",null,"Day"),e("ion-select-option",null,"Week"),e("ion-select-option",null,"Month"),e("ion-select-option",null,"Quarter "))),e("div",null,e("s-set-vis",{ref:t=>this.setVisElement=t,"parallel-sets-ribbon-tension":.5,parallelSetsDimensions:[""],parallelSetsMaxSegmentLimit:12,parallelSetsTexutureDefinitions:this.textureDefinitions,parallelSetsColorScheme:this.colorScheme,"dark-mode":JSON.parse(localStorage.getItem("isDarkModeEnabled"))}),e("iframe",{width:"600",height:"600",style:{border:"0"},ref:async t=>{this.mapIframeElement=t;const e=await(await fetch("./assets/map.html")).text();t.contentDocument.querySelector("div#map")||(t.contentDocument.open(),t.contentDocument.write(e),t.contentDocument.close(),window.addEventListener("message",e=>{if(e.source===this.mapIframeElement.contentWindow){const i=e.data;switch(i.type){case"hello":t.contentWindow.postMessage({type:"view center point",info:[0,0]},"*");break;case"select rect":this.updateData(1,i.info)}}}))}}),e("ion-button",{onClick:()=>this.mapIframeElement.contentWindow.postMessage({type:"reset range selection"},"*")},"Remove Range Selection")),e("div",null,e("s-set-vis",{ref:t=>this.setVisElement2=t,"parallel-sets-ribbon-tension":.5,parallelSetsDimensions:[""],parallelSetsMaxSegmentLimit:12,parallelSetsTexutureDefinitions:this.textureDefinitions,parallelSetsColorScheme:this.colorScheme,"dark-mode":JSON.parse(localStorage.getItem("isDarkModeEnabled"))}),e("iframe",{width:"600",height:"600",style:{border:"0"},ref:async t=>{this.mapIframeElement2=t;const e=await(await fetch("./assets/map.html")).text();t.contentDocument.querySelector("div#map")||(t.contentDocument.open(),t.contentDocument.write(e),t.contentDocument.close(),window.addEventListener("message",e=>{if(e.source===this.mapIframeElement2.contentWindow){const i=e.data;switch(i.type){case"hello":t.contentWindow.postMessage({type:"view center point",info:[0,0]},"*");break;case"select rect":this.updateData(2,i.info)}}}))}}),e("ion-button",{onClick:()=>this.mapIframeElement2.contentWindow.postMessage({type:"reset range selection"},"*")},"Remove Range Selection"))),e("input",{id:"file-input",type:"file",ref:t=>this.fileInputElement=t,onInput:async({target:t})=>{var e;this.file=null===(e=t.files)||void 0===e?void 0:e[0];const i=await n.create({message:`Opening ${this.file.name}...`});await i.present();const a=await this.file.arrayBuffer();this.DB=new this.SQL.Database(new Uint8Array(a)),await i.dismiss()}}))}async updateData(t,e){const i=await this.queryData(this.selectedVariables,this.timeBy,e);if(1===t){const t=i.filter(t=>"Jan"===t.Date).map(t=>({latitude:t.Latitude,longitude:t.Longitude,value:t["_"+this.selectedVariables[0]]})),e=[...new Set(t.map(t=>t.value))].sort((t,e)=>+t.split(" ")[0]-+e.split(" ")[0]).reduce((t,e,i)=>(t[e]=this.colorScheme[i],t),{});t.forEach(t=>t.value=e[t.value]),this.mapIframeElement.contentWindow.postMessage({type:"highlight",info:{data:t,marginLatitude:.312,marginLongitude:.312}},"*"),this.mapIframeElement.contentWindow.postMessage({type:"view center point",info:{location:[(this.datasetInfo.maxLatitude+this.datasetInfo.minLatitude)/2,(this.datasetInfo.maxLongitude+this.datasetInfo.minLongitude)/2],zoom:6}},"*"),this.setVisElement.data=i,this.setVisElement.parallelSetsDimensions=this.selectedVariables.map(t=>"_"+t).concat(["Date"]),this.setVisElement.statisticsPlotGroupDefinitions=this.selectedVariables.map(t=>({dimensionName:t,visType:"box"}))}else if(2===t){const t=i.filter(t=>"Jan"===t.Date).map(t=>({latitude:t.Latitude,longitude:t.Longitude,value:t["_"+this.selectedVariables[0]]})),e=[...new Set(t.map(t=>t.value))].sort((t,e)=>+t.split(" ")[0]-+e.split(" ")[0]).reduce((t,e,i)=>(t[e]=this.colorScheme[i],t),{});t.forEach(t=>t.value=e[t.value]),this.mapIframeElement2.contentWindow.postMessage({type:"highlight",info:{data:t,marginLatitude:.312,marginLongitude:.312}},"*"),this.mapIframeElement2.contentWindow.postMessage({type:"view center point",info:{location:[(this.datasetInfo.maxLatitude+this.datasetInfo.minLatitude)/2,(this.datasetInfo.maxLongitude+this.datasetInfo.minLongitude)/2],zoom:6}},"*"),this.setVisElement2.data=i,this.setVisElement2.parallelSetsDimensions=this.selectedVariables.map(t=>"_"+t).concat(["Date"]),this.setVisElement2.statisticsPlotGroupDefinitions=this.selectedVariables.map(t=>({dimensionName:t,visType:"box"}))}}async queryData(t,e,i){var a,o;let c=[];if((null==t?void 0:t.length)>0&&e){const f=await n.create({message:"Qeurying data..."});let d,p;switch(await f.present(),e){case"Day":d="select Date, Latitude, Longitude, "+t.join(", ")+" from weather",i&&(d+=` where Latitude >= ${i.minLat} and Latitude <= ${i.maxLat} and Longitude >= ${i.minLon} and Longitude <= ${i.maxLon}`);break;case"Week":case"Month":case"Quarter":d="select substr(Date, 0, 8) as Date, Latitude, Longitude, "+t.map(t=>`avg(${t}) as ${t}`).join(", ")+" from weather",i&&(d+=` where Latitude >= ${i.minLat} and Latitude <= ${i.maxLat} and Longitude >= ${i.minLon} and Longitude <= ${i.maxLon}`),d+=" group by substr(Date, 0, 8), Latitude, Longitude"}if(p=null===(a=this.DB.exec(d))||void 0===a?void 0:a[0],c=null==p?void 0:p.values.map(t=>{const e={};for(let i=0;i<t.length;i++)e[p.columns[i]]="Date"===p.columns[i]?this.obtainDateString(t[i]):+t[i];return e}),c){const e={};t.forEach(t=>e[t]=function t(){var e,i=[],n=[],a=[];function o(){var t=0,e=Math.max(1,n.length);for(a=new Array(e-1);++t<e;)a[t-1]=h(i,t/e);return l}function l(t){return isNaN(t=+t)?e:n[s(a,t)]}return l.invertExtent=function(t){var e=n.indexOf(t);return e<0?[NaN,NaN]:[e>0?a[e-1]:i[0],e<a.length?a[e]:i[i.length-1]]},l.domain=function(t){if(!arguments.length)return i.slice();i=[];for(let e of t)null==e||isNaN(e=+e)||i.push(e);return i.sort(r),o()},l.range=function(t){return arguments.length?(n=Array.from(t),o()):n.slice()},l.unknown=function(t){return arguments.length?(e=t,l):e},l.quantiles=function(){return a.slice()},l.copy=function(){return t().domain(i).range(n).unknown(e)},g.apply(l,arguments)}().domain(c.map(e=>e[t])).range([.25,.5,.75,1]));const i=(t,e,i)=>{switch(e){case.25:return`${(+u(i)).toFixed(2)} ~ ${(+t[0]).toFixed(2)}`;case.5:return`${(+t[0]).toFixed(2)} ~ ${(+t[1]).toFixed(2)}`;case.75:return`${(+t[1]).toFixed(2)} ~ ${(+t[2]).toFixed(2)}`;case 1:return`${(+t[2]).toFixed(2)} ~ ${(+l(i)).toFixed(2)}`}};c.forEach(n=>t.forEach(t=>n["_"+t]=i(e[t].quantiles(),e[t](n[t]),c.map(e=>e[t]))))}i||(d="select min(Latitude) as minLatitude, max(Latitude) as maxLatitude, count(distinct Latitude) as latitudeCount, min(Longitude) as minLongitude, max(Longitude) as maxLongitude, count(distinct Longitude) as longitudeCount from weather",p=null===(o=this.DB.exec(d))||void 0===o?void 0:o[0],this.datasetInfo=p.values.map(t=>{const e={};for(let i=0;i<t.length;i++)e[p.columns[i]]=+t[i];return e})[0]),await f.dismiss()}return c}obtainDateString(t){switch(t.substring(5)){case"01":return"Jan";case"02":return"Feb";case"03":return"Mar";case"04":return"Apr";case"05":return"May";case"06":return"Jun";case"07":return"Jul";case"08":return"Aug";case"09":return"Sep";case"10":return"Oct";case"11":return"Nov";case"12":return"Dec"}}};y.style=".sc-app-weather-vis-h{display:block}#file-input.sc-app-weather-vis{display:none}s-set-vis.sc-app-weather-vis{height:600px;width:calc(100% - 650px);display:inline-flex}iframe.sc-app-weather-vis{display:inline-block}";export{y as app_weather_vis}