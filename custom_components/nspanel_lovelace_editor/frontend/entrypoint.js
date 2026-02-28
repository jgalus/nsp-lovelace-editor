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
const t$3=globalThis,e$4=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$5=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$5.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$3,defineProperty:e$3,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$4,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$3(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$3(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$4(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$2=t=>t,s$1=t$2.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$3=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$3,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$3+x):s+o$3+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$3),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$3)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$3),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$3,t+1));)d.push({type:7,index:l}),t+=o$3.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$2(t).nextSibling;i$2(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$2.litHtmlPolyfillSupport;B?.(S,k),(t$2.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$1 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$1._$litElement$=true,i$1["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$1});const o$2=s.litElementPolyfillSupport;o$2?.({LitElement:i$1});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

/**
 * Ensure Home Assistant frontend components (like ha-entity-picker) are loaded.
 *
 * HA lazy-loads many web-components; custom panels need to trigger the load
 * explicitly.  `loadCardHelpers()` is the de-facto standard way custom
 * integrations achieve this.
 */
async function loadHaComponents() {
    // loadCardHelpers is injected by the HA frontend and triggers loading of
    // card-related web-components (entity-picker, icon-picker, etc.)
    if (window.loadCardHelpers) {
        try {
            await window.loadCardHelpers();
        }
        catch {
            // ignore – fallback picker will be used
        }
    }
}

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
const CLIMATE_MODES = [
    "off", "heat", "cool", "auto", "dry", "fan_only",
];
const ALARM_MODES = [
    "arm_home", "arm_away", "arm_night", "arm_vacation", "arm_custom_bypass",
];
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
function createDefaultPanelConfig() {
    return {
        panelRecvTopic: "cmnd/tasmota_your_mqtt_topic/CustomSend",
        panelSendTopic: "tele/tasmota_your_mqtt_topic/RESULT",
        model: "eu",
        updateMode: "auto-notify",
        locale: "en_US",
    };
}
function createDefaultPanelData() {
    return {
        config: createDefaultPanelConfig(),
        cards: [],
        hiddenCards: [],
        screensaver: {},
    };
}

let NspImportExport = class NspImportExport extends i$1 {
    constructor() {
        super(...arguments);
        this._tab = "file";
        this._pasteText = "";
        this._loading = false;
        this._importStatus = null;
        this._exportStatus = null;
        this._pathStatus = null;
        this._checkingPath = false;
        this._yamlPreview = "";
        this._previewLoading = false;
        this._copied = false;
        this._showExport = false;
    }
    async connectedCallback() {
        super.connectedCallback();
        await this._checkPath();
    }
    async _checkPath() {
        this._checkingPath = true;
        try {
            const result = await this.hass.callWS({ type: "nspanel_editor/check_yaml_path" });
            this._pathStatus = result;
            // Derive accessibility: file must exist and be readable
            if (!result.exists || !result.readable)
                this._tab = "paste";
        }
        catch {
            this._pathStatus = null;
            this._tab = "paste";
        }
        this._checkingPath = false;
    }
    async _importFromFile() {
        this._loading = true;
        this._importStatus = null;
        try {
            const result = await this.hass.callWS({ type: "nspanel_editor/import_yaml" });
            this._importStatus = {
                type: "success",
                message: `Imported ${result.count} panel(s): ${result.imported.join(", ")}`,
            };
            this._fireRefresh();
        }
        catch (err) {
            this._importStatus = { type: "error", message: err.message || "Import failed" };
        }
        this._loading = false;
    }
    async _importFromPaste() {
        if (!this._pasteText.trim())
            return;
        this._loading = true;
        this._importStatus = null;
        try {
            const result = await this.hass.callWS({
                type: "nspanel_editor/import_yaml_text",
                yaml_text: this._pasteText,
            });
            this._importStatus = {
                type: "success",
                message: `Imported ${result.count} panel(s): ${result.imported.join(", ")}`,
            };
            this._pasteText = "";
            this._fireRefresh();
        }
        catch (err) {
            this._importStatus = { type: "error", message: err.message || "Import failed" };
        }
        this._loading = false;
    }
    async _loadPreview() {
        this._previewLoading = true;
        this._yamlPreview = "";
        try {
            const result = await this.hass.callWS({ type: "nspanel_editor/preview_yaml" });
            this._yamlPreview = result.yaml || "";
        }
        catch (err) {
            this._exportStatus = { type: "error", message: err.message || "Failed to load YAML preview" };
        }
        this._previewLoading = false;
    }
    async _exportToFile() {
        this._loading = true;
        this._exportStatus = null;
        try {
            const result = await this.hass.callWS({ type: "nspanel_editor/export_yaml" });
            this._exportStatus = {
                type: "success",
                message: `Exported ${result.count} panel(s) to apps.yaml: ${result.exported.join(", ")}`,
            };
        }
        catch (err) {
            const code = err.code || "";
            let hint = "";
            if (code === "permission_denied") {
                hint = " Ensure Home Assistant has write access to the AppDaemon directory.";
            }
            else if (code === "not_configured") {
                hint = " Configure the AppDaemon apps.yaml path in the integration settings.";
            }
            this._exportStatus = { type: "error", message: (err.message || "Export failed") + hint };
        }
        this._loading = false;
    }
    async _copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this._yamlPreview);
            this._copied = true;
            setTimeout(() => { this._copied = false; }, 2000);
        }
        catch { /* clipboard unavailable */ }
    }
    _fireRefresh() {
        this.dispatchEvent(new CustomEvent("refresh-panels", { bubbles: true, composed: true }));
    }
    _toggleExport() {
        this._showExport = !this._showExport;
        if (this._showExport && !this._yamlPreview && !this._previewLoading) {
            this._loadPreview();
        }
    }
    render() {
        return b `
      <div class="import-export">
        <div class="section">
          <h3>Import</h3>
          <div class="tabs">
            <button
              class="tab ${this._tab === "file" ? "active" : ""}"
              @click=${() => { this._tab = "file"; }}
            >From apps.yaml File</button>
            <button
              class="tab ${this._tab === "paste" ? "active" : ""}"
              @click=${() => { this._tab = "paste"; }}
            >Paste YAML</button>
          </div>
          ${this._importStatus
            ? b `
                <div class="status-banner ${this._importStatus.type}">
                  ${this._importStatus.message}
                  <button class="dismiss" @click=${() => { this._importStatus = null; }}>&times;</button>
                </div>
              `
            : ""}
          ${this._tab === "file" ? this._renderFileImport() : this._renderPasteImport()}
        </div>

        <div class="section">
          <button
            type="button"
            class="section-header"
            @click=${this._toggleExport}
            aria-expanded=${this._showExport ? "true" : "false"}
          >
            <h3>Export / YAML Preview</h3>
            <span class="chevron">${this._showExport ? "▲" : "▼"}</span>
          </button>
          ${this._showExport ? this._renderExport() : ""}
        </div>
      </div>
    `;
    }
    _renderFileImport() {
        const pathOk = this._pathStatus?.exists && this._pathStatus?.readable;
        return b `
      <div class="tab-content">
        <p class="description">Import all NSPanel configurations from the configured apps.yaml file.</p>
        ${this._checkingPath
            ? b `<div class="hint">Checking apps.yaml accessibility…</div>`
            : ""}
        ${!this._checkingPath && this._pathStatus !== null && (!this._pathStatus.exists || !this._pathStatus.readable)
            ? b `
              <div class="warning">
                ⚠
                ${this._pathStatus.exists
                ? "apps.yaml exists but is not readable by Home Assistant."
                : this._pathStatus.parent_writable
                    ? "apps.yaml does not exist yet. Home Assistant can still create it on export, but file-based import is not possible."
                    : "apps.yaml does not exist and Home Assistant cannot write to the configured directory."}
                ${this._pathStatus.error
                ? b `<div class="hint">${this._pathStatus.error}</div>`
                : ""}
                Use
                <button class="link-btn" @click=${() => { this._tab = "paste"; }}>
                  paste-based import
                </button>
                instead.
              </div>
            `
            : ""}
        ${!this._checkingPath && this._pathStatus === null
            ? b `
              <div class="warning">
                ⚠ apps.yaml path could not be verified.
                Use <button class="link-btn" @click=${() => { this._tab = "paste"; }}>paste-based import</button> instead.
              </div>
            `
            : ""}
        <button
          class="btn btn-primary"
          ?disabled=${this._loading || this._checkingPath || !pathOk}
          @click=${this._importFromFile}
        >
          ${this._loading ? "Importing…" : "Import from apps.yaml"}
        </button>
      </div>
    `;
    }
    _renderPasteImport() {
        return b `
      <div class="tab-content">
        <p class="description">
          Paste the contents of your apps.yaml file. Useful for container setups
          where the file is not directly accessible from Home Assistant.
        </p>
        <textarea
          rows="10"
          placeholder="Paste your apps.yaml content here…"
          .value=${this._pasteText}
          @input=${(e) => { this._pasteText = e.target.value; }}
        ></textarea>
        <div class="actions">
          <button
            class="btn btn-primary"
            ?disabled=${this._loading || !this._pasteText.trim()}
            @click=${this._importFromPaste}
          >
            ${this._loading ? "Importing…" : "Import"}
          </button>
        </div>
      </div>
    `;
    }
    _renderExport() {
        return b `
      <div class="tab-content">
        <div class="export-actions">
          <button
            class="btn"
            ?disabled=${this._previewLoading}
            @click=${this._loadPreview}
          >${this._previewLoading ? "Loading…" : "Refresh Preview"}</button>
          <button
            class="btn btn-primary"
            ?disabled=${!this._yamlPreview}
            @click=${this._copyToClipboard}
          >${this._copied ? "Copied!" : "Copy to Clipboard"}</button>
          <button
            class="btn btn-export"
            ?disabled=${this._loading || !(this._pathStatus?.writable || (!this._pathStatus?.exists && this._pathStatus?.parent_writable))}
            @click=${this._exportToFile}
          >${this._loading ? "Exporting…" : "Export to apps.yaml"}</button>
        </div>
        ${this._exportStatus
            ? b `
              <div class="status-banner ${this._exportStatus.type}">
                ${this._exportStatus.message}
                <button class="dismiss" @click=${() => { this._exportStatus = null; }}>&times;</button>
              </div>
            `
            : ""}
        ${!this._checkingPath && this._pathStatus !== null && !this._pathStatus.writable && !(!this._pathStatus.exists && this._pathStatus.parent_writable)
            ? b `
              <div class="warning">
                ⚠ apps.yaml is not writable. Copy the YAML to clipboard and paste it manually.
              </div>
            `
            : ""}
        ${this._previewLoading
            ? b `<div class="loading">Loading YAML preview…</div>`
            : ""}
        ${this._yamlPreview
            ? b `<pre><code>${this._yamlPreview}</code></pre>`
            : ""}
      </div>
    `;
    }
};
NspImportExport.styles = i$4 `
    :host { display: block; }
    .import-export { display: flex; flex-direction: column; gap: 16px; }
    .section {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
    }
    .section h3 { margin: 0 0 12px; font-size: 16px; }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      user-select: none;
      width: 100%;
      background: none;
      border: none;
      padding: 0;
      text-align: left;
      color: inherit;
      font: inherit;
    }
    .section-header:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); border-radius: 4px; }
    .section-header h3 { margin: 0; }
    .chevron { color: var(--secondary-text-color); font-size: 12px; }
    .tabs {
      display: flex;
      border-bottom: 2px solid var(--divider-color, #e0e0e0);
      margin-bottom: 16px;
    }
    .tab {
      padding: 8px 16px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 14px;
      color: var(--secondary-text-color);
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
    }
    .tab:hover { color: var(--primary-text-color); }
    .tab.active {
      color: var(--primary-color, #03a9f4);
      border-bottom-color: var(--primary-color, #03a9f4);
      font-weight: 500;
    }
    .tab-content { display: flex; flex-direction: column; gap: 12px; }
    .description { margin: 0; color: var(--secondary-text-color); font-size: 14px; }
    .hint { color: var(--secondary-text-color); font-size: 13px; font-style: italic; }
    .warning {
      background: var(--warning-color, #ffa726);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 13px;
    }
    .actions { display: flex; justify-content: flex-end; }
    .export-actions { display: flex; gap: 8px; flex-wrap: wrap; }
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
    .btn-export {
      background: var(--success-color, #4caf50);
      color: white;
      border-color: var(--success-color, #4caf50);
    }
    .btn-export:hover { opacity: 0.9; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .link-btn {
      background: none;
      border: none;
      color: white;
      text-decoration: underline;
      cursor: pointer;
      font-size: inherit;
      padding: 0;
    }
    textarea {
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
    pre {
      background: var(--secondary-background-color, #f5f5f5);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      padding: 12px;
      overflow: auto;
      max-height: 400px;
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
    }
    code { font-family: "Fira Code", "Consolas", monospace; color: var(--primary-text-color); }
    .loading { text-align: center; padding: 16px; color: var(--secondary-text-color); }
    .status-banner {
      padding: 10px 12px;
      border-radius: 4px;
      font-size: 14px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 8px;
    }
    .status-banner.success { background: var(--success-color, #4caf50); color: white; }
    .status-banner.error { background: var(--error-color, #db4437); color: white; }
    .dismiss {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 18px;
      padding: 0;
      margin-left: auto;
      line-height: 1;
    }
  `;
__decorate([
    n({ attribute: false })
], NspImportExport.prototype, "hass", void 0);
__decorate([
    r()
], NspImportExport.prototype, "_tab", void 0);
__decorate([
    r()
], NspImportExport.prototype, "_pasteText", void 0);
__decorate([
    r()
], NspImportExport.prototype, "_loading", void 0);
__decorate([
    r()
], NspImportExport.prototype, "_importStatus", void 0);
__decorate([
    r()
], NspImportExport.prototype, "_exportStatus", void 0);
__decorate([
    r()
], NspImportExport.prototype, "_pathStatus", void 0);
__decorate([
    r()
], NspImportExport.prototype, "_checkingPath", void 0);
__decorate([
    r()
], NspImportExport.prototype, "_yamlPreview", void 0);
__decorate([
    r()
], NspImportExport.prototype, "_previewLoading", void 0);
__decorate([
    r()
], NspImportExport.prototype, "_copied", void 0);
__decorate([
    r()
], NspImportExport.prototype, "_showExport", void 0);
NspImportExport = __decorate([
    t$1("nsp-import-export")
], NspImportExport);

const PANEL_ID_RE = /^[a-zA-Z0-9_-]{1,64}$/;
let NspPanelList = class NspPanelList extends i$1 {
    constructor() {
        super(...arguments);
        this.panels = {};
        // Add-panel form
        this._showAddForm = false;
        this._newPanelId = "";
        this._addError = null;
        this._adding = false;
        // Per-panel inline actions
        this._pendingDelete = null;
        this._pendingClone = null;
        this._cloneNewId = "";
        this._cloneError = null;
        this._cloning = false;
        this._pendingRename = null;
        this._renameNewId = "";
        this._renameError = null;
        this._renaming = false;
        // Status feedback
        this._status = null;
        // Show import/export section
        this._showImportExport = false;
    }
    _fireSelect(panelId) {
        this.dispatchEvent(new CustomEvent("panel-selected", { detail: { panelId }, bubbles: true, composed: true }));
    }
    _fireRefresh() {
        this.dispatchEvent(new CustomEvent("refresh-panels", { bubbles: true, composed: true }));
    }
    async _addNewPanel() {
        const id = this._newPanelId.trim();
        if (!id) {
            this._addError = "Panel ID is required.";
            return;
        }
        if (!PANEL_ID_RE.test(id)) {
            this._addError = "Panel ID must be 1–64 alphanumeric, hyphen, or underscore characters.";
            return;
        }
        if (this.panels[id]) {
            this._addError = `A panel with ID "${id}" already exists.`;
            return;
        }
        this._adding = true;
        this._addError = null;
        try {
            const defaults = createDefaultPanelData();
            defaults.config.panelRecvTopic = `cmnd/${id}/CustomSend`;
            defaults.config.panelSendTopic = `tele/${id}/RESULT`;
            await this.hass.callWS({
                type: "nspanel_editor/save_panel",
                panel_id: id,
                config: defaults.config,
                cards: defaults.cards,
                hiddenCards: defaults.hiddenCards,
                screensaver: defaults.screensaver,
            });
            this._showAddForm = false;
            this._newPanelId = "";
            this._fireRefresh();
        }
        catch (err) {
            this._addError = err.message || "Failed to create panel";
        }
        this._adding = false;
    }
    async _deletePanel(id) {
        try {
            await this.hass.callWS({ type: "nspanel_editor/delete_panel", panel_id: id });
            this._pendingDelete = null;
            this._status = { type: "success", message: `Panel "${id}" deleted.` };
            this._fireRefresh();
        }
        catch (err) {
            this._pendingDelete = null;
            this._status = { type: "error", message: err.message || "Delete failed" };
        }
    }
    async _clonePanel() {
        const srcId = this._pendingClone;
        const newId = this._cloneNewId.trim();
        if (!newId) {
            this._cloneError = "New panel ID is required.";
            return;
        }
        if (!PANEL_ID_RE.test(newId)) {
            this._cloneError = "Panel ID must be 1–64 alphanumeric, hyphen, or underscore characters.";
            return;
        }
        if (this.panels[newId]) {
            this._cloneError = `A panel with ID "${newId}" already exists.`;
            return;
        }
        this._cloning = true;
        this._cloneError = null;
        try {
            const src = await this.hass.callWS({ type: "nspanel_editor/get_panel", panel_id: srcId });
            await this.hass.callWS({
                type: "nspanel_editor/save_panel",
                panel_id: newId,
                config: src.config || {},
                cards: src.cards || [],
                hiddenCards: src.hiddenCards || [],
                screensaver: src.screensaver || {},
            });
            this._pendingClone = null;
            this._cloneNewId = "";
            this._status = { type: "success", message: `Panel "${srcId}" cloned as "${newId}".` };
            this._fireRefresh();
        }
        catch (err) {
            this._cloneError = err.message || "Clone failed";
        }
        this._cloning = false;
    }
    async _renamePanel() {
        const oldId = this._pendingRename;
        const newId = this._renameNewId.trim();
        if (!newId) {
            this._renameError = "New panel ID is required.";
            return;
        }
        if (newId === oldId) {
            this._renameError = "New ID must differ from current ID.";
            return;
        }
        if (!PANEL_ID_RE.test(newId)) {
            this._renameError = "Panel ID must be 1–64 alphanumeric, hyphen, or underscore characters.";
            return;
        }
        if (this.panels[newId]) {
            this._renameError = `A panel with ID "${newId}" already exists.`;
            return;
        }
        this._renaming = true;
        this._renameError = null;
        try {
            const src = await this.hass.callWS({ type: "nspanel_editor/get_panel", panel_id: oldId });
            await this.hass.callWS({
                type: "nspanel_editor/save_panel",
                panel_id: newId,
                config: src.config || {},
                cards: src.cards || [],
                hiddenCards: src.hiddenCards || [],
                screensaver: src.screensaver || {},
            });
            await this.hass.callWS({ type: "nspanel_editor/delete_panel", panel_id: oldId });
            this._pendingRename = null;
            this._renameNewId = "";
            this._status = { type: "success", message: `Panel renamed from "${oldId}" to "${newId}".` };
            this._fireRefresh();
        }
        catch (err) {
            this._renameError = err.message || "Rename failed";
        }
        this._renaming = false;
    }
    render() {
        const panelIds = Object.keys(this.panels);
        return b `
      <div class="panel-list">
        <div class="header">
          <h1>NSPanel Lovelace Editor</h1>
          <div class="actions">
            <button class="btn btn-primary" @click=${() => { this._showAddForm = !this._showAddForm; this._addError = null; this._newPanelId = ""; }}>+ New Panel</button>
            <button class="btn" @click=${() => { this._showImportExport = !this._showImportExport; }}>
              ${this._showImportExport ? "Hide Import/Export" : "Import / Export"}
            </button>
          </div>
        </div>

        ${this._status
            ? b `
              <div class="status-banner ${this._status.type}">
                ${this._status.message}
                <button class="dismiss" @click=${() => { this._status = null; }}>&times;</button>
              </div>
            `
            : ""}

        ${this._showAddForm ? this._renderAddForm() : ""}

        ${this._showImportExport
            ? b `
              <div class="import-export-wrap">
                <nsp-import-export
                  .hass=${this.hass}
                  @refresh-panels=${this._fireRefresh}
                ></nsp-import-export>
              </div>
            `
            : ""}

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
    _renderAddForm() {
        return b `
      <div class="inline-form">
        <h3>New Panel</h3>
        <div class="form-row">
          <input
            type="text"
            placeholder="Panel ID (e.g., nspanel-bedroom)"
            .value=${this._newPanelId}
            @input=${(e) => { this._newPanelId = e.target.value; this._addError = null; }}
            @keydown=${(e) => { if (e.key === "Enter")
            this._addNewPanel(); }}
          />
          <button class="btn btn-primary" ?disabled=${this._adding} @click=${this._addNewPanel}>
            ${this._adding ? "Creating…" : "Create"}
          </button>
          <button class="btn" @click=${() => { this._showAddForm = false; this._newPanelId = ""; this._addError = null; }}>Cancel</button>
        </div>
        ${this._addError ? b `<div class="field-error">${this._addError}</div>` : ""}
        <p class="hint">ID must be 1–64 alphanumeric, hyphen, or underscore characters.</p>
      </div>
    `;
    }
    _renderPanelCard(id, panel) {
        const isDeleting = this._pendingDelete === id;
        const isCloning = this._pendingClone === id;
        const isRenaming = this._pendingRename === id;
        return b `
      <div class="panel-card">
        <div
          class="card-main"
          role="button"
          tabindex="0"
          @click=${() => { if (!isDeleting && !isCloning && !isRenaming)
            this._fireSelect(id); }}
          @keydown=${(e) => { if ((e.key === "Enter" || e.key === " ") && !isDeleting && !isCloning && !isRenaming) {
            e.preventDefault();
            this._fireSelect(id);
        } }}
        >
          <h3>${id}</h3>
          <div class="panel-info">
            <span>Model: ${panel.model?.toUpperCase() || "EU"}</span>
            <span>Cards: ${panel.card_count}</span>
            ${panel.hidden_card_count > 0 ? b `<span>Hidden: ${panel.hidden_card_count}</span>` : ""}
            ${panel.has_screensaver ? b `<span class="badge">Screensaver</span>` : ""}
          </div>
        </div>
        <div class="card-actions" @click=${(e) => e.stopPropagation()}>
          ${!isDeleting && !isCloning && !isRenaming
            ? b `
                <button class="btn-icon" title="Rename" aria-label="Rename panel ${id}" @click=${() => { this._pendingRename = id; this._renameNewId = id; this._renameError = null; }}>✏️</button>
                <button class="btn-icon" title="Clone" aria-label="Clone panel ${id}" @click=${() => { this._pendingClone = id; this._cloneNewId = ""; this._cloneError = null; }}>⧉</button>
                <button class="btn-icon btn-danger" title="Delete" aria-label="Delete panel ${id}" @click=${() => { this._pendingDelete = id; }}>🗑</button>
              `
            : ""}
        </div>

        ${isDeleting
            ? b `
              <div class="confirm-row">
                <span>Delete "${id}"?</span>
                <button class="btn btn-danger-sm" @click=${() => this._deletePanel(id)}>Delete</button>
                <button class="btn btn-sm" @click=${() => { this._pendingDelete = null; }}>Cancel</button>
              </div>
            `
            : ""}

        ${isCloning
            ? b `
              <div class="action-form">
                <span class="action-label">Clone as:</span>
                <input
                  type="text"
                  placeholder="New panel ID"
                  .value=${this._cloneNewId}
                  @input=${(e) => { this._cloneNewId = e.target.value; this._cloneError = null; }}
                  @keydown=${(e) => { if (e.key === "Enter")
                this._clonePanel(); if (e.key === "Escape") {
                this._pendingClone = null;
            } }}
                />
                <button class="btn btn-primary-sm" ?disabled=${this._cloning} @click=${this._clonePanel}>
                  ${this._cloning ? "…" : "Clone"}
                </button>
                <button class="btn btn-sm" @click=${() => { this._pendingClone = null; this._cloneNewId = ""; this._cloneError = null; }}>Cancel</button>
                ${this._cloneError ? b `<div class="field-error">${this._cloneError}</div>` : ""}
              </div>
            `
            : ""}

        ${isRenaming
            ? b `
              <div class="action-form">
                <span class="action-label">New ID:</span>
                <input
                  type="text"
                  .value=${this._renameNewId}
                  @input=${(e) => { this._renameNewId = e.target.value; this._renameError = null; }}
                  @keydown=${(e) => { if (e.key === "Enter")
                this._renamePanel(); if (e.key === "Escape") {
                this._pendingRename = null;
            } }}
                />
                <button class="btn btn-primary-sm" ?disabled=${this._renaming} @click=${this._renamePanel}>
                  ${this._renaming ? "…" : "Rename"}
                </button>
                <button class="btn btn-sm" @click=${() => { this._pendingRename = null; this._renameNewId = ""; this._renameError = null; }}>Cancel</button>
                ${this._renameError ? b `<div class="field-error">${this._renameError}</div>` : ""}
              </div>
            `
            : ""}
      </div>
    `;
    }
};
NspPanelList.styles = i$4 `
    :host { display: block; }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
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
    .status-banner {
      padding: 10px 14px;
      border-radius: 4px;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .status-banner.success { background: var(--success-color, #4caf50); color: white; }
    .status-banner.error { background: var(--error-color, #db4437); color: white; }
    .dismiss {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 18px;
      padding: 0;
      margin-left: auto;
      line-height: 1;
    }
    .inline-form {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .inline-form h3 { margin: 0 0 12px; }
    .form-row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .form-row input {
      flex: 1;
      min-width: 200px;
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .hint { margin: 8px 0 0; font-size: 12px; color: var(--secondary-text-color); }
    .field-error { color: var(--error-color, #db4437); font-size: 12px; margin-top: 4px; width: 100%; }
    .import-export-wrap { margin-bottom: 16px; }
    .panel-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .panel-card {
      background: var(--card-background-color, white);
      border-radius: 8px;
      padding: 16px;
      border: 1px solid var(--divider-color, #e0e0e0);
      transition: box-shadow 0.2s;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .panel-card:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
    .card-main { cursor: pointer; flex: 1; }
    .card-main:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); border-radius: 4px; }
    .card-main h3 { margin: 0 0 8px 0; }
    .card-actions { display: flex; gap: 4px; justify-content: flex-end; }
    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px;
      border-radius: 4px;
      opacity: 0.6;
      line-height: 1;
    }
    .btn-icon:hover { opacity: 1; background: var(--secondary-background-color, #f5f5f5); }
    .btn-danger { color: var(--error-color, #db4437); }
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
    .confirm-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      background: var(--secondary-background-color, #fff3e0);
      border-radius: 4px;
      font-size: 13px;
      flex-wrap: wrap;
    }
    .confirm-row span { flex: 1; }
    .action-form {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 4px;
      flex-wrap: wrap;
    }
    .action-label { font-size: 13px; color: var(--secondary-text-color); white-space: nowrap; }
    .action-form input {
      flex: 1;
      min-width: 120px;
      padding: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 13px;
    }
    .btn-primary-sm {
      padding: 5px 10px;
      border: 1px solid var(--primary-color, #03a9f4);
      border-radius: 4px;
      background: var(--primary-color, #03a9f4);
      color: white;
      cursor: pointer;
      font-size: 13px;
    }
    .btn-primary-sm:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-sm {
      padding: 5px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 13px;
    }
    .btn-danger-sm {
      padding: 5px 10px;
      border: 1px solid var(--error-color, #db4437);
      border-radius: 4px;
      background: var(--error-color, #db4437);
      color: white;
      cursor: pointer;
      font-size: 13px;
    }
  `;
__decorate([
    n({ attribute: false })
], NspPanelList.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], NspPanelList.prototype, "panels", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_showAddForm", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_newPanelId", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_addError", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_adding", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_pendingDelete", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_pendingClone", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_cloneNewId", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_cloneError", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_cloning", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_pendingRename", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_renameNewId", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_renameError", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_renaming", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_status", void 0);
__decorate([
    r()
], NspPanelList.prototype, "_showImportExport", void 0);
NspPanelList = __decorate([
    t$1("nsp-panel-list")
], NspPanelList);

/**
 * Self-contained entity picker that works without HA's built-in
 * `ha-entity-picker`.  Uses `hass.states` for suggestions and fires
 * `value-changed` with the same shape as the HA component.
 */
let NspEntityPicker = class NspEntityPicker extends i$1 {
    constructor() {
        super(...arguments);
        this.value = "";
        this.includeDomains = [];
        this.allowCustomEntity = false;
        this.label = "";
        this.placeholder = "";
        this._filter = "";
        this._opened = false;
    }
    _getEntities() {
        if (!this.hass?.states)
            return [];
        return Object.keys(this.hass.states)
            .filter((eid) => {
            if (this.includeDomains.length === 0)
                return true;
            const domain = eid.split(".")[0];
            return this.includeDomains.includes(domain);
        })
            .map((eid) => ({
            id: eid,
            name: this.hass.states[eid]?.attributes?.friendly_name || eid,
        }))
            .sort((a, b) => a.id.localeCompare(b.id));
    }
    _getFiltered() {
        const q = this._filter.toLowerCase();
        if (!q)
            return this._getEntities().slice(0, 50);
        return this._getEntities()
            .filter((e) => e.id.toLowerCase().includes(q) ||
            e.name.toLowerCase().includes(q))
            .slice(0, 50);
    }
    _onInput(e) {
        const val = e.target.value;
        this._filter = val;
        this._opened = true;
        if (this.allowCustomEntity) {
            this._setValue(val);
        }
    }
    _onFocus() {
        this._filter = this.value || "";
        this._opened = true;
    }
    _onBlur() {
        // Delay to allow click on suggestion
        setTimeout(() => {
            this._opened = false;
        }, 200);
    }
    _select(entityId) {
        this._filter = entityId;
        this._opened = false;
        this._setValue(entityId);
    }
    _setValue(val) {
        this.dispatchEvent(new CustomEvent("value-changed", {
            detail: { value: val },
            bubbles: true,
            composed: true,
        }));
    }
    _clear() {
        this._filter = "";
        this._opened = false;
        this._setValue("");
    }
    render() {
        const filtered = this._opened ? this._getFiltered() : [];
        const displayValue = this._opened ? this._filter : this.value;
        return b `
      <div class="picker">
        <div class="input-row">
          <input
            type="text"
            .value=${displayValue || ""}
            placeholder=${this.placeholder || "Search entities..."}
            @input=${this._onInput}
            @focus=${this._onFocus}
            @blur=${this._onBlur}
          />
          ${this.value
            ? b `<button class="clear-btn" @mousedown=${(e) => {
                e.preventDefault();
                this._clear();
            }}>✕</button>`
            : ""}
        </div>
        ${this._opened && filtered.length > 0
            ? b `
              <div class="suggestions">
                ${filtered.map((e) => b `
                    <div
                      class="suggestion ${e.id === this.value ? "selected" : ""}"
                      @mousedown=${(ev) => {
                ev.preventDefault();
                this._select(e.id);
            }}
                    >
                      <span class="entity-id">${e.id}</span>
                      ${e.name !== e.id
                ? b `<span class="friendly-name">${e.name}</span>`
                : ""}
                    </div>
                  `)}
              </div>
            `
            : ""}
      </div>
    `;
    }
};
NspEntityPicker.styles = i$4 `
    :host {
      display: block;
      position: relative;
    }
    .picker {
      position: relative;
    }
    .input-row {
      display: flex;
      align-items: center;
      position: relative;
    }
    input {
      width: 100%;
      padding: 8px;
      padding-right: 32px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    .clear-btn {
      position: absolute;
      right: 4px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 14px;
      padding: 4px 6px;
      color: var(--secondary-text-color, #727272);
    }
    .clear-btn:hover {
      color: var(--error-color, #db4437);
    }
    .suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      max-height: 240px;
      overflow-y: auto;
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-top: none;
      border-radius: 0 0 4px 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10;
    }
    .suggestion {
      padding: 8px 10px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .suggestion:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .suggestion.selected {
      background: var(--primary-color, #03a9f4);
      color: white;
    }
    .suggestion.selected .friendly-name {
      color: rgba(255, 255, 255, 0.8);
    }
    .entity-id {
      font-size: 13px;
    }
    .friendly-name {
      font-size: 11px;
      color: var(--secondary-text-color, #727272);
    }
  `;
__decorate([
    n({ attribute: false })
], NspEntityPicker.prototype, "hass", void 0);
__decorate([
    n({ type: String })
], NspEntityPicker.prototype, "value", void 0);
__decorate([
    n({ type: Array })
], NspEntityPicker.prototype, "includeDomains", void 0);
__decorate([
    n({ type: Boolean, attribute: "allow-custom-entity" })
], NspEntityPicker.prototype, "allowCustomEntity", void 0);
__decorate([
    n({ type: String })
], NspEntityPicker.prototype, "label", void 0);
__decorate([
    n({ type: String })
], NspEntityPicker.prototype, "placeholder", void 0);
__decorate([
    r()
], NspEntityPicker.prototype, "_filter", void 0);
__decorate([
    r()
], NspEntityPicker.prototype, "_opened", void 0);
NspEntityPicker = __decorate([
    t$1("nsp-entity-picker")
], NspEntityPicker);

let NspSettingsEditor = class NspSettingsEditor extends i$1 {
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
            <nsp-entity-picker
              .hass=${this.hass}
              .value=${this.config.sleepTracking || ""}
              .includeDomains=${["device_tracker", "person"]}
              allow-custom-entity
              @value-changed=${(e) => this._updateField("sleepTracking", e.detail.value)}
            ></nsp-entity-picker>
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
              <nsp-entity-picker
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
              ></nsp-entity-picker>
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
            <nsp-entity-picker
              .hass=${this.hass}
              .value=${typeof value === "string" ? value : ""}
              .includeDomains=${["input_number"]}
              allow-custom-entity
              @value-changed=${(e) => this._updateField(field, e.detail.value)}
            ></nsp-entity-picker>
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
NspSettingsEditor.styles = i$4 `
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
    t$1("nsp-settings-editor")
], NspSettingsEditor);

let NspEntityEditor = class NspEntityEditor extends i$1 {
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
        <nsp-entity-picker
          .hass=${this.hass}
          .value=${this.entity.entity || ""}
          .includeDomains=${this.includeDomains}
          allow-custom-entity
          @value-changed=${(e) => this._updateField("entity", e.detail.value)}
        ></nsp-entity-picker>
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
                this._fireChanged({ ...this.entity, icon: "" });
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
                this._fireChanged({ ...this.entity, color: "" });
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
        <summary>Conditional Display</summary>
        <div class="field">
          <label>Show when state equals</label>
          <input type="text" .value=${this.entity.state || ""} placeholder="e.g. on, home, playing"
            @input=${(e) => this._updateField("state", e.target.value)} />
          <small>Entity is only shown when its state equals this value</small>
        </div>
        <div class="field">
          <label>Hide when state equals</label>
          <input type="text" .value=${this.entity.state_not || ""} placeholder="e.g. off, unavailable"
            @input=${(e) => this._updateField("state_not", e.target.value)} />
          <small>Entity is only shown when its state does NOT equal this value</small>
        </div>
        <div class="field">
          <label>Condition template</label>
          <input type="text" .value=${this.entity.state_template || ""} placeholder="{{ states('sensor.example') == 'on' }}"
            @input=${(e) => this._updateField("state_template", e.target.value)} />
          <small>Jinja2 template — entity is hidden when this evaluates to true</small>
        </div>
      </details>
    `;
    }
};
NspEntityEditor.styles = i$4 `
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
    t$1("nsp-entity-editor")
], NspEntityEditor);

let NspModePicker = class NspModePicker extends i$1 {
    constructor() {
        super(...arguments);
        this.entity = "";
        this.value = [];
        this.modeType = "climate";
        this.label = "Supported Modes";
        this._customInput = "";
    }
    _getAvailableModes() {
        if (this.entity && this.hass?.states?.[this.entity]) {
            const attrs = this.hass.states[this.entity].attributes;
            if (this.modeType === "climate" && Array.isArray(attrs?.hvac_modes)) {
                return attrs.hvac_modes;
            }
            if (this.modeType === "alarm") {
                // HA alarm entities don't directly list arm modes in attributes,
                // but supported_features bitmask indicates which are available:
                // 1=arm_home, 2=arm_away, 4=trigger, 8=arm_night, 16=arm_vacation, 32=arm_custom_bypass
                const features = attrs?.supported_features ?? 0;
                const featureMap = [
                    [1, "arm_home"],
                    [2, "arm_away"],
                    [8, "arm_night"],
                    [16, "arm_vacation"],
                    [32, "arm_custom_bypass"],
                ];
                const modes = featureMap
                    .filter(([bit]) => features & bit)
                    .map(([, mode]) => mode);
                return modes.length > 0 ? modes : [...ALARM_MODES];
            }
        }
        // Fallback to full known list
        return this.modeType === "climate" ? [...CLIMATE_MODES] : [...ALARM_MODES];
    }
    _toggle(mode) {
        const current = this.value || [];
        const updated = current.includes(mode)
            ? current.filter((m) => m !== mode)
            : [...current, mode];
        this._fireChanged(updated.length > 0 ? updated : undefined);
    }
    _addCustom() {
        const mode = this._customInput.trim();
        if (!mode)
            return;
        const current = this.value || [];
        if (!current.includes(mode)) {
            this._fireChanged([...current, mode]);
        }
        this._customInput = "";
    }
    _fireChanged(value) {
        this.dispatchEvent(new CustomEvent("value-changed", {
            detail: { value },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        const available = this._getAvailableModes();
        const selected = this.value || [];
        // Modes in value that aren't in the available list (e.g., entity changed)
        const extraModes = selected.filter((m) => !available.includes(m));
        const entityFound = !!(this.entity && this.hass?.states?.[this.entity]);
        return b `
      <div class="mode-picker">
        <label class="picker-label">${this.label}</label>
        ${!this.entity
            ? b `<p class="hint">Select an entity to see its supported modes</p>`
            : !entityFound
                ? b `<p class="hint">Entity not found in HA — showing all known modes</p>`
                : ""}
        <div class="chips">
          ${available.map((mode) => b `
              <button
                class="chip ${selected.includes(mode) ? "selected" : ""}"
                @click=${() => this._toggle(mode)}
              >
                ${this._formatMode(mode)}
              </button>
            `)}
          ${extraModes.map((mode) => b `
              <button
                class="chip selected unavailable"
                @click=${() => this._toggle(mode)}
                title="Not available on selected entity"
              >
                ${this._formatMode(mode)} ⚠
              </button>
            `)}
        </div>
        <div class="custom-row">
          <input
            type="text"
            placeholder="Custom mode…"
            .value=${this._customInput}
            @input=${(e) => {
            this._customInput = e.target.value;
        }}
            @keydown=${(e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                this._addCustom();
            }
        }}
          />
          <button class="btn-add" @click=${this._addCustom}>+</button>
        </div>
      </div>
    `;
    }
    _formatMode(mode) {
        return mode.replace(/_/g, " ");
    }
};
NspModePicker.styles = i$4 `
    :host {
      display: block;
    }
    .mode-picker {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .picker-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .hint {
      font-size: 12px;
      font-style: italic;
      color: var(--secondary-text-color);
      margin: 0;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .chip {
      padding: 4px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 16px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 13px;
      cursor: pointer;
      text-transform: capitalize;
      transition: all 0.15s ease;
    }
    .chip:hover {
      border-color: var(--primary-color, #03a9f4);
    }
    .chip.selected {
      background: var(--primary-color, #03a9f4);
      color: white;
      border-color: var(--primary-color, #03a9f4);
    }
    .chip.unavailable {
      background: var(--warning-color, #ffa726);
      border-color: var(--warning-color, #ffa726);
      opacity: 0.85;
    }
    .custom-row {
      display: flex;
      gap: 4px;
      align-items: center;
    }
    .custom-row input {
      flex: 1;
      padding: 4px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 13px;
    }
    .custom-row input:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    .btn-add {
      padding: 4px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: none;
      cursor: pointer;
      font-size: 16px;
      color: var(--primary-color, #03a9f4);
    }
    .btn-add:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
  `;
__decorate([
    n({ attribute: false })
], NspModePicker.prototype, "hass", void 0);
__decorate([
    n({ type: String })
], NspModePicker.prototype, "entity", void 0);
__decorate([
    n({ type: Array })
], NspModePicker.prototype, "value", void 0);
__decorate([
    n({ type: String })
], NspModePicker.prototype, "modeType", void 0);
__decorate([
    n({ type: String })
], NspModePicker.prototype, "label", void 0);
__decorate([
    r()
], NspModePicker.prototype, "_customInput", void 0);
NspModePicker = __decorate([
    t$1("nsp-mode-picker")
], NspModePicker);

let NspCardEditor = class NspCardEditor extends i$1 {
    constructor() {
        super(...arguments);
        this.hiddenCardKeys = [];
        this._expandedEntity = null;
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
        this._expandedEntity = entities.length - 1;
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
          <input type="text" .value=${this.card.key || ""} placeholder="e.g. lights, climate"
            @input=${(e) => this._updateField("key", e.target.value)} />
          <small>Unique identifier used by <code>navigate.&lt;key&gt;</code> entities and as the screensaver's default card</small>
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
              <div class="entity-header" @click=${() => { this._expandedEntity = this._expandedEntity === i ? null : i; }}>
                <span class="entity-grip" draggable="true"
                  @dragstart=${(e) => { e.stopPropagation(); e.dataTransfer.setData("text/plain", String(i)); e.dataTransfer.effectAllowed = "move"; }}
                  @dragover=${(e) => e.preventDefault()}
                  @drop=${(e) => { e.preventDefault(); this._moveEntity(parseInt(e.dataTransfer.getData("text/plain")), i); }}
                  @click=${(e) => e.stopPropagation()}>⠿</span>
                <span class="entity-label">${entity.entity || "(empty)"}</span>
                <span class="expand-indicator">${this._expandedEntity === i ? "▼" : "▶"}</span>
                <button class="btn-icon" @click=${(e) => { e.stopPropagation(); this._removeEntity(i); }}>✕</button>
              </div>
              ${this._expandedEntity === i ? b `
                <nsp-entity-editor
                  .hass=${this.hass}
                  .entity=${entity}
                  .includeDomains=${domains}
                  .hiddenCardKeys=${this.hiddenCardKeys}
                  @entity-changed=${(e) => { e.stopPropagation(); this._updateEntity(i, e.detail.entity); }}
                ></nsp-entity-editor>
              ` : ""}
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
              @entity-changed=${(e) => { e.stopPropagation(); this._updateField("navItem1", e.detail.entity); }}
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
              @entity-changed=${(e) => { e.stopPropagation(); this._updateField("navItem2", e.detail.entity); }}
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
        <nsp-entity-picker
          .hass=${this.hass}
          .value=${card.entity || ""}
          .includeDomains=${["climate"]}
          @value-changed=${(e) => this._updateField("entity", e.detail.value)}
        ></nsp-entity-picker>
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
        <nsp-mode-picker
          .hass=${this.hass}
          .entity=${card.entity || ""}
          .value=${card.supportedModes || []}
          .modeType=${"climate"}
          label="Supported Modes"
          @value-changed=${(e) => this._updateField("supportedModes", e.detail.value)}
        ></nsp-mode-picker>
      </div>
    `;
    }
    _renderMediaFields() {
        const card = this.card;
        return b `
      <div class="field">
        <label>Media Player Entity</label>
        <nsp-entity-picker
          .hass=${this.hass}
          .value=${card.entity || ""}
          .includeDomains=${["media_player"]}
          @value-changed=${(e) => this._updateField("entity", e.detail.value)}
        ></nsp-entity-picker>
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
        <nsp-entity-picker
          .hass=${this.hass}
          .value=${card.entity || ""}
          .includeDomains=${["alarm_control_panel"]}
          @value-changed=${(e) => this._updateField("entity", e.detail.value)}
        ></nsp-entity-picker>
      </div>
      <div class="field">
        <nsp-mode-picker
          .hass=${this.hass}
          .entity=${card.entity || ""}
          .value=${card.supportedModes || []}
          .modeType=${"alarm"}
          label="Supported Modes"
          @value-changed=${(e) => this._updateField("supportedModes", e.detail.value)}
        ></nsp-mode-picker>
      </div>
      <details class="advanced-section">
        <summary>alarmControl Override</summary>
        <div class="field">
          <label>alarmControl JSON (custom action for bottom-left icon)</label>
          <textarea rows="4"
            .value=${card.alarmControl ? JSON.stringify(card.alarmControl, null, 2) : ""}
            placeholder='{"entity": "script.my_alarm_action", "icon": "mdi:alarm-light"}'
            @change=${(e) => {
            try {
                const raw = e.target.value.trim();
                const data = raw ? JSON.parse(raw) : undefined;
                this._updateField("alarmControl", data && Object.keys(data).length ? data : undefined);
            }
            catch { /* ignore invalid JSON */ }
        }}></textarea>
        </div>
      </details>
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
      <p class="hint">💡 First 2 entities appear in the center; remaining entities are placed on the periphery.</p>
      ${this._renderEntityList()}
    `;
    }
};
NspCardEditor.styles = i$4 `
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
    }
    .entity-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--card-background-color, white);
      cursor: pointer;
      user-select: none;
    }
    .entity-header:hover { background: var(--secondary-background-color, #f5f5f5); }
    .entity-grip { cursor: grab; user-select: none; color: var(--secondary-text-color); }
    .entity-label { flex: 1; font-size: 13px; color: var(--primary-text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .expand-indicator { font-size: 12px; color: var(--secondary-text-color); }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px 8px; color: var(--error-color, #db4437); }
    .btn-sm { padding: 6px 12px; border: 1px dashed var(--divider-color); border-radius: 4px; background: none; cursor: pointer; font-size: 13px; color: var(--primary-color); }
    details.nav-items summary { cursor: pointer; font-size: 14px; font-weight: 500; color: var(--secondary-text-color); padding: 4px 0; }
    details.nav-items[open] summary { margin-bottom: 12px; }
    details.nav-items { border-top: 1px solid var(--divider-color); padding-top: 8px; }
    details.advanced-section { border-top: 1px solid var(--divider-color); padding-top: 8px; }
    details.advanced-section summary { cursor: pointer; font-size: 14px; font-weight: 500; color: var(--secondary-text-color); padding: 4px 0; }
    details.advanced-section[open] summary { margin-bottom: 12px; }
    details.advanced-section textarea { width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid var(--divider-color, #e0e0e0); border-radius: 4px; background: var(--card-background-color, white); color: var(--primary-text-color); font-family: "Fira Code", "Consolas", monospace; font-size: 13px; }
    .hint { color: var(--secondary-text-color); font-size: 12px; font-style: italic; margin: 4px 0 8px; }
    small { color: var(--secondary-text-color); font-size: 11px; }
    small code { font-family: "Fira Code", "Consolas", monospace; font-size: 11px; }
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
__decorate([
    r()
], NspCardEditor.prototype, "_expandedEntity", void 0);
NspCardEditor = __decorate([
    t$1("nsp-card-editor")
], NspCardEditor);

let NspCardList = class NspCardList extends i$1 {
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
NspCardList.styles = i$4 `
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
    t$1("nsp-card-list")
], NspCardList);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={CHILD:2},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class e extends i{constructor(i){if(super(i),this.it=A,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A||null==r)return this._t=void 0,this.it=r;if(r===E)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;const s=[r];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;const o=e$1(e);

/** Minimal YAML syntax highlighter — no external dependencies. */
function highlightYaml(yaml) {
    return yaml
        .split("\n")
        .map((raw) => {
        // Escape HTML entities first
        const line = raw
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        // Comment line
        if (/^\s*#/.test(line)) {
            return `<span class="y-comment">${line}</span>`;
        }
        // List item prefix: "  - " — highlight the dash separately
        const listMatch = line.match(/^(\s*-\s+)(.*)$/);
        if (listMatch) {
            const [, prefix, rest] = listMatch;
            return `<span class="y-list-dash">${prefix}</span>${colorizeValue(rest)}`;
        }
        // Key: value
        const kvMatch = line.match(/^(\s*)([^:]+?)(\s*:\s*)(.*)$/);
        if (kvMatch) {
            const [, indent, key, sep, value] = kvMatch;
            return `${indent}<span class="y-key">${key}</span>${sep}${colorizeValue(value)}`;
        }
        return line;
    })
        .join("\n");
}
function colorizeValue(value) {
    if (!value)
        return value;
    // Quoted string
    if (/^["'].*["']$/.test(value))
        return `<span class="y-string">${value}</span>`;
    // Number
    if (/^-?\d+(\.\d+)?$/.test(value))
        return `<span class="y-number">${value}</span>`;
    // Boolean / null
    if (/^(true|false|yes|no|null|~)$/i.test(value))
        return `<span class="y-bool">${value}</span>`;
    // Inline comment
    const commentIdx = value.indexOf(" #");
    if (commentIdx !== -1) {
        const v = value.slice(0, commentIdx);
        const c = value.slice(commentIdx);
        return `${colorizeValue(v)}<span class="y-comment">${c}</span>`;
    }
    return `<span class="y-value">${value}</span>`;
}
let NspYamlPreview = class NspYamlPreview extends i$1 {
    constructor() {
        super(...arguments);
        this._yaml = "";
        this._loading = true;
        this._error = null;
        this._copied = false;
        this._exporting = false;
        this._exportStatus = null;
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
            // Clipboard API unavailable — ignore silently
        }
    }
    async _exportToFile() {
        this._exporting = true;
        this._exportStatus = null;
        try {
            const result = await this.hass.callWS({ type: "nspanel_editor/export_yaml" });
            this._exportStatus = {
                type: "success",
                message: `Exported ${result.count} panel(s) to apps.yaml: ${result.exported.join(", ")}`,
            };
            setTimeout(() => { this._exportStatus = null; }, 10000);
        }
        catch (err) {
            const code = err.code || "";
            let hint = "";
            if (code === "permission_denied") {
                hint =
                    " Check that the Home Assistant process has write access to the " +
                        "AppDaemon configuration directory. In container setups, ensure the " +
                        "volume is mounted with write permissions.";
            }
            else if (code === "verification_failed") {
                hint = " The file was written but could not be verified. Check disk space and file integrity.";
            }
            else if (code === "not_configured") {
                hint = " Configure the AppDaemon apps.yaml path in the integration settings.";
            }
            this._exportStatus = {
                type: "error",
                message: (err.message || "Export failed") + hint,
            };
        }
        this._exporting = false;
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
          <button class="btn btn-export" ?disabled=${this._exporting} @click=${this._exportToFile}>
            ${this._exporting ? "Exporting..." : "Export to apps.yaml"}
          </button>
        </div>
        ${this._exportStatus
            ? b `
              <div class="status-banner ${this._exportStatus.type}">
                ${this._exportStatus.message}
                <button class="dismiss" @click=${() => { this._exportStatus = null; }}>&times;</button>
              </div>
            `
            : ""}
        <pre><code>${o(highlightYaml(this._yaml))}</code></pre>
      </div>
    `;
    }
};
NspYamlPreview.styles = i$4 `
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
    .btn-export {
      background: var(--success-color, #4caf50);
      color: white;
      border-color: var(--success-color, #4caf50);
    }
    .btn-export:hover { opacity: 0.9; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .status-banner {
      padding: 12px 16px;
      border-radius: 4px;
      font-size: 14px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .status-banner.success {
      background: var(--success-color, #4caf50);
      color: white;
    }
    .status-banner.error {
      background: var(--error-color, #db4437);
      color: white;
    }
    .status-banner .dismiss {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 18px;
      padding: 0;
      margin-left: auto;
      line-height: 1;
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
    /* YAML syntax highlight tokens */
    .y-key { color: #0d47a1; }
    .y-string { color: #2e7d32; }
    .y-number { color: #6a1b9a; }
    .y-bool { color: #e65100; }
    .y-comment { color: #78909c; font-style: italic; }
    .y-list-dash { color: #c62828; }
    .y-value { color: var(--primary-text-color); }
    @media (prefers-color-scheme: dark) {
      .y-key { color: #90caf9; }
      .y-string { color: #a5d6a7; }
      .y-number { color: #ce93d8; }
      .y-bool { color: #ffcc80; }
      .y-comment { color: #90a4ae; }
      .y-list-dash { color: #ef9a9a; }
    }
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
__decorate([
    r()
], NspYamlPreview.prototype, "_exporting", void 0);
__decorate([
    r()
], NspYamlPreview.prototype, "_exportStatus", void 0);
NspYamlPreview = __decorate([
    t$1("nsp-yaml-preview")
], NspYamlPreview);

const THEME_KEYS = [
    "background",
    "time",
    "timeAMPM",
    "date",
    "tMainText",
    "tForecast1",
    "tForecast2",
    "tForecast3",
    "tForecast4",
    "tForecast1Val",
    "tForecast2Val",
    "tForecast3Val",
    "tForecast4Val",
    "bar",
    "tMainTextAlt2",
    "tTimeAdd",
];
let NspScreensaverEditor = class NspScreensaverEditor extends i$1 {
    constructor() {
        super(...arguments);
        this.cardKeys = [];
    }
    _fireChanged(updated) {
        this.dispatchEvent(new CustomEvent("screensaver-changed", {
            detail: { screensaver: updated },
            bubbles: true,
            composed: true,
        }));
    }
    _updateField(field, value) {
        const updated = { ...this.screensaver, [field]: value };
        if (value === undefined || value === "" || value === null) {
            delete updated[field];
        }
        this._fireChanged(updated);
    }
    _isAdvancedMode() {
        return !!(this.screensaver?.entities?.length);
    }
    _getEntities() {
        return this.screensaver?.entities || [];
    }
    _addEntity() {
        const entities = [...this._getEntities(), { entity: "" }];
        this._updateField("entities", entities);
    }
    _removeEntity(index) {
        const entities = this._getEntities().filter((_, i) => i !== index);
        this._updateField("entities", entities.length ? entities : undefined);
    }
    _updateEntity(index, entity) {
        const entities = [...this._getEntities()];
        entities[index] = entity;
        this._updateField("entities", entities);
    }
    _updateStatusIcon(field, icon) {
        this._updateField(field, icon);
    }
    _updateThemeColor(key, rgb) {
        const theme = { ...(this.screensaver?.theme || {}) };
        if (rgb === undefined) {
            delete theme[key];
        }
        else {
            theme[key] = rgb;
        }
        this._updateField("theme", Object.keys(theme).length ? theme : undefined);
    }
    render() {
        const sc = this.screensaver || {};
        const advanced = this._isAdvancedMode();
        const entities = this._getEntities();
        return b `
      <div class="screensaver-editor">
        <!-- Type & Mode -->
        <section>
          <h3>Type</h3>
          <div class="field-row">
            <div class="field">
              <label>Screensaver Type</label>
              <select
                .value=${sc.type || "screensaver"}
                @change=${(e) => this._updateField("type", e.target.value)}
              >
                <option
                  value="screensaver"
                  ?selected=${!sc.type || sc.type === "screensaver"}
                >
                  screensaver
                </option>
                <option
                  value="screensaver2"
                  ?selected=${sc.type === "screensaver2"}
                >
                  screensaver2 (v4.0.0+)
                </option>
              </select>
            </div>
            <div class="field">
              <label>Mode</label>
              <select
                @change=${(e) => {
            const val = e.target.value;
            if (val === "simple") {
                this._updateField("entities", undefined);
            }
            else {
                this._updateField("entity", undefined);
                if (!this._getEntities().length)
                    this._addEntity();
            }
        }}
              >
                <option value="simple" ?selected=${!advanced}>
                  Simple (single entity)
                </option>
                <option value="advanced" ?selected=${advanced}>
                  Advanced (entity list)
                </option>
              </select>
            </div>
          </div>
        </section>

        <!-- Entity config -->
        <section>
          <h3>Weather / Entities</h3>
          ${!advanced
            ? b `
                <div class="field">
                  <label>Weather Entity</label>
                  <nsp-entity-picker
                    .hass=${this.hass}
                    .value=${sc.entity || ""}
                    .includeDomains=${["weather"]}
                    allow-custom-entity
                    @value-changed=${(e) => this._updateField("entity", e.detail.value)}
                  ></nsp-entity-picker>
                </div>
              `
            : b `
                <div class="entity-list">
                  <div class="section-header">
                    <span class="count-label"
                      >Entities (${entities.length}/6)</span
                    >
                    ${entities.length < 6
                ? b `<button
                          class="btn-sm"
                          @click=${this._addEntity}
                        >
                          + Add Entity
                        </button>`
                : A}
                  </div>
                  ${entities.length === 6
                ? b `<div class="info-banner">
                        ℹ️ 6 entities trigger the alternative screensaver
                        layout
                      </div>`
                : A}
                  ${entities.map((entity, i) => this._renderScreensaverEntity(entity, i))}
                </div>
              `}
        </section>

        <!-- Status Icons -->
        <section>
          <h3>Status Icons</h3>
          ${this._renderStatusIcon("statusIcon1", sc.statusIcon1)}
          ${this._renderStatusIcon("statusIcon2", sc.statusIcon2)}
        </section>

        <!-- Other settings -->
        <section>
          <h3>Behavior</h3>
          <div class="field">
            <label class="checkbox-label">
              <input
                type="checkbox"
                .checked=${!!sc.doubleTapToUnlock}
                @change=${(e) => this._updateField("doubleTapToUnlock", e.target.checked || undefined)}
              />
              Double-tap to unlock
            </label>
          </div>
          <div class="field">
            <label>Default Card (key or template)</label>
            <div class="default-card-row">
              <input
                type="text"
                .value=${sc.defaultCard || ""}
                placeholder="Card key or HA template"
                @input=${(e) => this._updateField("defaultCard", e.target.value)}
              />
              ${this.cardKeys.length > 0
            ? b `
                    <select
                      @change=${(e) => {
                const val = e.target.value;
                if (val)
                    this._updateField("defaultCard", val);
                e.target.value = "";
            }}
                    >
                      <option value="">Pick key…</option>
                      ${this.cardKeys.map((k) => b `<option value=${k}>${k}</option>`)}
                    </select>
                  `
            : A}
            </div>
          </div>
        </section>

        <!-- Theme -->
        <details class="theme-section">
          <summary>Theme Colors</summary>
          <div class="theme-grid">
            ${THEME_KEYS.map((key) => this._renderThemeColor(key, sc.theme))}
          </div>
        </details>
      </div>
    `;
    }
    _renderScreensaverEntity(entity, index) {
        return b `
      <div class="ss-entity">
        <div class="ss-entity-header">
          <span class="entity-label">${entity.entity || "(empty)"}</span>
          <button
            class="btn-icon"
            @click=${() => this._removeEntity(index)}
          >
            ✕
          </button>
        </div>
        <div class="ss-entity-body">
          <div class="field">
            <label>Entity</label>
            <nsp-entity-picker
              .hass=${this.hass}
              .value=${entity.entity || ""}
              .includeDomains=${["weather", "sensor"]}
              allow-custom-entity
              @value-changed=${(e) => this._updateEntity(index, {
            ...entity,
            entity: e.detail.value,
        })}
            ></nsp-entity-picker>
          </div>
          <div class="field-row">
            <div class="field">
              <label>Type (forecast day 0–3)</label>
              <select
                .value=${String(entity.type ?? "")}
                @change=${(e) => {
            const val = e.target.value;
            const newEntity = { ...entity };
            if (val === "")
                delete newEntity.type;
            else
                newEntity.type = parseInt(val);
            this._updateEntity(index, newEntity);
        }}
              >
                <option value="">Default</option>
                <option value="0" ?selected=${entity.type === 0}>
                  0 (today)
                </option>
                <option value="1" ?selected=${entity.type === 1}>
                  1 (tomorrow)
                </option>
                <option value="2" ?selected=${entity.type === 2}>2</option>
                <option value="3" ?selected=${entity.type === 3}>3</option>
              </select>
            </div>
            <div class="field">
              <label>Name Override</label>
              <input
                type="text"
                .value=${entity.name || ""}
                @input=${(e) => {
            const val = e.target.value;
            const newEntity = { ...entity };
            if (val)
                newEntity.name = val;
            else
                delete newEntity.name;
            this._updateEntity(index, newEntity);
        }}
              />
            </div>
          </div>
        </div>
      </div>
    `;
    }
    _renderStatusIcon(field, icon) {
        const label = field === "statusIcon1" ? "Status Icon 1" : "Status Icon 2";
        if (!icon) {
            return b `
        <div class="field">
          <label>${label}</label>
          <button
            class="btn-sm"
            @click=${() => this._updateStatusIcon(field, { entity: "" })}
          >
            + Configure ${label}
          </button>
        </div>
      `;
        }
        return b `
      <div class="status-icon">
        <div class="section-header">
          <label>${label}</label>
          <button
            class="btn-sm danger"
            @click=${() => this._updateStatusIcon(field, undefined)}
          >
            Remove
          </button>
        </div>
        <div class="field">
          <label>Entity</label>
          <nsp-entity-picker
            .hass=${this.hass}
            .value=${icon.entity || ""}
            allow-custom-entity
            @value-changed=${(e) => this._updateStatusIcon(field, {
            ...icon,
            entity: e.detail.value,
        })}
          ></nsp-entity-picker>
        </div>
        <div class="field">
          <label>Icon Override</label>
          <input
            type="text"
            .value=${icon.icon || ""}
            placeholder="mdi:icon-name"
            @input=${(e) => {
            const val = e.target.value;
            const updated = { ...icon };
            if (val)
                updated.icon = val;
            else
                delete updated.icon;
            this._updateStatusIcon(field, updated);
        }}
          />
        </div>
        <div class="field">
          <label class="checkbox-label">
            <input
              type="checkbox"
              .checked=${!!icon.altFont}
              @change=${(e) => this._updateStatusIcon(field, {
            ...icon,
            altFont: e.target.checked || undefined,
        })}
            />
            Use alt font
          </label>
        </div>
      </div>
    `;
    }
    _renderThemeColor(key, theme) {
        const color = theme?.[key];
        const active = !!color;
        const r = color?.[0] ?? 255;
        const g = color?.[1] ?? 255;
        const b$1 = color?.[2] ?? 255;
        return b `
      <div class="theme-color">
        <div class="theme-color-header">
          <label class="checkbox-label">
            <input
              type="checkbox"
              .checked=${active}
              @change=${(e) => {
            if (e.target.checked) {
                this._updateThemeColor(key, [255, 255, 255]);
            }
            else {
                this._updateThemeColor(key, undefined);
            }
        }}
            />
            ${key}
          </label>
        </div>
        ${active
            ? b `
              <div class="rgb-row">
                ${["R", "G", "B"].map((ch, i) => b `
                    <label>${ch}</label>
                    <input
                      type="number"
                      min="0"
                      max="255"
                      .value=${String([r, g, b$1][i])}
                      @input=${(e) => {
                const val = Math.max(0, Math.min(255, parseInt(e.target.value) || 0));
                const newColor = [r, g, b$1];
                newColor[i] = val;
                this._updateThemeColor(key, newColor);
            }}
                    />
                  `)}
                <div
                  class="color-preview"
                  style="background: rgb(${r},${g},${b$1})"
                ></div>
              </div>
            `
            : A}
      </div>
    `;
    }
};
NspScreensaverEditor.styles = i$4 `
    :host {
      display: block;
    }
    .screensaver-editor {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    section {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
    }
    section h3 {
      margin: 0 0 12px;
      font-size: 15px;
      color: var(--primary-text-color);
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 12px;
    }
    .field:last-child {
      margin-bottom: 0;
    }
    .field label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .field input[type="text"],
    .field input[type="number"],
    .field select {
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .field-row {
      display: flex;
      gap: 12px;
    }
    .field-row .field {
      flex: 1;
    }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .checkbox-label input[type="checkbox"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .count-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .btn-sm {
      padding: 6px 12px;
      border: 1px dashed var(--divider-color);
      border-radius: 4px;
      background: none;
      cursor: pointer;
      font-size: 13px;
      color: var(--primary-color);
    }
    .btn-sm.danger {
      color: var(--error-color, #db4437);
      border-color: var(--error-color, #db4437);
      border-style: solid;
    }
    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      color: var(--error-color, #db4437);
    }
    .info-banner {
      background: var(--info-color, #2196f3);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 13px;
      margin-bottom: 8px;
    }
    .entity-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .ss-entity {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      overflow: hidden;
    }
    .ss-entity-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: var(--secondary-background-color, #f5f5f5);
    }
    .entity-label {
      font-size: 13px;
      color: var(--primary-text-color);
    }
    .ss-entity-body {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .status-icon {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 12px;
    }
    .status-icon:last-child {
      margin-bottom: 0;
    }
    .default-card-row {
      display: flex;
      gap: 8px;
    }
    .default-card-row input {
      flex: 1;
    }
    .default-card-row select {
      padding: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .theme-section {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
    }
    .theme-section summary {
      cursor: pointer;
      font-size: 15px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .theme-section[open] summary {
      margin-bottom: 16px;
    }
    .theme-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 12px;
    }
    .theme-color {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      padding: 8px;
    }
    .theme-color-header {
      margin-bottom: 4px;
    }
    .rgb-row {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 4px;
    }
    .rgb-row label {
      font-size: 11px;
      font-weight: 500;
      min-width: 14px;
    }
    .rgb-row input {
      width: 54px;
      padding: 4px 6px;
      font-size: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
    }
    .color-preview {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      border: 1px solid var(--divider-color);
      flex-shrink: 0;
    }
  `;
__decorate([
    n({ attribute: false })
], NspScreensaverEditor.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], NspScreensaverEditor.prototype, "screensaver", void 0);
__decorate([
    n({ type: Array })
], NspScreensaverEditor.prototype, "cardKeys", void 0);
NspScreensaverEditor = __decorate([
    t$1("nsp-screensaver-editor")
], NspScreensaverEditor);

/** Convert 8-bit R, G, B channels to a decimal RGB565 value (NSPanel format). */
function rgbToRgb565(r, g, b) {
    return ((r & 0xf8) << 8) | ((g & 0xfc) << 3) | (b >> 3);
}
let NspNotificationEditor = class NspNotificationEditor extends i$1 {
    constructor() {
        super(...arguments);
        this._type = "popup";
        this._popup = {
            heading: "Notification",
            text: "Enter your message here",
            headingColor: { r: 255, g: 255, b: 255 },
            textColor: { r: 255, g: 255, b: 255 },
            backgroundColor: { r: 42, g: 87, b: 100 },
            buttonLeft: "Dismiss",
            buttonRight: "",
            font: 0,
            icon: "",
        };
        this._screensaverNotif = {
            heading: "Notification",
            text: "Enter your message here",
        };
        this._buzzer = false;
        this._copied = false;
    }
    _updatePopup(field, value) {
        this._popup = { ...this._popup, [field]: value };
    }
    _updatePopupColor(field, channel, value) {
        this._popup = {
            ...this._popup,
            [field]: {
                ...this._popup[field],
                [channel]: Math.max(0, Math.min(255, value)),
            },
        };
    }
    _generateYaml() {
        if (this._type === "popup") {
            const p = this._popup;
            const headingColor565 = rgbToRgb565(p.headingColor.r, p.headingColor.g, p.headingColor.b);
            const textColor565 = rgbToRgb565(p.textColor.r, p.textColor.g, p.textColor.b);
            const bgColor565 = rgbToRgb565(p.backgroundColor.r, p.backgroundColor.g, p.backgroundColor.b);
            const buttons = [p.buttonLeft, p.buttonRight]
                .filter(Boolean)
                .join("~");
            const fontPart = p.font ? String(p.font) : "";
            // Trim trailing tildes: NSPanel ignores empty trailing fields in the
            // tilde-separated payload, but some firmware versions are sensitive to them.
            const notifPayload = [
                p.heading,
                p.text,
                headingColor565,
                textColor565,
                bgColor565,
                fontPart,
                buttons,
                p.icon,
            ]
                .join("~")
                .replace(/~+$/, ""); // trim trailing tildes
            const buzzerBlock = this._buzzer
                ? `      - service: mqtt.publish\n        data:\n          topic: "YOUR_PANEL_RECV_TOPIC"\n          payload: "buzzer~3~3"\n`
                : "";
            return (`# Send popup notification to NSPanel\n` +
                `script:\n` +
                `  send_nspanel_notification:\n` +
                `    alias: "NSPanel Popup Notification"\n` +
                `    sequence:\n` +
                `      - service: mqtt.publish\n` +
                `        data:\n` +
                `          topic: "YOUR_PANEL_RECV_TOPIC"\n` +
                `          payload: "pageType~pageNotify"\n` +
                `      - service: mqtt.publish\n` +
                `        data:\n` +
                `          topic: "YOUR_PANEL_RECV_TOPIC"\n` +
                `          payload: "notification~${notifPayload}"\n` +
                buzzerBlock);
        }
        else {
            const n = this._screensaverNotif;
            const buzzerBlock = this._buzzer
                ? `      - service: mqtt.publish\n        data:\n          topic: "YOUR_PANEL_RECV_TOPIC"\n          payload: "buzzer~3~3"\n`
                : "";
            return (`# Send screensaver notification to NSPanel\n` +
                `script:\n` +
                `  send_nspanel_screensaver_notification:\n` +
                `    alias: "NSPanel Screensaver Notification"\n` +
                `    sequence:\n` +
                `      - service: mqtt.publish\n` +
                `        data:\n` +
                `          topic: "YOUR_PANEL_RECV_TOPIC"\n` +
                `          payload: "screensaverNotification~${n.heading}~${n.text}"\n` +
                buzzerBlock);
        }
    }
    async _copyYaml() {
        const yaml = this._generateYaml();
        try {
            await navigator.clipboard.writeText(yaml);
        }
        catch {
            // Clipboard API unavailable — ignore silently
        }
        this._copied = true;
        setTimeout(() => {
            this._copied = false;
        }, 2000);
    }
    render() {
        return b `
      <div class="notif-editor">
        <div class="field-row">
          <div class="field">
            <label>Notification Type</label>
            <select
              .value=${this._type}
              @change=${(e) => {
            this._type = e.target
                .value;
        }}
            >
              <option value="popup" ?selected=${this._type === "popup"}>
                Popup Notification
              </option>
              <option
                value="screensaver"
                ?selected=${this._type === "screensaver"}
              >
                Screensaver Notification
              </option>
            </select>
          </div>
        </div>

        ${this._type === "popup"
            ? this._renderPopupEditor()
            : this._renderScreensaverNotifEditor()}

        <div class="field">
          <label class="checkbox-label">
            <input
              type="checkbox"
              .checked=${this._buzzer}
              @change=${(e) => {
            this._buzzer = e.target.checked;
        }}
            />
            Include buzzer (3 beeps)
          </label>
        </div>

        <div class="yaml-output">
          <div class="yaml-header">
            <h4>Generated HA Script YAML</h4>
            <button class="btn btn-primary" @click=${this._copyYaml}>
              ${this._copied ? "Copied!" : "Copy YAML"}
            </button>
          </div>
          <pre><code>${this._generateYaml()}</code></pre>
        </div>
      </div>
    `;
    }
    _renderPopupEditor() {
        const p = this._popup;
        return b `
      <div class="field">
        <label>Heading</label>
        <input
          type="text"
          .value=${p.heading}
          @input=${(e) => this._updatePopup("heading", e.target.value)}
        />
      </div>
      <div class="field">
        <label>Message Text</label>
        <textarea
          rows="3"
          .value=${p.text}
          @input=${(e) => this._updatePopup("text", e.target.value)}
        ></textarea>
      </div>
      <div class="field-row">
        <div class="field">
          <label>Left Button (optional)</label>
          <input
            type="text"
            .value=${p.buttonLeft}
            @input=${(e) => this._updatePopup("buttonLeft", e.target.value)}
          />
        </div>
        <div class="field">
          <label>Right Button (optional)</label>
          <input
            type="text"
            .value=${p.buttonRight}
            @input=${(e) => this._updatePopup("buttonRight", e.target.value)}
          />
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label>Font (0–5)</label>
          <input
            type="number"
            min="0"
            max="5"
            .value=${String(p.font)}
            @input=${(e) => this._updatePopup("font", parseInt(e.target.value) || 0)}
          />
        </div>
        <div class="field">
          <label>Icon (optional)</label>
          <input
            type="text"
            .value=${p.icon}
            placeholder="e.g. alert-outline"
            @input=${(e) => this._updatePopup("icon", e.target.value)}
          />
        </div>
      </div>
      ${this._renderRgb565Picker("headingColor", "Heading Color", p.headingColor)}
      ${this._renderRgb565Picker("textColor", "Text Color", p.textColor)}
      ${this._renderRgb565Picker("backgroundColor", "Background Color", p.backgroundColor)}
    `;
    }
    _renderScreensaverNotifEditor() {
        const n = this._screensaverNotif;
        return b `
      <div class="field">
        <label>Heading</label>
        <input
          type="text"
          .value=${n.heading}
          @input=${(e) => {
            this._screensaverNotif = {
                ...n,
                heading: e.target.value,
            };
        }}
        />
      </div>
      <div class="field">
        <label>Message Text</label>
        <textarea
          rows="3"
          .value=${n.text}
          @input=${(e) => {
            this._screensaverNotif = {
                ...n,
                text: e.target.value,
            };
        }}
        ></textarea>
      </div>
    `;
    }
    _renderRgb565Picker(field, label, color) {
        const rgb565 = rgbToRgb565(color.r, color.g, color.b);
        return b `
      <div class="color-picker">
        <div class="color-label">
          <label>${label}</label>
          <span class="rgb565-value">RGB565: ${rgb565}</span>
          <div
            class="color-swatch"
            style="background: rgb(${color.r},${color.g},${color.b})"
          ></div>
        </div>
        <div class="rgb-row">
          ${["r", "g", "b"].map((ch) => b `
              <label>${ch.toUpperCase()}</label>
              <input
                type="number"
                min="0"
                max="255"
                .value=${String(color[ch])}
                @input=${(e) => this._updatePopupColor(field, ch, parseInt(e.target.value) || 0)}
              />
            `)}
        </div>
      </div>
    `;
    }
};
NspNotificationEditor.styles = i$4 `
    :host {
      display: block;
    }
    .notif-editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .field label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .field input[type="text"],
    .field input[type="number"],
    .field select,
    .field textarea {
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
    }
    .field-row {
      display: flex;
      gap: 12px;
    }
    .field-row .field {
      flex: 1;
    }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .checkbox-label input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }
    .color-picker {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      padding: 10px;
    }
    .color-label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .color-label label {
      font-size: 13px;
      font-weight: 500;
      flex: 1;
    }
    .rgb565-value {
      font-size: 11px;
      color: var(--secondary-text-color);
      font-family: monospace;
    }
    .color-swatch {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      border: 1px solid var(--divider-color);
      flex-shrink: 0;
    }
    .rgb-row {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .rgb-row label {
      font-size: 11px;
      font-weight: 500;
      min-width: 14px;
    }
    .rgb-row input {
      width: 54px;
      padding: 4px 6px;
      font-size: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
    }
    .yaml-output {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      overflow: hidden;
    }
    .yaml-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      background: var(--secondary-background-color, #f5f5f5);
    }
    .yaml-header h4 {
      margin: 0;
      font-size: 13px;
    }
    .btn {
      padding: 6px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 13px;
    }
    .btn-primary {
      background: var(--primary-color, #03a9f4);
      color: white;
      border-color: var(--primary-color, #03a9f4);
    }
    pre {
      margin: 0;
      padding: 12px 16px;
      background: var(--card-background-color, white);
      overflow: auto;
      max-height: 300px;
      font-size: 12px;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
    }
    code {
      font-family: "Fira Code", "Consolas", monospace;
      color: var(--primary-text-color);
    }
  `;
__decorate([
    r()
], NspNotificationEditor.prototype, "_type", void 0);
__decorate([
    r()
], NspNotificationEditor.prototype, "_popup", void 0);
__decorate([
    r()
], NspNotificationEditor.prototype, "_screensaverNotif", void 0);
__decorate([
    r()
], NspNotificationEditor.prototype, "_buzzer", void 0);
__decorate([
    r()
], NspNotificationEditor.prototype, "_copied", void 0);
NspNotificationEditor = __decorate([
    t$1("nsp-notification-editor")
], NspNotificationEditor);

const TAB_LABELS = {
    settings: "Settings",
    cards: "Cards",
    hiddenCards: "Hidden Cards",
    screensaver: "Screensaver",
    notifications: "Notifications",
    yaml: "YAML Preview",
};
let NspPanelEditor = class NspPanelEditor extends i$1 {
    constructor() {
        super(...arguments);
        this._data = null;
        this._activeTab = "settings";
        this._loading = true;
        this._saving = false;
        this._saveError = null;
        this._deleteError = null;
        this._error = null;
        this._dirty = false;
        this._saveSuccess = false;
        this._exporting = false;
        this._exportStatus = null;
        this._confirmDelete = false;
        this._confirmBack = false;
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
        this._saveError = null;
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
            this._confirmBack = false;
            this._saveSuccess = true;
            this._exportStatus = null;
            setTimeout(() => { this._saveSuccess = false; }, 15000);
        }
        catch (err) {
            this._saveError = err.message || "Save failed";
        }
        this._saving = false;
    }
    async _exportNow() {
        this._exporting = true;
        this._exportStatus = null;
        try {
            const result = await this.hass.callWS({ type: "nspanel_editor/export_yaml" });
            this._exportStatus = {
                type: "success",
                message: `Exported ${result.count} panel(s) to apps.yaml`,
            };
            this._saveSuccess = false;
            setTimeout(() => { this._exportStatus = null; }, 10000);
        }
        catch (err) {
            const code = err.code || "";
            let hint = "";
            if (code === "permission_denied") {
                hint =
                    " Check that the Home Assistant process has write access to the " +
                        "AppDaemon configuration directory.";
            }
            else if (code === "not_configured") {
                hint = " Configure the AppDaemon apps.yaml path in the integration settings.";
            }
            this._exportStatus = {
                type: "error",
                message: (err.message || "Export failed") + hint,
            };
            this._saveSuccess = false;
        }
        this._exporting = false;
    }
    async _deletePanel() {
        try {
            await this.hass.callWS({
                type: "nspanel_editor/delete_panel",
                panel_id: this.panelId,
            });
            this._confirmDelete = false;
            this._fireBack();
        }
        catch (err) {
            this._confirmDelete = false;
            this._deleteError = err.message || "Delete failed";
        }
    }
    _fireBack() {
        this.dispatchEvent(new CustomEvent("back-to-list", { bubbles: true, composed: true }));
    }
    _handleBack() {
        if (this._dirty) {
            this._confirmBack = true;
        }
        else {
            this._fireBack();
        }
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
    _onScreensaverChanged(e) {
        if (!this._data)
            return;
        this._data = { ...this._data, screensaver: e.detail.screensaver };
        this._dirty = true;
    }
    _getHiddenCardKeys() {
        if (!this._data)
            return [];
        return this._data.hiddenCards
            .map((c) => c.key)
            .filter((k) => !!k);
    }
    _getCardKeys() {
        if (!this._data)
            return [];
        return [...this._data.cards, ...this._data.hiddenCards]
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
          ${this._confirmDelete
            ? b `
                <span class="confirm-text">Delete "${this.panelId}"?</span>
                <button class="btn btn-danger" @click=${this._deletePanel}>Confirm Delete</button>
                <button class="btn" @click=${() => { this._confirmDelete = false; }}>Cancel</button>
              `
            : b `
                <button class="btn btn-danger" @click=${() => { this._confirmDelete = true; }}>Delete Panel</button>
                <button class="btn btn-primary" ?disabled=${this._saving} @click=${this._savePanel}>
                  ${this._saving ? "Saving…" : "Save"}
                </button>
              `}
        </div>

        ${this._confirmBack
            ? b `
              <div class="warn-banner">
                <span>You have unsaved changes. Discard and go back?</span>
                <button class="btn-warn-action" @click=${() => { this._confirmBack = false; this._fireBack(); }}>Discard &amp; Go Back</button>
                <button class="btn-warn-cancel" @click=${() => { this._confirmBack = false; }}>Keep Editing</button>
              </div>
            `
            : ""}

        ${this._saveError
            ? b `
              <div class="status-banner error">
                Save failed: ${this._saveError}
                <button class="dismiss" @click=${() => { this._saveError = null; }}>&times;</button>
              </div>
            `
            : ""}

        ${this._deleteError
            ? b `
              <div class="status-banner error">
                Delete failed: ${this._deleteError}
                <button class="dismiss" @click=${() => { this._deleteError = null; }}>&times;</button>
              </div>
            `
            : ""}

        ${this._saveSuccess
            ? b `
              <div class="info-banner">
                <span>Save successful — don't forget to export to apps.yaml for changes to take effect in AppDaemon.</span>
                <button class="btn btn-export-sm" ?disabled=${this._exporting} @click=${this._exportNow}>
                  ${this._exporting ? "Exporting..." : "Export now"}
                </button>
                <button class="dismiss" @click=${() => { this._saveSuccess = false; }}>&times;</button>
              </div>
            `
            : ""}
        ${this._exportStatus
            ? b `
              <div class="status-banner ${this._exportStatus.type}">
                ${this._exportStatus.message}
                <button class="dismiss" @click=${() => { this._exportStatus = null; }}>&times;</button>
              </div>
            `
            : ""}

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
                return b `
          <nsp-screensaver-editor
            .hass=${this.hass}
            .screensaver=${this._data.screensaver}
            .cardKeys=${this._getCardKeys()}
            @screensaver-changed=${this._onScreensaverChanged}
          ></nsp-screensaver-editor>
        `;
            case "notifications":
                return b `
          <nsp-notification-editor></nsp-notification-editor>
        `;
            case "yaml":
                return b `
          <nsp-yaml-preview .hass=${this.hass}></nsp-yaml-preview>
        `;
        }
    }
};
NspPanelEditor.styles = i$4 `
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
    .info-banner {
      background: var(--info-color, #039be5);
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
    }
    .btn-export-sm {
      padding: 4px 12px;
      border: 1px solid white;
      border-radius: 4px;
      background: transparent;
      color: white;
      cursor: pointer;
      font-size: 13px;
      white-space: nowrap;
    }
    .btn-export-sm:hover { background: rgba(255, 255, 255, 0.15); }
    .btn-export-sm:disabled { opacity: 0.5; cursor: not-allowed; }
    .status-banner {
      padding: 12px 16px;
      border-radius: 4px;
      font-size: 14px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .status-banner.success {
      background: var(--success-color, #4caf50);
      color: white;
    }
    .status-banner.error {
      background: var(--error-color, #db4437);
      color: white;
    }
    .dismiss {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 18px;
      padding: 0;
      margin-left: auto;
      line-height: 1;
    }
    .confirm-text {
      font-size: 14px;
      color: var(--error-color, #db4437);
      white-space: nowrap;
    }
    .warn-banner {
      background: var(--warning-color, #ffa726);
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      flex-wrap: wrap;
    }
    .btn-warn-action {
      padding: 4px 12px;
      border: 1px solid white;
      border-radius: 4px;
      background: transparent;
      color: white;
      cursor: pointer;
      font-size: 13px;
      white-space: nowrap;
    }
    .btn-warn-action:hover { background: rgba(255, 255, 255, 0.2); }
    .btn-warn-cancel {
      padding: 4px 12px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 4px;
      background: transparent;
      color: white;
      cursor: pointer;
      font-size: 13px;
      white-space: nowrap;
    }
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
], NspPanelEditor.prototype, "_saveError", void 0);
__decorate([
    r()
], NspPanelEditor.prototype, "_deleteError", void 0);
__decorate([
    r()
], NspPanelEditor.prototype, "_error", void 0);
__decorate([
    r()
], NspPanelEditor.prototype, "_dirty", void 0);
__decorate([
    r()
], NspPanelEditor.prototype, "_saveSuccess", void 0);
__decorate([
    r()
], NspPanelEditor.prototype, "_exporting", void 0);
__decorate([
    r()
], NspPanelEditor.prototype, "_exportStatus", void 0);
__decorate([
    r()
], NspPanelEditor.prototype, "_confirmDelete", void 0);
__decorate([
    r()
], NspPanelEditor.prototype, "_confirmBack", void 0);
NspPanelEditor = __decorate([
    t$1("nsp-panel-editor")
], NspPanelEditor);

let NsPanelLovelaceEditor = class NsPanelLovelaceEditor extends i$1 {
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
        // Trigger HA to load lazy components (ha-entity-picker, etc.)
        loadHaComponents();
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
NsPanelLovelaceEditor.styles = i$4 `
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
    t$1("nspanel-lovelace-editor")
], NsPanelLovelaceEditor);
