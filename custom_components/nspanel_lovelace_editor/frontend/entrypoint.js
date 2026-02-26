/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

let NspPanelList = class NspPanelList extends i {
    constructor() {
        super(...arguments);
        this.panels = {};
        this._showImportDialog = false;
        this._importText = "";
        this._importing = false;
    }
    _fireSelect(panelId) {
        this.dispatchEvent(new CustomEvent("panel-selected", { detail: { panelId }, bubbles: true, composed: true }));
    }
    _fireRefresh() {
        this.dispatchEvent(new CustomEvent("refresh-panels", { bubbles: true, composed: true }));
    }
    async _importYaml() {
        try {
            const result = await this.hass.callWS({ type: "nspanel_editor/import_yaml" });
            alert(`Imported ${result.count} panel(s): ${result.imported.join(", ")}`);
            this._fireRefresh();
        }
        catch (err) {
            alert(`Import failed: ${err.message}`);
        }
    }
    async _importPastedYaml() {
        if (!this._importText.trim())
            return;
        this._importing = true;
        try {
            const result = await this.hass.callWS({
                type: "nspanel_editor/import_yaml_text",
                yaml_text: this._importText,
            });
            alert(`Imported ${result.count} panel(s): ${result.imported.join(", ")}`);
            this._showImportDialog = false;
            this._importText = "";
            this._fireRefresh();
        }
        catch (err) {
            alert(`Import failed: ${err.message}`);
        }
        this._importing = false;
    }
    async _addNewPanel() {
        const name = prompt("Enter a name for the new panel (e.g., nspanel-bedroom):");
        if (!name)
            return;
        try {
            await this.hass.callWS({
                type: "nspanel_editor/save_panel",
                panel_id: name,
                config: {
                    panelRecvTopic: `cmnd/${name}/CustomSend`,
                    panelSendTopic: `tele/${name}/RESULT`,
                    model: "eu",
                    updateMode: "auto-notify",
                    locale: "en_US",
                },
                cards: [],
                hiddenCards: [],
                screensaver: {},
            });
            this._fireRefresh();
        }
        catch (err) {
            alert(`Failed to create panel: ${err.message}`);
        }
    }
    render() {
        const panelIds = Object.keys(this.panels);
        return b `
      <div class="panel-list">
        <div class="header">
          <h1>NSPanel Lovelace Editor</h1>
          <div class="actions">
            <button class="btn btn-primary" @click=${this._addNewPanel}>+ New Panel</button>
            <button class="btn" @click=${this._importYaml}>Import from apps.yaml</button>
            <button class="btn" @click=${() => { this._showImportDialog = true; }}>Import from pasted YAML</button>
          </div>
        </div>

        ${this._showImportDialog ? this._renderImportDialog() : ""}

        ${panelIds.length === 0
            ? b `
              <div class="empty-state">
                <p>No NSPanel configurations found.</p>
                <p>Import from an existing apps.yaml, paste YAML, or create a new panel.</p>
              </div>
            `
            : b `
              <div class="panel-grid">
                ${panelIds.map((id) => this._renderPanelCard(id, this.panels[id]))}
              </div>
            `}
      </div>
    `;
    }
    _renderImportDialog() {
        return b `
      <div class="import-dialog">
        <h3>Paste apps.yaml content</h3>
        <textarea rows="12" placeholder="Paste your apps.yaml content here..."
          .value=${this._importText}
          @input=${(e) => { this._importText = e.target.value; }}></textarea>
        <div class="dialog-actions">
          <button class="btn" @click=${() => { this._showImportDialog = false; this._importText = ""; }}>Cancel</button>
          <button class="btn btn-primary" ?disabled=${this._importing || !this._importText.trim()}
            @click=${this._importPastedYaml}>
            ${this._importing ? "Importing..." : "Import"}
          </button>
        </div>
      </div>
    `;
    }
    _renderPanelCard(id, panel) {
        return b `
      <div class="panel-card" @click=${() => this._fireSelect(id)}>
        <h3>${id}</h3>
        <div class="panel-info">
          <span>Model: ${panel.model?.toUpperCase() || "EU"}</span>
          <span>Cards: ${panel.card_count}</span>
          ${panel.hidden_card_count > 0
            ? b `<span>Hidden: ${panel.hidden_card_count}</span>`
            : ""}
          ${panel.has_screensaver
            ? b `<span class="badge">Screensaver</span>`
            : ""}
        </div>
      </div>
    `;
    }
};
NspPanelList.styles = i$3 `
    :host { display: block; }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }
    .header h1 { margin: 0; flex: 1; }
    .actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .btn {
      padding: 8px 16px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 14px;
    }
    .btn:hover { background: var(--secondary-background-color, #f5f5f5); }
    .btn-primary {
      background: var(--primary-color, #03a9f4);
      color: white;
      border-color: var(--primary-color, #03a9f4);
    }
    .btn-primary:hover { opacity: 0.9; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .panel-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .panel-card {
      background: var(--card-background-color, white);
      border-radius: 8px;
      padding: 16px;
      cursor: pointer;
      border: 1px solid var(--divider-color, #e0e0e0);
      transition: box-shadow 0.2s;
    }
    .panel-card:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
    .panel-card h3 { margin: 0 0 8px 0; }
    .panel-info {
      display: flex;
      gap: 12px;
      color: var(--secondary-text-color, #727272);
      font-size: 14px;
      flex-wrap: wrap;
    }
    .badge {
      background: var(--primary-color, #03a9f4);
      color: white;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 11px;
    }
    .empty-state {
      text-align: center;
      padding: 48px;
      color: var(--secondary-text-color, #727272);
    }
    .import-dialog {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .import-dialog h3 { margin: 0 0 12px; }
    .import-dialog textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      font-family: "Fira Code", "Consolas", monospace;
      font-size: 13px;
      resize: vertical;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
    }
    .dialog-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
  `;
__decorate([
    n({ attribute: false })
], NspPanelList.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], NspPanelList.prototype, "panels", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_showImportDialog", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_importText", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_importing", void 0);
NspPanelList = __decorate([
    t("nsp-panel-list")
], NspPanelList);

/**
 * TypeScript type definitions mirroring the backend schema.
 * See: custom_components/nspanel_lovelace_editor/schema.py and const.py
 */
// --- Constants ---
const CARD_TYPES = [
    "cardEntities",
    "cardGrid",
    "cardThermo",
    "cardMedia",
    "cardAlarm",
    "cardQR",
    "cardPower",
];
const MODELS = ["eu", "us-l", "us-p"];
const UPDATE_MODES = ["auto", "auto-notify", "manual"];
const BACKGROUND_COLORS = ["ha-dark", "black"];
const LOCALES = [
    ["af_ZA", "Afrikaans"],
    ["ar_SY", "Arabic"],
    ["bg_BG", "Bulgarian"],
    ["ca_ES", "Catalan"],
    ["cs_CZ", "Czech"],
    ["da_DK", "Danish"],
    ["de_DE", "German"],
    ["el_GR", "Greek"],
    ["en_US", "English"],
    ["es_ES", "Spanish"],
    ["et_EE", "Estonian"],
    ["fa_IR", "Persian"],
    ["fi_FI", "Finnish"],
    ["fr_FR", "French"],
    ["he_IL", "Hebrew"],
    ["hr_xx", "Croatian"],
    ["hu_HU", "Hungarian"],
    ["hy_AM", "Armenian"],
    ["id_ID", "Indonesian"],
    ["is_IS", "Icelandic"],
    ["it_IT", "Italian"],
    ["lb_xx", "Luxembourgish"],
    ["lt_LT", "Lithuanian"],
    ["lv_LV", "Latvian"],
    ["nb_NO", "Norwegian"],
    ["nl_NL", "Dutch"],
    ["nn_NO", "Norwegian Nynorsk"],
    ["pl_PL", "Polish"],
    ["pt_PT", "Portuguese"],
    ["ro_RO", "Romanian"],
    ["ru_RU", "Russian"],
    ["sk_SK", "Slovak"],
    ["sl_SI", "Slovenian"],
    ["sv_SE", "Swedish"],
    ["th_TH", "Thai"],
    ["tr_TR", "Turkish"],
    ["uk_UA", "Ukrainian"],
    ["vi_VN", "Vietnamese"],
    ["zh_CN", "Simplified Chinese"],
    ["zh_TW", "Traditional Chinese"],
];
const ENTITY_DOMAINS_CARD_ENTITIES = [
    "cover", "switch", "input_boolean", "binary_sensor", "sensor", "button",
    "number", "input_number", "scene", "script", "input_button", "light",
    "input_text", "input_select", "lock", "fan", "automation",
    "alarm_control_panel", "sun", "person", "climate",
];
const ENTITY_DOMAINS_CARD_QR = [
    "switch", "input_boolean", "binary_sensor", "sensor", "button",
    "scene", "script", "input_button", "input_select", "light",
    "input_text", "lock", "automation",
];
// --- Helpers ---
function getEntityDomainsForCard(cardType) {
    switch (cardType) {
        case "cardQR":
            return ENTITY_DOMAINS_CARD_QR;
        case "cardPower":
            return ["sensor"];
        case "cardThermo":
            return ["climate"];
        case "cardMedia":
            return ["media_player"];
        case "cardAlarm":
            return ["alarm_control_panel"];
        default:
            return ENTITY_DOMAINS_CARD_ENTITIES;
    }
}
function createDefaultCard(type) {
    switch (type) {
        case "cardEntities":
            return { type, entities: [] };
        case "cardGrid":
            return { type, entities: [] };
        case "cardThermo":
            return { type, entity: "" };
        case "cardMedia":
            return { type, entity: "" };
        case "cardAlarm":
            return { type, entity: "" };
        case "cardQR":
            return { type, qrCode: "", entities: [] };
        case "cardPower":
            return { type, entities: [] };
    }
}
function createDefaultEntity() {
    return { entity: "" };
}

let NspSettingsEditor = class NspSettingsEditor extends i {
    _fireChanged(updated) {
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: updated }, bubbles: true, composed: true }));
    }
    _updateField(field, value) {
        const updated = { ...this.config, [field]: value };
        if (value === undefined || value === "" || value === null) {
            delete updated[field];
        }
        this._fireChanged(updated);
    }
    _getBrightnessMode(value) {
        if (value === undefined || typeof value === "number")
            return "static";
        if (typeof value === "string")
            return "entity";
        return "schedule";
    }
    render() {
        return b `
      <div class="settings">
        <section>
          <h3>MQTT Topics</h3>
          <div class="field">
            <label>Panel Receive Topic</label>
            <input type="text" .value=${this.config.panelRecvTopic || ""}
              @input=${(e) => this._updateField("panelRecvTopic", e.target.value)} />
          </div>
          <div class="field">
            <label>Panel Send Topic</label>
            <input type="text" .value=${this.config.panelSendTopic || ""}
              @input=${(e) => this._updateField("panelSendTopic", e.target.value)} />
          </div>
        </section>

        <section>
          <h3>Device</h3>
          <div class="field-row">
            <div class="field">
              <label>Model</label>
              <select .value=${this.config.model || "eu"}
                @change=${(e) => this._updateField("model", e.target.value)}>
                ${MODELS.map((m) => b `<option value=${m} ?selected=${this.config.model === m}>${m.toUpperCase()}</option>`)}
              </select>
            </div>
            <div class="field">
              <label>Update Mode</label>
              <select .value=${this.config.updateMode || "auto-notify"}
                @change=${(e) => this._updateField("updateMode", e.target.value)}>
                ${UPDATE_MODES.map((m) => b `<option value=${m} ?selected=${this.config.updateMode === m}>${m}</option>`)}
              </select>
            </div>
          </div>
        </section>

        <section>
          <h3>Display</h3>
          <div class="field">
            <label>Sleep Timeout (seconds)</label>
            <input type="number" min="0" .value=${String(this.config.sleepTimeout ?? "")}
              @input=${(e) => {
            const v = e.target.value;
            this._updateField("sleepTimeout", v ? Number(v) : undefined);
        }} />
          </div>
          ${this._renderBrightnessField("screenBrightness", "Screen Brightness")}
          ${this._renderBrightnessField("sleepBrightness", "Sleep Brightness")}
          <div class="field">
            <label>Default Background Color</label>
            <select .value=${this.config.defaultBackgroundColor || ""}
              @change=${(e) => this._updateField("defaultBackgroundColor", e.target.value || undefined)}>
              <option value="">Default</option>
              ${BACKGROUND_COLORS.map((c) => b `<option value=${c} ?selected=${this.config.defaultBackgroundColor === c}>${c}</option>`)}
            </select>
          </div>
        </section>

        <section>
          <h3>Locale &amp; Time</h3>
          <div class="field">
            <label>Locale</label>
            <select .value=${this.config.locale || "en_US"}
              @change=${(e) => this._updateField("locale", e.target.value)}>
              ${LOCALES.map(([code, name]) => b `<option value=${code} ?selected=${this.config.locale === code}>${name} (${code})</option>`)}
            </select>
          </div>
          <div class="field-row">
            <div class="field">
              <label>Time Format</label>
              <input type="text" .value=${this.config.timeFormat || ""} placeholder="%H:%M"
                @input=${(e) => this._updateField("timeFormat", e.target.value)} />
            </div>
            <div class="field">
              <label>Date Format</label>
              <input type="text" .value=${this.config.dateFormat || ""} placeholder="%A, %d. %B %Y"
                @input=${(e) => this._updateField("dateFormat", e.target.value)} />
            </div>
          </div>
          <div class="field">
            <label>Date Format (Babel)</label>
            <input type="text" .value=${this.config.dateFormatBabel || ""} placeholder="full"
              @input=${(e) => this._updateField("dateFormatBabel", e.target.value)} />
          </div>
          <div class="field-row">
            <div class="field">
              <label>Date Additional Template</label>
              <input type="text" .value=${this.config.dateAdditionalTemplate || ""}
                @input=${(e) => this._updateField("dateAdditionalTemplate", e.target.value)} />
            </div>
            <div class="field">
              <label>Time Additional Template</label>
              <input type="text" .value=${this.config.timeAdditionalTemplate || ""}
                @input=${(e) => this._updateField("timeAdditionalTemplate", e.target.value)} />
            </div>
          </div>
          <div class="field">
            <label>Timezone</label>
            <input type="text" .value=${this.config.timezone || ""} placeholder="e.g. Europe/Berlin"
              @input=${(e) => this._updateField("timezone", e.target.value)} />
          </div>
        </section>

        <section>
          <h3>Sleep Tracking</h3>
          <div class="field">
            <label>Sleep Tracking Entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this.config.sleepTracking || ""}
              .includeDomains=${["device_tracker", "person"]}
              allow-custom-entity
              @value-changed=${(e) => this._updateField("sleepTracking", e.detail.value)}
            ></ha-entity-picker>
          </div>
          <div class="field">
            <label>Sleep Tracking Zones (comma-separated)</label>
            <input type="text" .value=${(this.config.sleepTrackingZones || []).join(", ")}
              @input=${(e) => {
            const val = e.target.value;
            this._updateField("sleepTrackingZones", val ? val.split(",").map((s) => s.trim()) : undefined);
        }} />
          </div>
          <div class="field-row">
            <div class="field">
              <label>Sleep Override Entity</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${this.config.sleepOverride?.entity || ""}
                allow-custom-entity
                @value-changed=${(e) => {
            const entity = e.detail.value;
            if (entity) {
                this._updateField("sleepOverride", {
                    entity,
                    brightness: this.config.sleepOverride?.brightness ?? 0,
                });
            }
            else {
                this._updateField("sleepOverride", undefined);
            }
        }}
              ></ha-entity-picker>
            </div>
            <div class="field">
              <label>Sleep Override Brightness</label>
              <input type="number" min="0" max="100"
                .value=${String(this.config.sleepOverride?.brightness ?? "")}
                @input=${(e) => {
            const v = parseInt(e.target.value);
            if (this.config.sleepOverride?.entity) {
                this._updateField("sleepOverride", {
                    ...this.config.sleepOverride,
                    brightness: isNaN(v) ? 0 : v,
                });
            }
        }} />
            </div>
          </div>
        </section>

        <section>
          <h3>OTA URL Overrides</h3>
          ${["displayURL-EU", "displayURL-US-L", "displayURL-US-P", "berryURL"].map((key) => b `
              <div class="field">
                <label>${key}</label>
                <input type="text" .value=${this.config[key] || ""}
                  @input=${(e) => this._updateField(key, e.target.value)} />
              </div>
            `)}
        </section>
      </div>
    `;
    }
    _renderBrightnessField(field, label) {
        const value = this.config[field];
        const mode = this._getBrightnessMode(value);
        return b `
      <div class="brightness-field">
        <div class="field">
          <label>${label}</label>
          <select .value=${mode} @change=${(e) => {
            const m = e.target.value;
            if (m === "static")
                this._updateField(field, typeof value === "number" ? value : 100);
            else if (m === "entity")
                this._updateField(field, "");
            else
                this._updateField(field, []);
        }}>
            <option value="static" ?selected=${mode === "static"}>Static value</option>
            <option value="entity" ?selected=${mode === "entity"}>Entity reference</option>
            <option value="schedule" ?selected=${mode === "schedule"}>Time schedule</option>
          </select>
        </div>
        ${mode === "static" ? b `
          <div class="field">
            <input type="number" min="0" max="100" .value=${String(typeof value === "number" ? value : 100)}
              @input=${(e) => this._updateField(field, Number(e.target.value))} />
          </div>
        ` : A}
        ${mode === "entity" ? b `
          <div class="field">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${typeof value === "string" ? value : ""}
              .includeDomains=${["input_number"]}
              allow-custom-entity
              @value-changed=${(e) => this._updateField(field, e.detail.value)}
            ></ha-entity-picker>
          </div>
        ` : A}
        ${mode === "schedule" ? this._renderScheduleEditor(field, Array.isArray(value) ? value : []) : A}
      </div>
    `;
    }
    _renderScheduleEditor(field, schedule) {
        return b `
      <div class="schedule-editor">
        ${schedule.map((entry, i) => b `
            <div class="schedule-row">
              <input type="text" .value=${entry.time} placeholder="HH:MM:SS or sunrise/sunset"
                @input=${(e) => {
            const newSchedule = [...schedule];
            newSchedule[i] = { ...entry, time: e.target.value };
            this._updateField(field, newSchedule);
        }} />
              <input type="number" min="0" max="100" .value=${String(entry.value)}
                @input=${(e) => {
            const newSchedule = [...schedule];
            newSchedule[i] = { ...entry, value: Number(e.target.value) };
            this._updateField(field, newSchedule);
        }} />
              <button class="btn-icon" @click=${() => {
            const newSchedule = schedule.filter((_, idx) => idx !== i);
            this._updateField(field, newSchedule.length ? newSchedule : undefined);
        }}>&#x2715;</button>
            </div>
          `)}
        <button class="btn-sm" @click=${() => {
            this._updateField(field, [...schedule, { time: "", value: 100 }]);
        }}>+ Add time entry</button>
      </div>
    `;
    }
};
NspSettingsEditor.styles = i$3 `
    :host { display: block; }
    .settings { display: flex; flex-direction: column; gap: 4px; }
    section {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
    }
    section h3 { margin: 0 0 12px; font-size: 15px; color: var(--primary-text-color); }
    .field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
    .field:last-child { margin-bottom: 0; }
    .field label { font-size: 12px; font-weight: 500; color: var(--secondary-text-color); }
    .field input, .field select {
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .field-row { display: flex; gap: 12px; }
    .field-row .field { flex: 1; }
    .brightness-field { margin-bottom: 12px; }
    .schedule-editor { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
    .schedule-row { display: flex; gap: 8px; align-items: center; }
    .schedule-row input[type="text"] { flex: 2; padding: 6px; border: 1px solid var(--divider-color); border-radius: 4px; font-size: 13px; background: var(--card-background-color, white); color: var(--primary-text-color); }
    .schedule-row input[type="number"] { width: 60px; padding: 6px; border: 1px solid var(--divider-color); border-radius: 4px; font-size: 13px; background: var(--card-background-color, white); color: var(--primary-text-color); }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px 8px; color: var(--error-color, #db4437); }
    .btn-sm { align-self: flex-start; padding: 6px 12px; border: 1px dashed var(--divider-color); border-radius: 4px; background: none; cursor: pointer; font-size: 12px; color: var(--primary-color); }
  `;
__decorate([
    n({ attribute: false })
], NspSettingsEditor.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], NspSettingsEditor.prototype, "config", void 0);
NspSettingsEditor = __decorate([
    t("nsp-settings-editor")
], NspSettingsEditor);

let NspEntityEditor = class NspEntityEditor extends i {
    constructor() {
        super(...arguments);
        this.includeDomains = [];
        this.hiddenCardKeys = [];
    }
    _fireChanged(updated) {
        this.dispatchEvent(new CustomEvent("entity-changed", { detail: { entity: updated }, bubbles: true, composed: true }));
    }
    _updateField(field, value) {
        const updated = { ...this.entity, [field]: value };
        if (value === undefined || value === "" || value === null) {
            delete updated[field];
        }
        this._fireChanged(updated);
    }
    _isInternalEntity() {
        const e = this.entity.entity || "";
        if (e === "iText")
            return "iText";
        if (e === "delete")
            return "delete";
        if (e.startsWith("navigate."))
            return "navigate";
        if (e.startsWith("service."))
            return "service";
        return false;
    }
    _getIconMode() {
        if (this.entity.icon === undefined)
            return "none";
        if (typeof this.entity.icon === "string")
            return "simple";
        return "map";
    }
    _getColorMode() {
        if (this.entity.color === undefined)
            return "none";
        if (Array.isArray(this.entity.color))
            return "rgb";
        if (typeof this.entity.color === "object")
            return "map";
        return "template";
    }
    render() {
        const internal = this._isInternalEntity();
        return b `
      <div class="entity-editor">
        ${this._renderEntityPicker(internal)}
        ${internal ? this._renderInternalFields(internal) : this._renderStandardFields()}
      </div>
    `;
    }
    _renderEntityPicker(internal) {
        if (internal) {
            return b `
        <div class="field">
          <label>Entity (internal)</label>
          <input type="text" .value=${this.entity.entity}
            @input=${(e) => this._updateField("entity", e.target.value)} />
          <small>Internal entity: ${internal}</small>
        </div>
      `;
        }
        return b `
      <div class="field">
        <label>Entity</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.entity.entity || ""}
          .includeDomains=${this.includeDomains}
          allow-custom-entity
          @value-changed=${(e) => this._updateField("entity", e.detail.value)}
        ></ha-entity-picker>
      </div>
    `;
    }
    _renderInternalFields(type) {
        switch (type) {
            case "iText":
                return b `
          <div class="field">
            <label>Display Name</label>
            <input type="text" .value=${this.entity.name || ""}
              @input=${(e) => this._updateField("name", e.target.value)} />
          </div>
          <div class="field">
            <label>Display Value</label>
            <input type="text" .value=${this.entity.value || ""}
              @input=${(e) => this._updateField("value", e.target.value)} />
          </div>
          ${this._renderIconField()}
          ${this._renderColorField()}
        `;
            case "delete":
                return b `<p class="hint">Placeholder entity — no additional fields.</p>`;
            case "navigate":
                return b `
          <div class="field">
            <label>Navigate to Hidden Card</label>
            <select @change=${(e) => {
                    const key = e.target.value;
                    this._updateField("entity", key ? `navigate.${key}` : "navigate.");
                }}>
              <option value="">Select a key…</option>
              ${this.hiddenCardKeys.map((k) => b `<option value=${k} ?selected=${this.entity.entity === `navigate.${k}`}>${k}</option>`)}
            </select>
          </div>
          ${this._renderNameField()}
          ${this._renderIconField()}
          ${this._renderColorField()}
        `;
            case "service": {
                const parts = (this.entity.entity || "service.").replace("service.", "").split(".");
                const domain = parts[0] || "";
                const service = parts[1] || "";
                return b `
          <div class="field-row">
            <div class="field">
              <label>Domain</label>
              <input type="text" .value=${domain}
                @input=${(e) => {
                    const d = e.target.value;
                    this._updateField("entity", `service.${d}.${service}`);
                }} />
            </div>
            <div class="field">
              <label>Service</label>
              <input type="text" .value=${service}
                @input=${(e) => {
                    const s = e.target.value;
                    this._updateField("entity", `service.${domain}.${s}`);
                }} />
            </div>
          </div>
          <div class="field">
            <label>Service Data (JSON)</label>
            <textarea rows="3"
              .value=${this.entity.data ? JSON.stringify(this.entity.data, null, 2) : ""}
              @change=${(e) => {
                    try {
                        const data = JSON.parse(e.target.value || "{}");
                        this._updateField("data", data);
                    }
                    catch { /* ignore invalid JSON until committed */ }
                }}></textarea>
          </div>
          ${this._renderNameField()}
          ${this._renderIconField()}
          ${this._renderColorField()}
        `;
            }
        }
    }
    _renderStandardFields() {
        return b `
      ${this._renderNameField()}
      <div class="field">
        <label>Value Override</label>
        <input type="text" .value=${this.entity.value || ""} placeholder="HA template supported"
          @input=${(e) => this._updateField("value", e.target.value)} />
      </div>
      ${this._renderIconField()}
      ${this._renderColorField()}
      ${this._renderConditionalVisibility()}
    `;
    }
    _renderNameField() {
        return b `
      <div class="field">
        <label>Name Override</label>
        <input type="text" .value=${this.entity.name || ""} placeholder="HA template supported"
          @input=${(e) => this._updateField("name", e.target.value)} />
      </div>
    `;
    }
    _renderIconField() {
        const mode = this._getIconMode();
        return b `
      <div class="field">
        <label>Icon Override</label>
        <select .value=${mode} @change=${(e) => {
            const m = e.target.value;
            if (m === "none")
                this._updateField("icon", undefined);
            else if (m === "simple")
                this._updateField("icon", "");
            else
                this._updateField("icon", {});
        }}>
          <option value="none">None</option>
          <option value="simple" ?selected=${mode === "simple"}>Simple</option>
          <option value="map" ?selected=${mode === "map"}>Per-state map</option>
        </select>
        ${mode === "simple" ? b `
          <input type="text" .value=${this.entity.icon || ""} placeholder="mdi:lightbulb"
            @input=${(e) => this._updateField("icon", e.target.value)} />
        ` : A}
        ${mode === "map" ? this._renderStringMap("icon", this.entity.icon) : A}
      </div>
    `;
    }
    _renderColorField() {
        const mode = this._getColorMode();
        return b `
      <div class="field">
        <label>Color Override</label>
        <select .value=${mode} @change=${(e) => {
            const m = e.target.value;
            if (m === "none")
                this._updateField("color", undefined);
            else if (m === "rgb")
                this._updateField("color", [255, 255, 255]);
            else if (m === "map")
                this._updateField("color", {});
            else
                this._updateField("color", "");
        }}>
          <option value="none">None</option>
          <option value="rgb" ?selected=${mode === "rgb"}>RGB [R,G,B]</option>
          <option value="map" ?selected=${mode === "map"}>Per-state map</option>
          <option value="template" ?selected=${mode === "template"}>Template string</option>
        </select>
        ${mode === "rgb" ? this._renderRGBInputs() : A}
        ${mode === "template" ? b `
          <input type="text" .value=${this.entity.color || ""} placeholder="HA template"
            @input=${(e) => this._updateField("color", e.target.value)} />
        ` : A}
        ${mode === "map" ? this._renderStringMap("color", this.entity.color) : A}
      </div>
    `;
    }
    _renderRGBInputs() {
        const c = (Array.isArray(this.entity.color) ? this.entity.color : [255, 255, 255]);
        return b `
      <div class="rgb-row">
        ${["R", "G", "B"].map((label, i) => b `
            <label>${label}</label>
            <input type="number" min="0" max="255" .value=${String(c[i] ?? 0)}
              @input=${(e) => {
            const val = parseInt(e.target.value) || 0;
            const newC = [...c];
            newC[i] = Math.max(0, Math.min(255, val));
            this._updateField("color", newC);
        }} />
          `)}
      </div>
    `;
    }
    _renderStringMap(field, map) {
        const entries = Object.entries(map || {});
        return b `
      <div class="map-editor">
        ${entries.map(([key, val], i) => b `
            <div class="map-row">
              <input type="text" .value=${key} placeholder="state"
                @input=${(e) => {
            const newKey = e.target.value;
            const newMap = { ...map };
            delete newMap[key];
            newMap[newKey] = val;
            this._updateField(field, newMap);
        }} />
              <input type="text" .value=${String(val)} placeholder="value"
                @input=${(e) => {
            const newMap = { ...map, [key]: e.target.value };
            this._updateField(field, newMap);
        }} />
              <button class="btn-icon" @click=${() => {
            const newMap = { ...map };
            delete newMap[key];
            this._updateField(field, Object.keys(newMap).length ? newMap : undefined);
        }}>✕</button>
            </div>
          `)}
        <button class="btn-sm" @click=${() => {
            this._updateField(field, { ...map, "": "" });
        }}>+ Add state</button>
      </div>
    `;
    }
    _renderConditionalVisibility() {
        return b `
      <details class="advanced">
        <summary>Conditional Visibility</summary>
        <div class="field">
          <label>Show when state equals</label>
          <input type="text" .value=${this.entity.state || ""}
            @input=${(e) => this._updateField("state", e.target.value)} />
        </div>
        <div class="field">
          <label>Hide when state equals</label>
          <input type="text" .value=${this.entity.state_not || ""}
            @input=${(e) => this._updateField("state_not", e.target.value)} />
        </div>
        <div class="field">
          <label>Visibility template</label>
          <input type="text" .value=${this.entity.state_template || ""} placeholder="Jinja2 template → truthy/falsy"
            @input=${(e) => this._updateField("state_template", e.target.value)} />
        </div>
      </details>
    `;
    }
};
NspEntityEditor.styles = i$3 `
    :host { display: block; }
    .entity-editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 8px;
    }
    .field { display: flex; flex-direction: column; gap: 4px; }
    .field label { font-size: 12px; font-weight: 500; color: var(--secondary-text-color); }
    .field input, .field select, .field textarea {
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-family: inherit;
      font-size: 14px;
    }
    .field-row { display: flex; gap: 8px; }
    .field-row .field { flex: 1; }
    .rgb-row { display: flex; gap: 8px; align-items: center; margin-top: 4px; }
    .rgb-row input { width: 60px; }
    .rgb-row label { font-size: 12px; font-weight: 500; }
    .map-editor { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
    .map-row { display: flex; gap: 4px; align-items: center; }
    .map-row input { flex: 1; padding: 6px; border: 1px solid var(--divider-color); border-radius: 4px; background: var(--card-background-color, white); color: var(--primary-text-color); font-size: 13px; }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px 8px; color: var(--error-color, #db4437); }
    .btn-sm { align-self: flex-start; padding: 4px 12px; border: 1px dashed var(--divider-color); border-radius: 4px; background: none; cursor: pointer; font-size: 12px; color: var(--primary-color); }
    .hint { color: var(--secondary-text-color); font-size: 13px; font-style: italic; margin: 4px 0; }
    small { color: var(--secondary-text-color); font-size: 11px; }
    details.advanced { margin-top: 4px; }
    details.advanced summary {
      cursor: pointer; font-size: 13px; color: var(--secondary-text-color);
      padding: 4px 0;
    }
    details.advanced[open] summary { margin-bottom: 8px; }
  `;
__decorate([
    n({ attribute: false })
], NspEntityEditor.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], NspEntityEditor.prototype, "entity", void 0);
__decorate([
    n({ type: Array })
], NspEntityEditor.prototype, "includeDomains", void 0);
__decorate([
    n({ type: Array })
], NspEntityEditor.prototype, "hiddenCardKeys", void 0);
NspEntityEditor = __decorate([
    t("nsp-entity-editor")
], NspEntityEditor);

let NspCardEditor = class NspCardEditor extends i {
    constructor() {
        super(...arguments);
        this.hiddenCardKeys = [];
    }
    _fireChanged(updated) {
        this.dispatchEvent(new CustomEvent("card-changed", { detail: { card: updated }, bubbles: true, composed: true }));
    }
    _updateField(field, value) {
        const updated = { ...this.card, [field]: value };
        if (value === undefined || value === "" || value === null) {
            delete updated[field];
        }
        this._fireChanged(updated);
    }
    _getEntities() {
        return this.card.entities || [];
    }
    _updateEntity(index, entity) {
        const entities = [...this._getEntities()];
        entities[index] = entity;
        this._updateField("entities", entities);
    }
    _addEntity() {
        const entities = [...this._getEntities(), createDefaultEntity()];
        this._updateField("entities", entities);
    }
    _removeEntity(index) {
        const entities = this._getEntities().filter((_, i) => i !== index);
        this._updateField("entities", entities);
    }
    _moveEntity(from, to) {
        const entities = [...this._getEntities()];
        const [item] = entities.splice(from, 1);
        entities.splice(to, 0, item);
        this._updateField("entities", entities);
    }
    render() {
        return b `
      <div class="card-editor">
        ${this._renderCommonFields()}
        ${this._renderTypeSpecificFields()}
      </div>
    `;
    }
    _renderCommonFields() {
        return b `
      <div class="field-row">
        <div class="field">
          <label>Title</label>
          <input type="text" .value=${this.card.title || ""}
            @input=${(e) => this._updateField("title", e.target.value)} />
        </div>
        <div class="field">
          <label>Key</label>
          <input type="text" .value=${this.card.key || ""}
            @input=${(e) => this._updateField("key", e.target.value)} />
        </div>
      </div>
    `;
    }
    _renderTypeSpecificFields() {
        switch (this.card.type) {
            case "cardEntities":
            case "cardGrid":
                return b `
          ${this._renderEntityList()}
          ${this._renderNavItems()}
        `;
            case "cardThermo":
                return this._renderThermoFields();
            case "cardMedia":
                return this._renderMediaFields();
            case "cardAlarm":
                return this._renderAlarmFields();
            case "cardQR":
                return this._renderQRFields();
            case "cardPower":
                return this._renderPowerFields();
            default:
                return b `<p>Unknown card type: ${this.card.type}</p>`;
        }
    }
    _renderEntityList() {
        const entities = this._getEntities();
        const domains = getEntityDomainsForCard(this.card.type);
        return b `
      <div class="entity-list">
        <div class="section-header">
          <label>Entities (${entities.length})</label>
          <button class="btn-sm" @click=${this._addEntity}>+ Add Entity</button>
        </div>
        ${entities.map((entity, i) => b `
            <div class="entity-item">
              <div class="entity-header">
                <span class="entity-grip" draggable="true"
                  @dragstart=${(e) => { e.dataTransfer.setData("text/plain", String(i)); e.dataTransfer.effectAllowed = "move"; }}
                  @dragover=${(e) => e.preventDefault()}
                  @drop=${(e) => { e.preventDefault(); this._moveEntity(parseInt(e.dataTransfer.getData("text/plain")), i); }}>⠿</span>
                <span class="entity-label">${entity.entity || "(empty)"}</span>
                <button class="btn-icon" @click=${() => this._removeEntity(i)}>✕</button>
              </div>
              <nsp-entity-editor
                .hass=${this.hass}
                .entity=${entity}
                .includeDomains=${domains}
                .hiddenCardKeys=${this.hiddenCardKeys}
                @entity-changed=${(e) => this._updateEntity(i, e.detail.entity)}
              ></nsp-entity-editor>
            </div>
          `)}
      </div>
    `;
    }
    _renderNavItems() {
        const card = this.card;
        return b `
      <details class="nav-items">
        <summary>Navigation Item Overrides</summary>
        <div class="field">
          <label>navItem1</label>
          ${card.navItem1 ? b `
            <nsp-entity-editor
              .hass=${this.hass}
              .entity=${card.navItem1}
              .includeDomains=${getEntityDomainsForCard(this.card.type)}
              .hiddenCardKeys=${this.hiddenCardKeys}
              @entity-changed=${(e) => this._updateField("navItem1", e.detail.entity)}
            ></nsp-entity-editor>
            <button class="btn-sm" @click=${() => this._updateField("navItem1", undefined)}>Remove navItem1</button>
          ` : b `
            <button class="btn-sm" @click=${() => this._updateField("navItem1", createDefaultEntity())}>+ Add navItem1</button>
          `}
        </div>
        <div class="field">
          <label>navItem2</label>
          ${card.navItem2 ? b `
            <nsp-entity-editor
              .hass=${this.hass}
              .entity=${card.navItem2}
              .includeDomains=${getEntityDomainsForCard(this.card.type)}
              .hiddenCardKeys=${this.hiddenCardKeys}
              @entity-changed=${(e) => this._updateField("navItem2", e.detail.entity)}
            ></nsp-entity-editor>
            <button class="btn-sm" @click=${() => this._updateField("navItem2", undefined)}>Remove navItem2</button>
          ` : b `
            <button class="btn-sm" @click=${() => this._updateField("navItem2", createDefaultEntity())}>+ Add navItem2</button>
          `}
        </div>
      </details>
    `;
    }
    _renderThermoFields() {
        const card = this.card;
        return b `
      <div class="field">
        <label>Climate Entity</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${card.entity || ""}
          .includeDomains=${["climate"]}
          @value-changed=${(e) => this._updateField("entity", e.detail.value)}
        ></ha-entity-picker>
      </div>
      <div class="field-row">
        <div class="field">
          <label>Temperature Unit</label>
          <select .value=${card.temperatureUnit || "celsius"}
            @change=${(e) => this._updateField("temperatureUnit", e.target.value)}>
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label>Supported Modes (comma-separated)</label>
        <input type="text" .value=${(card.supportedModes || []).join(", ")}
          @input=${(e) => {
            const val = e.target.value;
            this._updateField("supportedModes", val ? val.split(",").map((s) => s.trim()) : undefined);
        }} />
      </div>
    `;
    }
    _renderMediaFields() {
        const card = this.card;
        return b `
      <div class="field">
        <label>Media Player Entity</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${card.entity || ""}
          .includeDomains=${["media_player"]}
          @value-changed=${(e) => this._updateField("entity", e.detail.value)}
        ></ha-entity-picker>
      </div>
      <div class="field">
        <label>Status Override</label>
        <input type="text" .value=${card.status || ""}
          @input=${(e) => this._updateField("status", e.target.value)} />
      </div>
      ${this._renderEntityList()}
    `;
    }
    _renderAlarmFields() {
        const card = this.card;
        return b `
      <div class="field">
        <label>Alarm Control Panel Entity</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${card.entity || ""}
          .includeDomains=${["alarm_control_panel"]}
          @value-changed=${(e) => this._updateField("entity", e.detail.value)}
        ></ha-entity-picker>
      </div>
      <div class="field">
        <label>Supported Modes (comma-separated)</label>
        <input type="text" .value=${(card.supportedModes || []).join(", ")}
          @input=${(e) => {
            const val = e.target.value;
            this._updateField("supportedModes", val ? val.split(",").map((s) => s.trim()) : undefined);
        }} />
      </div>
    `;
    }
    _renderQRFields() {
        const card = this.card;
        return b `
      <div class="field">
        <label>QR Code Value</label>
        <input type="text" .value=${card.qrCode || ""} placeholder="URL, text, or HA template"
          @input=${(e) => this._updateField("qrCode", e.target.value)} />
      </div>
      ${this._renderEntityList()}
    `;
    }
    _renderPowerFields() {
        const card = this.card;
        return b `
      <div class="field">
        <label>Cooldown (seconds)</label>
        <input type="number" .value=${String(card.cooldown ?? "")}
          @input=${(e) => {
            const v = e.target.value;
            this._updateField("cooldown", v ? Number(v) : undefined);
        }} />
      </div>
      ${this._renderEntityList()}
    `;
    }
};
NspCardEditor.styles = i$3 `
    :host { display: block; }
    .card-editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .field { display: flex; flex-direction: column; gap: 4px; }
    .field label { font-size: 12px; font-weight: 500; color: var(--secondary-text-color); }
    .field input, .field select {
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .field-row { display: flex; gap: 12px; }
    .field-row .field { flex: 1; }
    .section-header { display: flex; justify-content: space-between; align-items: center; }
    .section-header label { font-weight: 600; font-size: 14px; }
    .entity-list { display: flex; flex-direction: column; gap: 8px; }
    .entity-item {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      overflow: hidden;
    }
    .entity-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--card-background-color, white);
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    .entity-grip { cursor: grab; user-select: none; color: var(--secondary-text-color); }
    .entity-label { flex: 1; font-size: 13px; color: var(--primary-text-color); overflow: hidden; text-overflow: ellipsis; }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px 8px; color: var(--error-color, #db4437); }
    .btn-sm { padding: 6px 12px; border: 1px dashed var(--divider-color); border-radius: 4px; background: none; cursor: pointer; font-size: 13px; color: var(--primary-color); }
    details.nav-items summary { cursor: pointer; font-size: 14px; font-weight: 500; color: var(--secondary-text-color); padding: 4px 0; }
    details.nav-items[open] summary { margin-bottom: 12px; }
    details.nav-items { border-top: 1px solid var(--divider-color); padding-top: 8px; }
  `;
__decorate([
    n({ attribute: false })
], NspCardEditor.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], NspCardEditor.prototype, "card", void 0);
__decorate([
    n({ type: Array })
], NspCardEditor.prototype, "hiddenCardKeys", void 0);
NspCardEditor = __decorate([
    t("nsp-card-editor")
], NspCardEditor);

let NspCardList = class NspCardList extends i {
    constructor() {
        super(...arguments);
        this.cards = [];
        this.hiddenCardKeys = [];
        this.label = "Cards";
        this._expandedIndex = null;
        this._showAddDialog = false;
        this._dragIndex = null;
    }
    _fireChanged(cards) {
        this.dispatchEvent(new CustomEvent("cards-changed", { detail: { cards }, bubbles: true, composed: true }));
    }
    _addCard(type) {
        const newCards = [...this.cards, createDefaultCard(type)];
        this._showAddDialog = false;
        this._expandedIndex = newCards.length - 1;
        this._fireChanged(newCards);
    }
    _removeCard(index) {
        if (!confirm(`Remove ${this.cards[index].type}${this.cards[index].title ? ` "${this.cards[index].title}"` : ""}?`))
            return;
        const newCards = this.cards.filter((_, i) => i !== index);
        if (this._expandedIndex === index)
            this._expandedIndex = null;
        else if (this._expandedIndex !== null && this._expandedIndex > index)
            this._expandedIndex--;
        this._fireChanged(newCards);
    }
    _moveCard(from, to) {
        if (from === to)
            return;
        const newCards = [...this.cards];
        const [item] = newCards.splice(from, 1);
        newCards.splice(to, 0, item);
        if (this._expandedIndex === from)
            this._expandedIndex = to;
        else if (this._expandedIndex !== null) {
            if (from < this._expandedIndex && to >= this._expandedIndex)
                this._expandedIndex--;
            else if (from > this._expandedIndex && to <= this._expandedIndex)
                this._expandedIndex++;
        }
        this._fireChanged(newCards);
    }
    _updateCard(index, card) {
        const newCards = [...this.cards];
        newCards[index] = card;
        this._fireChanged(newCards);
    }
    render() {
        return b `
      <div class="card-list">
        <div class="list-header">
          <h3>${this.label} (${this.cards.length})</h3>
          <button class="btn btn-primary" @click=${() => { this._showAddDialog = true; }}>
            + Add Card
          </button>
        </div>

        ${this._showAddDialog ? this._renderAddDialog() : ""}

        ${this.cards.length === 0
            ? b `<p class="empty">No cards yet. Add one to get started.</p>`
            : this.cards.map((card, i) => this._renderCardItem(card, i))}
      </div>
    `;
    }
    _renderAddDialog() {
        return b `
      <div class="add-dialog">
        <p>Select card type:</p>
        <div class="type-grid">
          ${CARD_TYPES.map((type) => b `
              <button class="type-btn" @click=${() => this._addCard(type)}>
                ${type}
              </button>
            `)}
        </div>
        <button class="btn-sm" @click=${() => { this._showAddDialog = false; }}>Cancel</button>
      </div>
    `;
    }
    _renderCardItem(card, index) {
        const isExpanded = this._expandedIndex === index;
        const entityCount = card.entities?.length ?? (card.entity ? 1 : 0);
        const isDragging = this._dragIndex === index;
        return b `
      <div class="card-item ${isDragging ? "dragging" : ""}"
        draggable="true"
        @dragstart=${(e) => {
            this._dragIndex = index;
            e.dataTransfer.setData("text/plain", String(index));
            e.dataTransfer.effectAllowed = "move";
        }}
        @dragend=${() => { this._dragIndex = null; }}
        @dragover=${(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
        @drop=${(e) => {
            e.preventDefault();
            this._dragIndex = null;
            const from = parseInt(e.dataTransfer.getData("text/plain"));
            this._moveCard(from, index);
        }}>
        <div class="card-header" @click=${() => { this._expandedIndex = isExpanded ? null : index; }}>
          <span class="card-grip">⠿</span>
          <span class="card-type">${card.type}</span>
          ${card.title ? b `<span class="card-title">"${card.title}"</span>` : ""}
          ${card.key ? b `<span class="card-key">[${card.key}]</span>` : ""}
          <span class="card-entities">${entityCount} entit${entityCount === 1 ? "y" : "ies"}</span>
          <span class="spacer"></span>
          <button class="btn-icon expand-btn">${isExpanded ? "▼" : "▶"}</button>
          <button class="btn-icon delete-btn" @click=${(e) => { e.stopPropagation(); this._removeCard(index); }}>✕</button>
        </div>
        ${isExpanded ? b `
          <div class="card-body">
            <nsp-card-editor
              .hass=${this.hass}
              .card=${card}
              .hiddenCardKeys=${this.hiddenCardKeys}
              @card-changed=${(e) => this._updateCard(index, e.detail.card)}
            ></nsp-card-editor>
          </div>
        ` : ""}
      </div>
    `;
    }
};
NspCardList.styles = i$3 `
    :host { display: block; }
    .card-list { display: flex; flex-direction: column; gap: 8px; }
    .list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .list-header h3 { margin: 0; font-size: 16px; }
    .btn {
      padding: 8px 16px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 14px;
    }
    .btn-primary {
      background: var(--primary-color, #03a9f4);
      color: white;
      border-color: var(--primary-color, #03a9f4);
    }
    .add-dialog {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
    }
    .add-dialog p { margin: 0 0 12px; font-size: 14px; }
    .type-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 8px;
      margin-bottom: 12px;
    }
    .type-btn {
      padding: 12px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      background: var(--secondary-background-color, #f5f5f5);
      cursor: pointer;
      font-size: 13px;
      text-align: center;
      color: var(--primary-text-color);
    }
    .type-btn:hover { background: var(--primary-color); color: white; }
    .btn-sm { padding: 4px 12px; border: 1px solid var(--divider-color); border-radius: 4px; background: none; cursor: pointer; font-size: 12px; color: var(--secondary-text-color); }
    .card-item {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      background: var(--card-background-color, white);
      overflow: hidden;
      transition: opacity 0.2s;
    }
    .card-item.dragging { opacity: 0.5; }
    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      cursor: pointer;
      user-select: none;
    }
    .card-header:hover { background: var(--secondary-background-color, #f5f5f5); }
    .card-grip { cursor: grab; color: var(--secondary-text-color); }
    .card-type { font-weight: 600; font-size: 14px; }
    .card-title { font-size: 13px; color: var(--secondary-text-color); }
    .card-key { font-size: 12px; color: var(--secondary-text-color); font-family: monospace; }
    .card-entities { font-size: 12px; color: var(--secondary-text-color); }
    .spacer { flex: 1; }
    .btn-icon { background: none; border: none; cursor: pointer; padding: 4px 8px; font-size: 14px; color: var(--secondary-text-color); }
    .delete-btn:hover { color: var(--error-color, #db4437); }
    .card-body { padding: 16px; border-top: 1px solid var(--divider-color, #e0e0e0); }
    .empty { text-align: center; color: var(--secondary-text-color); font-size: 14px; padding: 24px; }
  `;
__decorate([
    n({ attribute: false })
], NspCardList.prototype, "hass", void 0);
__decorate([
    n({ type: Array })
], NspCardList.prototype, "cards", void 0);
__decorate([
    n({ type: Array })
], NspCardList.prototype, "hiddenCardKeys", void 0);
__decorate([
    n({ type: String })
], NspCardList.prototype, "label", void 0);
__decorate([
    r()
], NspCardList.prototype, "_expandedIndex", void 0);
__decorate([
    r()
], NspCardList.prototype, "_showAddDialog", void 0);
__decorate([
    r()
], NspCardList.prototype, "_dragIndex", void 0);
NspCardList = __decorate([
    t("nsp-card-list")
], NspCardList);

let NspYamlPreview = class NspYamlPreview extends i {
    constructor() {
        super(...arguments);
        this._yaml = "";
        this._loading = true;
        this._error = null;
        this._copied = false;
    }
    async connectedCallback() {
        super.connectedCallback();
        await this._loadPreview();
    }
    async _loadPreview() {
        this._loading = true;
        this._error = null;
        try {
            const result = await this.hass.callWS({ type: "nspanel_editor/preview_yaml" });
            this._yaml = result.yaml || "";
        }
        catch (err) {
            this._error = err.message || "Failed to load YAML preview";
        }
        this._loading = false;
    }
    async _copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this._yaml);
            this._copied = true;
            setTimeout(() => { this._copied = false; }, 2000);
        }
        catch {
            // Fallback for older browsers
            const textarea = document.createElement("textarea");
            textarea.value = this._yaml;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            this._copied = true;
            setTimeout(() => { this._copied = false; }, 2000);
        }
    }
    render() {
        if (this._loading) {
            return b `<div class="loading">Loading YAML preview...</div>`;
        }
        if (this._error) {
            return b `<div class="error">${this._error}</div>`;
        }
        return b `
      <div class="yaml-preview">
        <div class="toolbar">
          <button class="btn" @click=${this._loadPreview}>Refresh</button>
          <button class="btn btn-primary" @click=${this._copyToClipboard}>
            ${this._copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
        <pre><code>${this._yaml}</code></pre>
      </div>
    `;
    }
};
NspYamlPreview.styles = i$3 `
    :host { display: block; }
    .yaml-preview { display: flex; flex-direction: column; gap: 12px; }
    .toolbar { display: flex; gap: 8px; justify-content: flex-end; }
    .btn {
      padding: 8px 16px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 14px;
    }
    .btn-primary {
      background: var(--primary-color, #03a9f4);
      color: white;
      border-color: var(--primary-color, #03a9f4);
    }
    pre {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
      overflow: auto;
      max-height: 600px;
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
    }
    code { font-family: "Fira Code", "Consolas", monospace; color: var(--primary-text-color); }
    .loading { text-align: center; padding: 32px; color: var(--secondary-text-color); }
    .error {
      background: var(--error-color, #db4437);
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
    }
  `;
__decorate([
    n({ attribute: false })
], NspYamlPreview.prototype, "hass", void 0);
__decorate([
    r()
], NspYamlPreview.prototype, "_yaml", void 0);
__decorate([
    r()
], NspYamlPreview.prototype, "_loading", void 0);
__decorate([
    r()
], NspYamlPreview.prototype, "_error", void 0);
__decorate([
    r()
], NspYamlPreview.prototype, "_copied", void 0);
NspYamlPreview = __decorate([
    t("nsp-yaml-preview")
], NspYamlPreview);

const TAB_LABELS = {
    settings: "Settings",
    cards: "Cards",
    hiddenCards: "Hidden Cards",
    screensaver: "Screensaver",
    yaml: "YAML Preview",
};
let NspPanelEditor = class NspPanelEditor extends i {
    constructor() {
        super(...arguments);
        this._data = null;
        this._activeTab = "settings";
        this._loading = true;
        this._saving = false;
        this._error = null;
        this._dirty = false;
    }
    async connectedCallback() {
        super.connectedCallback();
        await this._loadPanel();
    }
    async _loadPanel() {
        this._loading = true;
        this._error = null;
        try {
            const result = await this.hass.callWS({
                type: "nspanel_editor/get_panel",
                panel_id: this.panelId,
            });
            this._data = {
                config: result.config || {},
                cards: result.cards || [],
                hiddenCards: result.hiddenCards || [],
                screensaver: result.screensaver || {},
            };
            this._dirty = false;
        }
        catch (err) {
            this._error = err.message || "Failed to load panel";
        }
        this._loading = false;
    }
    async _savePanel() {
        if (!this._data)
            return;
        this._saving = true;
        try {
            await this.hass.callWS({
                type: "nspanel_editor/save_panel",
                panel_id: this.panelId,
                config: this._data.config,
                cards: this._data.cards,
                hiddenCards: this._data.hiddenCards,
                screensaver: this._data.screensaver,
            });
            this._dirty = false;
        }
        catch (err) {
            alert(`Save failed: ${err.message}`);
        }
        this._saving = false;
    }
    async _deletePanel() {
        if (!confirm(`Delete panel "${this.panelId}"? This cannot be undone.`))
            return;
        try {
            await this.hass.callWS({
                type: "nspanel_editor/delete_panel",
                panel_id: this.panelId,
            });
            this._fireBack();
        }
        catch (err) {
            alert(`Delete failed: ${err.message}`);
        }
    }
    _fireBack() {
        this.dispatchEvent(new CustomEvent("back-to-list", { bubbles: true, composed: true }));
    }
    _handleBack() {
        if (this._dirty && !confirm("You have unsaved changes. Discard and go back?"))
            return;
        this._fireBack();
    }
    _onConfigChanged(e) {
        if (!this._data)
            return;
        this._data = { ...this._data, config: e.detail.config };
        this._dirty = true;
    }
    _onCardsChanged(e) {
        if (!this._data)
            return;
        this._data = { ...this._data, cards: e.detail.cards };
        this._dirty = true;
    }
    _onHiddenCardsChanged(e) {
        if (!this._data)
            return;
        this._data = { ...this._data, hiddenCards: e.detail.cards };
        this._dirty = true;
    }
    _getHiddenCardKeys() {
        if (!this._data)
            return [];
        return this._data.hiddenCards
            .map((c) => c.key)
            .filter((k) => !!k);
    }
    render() {
        if (this._loading) {
            return b `<div class="loading">Loading panel configuration...</div>`;
        }
        if (this._error) {
            return b `
        <div class="error-container">
          <div class="error">${this._error}</div>
          <button class="btn" @click=${this._fireBack}>Back to list</button>
        </div>
      `;
        }
        if (!this._data)
            return A;
        return b `
      <div class="panel-editor">
        <div class="header">
          <button class="btn" @click=${this._handleBack}>&larr; Back</button>
          <h2>${this.panelId}</h2>
          ${this._dirty ? b `<span class="dirty-badge">Unsaved</span>` : ""}
          <span class="spacer"></span>
          <button class="btn btn-danger" @click=${this._deletePanel}>Delete Panel</button>
          <button class="btn btn-primary" ?disabled=${this._saving} @click=${this._savePanel}>
            ${this._saving ? "Saving..." : "Save"}
          </button>
        </div>

        <div class="tabs">
          ${Object.keys(TAB_LABELS).map((tab) => b `
              <button class="tab ${this._activeTab === tab ? "active" : ""}"
                @click=${() => { this._activeTab = tab; }}>
                ${TAB_LABELS[tab]}
                ${tab === "cards" ? b `<span class="count">${this._data.cards.length}</span>` : ""}
                ${tab === "hiddenCards" ? b `<span class="count">${this._data.hiddenCards.length}</span>` : ""}
              </button>
            `)}
        </div>

        <div class="tab-content">
          ${this._renderActiveTab()}
        </div>
      </div>
    `;
    }
    _renderActiveTab() {
        if (!this._data)
            return A;
        switch (this._activeTab) {
            case "settings":
                return b `
          <nsp-settings-editor
            .hass=${this.hass}
            .config=${this._data.config}
            @config-changed=${this._onConfigChanged}
          ></nsp-settings-editor>
        `;
            case "cards":
                return b `
          <nsp-card-list
            .hass=${this.hass}
            .cards=${this._data.cards}
            .hiddenCardKeys=${this._getHiddenCardKeys()}
            label="Cards"
            @cards-changed=${this._onCardsChanged}
          ></nsp-card-list>
        `;
            case "hiddenCards":
                return b `
          <nsp-card-list
            .hass=${this.hass}
            .cards=${this._data.hiddenCards}
            .hiddenCardKeys=${this._getHiddenCardKeys()}
            label="Hidden Cards"
            @cards-changed=${this._onHiddenCardsChanged}
          ></nsp-card-list>
        `;
            case "screensaver":
                return this._renderScreensaverReadonly();
            case "yaml":
                return b `
          <nsp-yaml-preview .hass=${this.hass}></nsp-yaml-preview>
        `;
        }
    }
    _renderScreensaverReadonly() {
        const sc = this._data?.screensaver;
        if (!sc || Object.keys(sc).length === 0) {
            return b `<p class="empty">No screensaver configured. Full screensaver editor coming in a future update.</p>`;
        }
        return b `
      <div class="screensaver-readonly">
        <p class="hint">Screensaver config (read-only). Full editor coming in a future update.</p>
        <pre><code>${JSON.stringify(sc, null, 2)}</code></pre>
      </div>
    `;
    }
};
NspPanelEditor.styles = i$3 `
    :host { display: block; }
    .panel-editor { display: flex; flex-direction: column; gap: 16px; }
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .header h2 { margin: 0; }
    .spacer { flex: 1; }
    .dirty-badge {
      background: var(--warning-color, #ffa726);
      color: white;
      padding: 2px 10px;
      border-radius: 10px;
      font-size: 12px;
    }
    .btn {
      padding: 8px 16px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 14px;
    }
    .btn:hover { background: var(--secondary-background-color, #f5f5f5); }
    .btn-primary {
      background: var(--primary-color, #03a9f4);
      color: white;
      border-color: var(--primary-color, #03a9f4);
    }
    .btn-primary:hover { opacity: 0.9; }
    .btn-danger {
      color: var(--error-color, #db4437);
      border-color: var(--error-color, #db4437);
    }
    .btn-danger:hover { background: var(--error-color, #db4437); color: white; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .tabs {
      display: flex;
      gap: 0;
      border-bottom: 2px solid var(--divider-color, #e0e0e0);
      overflow-x: auto;
    }
    .tab {
      padding: 10px 20px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 14px;
      color: var(--secondary-text-color);
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .tab:hover { color: var(--primary-text-color); }
    .tab.active {
      color: var(--primary-color, #03a9f4);
      border-bottom-color: var(--primary-color, #03a9f4);
      font-weight: 500;
    }
    .count {
      background: var(--secondary-background-color, #e0e0e0);
      padding: 1px 7px;
      border-radius: 10px;
      font-size: 11px;
    }
    .tab.active .count { background: var(--primary-color, #03a9f4); color: white; }
    .tab-content { min-height: 200px; }
    .loading { text-align: center; padding: 48px; color: var(--secondary-text-color); }
    .error-container { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
    .error {
      background: var(--error-color, #db4437);
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
      width: 100%;
      box-sizing: border-box;
    }
    .empty { text-align: center; color: var(--secondary-text-color); padding: 32px; }
    .screensaver-readonly { display: flex; flex-direction: column; gap: 8px; }
    .hint { color: var(--secondary-text-color); font-size: 13px; font-style: italic; margin: 0; }
    pre {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
      overflow: auto;
      max-height: 400px;
      font-size: 13px;
      margin: 0;
    }
    code { font-family: "Fira Code", "Consolas", monospace; }
  `;
__decorate([
    n({ attribute: false })
], NspPanelEditor.prototype, "hass", void 0);
__decorate([
    n({ type: String })
], NspPanelEditor.prototype, "panelId", void 0);
__decorate([
    r()
], NspPanelEditor.prototype, "_data", void 0);
__decorate([
    r()
], NspPanelEditor.prototype, "_activeTab", void 0);
__decorate([
    r()
], NspPanelEditor.prototype, "_loading", void 0);
__decorate([
    r()
], NspPanelEditor.prototype, "_saving", void 0);
__decorate([
    r()
], NspPanelEditor.prototype, "_error", void 0);
__decorate([
    r()
], NspPanelEditor.prototype, "_dirty", void 0);
NspPanelEditor = __decorate([
    t("nsp-panel-editor")
], NspPanelEditor);

let NsPanelLovelaceEditor = class NsPanelLovelaceEditor extends i {
    constructor() {
        super(...arguments);
        this.narrow = false;
        this._panels = {};
        this._selectedPanel = null;
        this._loading = true;
        this._error = null;
    }
    async connectedCallback() {
        super.connectedCallback();
        await this._loadPanels();
    }
    async _loadPanels() {
        this._loading = true;
        this._error = null;
        try {
            const result = await this.hass.callWS({
                type: "nspanel_editor/list_panels",
            });
            this._panels = result.panels || {};
        }
        catch (err) {
            this._error = err.message || "Failed to load panels";
        }
        this._loading = false;
    }
    _selectPanel(e) {
        this._selectedPanel = e.detail.panelId;
    }
    _backToList() {
        this._selectedPanel = null;
        this._loadPanels();
    }
    render() {
        if (this._loading) {
            return b `
        <div class="container">
          <div class="loading">Loading NSPanel configurations...</div>
        </div>
      `;
        }
        if (this._selectedPanel) {
            return b `
        <div class="container">
          <nsp-panel-editor
            .hass=${this.hass}
            .panelId=${this._selectedPanel}
            @back-to-list=${this._backToList}
          ></nsp-panel-editor>
        </div>
      `;
        }
        return b `
      <div class="container">
        ${this._error ? b `<div class="error">${this._error}</div>` : ""}
        <nsp-panel-list
          .hass=${this.hass}
          .panels=${this._panels}
          @panel-selected=${this._selectPanel}
          @refresh-panels=${this._loadPanels}
        ></nsp-panel-list>
      </div>
    `;
    }
};
NsPanelLovelaceEditor.styles = i$3 `
    :host {
      display: block;
      padding: 16px;
      background: var(--primary-background-color, #fafafa);
      min-height: 100vh;
      font-family: var(--paper-font-body1_-_font-family, "Roboto", sans-serif);
      color: var(--primary-text-color, #212121);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .loading {
      text-align: center;
      padding: 48px;
    }

    .error {
      background: var(--error-color, #db4437);
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
      margin-bottom: 16px;
    }
  `;
__decorate([
    n({ attribute: false })
], NsPanelLovelaceEditor.prototype, "hass", void 0);
__decorate([
    n({ type: Boolean })
], NsPanelLovelaceEditor.prototype, "narrow", void 0);
__decorate([
    n({ attribute: false })
], NsPanelLovelaceEditor.prototype, "route", void 0);
__decorate([
    n({ attribute: false })
], NsPanelLovelaceEditor.prototype, "panel", void 0);
__decorate([
    r()
], NsPanelLovelaceEditor.prototype, "_panels", void 0);
__decorate([
    r()
], NsPanelLovelaceEditor.prototype, "_selectedPanel", void 0);
__decorate([
    r()
], NsPanelLovelaceEditor.prototype, "_loading", void 0);
__decorate([
    r()
], NsPanelLovelaceEditor.prototype, "_error", void 0);
NsPanelLovelaceEditor = __decorate([
    t("nspanel-lovelace-editor")
], NsPanelLovelaceEditor);
