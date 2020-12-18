function n(n,t){return n<t?-1:n>t?1:n>=t?0:NaN}var t,r,i=(1===(t=n).length&&(r=t,t=function(t,i){return n(r(t),i)}),{left:function(n,r,i,e){for(null==i&&(i=0),null==e&&(e=n.length);i<e;){var u=i+e>>>1;t(n[u],r)<0?i=u+1:e=u}return i},right:function(n,r,i,e){for(null==i&&(i=0),null==e&&(e=n.length);i<e;){var u=i+e>>>1;t(n[u],r)>0?e=u:i=u+1}return i}}).right;function e(n){return null===n?NaN:+n}function u(n,t,r){if(null==r&&(r=e),i=n.length){if((t=+t)<=0||i<2)return+r(n[0],0,n);if(t>=1)return+r(n[i-1],i-1,n);var i,u=(i-1)*t,o=Math.floor(u),f=+r(n[o],o,n);return f+(+r(n[o+1],o+1,n)-f)*(u-o)}}var o={value:function(){}};function f(){for(var n,t=0,r=arguments.length,i={};t<r;++t){if(!(n=arguments[t]+"")||n in i||/[\s.]/.test(n))throw new Error("illegal type: "+n);i[n]=[]}return new s(i)}function s(n){this._=n}function a(n,t){return n.trim().split(/^|\s+/).map((function(n){var r="",i=n.indexOf(".");if(i>=0&&(r=n.slice(i+1),n=n.slice(0,i)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:r}}))}function c(n,t){for(var r,i=0,e=n.length;i<e;++i)if((r=n[i]).name===t)return r.value}function h(n,t,r){for(var i=0,e=n.length;i<e;++i)if(n[i].name===t){n[i]=o,n=n.slice(0,i).concat(n.slice(i+1));break}return null!=r&&n.push({name:t,value:r}),n}s.prototype=f.prototype={constructor:s,on:function(n,t){var r,i=this._,e=a(n+"",i),u=-1,o=e.length;if(!(arguments.length<2)){if(null!=t&&"function"!=typeof t)throw new Error("invalid callback: "+t);for(;++u<o;)if(r=(n=e[u]).type)i[r]=h(i[r],n.name,t);else if(null==t)for(r in i)i[r]=h(i[r],n.name,null);return this}for(;++u<o;)if((r=(n=e[u]).type)&&(r=c(i[r],n.name)))return r},copy:function(){var n={},t=this._;for(var r in t)n[r]=t[r].slice();return new s(n)},call:function(n,t){if((r=arguments.length-2)>0)for(var r,i,e=new Array(r),u=0;u<r;++u)e[u]=arguments[u+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(u=0,r=(i=this._[n]).length;u<r;++u)i[u].value.apply(t,e)},apply:function(n,t,r){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var i=this._[n],e=0,u=i.length;e<u;++e)i[e].value.apply(t,r)}};var l="http://www.w3.org/1999/xhtml";const v={svg:"http://www.w3.org/2000/svg",xhtml:l,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function w(n){var t=n+="",r=t.indexOf(":");return r>=0&&"xmlns"!==(t=n.slice(0,r))&&(n=n.slice(r+1)),v.hasOwnProperty(t)?{space:v[t],local:n}:n}function d(n){return function(){var t=this.ownerDocument,r=this.namespaceURI;return r===l&&t.documentElement.namespaceURI===l?t.createElement(n):t.createElementNS(r,n)}}function y(n){return function(){return this.ownerDocument.createElementNS(n.space,n.local)}}function p(n){var t=w(n);return(t.local?y:d)(t)}function g(){}function m(n){return null==n?g:function(){return this.querySelector(n)}}function b(){return[]}function k(n){return null==n?b:function(){return this.querySelectorAll(n)}}function x(n){return function(){return this.matches(n)}}function N(n){return new Array(n.length)}function M(n,t){this.ownerDocument=n.ownerDocument,this.namespaceURI=n.namespaceURI,this._next=null,this._parent=n,this.__data__=t}function A(n,t,r,i,e,u){for(var o,f=0,s=t.length,a=u.length;f<a;++f)(o=t[f])?(o.__data__=u[f],i[f]=o):r[f]=new M(n,u[f]);for(;f<s;++f)(o=t[f])&&(e[f]=o)}function E(n,t,r,i,e,u,o){var f,s,a,c={},h=t.length,l=u.length,v=new Array(h);for(f=0;f<h;++f)(s=t[f])&&(v[f]=a="$"+o.call(s,s.__data__,f,t),a in c?e[f]=s:c[a]=s);for(f=0;f<l;++f)(s=c[a="$"+o.call(n,u[f],f,u)])?(i[f]=s,s.__data__=u[f],c[a]=null):r[f]=new M(n,u[f]);for(f=0;f<h;++f)(s=t[f])&&c[v[f]]===s&&(e[f]=s)}function $(n,t){return n<t?-1:n>t?1:n>=t?0:NaN}function _(n){return function(){this.removeAttribute(n)}}function q(n){return function(){this.removeAttributeNS(n.space,n.local)}}function R(n,t){return function(){this.setAttribute(n,t)}}function X(n,t){return function(){this.setAttributeNS(n.space,n.local,t)}}function T(n,t){return function(){var r=t.apply(this,arguments);null==r?this.removeAttribute(n):this.setAttribute(n,r)}}function j(n,t){return function(){var r=t.apply(this,arguments);null==r?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,r)}}function S(n){return n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView}function z(n){return function(){this.style.removeProperty(n)}}function H(n,t,r){return function(){this.style.setProperty(n,t,r)}}function I(n,t,r){return function(){var i=t.apply(this,arguments);null==i?this.style.removeProperty(n):this.style.setProperty(n,i,r)}}function Y(n,t){return n.style.getPropertyValue(t)||S(n).getComputedStyle(n,null).getPropertyValue(t)}function D(n){return function(){delete this[n]}}function O(n,t){return function(){this[n]=t}}function B(n,t){return function(){var r=t.apply(this,arguments);null==r?delete this[n]:this[n]=r}}function C(n){return n.trim().split(/^|\s+/)}function L(n){return n.classList||new P(n)}function P(n){this._node=n,this._names=C(n.getAttribute("class")||"")}function V(n,t){for(var r=L(n),i=-1,e=t.length;++i<e;)r.add(t[i])}function F(n,t){for(var r=L(n),i=-1,e=t.length;++i<e;)r.remove(t[i])}function G(n){return function(){V(this,n)}}function J(n){return function(){F(this,n)}}function K(n,t){return function(){(t.apply(this,arguments)?V:F)(this,n)}}function Q(){this.textContent=""}function U(n){return function(){this.textContent=n}}function W(n){return function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}}function Z(){this.innerHTML=""}function nn(n){return function(){this.innerHTML=n}}function tn(n){return function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}}function rn(){this.nextSibling&&this.parentNode.appendChild(this)}function en(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function un(){return null}function on(){var n=this.parentNode;n&&n.removeChild(this)}function fn(){var n=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function sn(){var n=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}M.prototype={constructor:M,appendChild:function(n){return this._parent.insertBefore(n,this._next)},insertBefore:function(n,t){return this._parent.insertBefore(n,t)},querySelector:function(n){return this._parent.querySelector(n)},querySelectorAll:function(n){return this._parent.querySelectorAll(n)}},P.prototype={add:function(n){this._names.indexOf(n)<0&&(this._names.push(n),this._node.setAttribute("class",this._names.join(" ")))},remove:function(n){var t=this._names.indexOf(n);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(n){return this._names.indexOf(n)>=0}};var an={};function cn(n,t,r){return n=hn(n,t,r),function(t){var r=t.relatedTarget;r&&(r===this||8&r.compareDocumentPosition(this))||n.call(this,t)}}function hn(n,t,r){return function(){try{n.call(this,this.__data__,t,r)}finally{}}}function ln(n){return n.trim().split(/^|\s+/).map((function(n){var t="",r=n.indexOf(".");return r>=0&&(t=n.slice(r+1),n=n.slice(0,r)),{type:n,name:t}}))}function vn(n){return function(){var t=this.__on;if(t){for(var r,i=0,e=-1,u=t.length;i<u;++i)r=t[i],n.type&&r.type!==n.type||r.name!==n.name?t[++e]=r:this.removeEventListener(r.type,r.listener,r.capture);++e?t.length=e:delete this.__on}}}function wn(n,t,r){var i=an.hasOwnProperty(n.type)?cn:hn;return function(e,u,o){var f,s=this.__on,a=i(t,u,o);if(s)for(var c=0,h=s.length;c<h;++c)if((f=s[c]).type===n.type&&f.name===n.name)return this.removeEventListener(f.type,f.listener,f.capture),this.addEventListener(f.type,f.listener=a,f.capture=r),void(f.value=t);this.addEventListener(n.type,a,r),f={type:n.type,name:n.name,value:t,listener:a,capture:r},s?s.push(f):this.__on=[f]}}function dn(n,t,r){var i=S(n),e=i.CustomEvent;"function"==typeof e?e=new e(t,r):(e=i.document.createEvent("Event"),r?(e.initEvent(t,r.bubbles,r.cancelable),e.detail=r.detail):e.initEvent(t,!1,!1)),n.dispatchEvent(e)}function yn(n,t){return function(){return dn(this,n,t)}}function pn(n,t){return function(){return dn(this,n,t.apply(this,arguments))}}"undefined"!=typeof document&&("onmouseenter"in document.documentElement||(an={mouseenter:"mouseover",mouseleave:"mouseout"}));var gn=[null];function mn(n,t){this._groups=n,this._parents=t}function bn(){return new mn([[document.documentElement]],gn)}function kn(n,t,r){n.prototype=t.prototype=r,r.constructor=n}function xn(n,t){var r=Object.create(n.prototype);for(var i in t)r[i]=t[i];return r}function Nn(){}mn.prototype=bn.prototype={constructor:mn,select:function(n){"function"!=typeof n&&(n=m(n));for(var t=this._groups,r=t.length,i=new Array(r),e=0;e<r;++e)for(var u,o,f=t[e],s=f.length,a=i[e]=new Array(s),c=0;c<s;++c)(u=f[c])&&(o=n.call(u,u.__data__,c,f))&&("__data__"in u&&(o.__data__=u.__data__),a[c]=o);return new mn(i,this._parents)},selectAll:function(n){"function"!=typeof n&&(n=k(n));for(var t=this._groups,r=t.length,i=[],e=[],u=0;u<r;++u)for(var o,f=t[u],s=f.length,a=0;a<s;++a)(o=f[a])&&(i.push(n.call(o,o.__data__,a,f)),e.push(o));return new mn(i,e)},filter:function(n){"function"!=typeof n&&(n=x(n));for(var t=this._groups,r=t.length,i=new Array(r),e=0;e<r;++e)for(var u,o=t[e],f=o.length,s=i[e]=[],a=0;a<f;++a)(u=o[a])&&n.call(u,u.__data__,a,o)&&s.push(u);return new mn(i,this._parents)},data:function(n,t){if(!n)return w=new Array(this.size()),c=-1,this.each((function(n){w[++c]=n})),w;var r,i=t?E:A,e=this._parents,u=this._groups;"function"!=typeof n&&(r=n,n=function(){return r});for(var o=u.length,f=new Array(o),s=new Array(o),a=new Array(o),c=0;c<o;++c){var h=e[c],l=u[c],v=l.length,w=n.call(h,h&&h.__data__,c,e),d=w.length,y=s[c]=new Array(d),p=f[c]=new Array(d);i(h,l,y,p,a[c]=new Array(v),w,t);for(var g,m,b=0,k=0;b<d;++b)if(g=y[b]){for(b>=k&&(k=b+1);!(m=p[k])&&++k<d;);g._next=m||null}}return(f=new mn(f,e))._enter=s,f._exit=a,f},enter:function(){return new mn(this._enter||this._groups.map(N),this._parents)},exit:function(){return new mn(this._exit||this._groups.map(N),this._parents)},join:function(n,t,r){var i=this.enter(),e=this,u=this.exit();return i="function"==typeof n?n(i):i.append(n+""),null!=t&&(e=t(e)),null==r?u.remove():r(u),i&&e?i.merge(e).order():e},merge:function(n){for(var t=this._groups,r=n._groups,i=t.length,e=Math.min(i,r.length),u=new Array(i),o=0;o<e;++o)for(var f,s=t[o],a=r[o],c=s.length,h=u[o]=new Array(c),l=0;l<c;++l)(f=s[l]||a[l])&&(h[l]=f);for(;o<i;++o)u[o]=t[o];return new mn(u,this._parents)},order:function(){for(var n=this._groups,t=-1,r=n.length;++t<r;)for(var i,e=n[t],u=e.length-1,o=e[u];--u>=0;)(i=e[u])&&(o&&4^i.compareDocumentPosition(o)&&o.parentNode.insertBefore(i,o),o=i);return this},sort:function(n){function t(t,r){return t&&r?n(t.__data__,r.__data__):!t-!r}n||(n=$);for(var r=this._groups,i=r.length,e=new Array(i),u=0;u<i;++u){for(var o,f=r[u],s=f.length,a=e[u]=new Array(s),c=0;c<s;++c)(o=f[c])&&(a[c]=o);a.sort(t)}return new mn(e,this._parents).order()},call:function(){var n=arguments[0];return arguments[0]=this,n.apply(null,arguments),this},nodes:function(){var n=new Array(this.size()),t=-1;return this.each((function(){n[++t]=this})),n},node:function(){for(var n=this._groups,t=0,r=n.length;t<r;++t)for(var i=n[t],e=0,u=i.length;e<u;++e){var o=i[e];if(o)return o}return null},size:function(){var n=0;return this.each((function(){++n})),n},empty:function(){return!this.node()},each:function(n){for(var t=this._groups,r=0,i=t.length;r<i;++r)for(var e,u=t[r],o=0,f=u.length;o<f;++o)(e=u[o])&&n.call(e,e.__data__,o,u);return this},attr:function(n,t){var r=w(n);if(arguments.length<2){var i=this.node();return r.local?i.getAttributeNS(r.space,r.local):i.getAttribute(r)}return this.each((null==t?r.local?q:_:"function"==typeof t?r.local?j:T:r.local?X:R)(r,t))},style:function(n,t,r){return arguments.length>1?this.each((null==t?z:"function"==typeof t?I:H)(n,t,null==r?"":r)):Y(this.node(),n)},property:function(n,t){return arguments.length>1?this.each((null==t?D:"function"==typeof t?B:O)(n,t)):this.node()[n]},classed:function(n,t){var r=C(n+"");if(arguments.length<2){for(var i=L(this.node()),e=-1,u=r.length;++e<u;)if(!i.contains(r[e]))return!1;return!0}return this.each(("function"==typeof t?K:t?G:J)(r,t))},text:function(n){return arguments.length?this.each(null==n?Q:("function"==typeof n?W:U)(n)):this.node().textContent},html:function(n){return arguments.length?this.each(null==n?Z:("function"==typeof n?tn:nn)(n)):this.node().innerHTML},raise:function(){return this.each(rn)},lower:function(){return this.each(en)},append:function(n){var t="function"==typeof n?n:p(n);return this.select((function(){return this.appendChild(t.apply(this,arguments))}))},insert:function(n,t){var r="function"==typeof n?n:p(n),i=null==t?un:"function"==typeof t?t:m(t);return this.select((function(){return this.insertBefore(r.apply(this,arguments),i.apply(this,arguments)||null)}))},remove:function(){return this.each(on)},clone:function(n){return this.select(n?sn:fn)},datum:function(n){return arguments.length?this.property("__data__",n):this.node().__data__},on:function(n,t,r){var i,e,u=ln(n+""),o=u.length;if(!(arguments.length<2)){for(f=t?wn:vn,null==r&&(r=!1),i=0;i<o;++i)this.each(f(u[i],t,r));return this}var f=this.node().__on;if(f)for(var s,a=0,c=f.length;a<c;++a)for(i=0,s=f[a];i<o;++i)if((e=u[i]).type===s.type&&e.name===s.name)return s.value},dispatch:function(n,t){return this.each(("function"==typeof t?pn:yn)(n,t))}};var Mn=1/.7,An="\\s*([+-]?\\d+)\\s*",En="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",$n="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",_n=/^#([0-9a-f]{3,8})$/,qn=new RegExp("^rgb\\("+[An,An,An]+"\\)$"),Rn=new RegExp("^rgb\\("+[$n,$n,$n]+"\\)$"),Xn=new RegExp("^rgba\\("+[An,An,An,En]+"\\)$"),Tn=new RegExp("^rgba\\("+[$n,$n,$n,En]+"\\)$"),jn=new RegExp("^hsl\\("+[En,$n,$n]+"\\)$"),Sn=new RegExp("^hsla\\("+[En,$n,$n,En]+"\\)$"),zn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function Hn(){return this.rgb().formatHex()}function In(){return this.rgb().formatRgb()}function Yn(n){var t,r;return n=(n+"").trim().toLowerCase(),(t=_n.exec(n))?(r=t[1].length,t=parseInt(t[1],16),6===r?Dn(t):3===r?new Ln(t>>8&15|t>>4&240,t>>4&15|240&t,(15&t)<<4|15&t,1):8===r?On(t>>24&255,t>>16&255,t>>8&255,(255&t)/255):4===r?On(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|240&t,((15&t)<<4|15&t)/255):null):(t=qn.exec(n))?new Ln(t[1],t[2],t[3],1):(t=Rn.exec(n))?new Ln(255*t[1]/100,255*t[2]/100,255*t[3]/100,1):(t=Xn.exec(n))?On(t[1],t[2],t[3],t[4]):(t=Tn.exec(n))?On(255*t[1]/100,255*t[2]/100,255*t[3]/100,t[4]):(t=jn.exec(n))?Gn(t[1],t[2]/100,t[3]/100,1):(t=Sn.exec(n))?Gn(t[1],t[2]/100,t[3]/100,t[4]):zn.hasOwnProperty(n)?Dn(zn[n]):"transparent"===n?new Ln(NaN,NaN,NaN,0):null}function Dn(n){return new Ln(n>>16&255,n>>8&255,255&n,1)}function On(n,t,r,i){return i<=0&&(n=t=r=NaN),new Ln(n,t,r,i)}function Bn(n){return n instanceof Nn||(n=Yn(n)),n?new Ln((n=n.rgb()).r,n.g,n.b,n.opacity):new Ln}function Cn(n,t,r,i){return 1===arguments.length?Bn(n):new Ln(n,t,r,null==i?1:i)}function Ln(n,t,r,i){this.r=+n,this.g=+t,this.b=+r,this.opacity=+i}function Pn(){return"#"+Fn(this.r)+Fn(this.g)+Fn(this.b)}function Vn(){var n=this.opacity;return(1===(n=isNaN(n)?1:Math.max(0,Math.min(1,n)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===n?")":", "+n+")")}function Fn(n){return((n=Math.max(0,Math.min(255,Math.round(n)||0)))<16?"0":"")+n.toString(16)}function Gn(n,t,r,i){return i<=0?n=t=r=NaN:r<=0||r>=1?n=t=NaN:t<=0&&(n=NaN),new Kn(n,t,r,i)}function Jn(n){if(n instanceof Kn)return new Kn(n.h,n.s,n.l,n.opacity);if(n instanceof Nn||(n=Yn(n)),!n)return new Kn;if(n instanceof Kn)return n;var t=(n=n.rgb()).r/255,r=n.g/255,i=n.b/255,e=Math.min(t,r,i),u=Math.max(t,r,i),o=NaN,f=u-e,s=(u+e)/2;return f?(o=t===u?(r-i)/f+6*(r<i):r===u?(i-t)/f+2:(t-r)/f+4,f/=s<.5?u+e:2-u-e,o*=60):f=s>0&&s<1?0:o,new Kn(o,f,s,n.opacity)}function Kn(n,t,r,i){this.h=+n,this.s=+t,this.l=+r,this.opacity=+i}function Qn(n,t,r){return 255*(n<60?t+(r-t)*n/60:n<180?r:n<240?t+(r-t)*(240-n)/60:t)}function Un(n){return function(){return n}}function Wn(n,t){var r=t-n;return r?function(n,t){return function(r){return n+r*t}}(n,r):Un(isNaN(n)?t:n)}kn(Nn,Yn,{copy:function(n){return Object.assign(new this.constructor,this,n)},displayable:function(){return this.rgb().displayable()},hex:Hn,formatHex:Hn,formatHsl:function(){return Jn(this).formatHsl()},formatRgb:In,toString:In}),kn(Ln,Cn,xn(Nn,{brighter:function(n){return n=null==n?Mn:Math.pow(Mn,n),new Ln(this.r*n,this.g*n,this.b*n,this.opacity)},darker:function(n){return n=null==n?.7:Math.pow(.7,n),new Ln(this.r*n,this.g*n,this.b*n,this.opacity)},rgb:function(){return this},displayable:function(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Pn,formatHex:Pn,formatRgb:Vn,toString:Vn})),kn(Kn,(function(n,t,r,i){return 1===arguments.length?Jn(n):new Kn(n,t,r,null==i?1:i)}),xn(Nn,{brighter:function(n){return n=null==n?Mn:Math.pow(Mn,n),new Kn(this.h,this.s,this.l*n,this.opacity)},darker:function(n){return n=null==n?.7:Math.pow(.7,n),new Kn(this.h,this.s,this.l*n,this.opacity)},rgb:function(){var n=this.h%360+360*(this.h<0),t=isNaN(n)||isNaN(this.s)?0:this.s,r=this.l,i=r+(r<.5?r:1-r)*t,e=2*r-i;return new Ln(Qn(n>=240?n-240:n+120,e,i),Qn(n,e,i),Qn(n<120?n+240:n-120,e,i),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl:function(){var n=this.opacity;return(1===(n=isNaN(n)?1:Math.max(0,Math.min(1,n)))?"hsl(":"hsla(")+(this.h||0)+", "+100*(this.s||0)+"%, "+100*(this.l||0)+"%"+(1===n?")":", "+n+")")}}));const Zn=function n(t){var r=function(n){return 1==(n=+n)?Wn:function(t,r){return r-t?function(n,t,r){return n=Math.pow(n,r),t=Math.pow(t,r)-n,r=1/r,function(i){return Math.pow(n+i*t,r)}}(t,r,n):Un(isNaN(t)?r:t)}}(t);function i(n,t){var i=r((n=Cn(n)).r,(t=Cn(t)).r),e=r(n.g,t.g),u=r(n.b,t.b),o=Wn(n.opacity,t.opacity);return function(t){return n.r=i(t),n.g=e(t),n.b=u(t),n.opacity=o(t),n+""}}return i.gamma=n,i}(1);function nt(n,t){return n=+n,t=+t,function(r){return n*(1-r)+t*r}}var tt=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,rt=new RegExp(tt.source,"g");function it(n,t){var r,i,e,u=tt.lastIndex=rt.lastIndex=0,o=-1,f=[],s=[];for(n+="",t+="";(r=tt.exec(n))&&(i=rt.exec(t));)(e=i.index)>u&&(e=t.slice(u,e),f[o]?f[o]+=e:f[++o]=e),(r=r[0])===(i=i[0])?f[o]?f[o]+=i:f[++o]=i:(f[++o]=null,s.push({i:o,x:nt(r,i)})),u=rt.lastIndex;return u<t.length&&(e=t.slice(u),f[o]?f[o]+=e:f[++o]=e),f.length<2?s[0]?function(n){return function(t){return n(t)+""}}(s[0].x):function(n){return function(){return n}}(t):(t=s.length,function(n){for(var r,i=0;i<t;++i)f[(r=s[i]).i]=r.x(n);return f.join("")})}var et,ut,ot,ft,st=180/Math.PI,at={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function ct(n,t,r,i,e,u){var o,f,s;return(o=Math.sqrt(n*n+t*t))&&(n/=o,t/=o),(s=n*r+t*i)&&(r-=n*s,i-=t*s),(f=Math.sqrt(r*r+i*i))&&(r/=f,i/=f,s/=f),n*i<t*r&&(n=-n,t=-t,s=-s,o=-o),{translateX:e,translateY:u,rotate:Math.atan2(t,n)*st,skewX:Math.atan(s)*st,scaleX:o,scaleY:f}}function ht(n,t,r,i){function e(n){return n.length?n.pop()+" ":""}return function(u,o){var f=[],s=[];return u=n(u),o=n(o),function(n,i,e,u,o,f){if(n!==e||i!==u){var s=o.push("translate(",null,t,null,r);f.push({i:s-4,x:nt(n,e)},{i:s-2,x:nt(i,u)})}else(e||u)&&o.push("translate("+e+t+u+r)}(u.translateX,u.translateY,o.translateX,o.translateY,f,s),function(n,t,r,u){n!==t?(n-t>180?t+=360:t-n>180&&(n+=360),u.push({i:r.push(e(r)+"rotate(",null,i)-2,x:nt(n,t)})):t&&r.push(e(r)+"rotate("+t+i)}(u.rotate,o.rotate,f,s),function(n,t,r,u){n!==t?u.push({i:r.push(e(r)+"skewX(",null,i)-2,x:nt(n,t)}):t&&r.push(e(r)+"skewX("+t+i)}(u.skewX,o.skewX,f,s),function(n,t,r,i,u,o){if(n!==r||t!==i){var f=u.push(e(u)+"scale(",null,",",null,")");o.push({i:f-4,x:nt(n,r)},{i:f-2,x:nt(t,i)})}else 1===r&&1===i||u.push(e(u)+"scale("+r+","+i+")")}(u.scaleX,u.scaleY,o.scaleX,o.scaleY,f,s),u=o=null,function(n){for(var t,r=-1,i=s.length;++r<i;)f[(t=s[r]).i]=t.x(n);return f.join("")}}}var lt,vt,wt=ht((function(n){return"none"===n?at:(et||(et=document.createElement("DIV"),ut=document.documentElement,ot=document.defaultView),et.style.transform=n,n=ot.getComputedStyle(ut.appendChild(et),null).getPropertyValue("transform"),ut.removeChild(et),ct(+(n=n.slice(7,-1).split(","))[0],+n[1],+n[2],+n[3],+n[4],+n[5]))}),"px, ","px)","deg)"),dt=ht((function(n){return null==n?at:(ft||(ft=document.createElementNS("http://www.w3.org/2000/svg","g")),ft.setAttribute("transform",n),(n=ft.transform.baseVal.consolidate())?ct((n=n.matrix).a,n.b,n.c,n.d,n.e,n.f):at)}),", ",")",")"),yt=0,pt=0,gt=0,mt=0,bt=0,kt=0,xt="object"==typeof performance&&performance.now?performance:Date,Nt="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function Mt(){return bt||(Nt(At),bt=xt.now()+kt)}function At(){bt=0}function Et(){this._call=this._time=this._next=null}function $t(n,t,r){var i=new Et;return i.restart(n,t,r),i}function _t(){bt=(mt=xt.now())+kt,yt=pt=0;try{!function(){Mt(),++yt;for(var n,t=lt;t;)(n=bt-t._time)>=0&&t._call.call(null,n),t=t._next;--yt}()}finally{yt=0,function(){for(var n,t,r=lt,i=1/0;r;)r._call?(i>r._time&&(i=r._time),n=r,r=r._next):(t=r._next,r._next=null,r=n?n._next=t:lt=t);vt=n,Rt(i)}(),bt=0}}function qt(){var n=xt.now(),t=n-mt;t>1e3&&(kt-=t,mt=n)}function Rt(n){yt||(pt&&(pt=clearTimeout(pt)),n-bt>24?(n<1/0&&(pt=setTimeout(_t,n-xt.now()-kt)),gt&&(gt=clearInterval(gt))):(gt||(mt=xt.now(),gt=setInterval(qt,1e3)),yt=1,Nt(_t)))}function Xt(n,t,r){var i=new Et;return i.restart((function(r){i.stop(),n(r+t)}),t=null==t?0:+t,r),i}Et.prototype=$t.prototype={constructor:Et,restart:function(n,t,r){if("function"!=typeof n)throw new TypeError("callback is not a function");r=(null==r?Mt():+r)+(null==t?0:+t),this._next||vt===this||(vt?vt._next=this:lt=this,vt=this),this._call=n,this._time=r,Rt()},stop:function(){this._call&&(this._call=null,this._time=1/0,Rt())}};var Tt=f("start","end","cancel","interrupt"),jt=[];function St(n,t,r,i,e,u){var o=n.__transition;if(o){if(r in o)return}else n.__transition={};!function(n,t,r){var i,e=n.__transition;function u(s){var a,c,h,l;if(1!==r.state)return f();for(a in e)if((l=e[a]).name===r.name){if(3===l.state)return Xt(u);4===l.state?(l.state=6,l.timer.stop(),l.on.call("interrupt",n,n.__data__,l.index,l.group),delete e[a]):+a<t&&(l.state=6,l.timer.stop(),l.on.call("cancel",n,n.__data__,l.index,l.group),delete e[a])}if(Xt((function(){3===r.state&&(r.state=4,r.timer.restart(o,r.delay,r.time),o(s))})),r.state=2,r.on.call("start",n,n.__data__,r.index,r.group),2===r.state){for(r.state=3,i=new Array(h=r.tween.length),a=0,c=-1;a<h;++a)(l=r.tween[a].value.call(n,n.__data__,r.index,r.group))&&(i[++c]=l);i.length=c+1}}function o(t){for(var e=t<r.duration?r.ease.call(null,t/r.duration):(r.timer.restart(f),r.state=5,1),u=-1,o=i.length;++u<o;)i[u].call(n,e);5===r.state&&(r.on.call("end",n,n.__data__,r.index,r.group),f())}function f(){for(var i in r.state=6,r.timer.stop(),delete e[t],e)return;delete n.__transition}e[t]=r,r.timer=$t((function(n){r.state=1,r.timer.restart(u,r.delay,r.time),r.delay<=n&&u(n-r.delay)}),0,r.time)}(n,r,{name:t,index:i,group:e,on:Tt,tween:jt,time:u.time,delay:u.delay,duration:u.duration,ease:u.ease,timer:null,state:0})}function zt(n,t){var r=It(n,t);if(r.state>0)throw new Error("too late; already scheduled");return r}function Ht(n,t){var r=It(n,t);if(r.state>3)throw new Error("too late; already running");return r}function It(n,t){var r=n.__transition;if(!r||!(r=r[t]))throw new Error("transition not found");return r}function Yt(n,t){var r,i;return function(){var e=Ht(this,n),u=e.tween;if(u!==r)for(var o=0,f=(i=r=u).length;o<f;++o)if(i[o].name===t){(i=i.slice()).splice(o,1);break}e.tween=i}}function Dt(n,t,r){var i,e;if("function"!=typeof r)throw new Error;return function(){var u=Ht(this,n),o=u.tween;if(o!==i){e=(i=o).slice();for(var f={name:t,value:r},s=0,a=e.length;s<a;++s)if(e[s].name===t){e[s]=f;break}s===a&&e.push(f)}u.tween=e}}function Ot(n,t,r){var i=n._id;return n.each((function(){var n=Ht(this,i);(n.value||(n.value={}))[t]=r.apply(this,arguments)})),function(n){return It(n,i).value[t]}}function Bt(n,t){var r;return("number"==typeof t?nt:t instanceof Yn?Zn:(r=Yn(t))?(t=r,Zn):it)(n,t)}function Ct(n){return function(){this.removeAttribute(n)}}function Lt(n){return function(){this.removeAttributeNS(n.space,n.local)}}function Pt(n,t,r){var i,e,u=r+"";return function(){var o=this.getAttribute(n);return o===u?null:o===i?e:e=t(i=o,r)}}function Vt(n,t,r){var i,e,u=r+"";return function(){var o=this.getAttributeNS(n.space,n.local);return o===u?null:o===i?e:e=t(i=o,r)}}function Ft(n,t,r){var i,e,u;return function(){var o,f,s=r(this);if(null!=s)return(o=this.getAttribute(n))===(f=s+"")?null:o===i&&f===e?u:(e=f,u=t(i=o,s));this.removeAttribute(n)}}function Gt(n,t,r){var i,e,u;return function(){var o,f,s=r(this);if(null!=s)return(o=this.getAttributeNS(n.space,n.local))===(f=s+"")?null:o===i&&f===e?u:(e=f,u=t(i=o,s));this.removeAttributeNS(n.space,n.local)}}function Jt(n,t){return function(r){this.setAttribute(n,t.call(this,r))}}function Kt(n,t){return function(r){this.setAttributeNS(n.space,n.local,t.call(this,r))}}function Qt(n,t){var r,i;function e(){var e=t.apply(this,arguments);return e!==i&&(r=(i=e)&&Kt(n,e)),r}return e._value=t,e}function Ut(n,t){var r,i;function e(){var e=t.apply(this,arguments);return e!==i&&(r=(i=e)&&Jt(n,e)),r}return e._value=t,e}function Wt(n,t){return function(){zt(this,n).delay=+t.apply(this,arguments)}}function Zt(n,t){return t=+t,function(){zt(this,n).delay=t}}function nr(n,t){return function(){Ht(this,n).duration=+t.apply(this,arguments)}}function tr(n,t){return t=+t,function(){Ht(this,n).duration=t}}function rr(n,t){if("function"!=typeof t)throw new Error;return function(){Ht(this,n).ease=t}}function ir(n,t,r){var i,e,u=function(n){return(n+"").trim().split(/^|\s+/).every((function(n){var t=n.indexOf(".");return t>=0&&(n=n.slice(0,t)),!n||"start"===n}))}(t)?zt:Ht;return function(){var o=u(this,n),f=o.on;f!==i&&(e=(i=f).copy()).on(t,r),o.on=e}}var er=bn.prototype.constructor;function ur(n){return function(){this.style.removeProperty(n)}}function or(n,t,r){return function(i){this.style.setProperty(n,t.call(this,i),r)}}function fr(n,t,r){var i,e;function u(){var u=t.apply(this,arguments);return u!==e&&(i=(e=u)&&or(n,u,r)),i}return u._value=t,u}function sr(n){return function(t){this.textContent=n.call(this,t)}}function ar(n){var t,r;function i(){var i=n.apply(this,arguments);return i!==r&&(t=(r=i)&&sr(i)),t}return i._value=n,i}var cr=0;function hr(n,t,r,i){this._groups=n,this._parents=t,this._name=r,this._id=i}function lr(){return++cr}var vr=bn.prototype;hr.prototype=function(n){return bn().transition(n)}.prototype={constructor:hr,select:function(n){var t=this._name,r=this._id;"function"!=typeof n&&(n=m(n));for(var i=this._groups,e=i.length,u=new Array(e),o=0;o<e;++o)for(var f,s,a=i[o],c=a.length,h=u[o]=new Array(c),l=0;l<c;++l)(f=a[l])&&(s=n.call(f,f.__data__,l,a))&&("__data__"in f&&(s.__data__=f.__data__),h[l]=s,St(h[l],t,r,l,h,It(f,r)));return new hr(u,this._parents,t,r)},selectAll:function(n){var t=this._name,r=this._id;"function"!=typeof n&&(n=k(n));for(var i=this._groups,e=i.length,u=[],o=[],f=0;f<e;++f)for(var s,a=i[f],c=a.length,h=0;h<c;++h)if(s=a[h]){for(var l,v=n.call(s,s.__data__,h,a),w=It(s,r),d=0,y=v.length;d<y;++d)(l=v[d])&&St(l,t,r,d,v,w);u.push(v),o.push(s)}return new hr(u,o,t,r)},filter:function(n){"function"!=typeof n&&(n=x(n));for(var t=this._groups,r=t.length,i=new Array(r),e=0;e<r;++e)for(var u,o=t[e],f=o.length,s=i[e]=[],a=0;a<f;++a)(u=o[a])&&n.call(u,u.__data__,a,o)&&s.push(u);return new hr(i,this._parents,this._name,this._id)},merge:function(n){if(n._id!==this._id)throw new Error;for(var t=this._groups,r=n._groups,i=t.length,e=Math.min(i,r.length),u=new Array(i),o=0;o<e;++o)for(var f,s=t[o],a=r[o],c=s.length,h=u[o]=new Array(c),l=0;l<c;++l)(f=s[l]||a[l])&&(h[l]=f);for(;o<i;++o)u[o]=t[o];return new hr(u,this._parents,this._name,this._id)},selection:function(){return new er(this._groups,this._parents)},transition:function(){for(var n=this._name,t=this._id,r=lr(),i=this._groups,e=i.length,u=0;u<e;++u)for(var o,f=i[u],s=f.length,a=0;a<s;++a)if(o=f[a]){var c=It(o,t);St(o,n,r,a,f,{time:c.time+c.delay+c.duration,delay:0,duration:c.duration,ease:c.ease})}return new hr(i,this._parents,n,r)},call:vr.call,nodes:vr.nodes,node:vr.node,size:vr.size,empty:vr.empty,each:vr.each,on:function(n,t){var r=this._id;return arguments.length<2?It(this.node(),r).on.on(n):this.each(ir(r,n,t))},attr:function(n,t){var r=w(n),i="transform"===r?dt:Bt;return this.attrTween(n,"function"==typeof t?(r.local?Gt:Ft)(r,i,Ot(this,"attr."+n,t)):null==t?(r.local?Lt:Ct)(r):(r.local?Vt:Pt)(r,i,t))},attrTween:function(n,t){var r="attr."+n;if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==t)return this.tween(r,null);if("function"!=typeof t)throw new Error;var i=w(n);return this.tween(r,(i.local?Qt:Ut)(i,t))},style:function(n,t,r){var i="transform"==(n+="")?wt:Bt;return null==t?this.styleTween(n,function(n,t){var r,i,e;return function(){var u=Y(this,n),o=(this.style.removeProperty(n),Y(this,n));return u===o?null:u===r&&o===i?e:e=t(r=u,i=o)}}(n,i)).on("end.style."+n,ur(n)):"function"==typeof t?this.styleTween(n,function(n,t,r){var i,e,u;return function(){var o=Y(this,n),f=r(this),s=f+"";return null==f&&(this.style.removeProperty(n),s=f=Y(this,n)),o===s?null:o===i&&s===e?u:(e=s,u=t(i=o,f))}}(n,i,Ot(this,"style."+n,t))).each(function(n,t){var r,i,e,u,o="style."+t,f="end."+o;return function(){var s=Ht(this,n),a=s.on,c=null==s.value[o]?u||(u=ur(t)):void 0;a===r&&e===c||(i=(r=a).copy()).on(f,e=c),s.on=i}}(this._id,n)):this.styleTween(n,function(n,t,r){var i,e,u=r+"";return function(){var o=Y(this,n);return o===u?null:o===i?e:e=t(i=o,r)}}(n,i,t),r).on("end.style."+n,null)},styleTween:function(n,t,r){var i="style."+(n+="");if(arguments.length<2)return(i=this.tween(i))&&i._value;if(null==t)return this.tween(i,null);if("function"!=typeof t)throw new Error;return this.tween(i,fr(n,t,null==r?"":r))},text:function(n){return this.tween("text","function"==typeof n?function(n){return function(){var t=n(this);this.textContent=null==t?"":t}}(Ot(this,"text",n)):function(n){return function(){this.textContent=n}}(null==n?"":n+""))},textTween:function(n){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(null==n)return this.tween(t,null);if("function"!=typeof n)throw new Error;return this.tween(t,ar(n))},remove:function(){return this.on("end.remove",function(n){return function(){var t=this.parentNode;for(var r in this.__transition)if(+r!==n)return;t&&t.removeChild(this)}}(this._id))},tween:function(n,t){var r=this._id;if(n+="",arguments.length<2){for(var i,e=It(this.node(),r).tween,u=0,o=e.length;u<o;++u)if((i=e[u]).name===n)return i.value;return null}return this.each((null==t?Yt:Dt)(r,n,t))},delay:function(n){var t=this._id;return arguments.length?this.each(("function"==typeof n?Wt:Zt)(t,n)):It(this.node(),t).delay},duration:function(n){var t=this._id;return arguments.length?this.each(("function"==typeof n?nr:tr)(t,n)):It(this.node(),t).duration},ease:function(n){var t=this._id;return arguments.length?this.each(rr(t,n)):It(this.node(),t).ease},end:function(){var n,t,r=this,i=r._id,e=r.size();return new Promise((function(u,o){var f={value:o},s={value:function(){0==--e&&u()}};r.each((function(){var r=Ht(this,i),e=r.on;e!==n&&((t=(n=e).copy())._.cancel.push(f),t._.interrupt.push(f),t._.end.push(s)),r.on=t}))}))}};var wr={time:null,delay:0,duration:250,ease:function(n){return((n*=2)<=1?n*n*n:(n-=2)*n*n+2)/2}};function dr(n,t){for(var r;!(r=n.__transition)||!(r=r[t]);)if(!(n=n.parentNode))return wr.time=Mt(),wr;return r}function yr(){}function pr(n,t){var r=new yr;if(n instanceof yr)n.each((function(n,t){r.set(t,n)}));else if(Array.isArray(n)){var i,e=-1,u=n.length;if(null==t)for(;++e<u;)r.set(e,n[e]);else for(;++e<u;)r.set(t(i=n[e],e,n),i)}else if(n)for(var o in n)r.set(o,n[o]);return r}bn.prototype.interrupt=function(n){return this.each((function(){!function(n,t){var r,i,e,u=n.__transition,o=!0;if(u){for(e in t=null==t?null:t+"",u)(r=u[e]).name===t?(i=r.state>2&&r.state<5,r.state=6,r.timer.stop(),r.on.call(i?"interrupt":"cancel",n,n.__data__,r.index,r.group),delete u[e]):o=!1;o&&delete n.__transition}}(this,n)}))},bn.prototype.transition=function(n){var t,r;n instanceof hr?(t=n._id,n=n._name):(t=lr(),(r=wr).time=Mt(),n=null==n?null:n+"");for(var i=this._groups,e=i.length,u=0;u<e;++u)for(var o,f=i[u],s=f.length,a=0;a<s;++a)(o=f[a])&&St(o,n,t,a,f,r||dr(o,t));return new hr(i,this._parents,n,t)},yr.prototype=pr.prototype={constructor:yr,has:function(n){return"$"+n in this},get:function(n){return this["$"+n]},set:function(n,t){return this["$"+n]=t,this},remove:function(n){var t="$"+n;return t in this&&delete this[t]},clear:function(){for(var n in this)"$"===n[0]&&delete this[n]},keys:function(){var n=[];for(var t in this)"$"===t[0]&&n.push(t.slice(1));return n},values:function(){var n=[];for(var t in this)"$"===t[0]&&n.push(this[t]);return n},entries:function(){var n=[];for(var t in this)"$"===t[0]&&n.push({key:t.slice(1),value:this[t]});return n},size:function(){var n=0;for(var t in this)"$"===t[0]&&++n;return n},empty:function(){for(var n in this)if("$"===n[0])return!1;return!0},each:function(n){for(var t in this)"$"===t[0]&&n(this[t],t.slice(1),this)}};export{mn as S,n as a,Yn as b,Un as c,Zn as d,it as e,i as f,nt as i,pr as m,e as n,gn as r,u as t}