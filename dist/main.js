!function(){"use strict";function e(e,n){const l=new t(e);let o;if(n){let t=-1;o=o=>{if(!n(e,o)){const n=s.time;if(n===t)throw new Error(`Conflicting value update: ${o} is not the same as ${e}`);t=n,e=o,l.next(o)}}}else o=l.next.bind(l);return[l.current.bind(l),o]}function n(e,n){l(e,n)}class t{constructor(e){this.value=e,this.pending=a,this.log=null}current(){return null!==u&&(null===this.log&&(this.log={node1:null,node1slot:0,nodes:null,nodeslots:null}),d(this.log)),this.value}next(e){if(null!==r)if(this.pending!==a){if(e!==this.pending)throw new Error("conflicting changes: "+e+" !== "+this.pending)}else this.pending=e,s.changes.add(this);else null!==this.log?(this.pending=e,s.changes.add(this),function(){let e=i;s.updates.reset(),s.time++;try{h(s)}finally{r=u=null,i=e}}()):this.value=e;return e}}function l(e,n){const t={fn:e,value:n,age:s.time,state:0,comparator:null,source1:null,source1slot:0,sources:null,sourceslots:null,dependents:null,dependentslot:0,dependentcount:0,owner:i,owned:null,log:null,context:null,cleanups:null};if(null===e)return t;let l=i,o=u;return null===l&&console.warn("computations created without a root or parent will never be disposed"),i=u=t,null===r?function(e){r=s,s.changes.reset(),s.updates.reset();try{e.value=e.fn(e.value),(s.changes.count>0||s.updates.count>0)&&(s.time++,h(s))}finally{r=i=u=null}}(t):t.value=t.fn(t.value),l&&l!==f&&(null===l.owned?l.owned=[t]:l.owned.push(t)),i=l,u=o,t}class o{constructor(){this.items=[],this.count=0}reset(){this.count=0}add(e){this.items[this.count++]=e}run(e){let n=this.items;for(let t=0;t<this.count;t++)e(n[t]),n[t]=null;this.count=0}}let s={time:0,changes:new o,updates:new o,disposes:new o},r=null,u=null,i=null,c=null,a={},f=l(null,null);function d(e){let n,t=u,l=null===t.source1?-1:null===t.sources?0:t.sources.length;if(null===e.node1)e.node1=t,e.node1slot=l,n=-1;else if(null===e.nodes){if(e.node1===t)return;e.nodes=[t],e.nodeslots=[l],n=0}else{if(n=e.nodes.length,e.nodes[n-1]===t)return;e.nodes.push(t),e.nodeslots.push(l)}null===t.source1?(t.source1=e,t.source1slot=n):null===t.sources?(t.sources=[e],t.sourceslots=[n]):(t.sources.push(e),t.sourceslots.push(n))}function p(e){0!=(6&e.state)&&function(e){if(0!=(4&e.state)){const n=e.owner;0!=(7&n.state)&&p(n),e.state&=-5}if(0!=(2&e.state)){const n=e.dependents;for(let t=e.dependentslot,l=e.dependentcount;t<l;t++){const e=n[t];null!=e&&p(e),n[t]=null}e.state&=-3}}(e),0!=(1&e.state)&&m(e),N(e,31)}function h(e){let n=r,t=0;for(r=e,e.disposes.reset();0!==e.changes.count||0!==e.updates.count||0!==e.disposes.count;)if(t>0&&e.time++,e.changes.run(g),e.updates.run(m),e.disposes.run(B),t++>1e5)throw new Error("Runaway clock detected");r=n}function g(e){e.value=e.pending,e.pending=a,e.log&&A(e.log,v)}function m(e){const n=e.state;if(0==(16&n))if(0!=(2&n))e.dependents[e.dependentslot++]=null,e.dependentslot===e.dependentcount&&N(e,14);else if(0!=(1&n))if(0!=(4&n))p(e);else if(e.comparator){const n=y(e);(0,e.comparator)(n,e.value)||b(e,!1,!0)}else y(e)}function y(e){const n=e.value,t=i,l=u;return i=u=e,e.state=8,T(e,!1),e.value=e.fn(e.value),N(e,31),i=t,u=l,n}function v(e){const n=s.time;e.age<n&&(e.state|=1,e.age=n,C(e,!!e.comparator))}function w(e){const n=s.time;if(e.age<n){e.state|=2,(e.dependents||(e.dependents=[]))[e.dependentcount++]=c,C(e,!0)}}function x(e){if(0!=(2&e.state)){e.state=1;const n=s.time;e.age<n&&(e.age=n,e.comparator||b(e,!1,!0))}}function C(e,n){if(s.updates.add(e),e.comparator){const n=c;c=e,b(e,!0,!1),c=n}else b(e,n,!1)}function b(e,n,t){const l=e.owned;if(null!==l){!function e(n,t,l){for(let o=0,s=n.length;o<s;o++){const s=n[o];if(null!==s){t?0==(16&s.state)&&(s.state|=4):(s.age=l,s.state=16);const n=s.owned;null!==n&&e(n,t,l)}}}(l,n&&!t,s.time)}const o=e.log;null!==o&&A(o,t?x:n?w:v)}function A(e,n){const t=e.node1,l=e.nodes;if(null!==t&&n(t),null!==l)for(let e=0,t=l.length;e<t;e++)n(l[e])}function T(e,n){let t,l,o=e.source1,s=e.sources,r=e.sourceslots,u=e.cleanups,i=e.owned;if(null!==u){for(t=0;t<u.length;t++)u[t](n);e.cleanups=null}if(null!==i){for(t=0;t<i.length;t++)B(i[t]);e.owned=null}if(null!==o&&(k(o,e.source1slot),e.source1=null),null!==s)for(t=0,l=s.length;t<l;t++)k(s.pop(),r.pop())}function k(e,n){let t,l,o=e.nodes,s=e.nodeslots;-1===n?e.node1=null:(t=o.pop(),l=s.pop(),n!==o.length&&(o[n]=t,s[n]=l,-1===l?t.source1slot=n:t.sourceslots[l]=n))}function N(e,n){e.state&=~n,e.dependentslot=0,e.dependentcount=0}function B(e){e.fn=null,e.log=null,e.dependents=null,T(e,!0),N(e,31)}function E(e,n){const t=document.createElement("template");if(t.innerHTML=e,t.innerHTML!==e)throw new Error(`Template html does not match input:\n${t.innerHTML}\n${e}`);let l=t.content.firstChild;return n&&(l=l.firstChild),l}function M(e,t,l,o){if(void 0===l||o||(o=[]),"function"==typeof t)n((n=o)=>S(e,t(),n,l));else{if(!Array.isArray(t)||!function e(n){for(let t=0,l=n.length;t<l;t++){const l=n[t];if(Array.isArray(l)&&e(l)||"function"==typeof l)return!0}return!1}(t))return S(e,t,o,l);n((n=o)=>S(e,t,n,l))}}function I(e,n,t){for(let l=0,o=n.length;l<o;l++)e.insertBefore(n[l],t)}function H(e,n,t,l){if(void 0===t)return e.textContent="";const o=l||document.createTextNode("");if(n.length){o!==n[0]&&e.replaceChild(o,n[0]);for(let t=n.length-1;t>0;t--)e.removeChild(n[t])}else e.insertBefore(o,t);return[o]}function S(e,t,l,o){if(t===l)return l;const s=typeof t,r=void 0!==o;if(e=r&&l[0]&&l[0].parentNode||e,"string"===s||"number"===s)if("number"===s&&(t=t.toString()),r){let n=l[0];n&&3===n.nodeType?n.data=t:n=document.createTextNode(t),l=H(e,l,o,n)}else l=""!==l&&"string"==typeof l?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===s)l=H(e,l,o);else if("function"===s)n(()=>l=S(e,t(),l,o));else if(Array.isArray(t)){const n=function e(n,t){for(let l=0,o=t.length;l<o;l++){let o,s=t[l];if(s instanceof Node)n.push(s);else if(null==s||!0===s||!1===s);else if(Array.isArray(s))e(n,s);else if("string"==(o=typeof s))n.push(document.createTextNode(s));else if("function"===o){const t=s();e(n,Array.isArray(t)?t:[t])}else n.push(document.createTextNode(s.toString()))}return n}([],t);if(0===n.length){if(l=H(e,l,o),r)return l}else Array.isArray(l)?0===l.length?I(e,n,o):q(e,l,n):null==l||""===l?I(e,n):q(e,r&&l||[e.firstChild],n);l=n}else if(t instanceof Node){if(Array.isArray(l)){if(r)return l=H(e,l,o,t);H(e,l,null,t)}else null==l||""===l?e.appendChild(t):e.replaceChild(t,e.firstChild);l=t}return l}var $=-1;function q(e,n,t){var l,o=t.length,s=0,r=n.length-1,u=0,i=o-1,c=n[s],a=t[u],f=n[r],d=t[i],p=f.nextSibling,h=!0;e:for(;h;){for(h=!1;a===c;){if(s++,++u>i||s>r)break e;a=t[u],c=n[s]}for(;d===f;){if(p=f,r--,u>--i||s>r)break e;d=t[i],f=n[r]}for(;a===f;){if(h=!0,e.insertBefore(f,c),r--,++u>i||s>r)break e;a=t[u],f=n[r]}for(;d===c;){if(h=!0,null===p?e.appendChild(c):e.insertBefore(c,p),p=c,s++,u>--i||s>r)break e;d=t[i],c=n[s]}}if(u>i){for(;s<=r;)e.removeChild(n[r]),r--;return}if(s>r){for(;u<=i;)e.insertBefore(t[u],p),u++;return}const g=new Array(i-u+1),m=new Map;for(let e=u;e<=i;e++)g[e]=$,m.set(t[e],e);let y=u+t.length-1-i,v=[];for(let e=s;e<=r;e++)m.has(n[e])?(g[m.get(n[e])]=e,y++):v.push(e);if(0!==y){var w,x=function(e,n){let t=[],l=[],o=-1,s=new Array(e.length);for(let r=n,u=e.length;r<u;r++){let n=e[r];if(n<0)continue;let u=F(t,n);-1!==u&&(s[r]=l[u]),u===o?(t[++o]=n,l[o]=r):n<t[u+1]&&(t[u+1]=n,l[u+1]=r)}for(let e=l[o];o>=0;e=s[e],o--)t[o]=e;return t}(g,u),C=[],b=n[s],A=x.length-1;for(let e=s;e<=r;e++)C[e]=b,b=b.nextSibling;for(let n=0;n<v.length;n++)e.removeChild(C[v[n]]);for(let n=i;n>=u;n--)x[A]===n?(p=C[g[x[A]]],A--):(w=g[n]===$?t[n]:C[g[n]],e.insertBefore(w,p),p=w)}else{if(c!==e.firstChild||f!==e.lastChild){for(l=s;l<=r;l++)e.removeChild(n[l]);for(;u<=i;)e.insertBefore(t[u],p),u++;return}for(e.textContent="";u<=i;)e.appendChild(t[u]),u++}}function F(e,n){var t=-1,l=e.length;if(l>0&&e[l-1]<=n)return l-1;for(;l-t>1;){var o=Math.floor((t+l)/2);e[o]>n?l=o:t=o}return t}const L=E('<div class="container"></div>'),j=E('<div class="dot"></div>'),D=({x:t,y:l,s:o,seconds:s})=>o<=25?O({x:t-12.5,y:l-12.5,s:25,text:s}):(125===(o/=2)&&(s=(t=>{let l,o;const[s,r]=e(t()),u={current:null},i=()=>{cancelIdleCallback(l),clearTimeout(o),o=null,r(u.current)};return n(()=>{u.current=t(),cancelIdleCallback(l),o||(o=setTimeout(i,100*~~(4*Math.random()+1))),l=requestIdleCallback(i)}),s})(s)),[D({x:t,y:l-o/2,s:o,seconds:s}),D({x:t-o,y:l+o/2,s:o,seconds:s}),D({x:t+o,y:l+o/2,s:o,seconds:s})]),O=({x:t,y:l,s:o,text:s})=>{const[r,u]=e(!1),i=()=>u(!0),c=()=>u(!1);return function(){const e=j.cloneNode(!0);e.onmouseleave=c,e.onmouseenter=i,e.textContent=r()?"**"+s()+"**":s();const u=e.firstChild;return n(()=>{Object.assign(e.style,{width:o+"px",height:o+"px",left:t+"px",top:l+"px",borderRadius:o/2+"px",lineHeight:o+"px",background:r()?"#ff0":"#61dafb"}),u.data=r()?"**"+s()+"**":s()}),e}()};!function(e,n){let t;(function(e,n){n&&(i=n);let t=i,o=u,c=0===e.length?f:l(null,null),a=void 0,d=function(){null!==r?s.disposes.add(c):B(c)};i=c,u=null;try{a=e(d)}finally{u=o,i=t}})(l=>{t=l,M(n,e())})}(()=>{const[t,o]=e(0),[r,c]=e(0),a=function(e,n,t){var o=l(e,n);return o.comparator=t||null,()=>{if(null!==u){const e=o.state;if(0!=(7&e)&&p(o),o.age===s.time&&8===e)throw new Error("Circular dependency.");0==(16&e)&&(null===o.log&&(o.log={node1:null,node1slot:0,nodes:null,nodeslots:null}),d(o.log))}return o.value}}(()=>{const e=t()/1e3%10;return 1+(e>5?10-e:e)/10}),f=Date.now(),h=setInterval(()=>c(r()%10+1),1e3);let g;const m=()=>{o(Date.now()-f),g=requestAnimationFrame(m)};return g=requestAnimationFrame(m),function(e){null===i?console.warn("cleanups created without a root or parent will never be run"):null===i.cleanups?i.cleanups=[e]:i.cleanups.push(e)}(()=>{clearInterval(h),cancelAnimationFrame(g)}),function(){const e=L.cloneNode(!0);return M(e,D({x:0,y:0,s:1e3,seconds:r})),n(()=>Object.assign(e.style,{transform:"scaleX("+a()/2.1+") scaleY(0.7) translateZ(0.1px)"})),e}()},document.body)}();
