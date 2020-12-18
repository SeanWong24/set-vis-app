import{r as t,h as e,H as i}from"./p-ddbb1df8.js";import"./p-bec3b19e.js";import"./p-58d13c5e.js";import"./p-f3a0c163.js";import{l as n}from"./p-d5d1c985.js";import{s}from"./p-38942298.js";function a(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}function o(t){let e=t,i=t;function n(t,e,n,s){for(null==n&&(n=0),null==s&&(s=t.length);n<s;){const a=n+s>>>1;i(t[a],e)<0?n=a+1:s=a}return n}return 1===t.length&&(e=(e,i)=>t(e)-i,i=function(t){return(e,i)=>a(t(e),i)}(t)),{left:n,center:function(t,i,s,a){null==s&&(s=0),null==a&&(a=t.length);const o=n(t,i,s,a-1);return o>s&&e(t[o-1],i)>-e(t[o],i)?o-1:o},right:function(t,e,n,s){for(null==n&&(n=0),null==s&&(s=t.length);n<s;){const a=n+s>>>1;i(t[a],e)>0?s=a:n=a+1}return n}}}const r=o(a).right;function l(t,e){let i;if(void 0===e)for(const e of t)null!=e&&(i<e||void 0===i&&e>=e)&&(i=e);else{let n=-1;for(let s of t)null!=(s=e(s,++n,t))&&(i<s||void 0===i&&s>=s)&&(i=s)}return i}function u(t,e){let i;if(void 0===e)for(const e of t)null!=e&&(i>e||void 0===i&&e>=e)&&(i=e);else{let n=-1;for(let s of t)null!=(s=e(s,++n,t))&&(i>s||void 0===i&&s>=s)&&(i=s)}return i}function h(t,e,i){const n=t[e];t[e]=t[i],t[i]=n}function c(t,e,i){if(n=(t=Float64Array.from(function*(t,e){if(void 0===e)for(let e of t)null!=e&&(e=+e)>=e&&(yield e);else{let i=-1;for(let n of t)null!=(n=e(n,++i,t))&&(n=+n)>=n&&(yield n)}}(t,i))).length){if((e=+e)<=0||n<2)return u(t);if(e>=1)return l(t);var n,s=(n-1)*e,o=Math.floor(s),r=l(function t(e,i,n=0,s=e.length-1,o=a){for(;s>n;){if(s-n>600){const a=s-n+1,r=i-n+1,l=Math.log(a),u=.5*Math.exp(2*l/3),h=.5*Math.sqrt(l*u*(a-u)/a)*(r-a/2<0?-1:1);t(e,i,Math.max(n,Math.floor(i-r*u/a+h)),Math.min(s,Math.floor(i+(a-r)*u/a+h)),o)}const a=e[i];let r=n,l=s;for(h(e,n,i),o(e[s],a)>0&&h(e,n,s);r<l;){for(h(e,r,l),++r,--l;o(e[r],a)<0;)++r;for(;o(e[l],a)>0;)--l}0===o(e[n],a)?h(e,n,l):(++l,h(e,l,s)),l<=i&&(n=l+1),i<=l&&(s=l-1)}return e}(t,o).subarray(0,o+1));return r+(u(t.subarray(o+1))-r)*(s-o)}}o((function(t){return null===t?NaN:+t}));var f={value:()=>{}};function d(){for(var t,e=0,i=arguments.length,n={};e<i;++e){if(!(t=arguments[e]+"")||t in n||/[\s.]/.test(t))throw new Error("illegal type: "+t);n[t]=[]}return new p(n)}function p(t){this._=t}function v(t,e){return t.trim().split(/^|\s+/).map((function(t){var i="",n=t.indexOf(".");if(n>=0&&(i=t.slice(n+1),t=t.slice(0,n)),t&&!e.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:i}}))}function m(t,e){for(var i,n=0,s=t.length;n<s;++n)if((i=t[n]).name===e)return i.value}function w(t,e,i){for(var n=0,s=t.length;n<s;++n)if(t[n].name===e){t[n]=f,t=t.slice(0,n).concat(t.slice(n+1));break}return null!=i&&t.push({name:e,value:i}),t}function y(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t)}return this}p.prototype=d.prototype={constructor:p,on:function(t,e){var i,n=this._,s=v(t+"",n),a=-1,o=s.length;if(!(arguments.length<2)){if(null!=e&&"function"!=typeof e)throw new Error("invalid callback: "+e);for(;++a<o;)if(i=(t=s[a]).type)n[i]=w(n[i],t.name,e);else if(null==e)for(i in n)n[i]=w(n[i],t.name,null);return this}for(;++a<o;)if((i=(t=s[a]).type)&&(i=m(n[i],t.name)))return i},copy:function(){var t={},e=this._;for(var i in e)t[i]=e[i].slice();return new p(t)},call:function(t,e){if((i=arguments.length-2)>0)for(var i,n,s=new Array(i),a=0;a<i;++a)s[a]=arguments[a+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(a=0,i=(n=this._[t]).length;a<i;++a)n[a].value.apply(e,s)},apply:function(t,e,i){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var n=this._[t],s=0,a=n.length;s<a;++s)n[s].value.apply(e,i)}},d("start","end","cancel","interrupt");const g=class{constructor(e){t(this,e),this.variableOptions=["Elevation","MaxTemperature","MinTemperature","Precipitation","Wind","RelativeHumidity","Solar"],this.colorScheme=["#4575b4","#abd9e9","#fee090","#f46d43"],this.timeBy="Month",this.textureDefinitions=['this.textures.lines().orientation("4/8").size(1000)','this.textures.lines().orientation("2/8").size(10)','this.textures.lines().orientation("8/8").size(10)','this.textures.lines().orientation("6/8").size(10)'],this.categorizationMethod="value",this.categorizedValueMap=new Map,this.mapDisplayMonth1="Jan",this.mapDisplayMonth2="Jan"}async connectedCallback(){this.SQL=await s({locateFile:t=>"./assets/sql.js/"+t})}render(){var t;return e(i,null,e("ion-header",null,e("ion-toolbar",{color:"primary"},e("ion-title",null,"Weather Vis"," - "+((null===(t=this.file)||void 0===t?void 0:t.name)||"No File Opened")),e("ion-buttons",{slot:"start"},e("ion-back-button",{defaultHref:"/"})),e("ion-buttons",{slot:"end"},e("ion-button",{title:"Open",onClick:()=>this.fileInputElement.click()},e("ion-icon",{slot:"icon-only",name:"open"}))))),e("ion-content",{class:"ion-padding"},e("ion-item",{disabled:!this.file},e("ion-label",null,"Categorization Method"),e("ion-select",{value:this.categorizationMethod,onIonChange:async({detail:t})=>{this.categorizationMethod=t.value,this.updateData(1),this.updateData(2)}},e("ion-select-option",null,"quantile"),e("ion-select-option",null,"value"))),e("ion-item",{disabled:!this.file},e("ion-label",null,"Variables"),e("ion-select",{multiple:!0,onIonChange:async({detail:t})=>{this.selectedVariables=t.value,this.updateData(1),this.updateData(2)}},this.variableOptions.map(t=>e("ion-select-option",null,t)))),e("ion-item",{disabled:!this.file},e("ion-label",null,"Time By"),e("ion-select",{value:this.timeBy,onIonChange:async({detail:t})=>{this.timeBy=t.value,this.updateData(1),this.updateData(2)}},e("ion-select-option",null,"Day"),e("ion-select-option",null,"Week"),e("ion-select-option",null,"Month"),e("ion-select-option",null,"Quarter "))),e("ion-item",{disabled:!this.file},e("ion-label",null,"Map 1 Display Month"),e("ion-select",{value:this.mapDisplayMonth1,onIonChange:async({detail:t})=>{this.mapDisplayMonth1=t.value,this.updateData(1)}},["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(t=>e("ion-select-option",null,t)))),e("ion-item",{disabled:!this.file},e("ion-label",null,"Map 2 Display Month"),e("ion-select",{value:this.mapDisplayMonth2,onIonChange:async({detail:t})=>{this.mapDisplayMonth2=t.value,this.updateData(2)}},["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(t=>e("ion-select-option",null,t)))),e("div",null,e("s-set-vis",{ref:t=>this.setVisElement=t,"parallel-sets-ribbon-tension":.5,parallelSetsDimensions:[""],parallelSetsMaxSegmentLimit:12,parallelSetsTexutureDefinitions:this.textureDefinitions,parallelSetsColorScheme:this.colorScheme,"dark-mode":JSON.parse(localStorage.getItem("isDarkModeEnabled"))}),e("iframe",{width:"600",height:"600",style:{border:"0"},ref:async t=>{this.mapIframeElement=t;const e=await(await fetch("./assets/map.html")).text();t.contentDocument.querySelector("div#map")||(t.contentDocument.open(),t.contentDocument.write(e),t.contentDocument.close(),window.addEventListener("message",e=>{if(e.source===this.mapIframeElement.contentWindow){const i=e.data;switch(i.type){case"hello":t.contentWindow.postMessage({type:"view center point",info:[0,0]},"*");break;case"select rect":this.updateData(1,i.info)}}}))}})),e("div",null,e("s-set-vis",{ref:t=>this.setVisElement2=t,"parallel-sets-ribbon-tension":.5,parallelSetsDimensions:[""],parallelSetsMaxSegmentLimit:12,parallelSetsTexutureDefinitions:this.textureDefinitions,parallelSetsColorScheme:this.colorScheme,"dark-mode":JSON.parse(localStorage.getItem("isDarkModeEnabled"))}),e("iframe",{width:"600",height:"600",style:{border:"0"},ref:async t=>{this.mapIframeElement2=t;const e=await(await fetch("./assets/map.html")).text();t.contentDocument.querySelector("div#map")||(t.contentDocument.open(),t.contentDocument.write(e),t.contentDocument.close(),window.addEventListener("message",e=>{if(e.source===this.mapIframeElement2.contentWindow){const i=e.data;switch(i.type){case"hello":t.contentWindow.postMessage({type:"view center point",info:[0,0]},"*");break;case"select rect":this.updateData(2,i.info)}}}))}}))),e("input",{id:"file-input",type:"file",ref:t=>this.fileInputElement=t,onInput:async({target:t})=>{var e;this.file=null===(e=t.files)||void 0===e?void 0:e[0];const i=await n.create({message:`Opening ${this.file.name}...`});await i.present();const s=await this.file.arrayBuffer();this.DB=new this.SQL.Database(new Uint8Array(s)),await i.dismiss()}}))}async updateData(t,e){const i=await this.queryData(this.selectedVariables,this.timeBy,e);if(1===t){const t=i.filter(t=>t.Date===this.mapDisplayMonth1).map(t=>({latitude:t.Latitude,longitude:t.Longitude,value:t["_"+this.selectedVariables[0]],secondaryValue:t["_"+this.selectedVariables[1]]})),e=this.categorizedValueMap.get(this.selectedVariables[0]).sort((t,e)=>{if(t.match(/[1-9] ~ [1-9]/))return+t.split(" ~ ")[0]-+e.split(" ~ ")[0]}).reduce((t,e,i)=>(t[e]=this.colorScheme[i],t),{}),n=this.categorizedValueMap.get(this.selectedVariables[1]).sort((t,e)=>{if(t.match(/[1-9] ~ [1-9]/))return+t.split(" ~ ")[0]-+e.split(" ~ ")[0]}).reduce((t,e,i)=>(t[e]=this.textureDefinitions[i],t),{});t.forEach(t=>{t.value=e[t.value],t.secondaryValue=n[t.secondaryValue]}),this.mapIframeElement.contentWindow.postMessage({type:"highlight",info:{data:t,marginLatitude:.312,marginLongitude:.312,legendInnerHTML:`<h4>${this.mapDisplayMonth1}</h4>${Object.entries(e).map(([t,e])=>`<i style="background: ${e}"></i><span>${t}</span><br/>`).join("")}`}},"*"),this.mapIframeElement.contentWindow.postMessage({type:"view center point",info:{location:[(this.datasetInfo.maxLatitude+this.datasetInfo.minLatitude)/2,(this.datasetInfo.maxLongitude+this.datasetInfo.minLongitude)/2],zoom:6}},"*"),this.setVisElement.data=i,this.setVisElement.parallelSetsDimensions=this.selectedVariables.map(t=>"_"+t).concat(["Date"]),this.setVisElement.statisticsPlotGroupDefinitions=this.selectedVariables.map(t=>({dimensionName:t,visType:"box"}))}else if(2===t){const t=i.filter(t=>t.Date===this.mapDisplayMonth2).map(t=>({latitude:t.Latitude,longitude:t.Longitude,value:t["_"+this.selectedVariables[0]],secondaryValue:t["_"+this.selectedVariables[1]]})),e=this.categorizedValueMap.get(this.selectedVariables[0]).reduce((t,e,i)=>(t[e]=this.colorScheme[i],t),{}),n=this.categorizedValueMap.get(this.selectedVariables[1]).reduce((t,e,i)=>(t[e]=this.textureDefinitions[i],t),{});t.forEach(t=>{t.value=e[t.value],t.secondaryValue=n[t.secondaryValue]}),this.mapIframeElement2.contentWindow.postMessage({type:"highlight",info:{data:t,marginLatitude:.312,marginLongitude:.312,legendInnerHTML:`<h4>${this.mapDisplayMonth2}</h4>${Object.entries(e).map(([t,e])=>`<i style="background: ${e}"></i><span>${t}</span><br/>`).join("")}`}},"*"),this.mapIframeElement2.contentWindow.postMessage({type:"view center point",info:{location:[(this.datasetInfo.maxLatitude+this.datasetInfo.minLatitude)/2,(this.datasetInfo.maxLongitude+this.datasetInfo.minLongitude)/2],zoom:6}},"*"),this.setVisElement2.data=i,this.setVisElement2.parallelSetsDimensions=this.selectedVariables.map(t=>"_"+t).concat(["Date"]),this.setVisElement2.statisticsPlotGroupDefinitions=this.selectedVariables.map(t=>({dimensionName:t,visType:"box"}))}}async queryData(t,e,i){var s,o;let h=[];if((null==t?void 0:t.length)>0&&e){const f=await n.create({message:"Qeurying data..."});let d,p;switch(await f.present(),e){case"Day":d="select Date, Latitude, Longitude, "+t.join(", ")+" from weather",i&&(d+=` where Latitude >= ${i.minLat} and Latitude <= ${i.maxLat} and Longitude >= ${i.minLon} and Longitude <= ${i.maxLon}`);break;case"Week":case"Month":case"Quarter":d="select substr(Date, 0, 8) as Date, Latitude, Longitude, "+t.map(t=>`avg(${t}) as ${t}`).join(", ")+" from weather",i&&(d+=` where Latitude >= ${i.minLat} and Latitude <= ${i.maxLat} and Longitude >= ${i.minLon} and Longitude <= ${i.maxLon}`),d+=" group by substr(Date, 0, 8), Latitude, Longitude"}if(p=null===(s=this.DB.exec(d))||void 0===s?void 0:s[0],h=null==p?void 0:p.values.map(t=>{const e={};for(let i=0;i<t.length;i++)e[p.columns[i]]="Date"===p.columns[i]?this.obtainDateString(t[i]):+t[i];return e}),h)if(this.categorizedValueMap=new Map,"quantile"===this.categorizationMethod){const e={};t.forEach(t=>e[t]=function t(){var e,i=[],n=[],s=[];function o(){var t=0,e=Math.max(1,n.length);for(s=new Array(e-1);++t<e;)s[t-1]=c(i,t/e);return l}function l(t){return isNaN(t=+t)?e:n[r(s,t)]}return l.invertExtent=function(t){var e=n.indexOf(t);return e<0?[NaN,NaN]:[e>0?s[e-1]:i[0],e<s.length?s[e]:i[i.length-1]]},l.domain=function(t){if(!arguments.length)return i.slice();i=[];for(let e of t)null==e||isNaN(e=+e)||i.push(e);return i.sort(a),o()},l.range=function(t){return arguments.length?(n=Array.from(t),o()):n.slice()},l.unknown=function(t){return arguments.length?(e=t,l):e},l.quantiles=function(){return s.slice()},l.copy=function(){return t().domain(i).range(n).unknown(e)},y.apply(l,arguments)}().domain(h.map(e=>e[t])).range([.25,.5,.75,1])),t.forEach(t=>{const i=e[t].quantiles(),n=h.map(e=>e[t]),s=u(n),a=l(n);this.categorizedValueMap.set(t,[`${s.toFixed(2)} ~ ${(+i[0]).toFixed(2)}`,`${(+i[0]).toFixed(2)} ~ ${(+i[1]).toFixed(2)}`,`${(+i[1]).toFixed(2)} ~ ${(+i[2]).toFixed(2)}`,`${(+i[2]).toFixed(2)} ~ ${a.toFixed(2)}`])});const i=(t,e)=>{switch(e){case.25:return this.categorizedValueMap.get(t)[0];case.5:return this.categorizedValueMap.get(t)[1];case.75:return this.categorizedValueMap.get(t)[2];case 1:return this.categorizedValueMap.get(t)[3]}};h.forEach(n=>t.forEach(t=>n["_"+t]=i(t,e[t](n[t])))),t.forEach(t=>{this.categorizedValueMap.set(t,this.categorizedValueMap.get(t).filter(e=>h.filter(i=>i["_"+t]===e).length>0))})}else if("value"===this.categorizationMethod){const e={},i={};t.forEach(t=>{const n=h.map(e=>e[t]),s=u(n),a=l(n),o=[s,s+.25*(a-s),s+.5*(a-s),s+.75*(a-s),a];i[t]=o.map(t=>t.toFixed(2)),e[t]=function t(){var e,i=[.5],n=[0,1],s=1;function a(t){return t<=t?n[r(i,t,0,s)]:e}return a.domain=function(t){return arguments.length?(i=Array.from(t),s=Math.min(i.length,n.length-1),a):i.slice()},a.range=function(t){return arguments.length?(n=Array.from(t),s=Math.min(i.length,n.length-1),a):n.slice()},a.invertExtent=function(t){var e=n.indexOf(t);return[i[e-1],i[e]]},a.unknown=function(t){return arguments.length?(e=t,a):e},a.copy=function(){return t().domain(i).range(n).unknown(e)},y.apply(a,arguments)}().domain(o).range([0,1,2,3]),this.categorizedValueMap.set(t,[`${o[0].toFixed(2)} ~ ${o[1].toFixed(2)}`,`${o[1].toFixed(2)} ~ ${o[2].toFixed(2)}`,`${o[2].toFixed(2)} ~ ${o[3].toFixed(2)}`,`${o[3].toFixed(2)} ~ ${o[4].toFixed(2)}`])}),h.forEach(i=>t.forEach(t=>i["_"+t]=this.categorizedValueMap.get(t)[e[t](i[t])])),t.forEach(t=>{this.categorizedValueMap.set(t,this.categorizedValueMap.get(t).filter(e=>h.filter(i=>i["_"+t]===e).length>0))})}i||(d="select min(Latitude) as minLatitude, max(Latitude) as maxLatitude, count(distinct Latitude) as latitudeCount, min(Longitude) as minLongitude, max(Longitude) as maxLongitude, count(distinct Longitude) as longitudeCount from weather",p=null===(o=this.DB.exec(d))||void 0===o?void 0:o[0],this.datasetInfo=p.values.map(t=>{const e={};for(let i=0;i<t.length;i++)e[p.columns[i]]=+t[i];return e})[0]),await f.dismiss()}return h}obtainDateString(t){switch(t.substring(5)){case"01":return"Jan";case"02":return"Feb";case"03":return"Mar";case"04":return"Apr";case"05":return"May";case"06":return"Jun";case"07":return"Jul";case"08":return"Aug";case"09":return"Sep";case"10":return"Oct";case"11":return"Nov";case"12":return"Dec"}}};g.style=".sc-app-weather-vis-h{display:block}#file-input.sc-app-weather-vis{display:none}s-set-vis.sc-app-weather-vis{height:600px;width:calc(100% - 650px);display:inline-flex}iframe.sc-app-weather-vis{display:inline-block}";export{g as app_weather_vis}