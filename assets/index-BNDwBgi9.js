(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`memorized:v1`,t=`Memorized`,n={theme:`light`,fontSize:`large`,language:`en`,notificationsEnabled:!1,reminderTime:`09:00`},r={streak:0,lastPracticeDate:null,totalPracticed:0,strongerCount:0};function i(){try{let t=localStorage.getItem(e);if(!t)return{items:[],settings:{...n},stats:{...r}};let i=JSON.parse(t);return{items:Array.isArray(i.items)?i.items:[],settings:{...n,...i.settings||{}},stats:{...r,...i.stats||{}}}}catch{return{items:[],settings:{...n},stats:{...r}}}}function a(t){localStorage.setItem(e,JSON.stringify({items:t.items,settings:t.settings,stats:t.stats}))}function o(){return`m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function s(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function c(e){return{id:e.id,sentence:e.raw??e.sentence??``,type:e.type??`Other`,question:e.question??``,answer:e.answer??``,label:e.label??``,createdAt:e.createdAt??null,intervalIndex:e.intervalIndex??0,intervalDays:e.intervalDays??1,dueAt:e.dueAt??e.nextReviewAt??null,lastReviewedAt:e.lastReviewedAt??null,timesCorrect:e.timesCorrect??0,timesWrong:e.timesWrong??0,practiced:!!e.practiced}}function l(e){if(!e||typeof e!=`object`)return null;let t=typeof e.id==`string`&&e.id?e.id:o(),n=String(e.sentence??e.raw??``).trim(),r=String(e.question??``).trim(),i=String(e.answer??``).trim();return!r&&!i&&!n?null:{id:t,raw:n||`${r} ${i}`.trim(),type:String(e.type||`Other`),question:r||n||`Fact`,answer:i||`(blank)`,label:String(e.label||r||n||``).slice(0,80),createdAt:e.createdAt||new Date().toISOString(),intervalIndex:Number.isFinite(e.intervalIndex)?e.intervalIndex:0,intervalDays:Number.isFinite(e.intervalDays)?e.intervalDays:1,nextReviewAt:e.dueAt||e.nextReviewAt||new Date().toISOString(),lastReviewedAt:e.lastReviewedAt??null,timesCorrect:Number(e.timesCorrect)||0,timesWrong:Number(e.timesWrong)||0,practiced:!!e.practiced}}function u(e){let t={...n,...e||{}};return{theme:t.theme,fontSize:t.fontSize,language:t.language,notifications:{enabled:!!t.notificationsEnabled,time:t.reminderTime||`09:00`}}}function d(e){let t={...n};if(!e||typeof e!=`object`)return t;let r={...t,...e};return e.notifications&&typeof e.notifications==`object`&&(r.notificationsEnabled=!!e.notifications.enabled,r.reminderTime=e.notifications.time||t.reminderTime),delete r.notifications,{theme:r.theme===`dark`?`dark`:`light`,fontSize:r.fontSize||t.fontSize,language:r.language||t.language,notificationsEnabled:!!r.notificationsEnabled,reminderTime:r.reminderTime||t.reminderTime}}function f(e){let t={...r,...e||{}};return{streak:t.streak||0,lastPracticeDate:t.lastPracticeDate??null,totalPracticed:t.totalPracticed||0,strongerCount:t.strongerCount||0}}function p(e){return!e||typeof e!=`object`?{...r}:{streak:Number(e.streak)||0,lastPracticeDate:e.lastPracticeDate??null,totalPracticed:Number(e.totalPracticed)||0,strongerCount:Number(e.strongerCount)||0}}function m(e,n=new Date){let r={app:t,schemaVersion:1,exportedAt:n.toISOString(),items:(e.items||[]).map(c),settings:u(e.settings),meta:f(e.stats)};return{filename:`memorized-backup-${s(n)}.json`,json:JSON.stringify(r,null,2),doc:r}}function h(e){let t;try{t=typeof e==`string`?JSON.parse(e):e}catch{return{ok:!1,error:`Not valid JSON`}}if(!t||typeof t!=`object`||Array.isArray(t))return{ok:!1,error:`Backup must be a JSON object`};if(t.app!=null&&t.app!==`Memorized`)return{ok:!1,error:`Unknown app: ${t.app}`};let n=t.schemaVersion;return n==null?{ok:!1,error:`Missing schemaVersion`}:typeof n!=`number`||n<1||n>1?{ok:!1,error:`Unsupported schemaVersion ${n} (supported: 1–1)`}:Array.isArray(t.items)?{ok:!0,doc:t}:{ok:!1,error:`Missing items array`}}function g(e,t,n){let i=t.items.map(l).filter(Boolean),a;if(n===`replace`)a=i;else{let t=new Map(e.items.map(e=>[e.id,e]));for(let e of i)t.set(e.id,e);a=Array.from(t.values())}let o=n===`replace`||t.settings?d(t.settings):{...e.settings},s=n===`merge`&&!t.settings?{...e.settings}:o,c;if(n===`replace`)c=p(t.meta);else if(t.meta){let n=p(t.meta),i={...r,...e.stats};c={streak:Math.max(i.streak||0,n.streak||0),lastPracticeDate:n.lastPracticeDate||i.lastPracticeDate,totalPracticed:Math.max(i.totalPracticed||0,n.totalPracticed||0),strongerCount:Math.max(i.strongerCount||0,n.strongerCount||0)}}else c={...e.stats};return{items:a,settings:s,stats:c,importedCount:i.length,totalCount:a.length}}function _(e){let t=e=>{let t=String(e??``);return/[",\n\r]/.test(t)?`"${t.replace(/"/g,`""`)}"`:t},n=[`type`,`sentence`,`question`,`answer`,`due`,`interval`],r=(e.items||[]).map(e=>{let n=e.nextReviewAt||e.dueAt||``,r=n?String(n).slice(0,10):``;return[e.type,e.raw??e.sentence??``,e.question,e.answer,r,e.intervalDays??``].map(t)});return[n.join(`,`),...r.map(e=>e.join(`,`))].join(`
`)}function ee(e=new Date){return`memorized-items-${s(e)}.csv`}var te=`jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|sept|september|oct|october|nov|november|dec|december`,ne=new RegExp(String.raw`(?:(?:\d{1,2})(?:st|nd|rd|th)?[\s\-/.,]*(?:${te})[\s\-/.,]*\d{2,4})|(?:(?:${te})[\s\-/.,]*\d{1,2}(?:st|nd|rd|th)?[\s\-/.,]*\d{2,4})|(?:\d{1,2}[\s\-/]\d{1,2}[\s\-/]\d{2,4})|(?:\d{4}-\d{2}-\d{2})`,`i`),re=/(?:\+?\d[\d\s\-().]{5,}\d)/,v=/\b(mobile|phone|cell|tel|number|whatsapp|contact)\b/i,ie=/\b(birthday|bday|dob|born|birth\s*date|birthdate)\b/i,ae=/\b(?:name|called|aka|fullname|nickname)\b/i,y=/\b(anniversary|wedding|meeting|appointment|event|party|graduation|funeral|holiday|trip|flight|deadline)\b/i;function b(e){let t=e.trim();return t?/s$/i.test(t)?`${t}'`:`${t}'s`:`this person's`}function x(e){return e.split(/\s+/).filter(Boolean).map(e=>/^\d/.test(e)?e:e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()).join(` `)}function S(e){return String(e||``).replace(/\s+/g,` `).trim()}function C(e){let t=S(e).replace(/^(my|the|our)\s+/i,``).split(/\s+/).filter(Boolean);if(t.length===0)return``;let n=new Set([`birthday`,`bday`,`dob`,`mobile`,`phone`,`cell`,`tel`,`number`,`name`,`anniversary`,`event`,`meeting`,`contact`,`whatsapp`,`born`,`birthdate`]);for(;t.length&&n.has(t[t.length-1].toLowerCase());)t.pop();return x(t.join(` `))}function oe(e){let t=S(e);if(!t)return{type:`Other`,question:`What did you want to remember?`,answer:``,label:``,raw:t};let n=t.match(ne);if(n){let e=S(n[0]),r=t.slice(0,n.index);if(ie.test(t)){let n=C(r.replace(ie,` `)),i=n?`${n} Birthday`:`Birthday`;return{type:`Date`,question:n?`When is ${b(n)} birthday?`:`When is the birthday?`,answer:e,label:i,raw:t}}if(y.test(t)){let n=(t.match(y)||[`event`])[0],i=C(r.replace(y,` `));return{type:`Event`,question:`When is ${i?`${b(i)} ${n.toLowerCase()}`:`the ${n.toLowerCase()}`}?`,answer:e,label:i?`${i} ${x(n)}`:x(n),raw:t}}let i=C(r)||S(r);return{type:`Date`,question:i?`When is ${i}?`:`When is this date?`,answer:e,label:i||`Date`,raw:t}}let r=t.match(re),i=(t.match(/\d/g)||[]).length;if(r&&(v.test(t)||i>=7)){let e=S(r[0]),n=C(t.slice(0,r.index).replace(v,` `)),i=n||`Contact`;return{type:`Phone number`,question:`What is ${b(n||`this contact`)} mobile?`,answer:e,label:i,raw:t}}if(v.test(t)&&i>=7){let e=t.replace(/\D/g,``),n=C(t.replace(re,``).replace(v,` `));return{type:`Phone number`,question:`What is ${b(n||`this contact`)} mobile?`,answer:e,label:n||`Contact`,raw:t}}if(ae.test(t)){let e=t.split(ae),n=S(e[0]||``),r=S(e.slice(1).join(` `)||``);if(r){let e=C(n)||`this`;return{type:`Name`,question:e===`this`?`What is the name?`:`What is ${b(e)} name?`,answer:x(r),label:e===`this`?`Name`:e,raw:t}}}if(y.test(t))return{type:`Event`,question:`What is this event?`,answer:t,label:x(t.slice(0,40)),raw:t};let a=t.split(/\s+/);if(a.length>=2){let e=a[a.length-1],n=a.slice(0,-1).join(` `);if(/^\d+$/.test(e)||e.length<=24){let r=C(n);return v.test(n)||/^\d{7,}$/.test(e)?{type:`Phone number`,question:`What is ${b(r||`this contact`)} mobile?`,answer:e,label:r||`Contact`,raw:t}:{type:`Other`,question:r?`What about ${r}?`:`What is ${n}?`,answer:/^\d+$/.test(e)?e:x(e),label:r||x(n).slice(0,40)||`Fact`,raw:t}}}return{type:`Other`,question:`What did you save?`,answer:t,label:t.slice(0,40),raw:t}}function se(e,t){let n=ce(e),r=ce(t);if(!n||!r)return!1;if(n===r)return!0;let i=n.replace(/\D/g,``),a=r.replace(/\D/g,``);if(i.length>=7&&i===a)return!0;let o=le(n),s=le(r);return!!(o&&s&&o===s||n.length>=4&&r.length>=4&&(n.includes(r)||r.includes(n)))}function ce(e){return String(e||``).toLowerCase().replace(/[.,/#'"]/g,` `).replace(/\s+/g,` `).trim()}var w={jan:1,january:1,feb:2,february:2,mar:3,march:3,apr:4,april:4,may:5,jun:6,june:6,jul:7,july:7,aug:8,august:8,sep:9,sept:9,september:9,oct:10,october:10,nov:11,november:11,dec:12,december:12};function le(e){let t=e.toLowerCase().replace(/(st|nd|rd|th)/g,``).replace(/,/g,` `).trim(),n=t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);if(n)return`${n[1]}-${E(n[2])}-${E(n[3])}`;if(n=t.match(/^(\d{1,2})\s+([a-z]+)\s+(\d{2,4})$/),n&&w[n[2]])return`${T(n[3])}-${E(w[n[2]])}-${E(n[1])}`;if(n=t.match(/^([a-z]+)\s+(\d{1,2})\s+(\d{2,4})$/),n&&w[n[1]])return`${T(n[3])}-${E(w[n[1]])}-${E(n[2])}`;if(n=t.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/),n){let e=T(n[3]),t=+n[1],r=+n[2];return t>12?`${e}-${E(r)}-${E(t)}`:r>12?`${e}-${E(t)}-${E(r)}`:`${e}-${E(r)}-${E(t)}`}return null}function T(e){let t=parseInt(e,10);return String(e).length<=2?t>=50?1900+t:2e3+t:t}function E(e){return String(e).padStart(2,`0`)}var D=[1,3,7,14,30,90];function O(e=new Date){let t=new Date(e);return t.setHours(0,0,0,0),t}function k(e,t){let n=new Date(e);return n.setDate(n.getDate()+t),n}function ue(e,t=new Date){return!e.nextReviewAt||O(new Date(e.nextReviewAt)).getTime()<=O(t).getTime()}function A(e,t=new Date){return e.filter(e=>ue(e,t))}function de(e=new Date){return{intervalIndex:0,intervalDays:D[0],nextReviewAt:O(e).toISOString(),lastReviewedAt:null,timesCorrect:0,timesWrong:0,practiced:!1}}function fe(e,t=new Date){let n=Math.min((e.intervalIndex??0)+1,D.length-1),r=D[n];return{...e,intervalIndex:n,intervalDays:r,nextReviewAt:O(k(t,r)).toISOString(),lastReviewedAt:t.toISOString(),timesCorrect:(e.timesCorrect||0)+1,practiced:!0}}function pe(e,t=new Date){let n=e.intervalIndex??0,r=D[Math.min(n,D.length-1)];return{...e,intervalIndex:n,intervalDays:r,nextReviewAt:O(k(t,r)).toISOString(),lastReviewedAt:t.toISOString(),timesWrong:(e.timesWrong||0)+1,practiced:!0}}function me(e=new Date){let t=O(e);return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`}function he(e,t=new Date){let n=me(t),r=e.lastPracticeDate;if(r===n)return{...e};let i=me(k(t,-1)),a=e.streak||0;return r===i?a+=1:a=1,{...e,streak:a,lastPracticeDate:n}}function ge(e){return(e.intervalIndex??0)>=3}var j=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];function M(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function N(e,t,n){let r=P(t);r&&(e.some(e=>P(e)===r)||P(n)===r&&e.includes(n)||e.push(t))}function P(e){return String(e||``).toLowerCase().replace(/\s+/g,` `).trim()}function _e(e){let t=String(e).trim(),n=t.match(/(\d{1,2})\s*([A-Za-z]+)\s*(\d{2,4})/);if(n)return{day:+n[1],monthStr:n[2],year:n[3],format:`dmy`};let r=t.match(/([A-Za-z]+)\s*(\d{1,2})\s*(\d{2,4})/);if(r)return{day:+r[2],monthStr:r[1],year:r[3],format:`mdy`};let i=t.match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);return i?{day:+i[1],month:+i[2],year:i[3],format:`num`}:null}function F(e,t,n,r){return e.format===`mdy`?`${n} ${t} ${r}`:e.format===`num`?`${t}/${e.month||1}/${r}`:`${t} ${n} ${r}`}function ve(e){let t=_e(e),n=[];if(!t)return n.push(`1 Jan 2000`,`15 Mar 1985`,`22 Dec 1999`),n;let r=t.monthStr||j[(t.month||1)-1]||`Jan`,i=j.findIndex(e=>e.toLowerCase().startsWith(r.slice(0,3).toLowerCase())),a=t.year,o=t.day;N(n,F(t,(o+3-1)%28+1,r,a),e),N(n,F(t,o,j[(i+2+12)%12]||`Mar`,a),e);let s=parseInt(a,10);return N(n,F(t,o,r,String((a.length,s+2))),e),N(n,F(t,(o+10-1)%28+1,j[(i+5+12)%12]||`Aug`,a),e),n}function ye(e){let t=String(e).replace(/\D/g,``),n=[];if(t.length>=4){let r=(e,t,n)=>e.slice(0,t)+n+e.slice(t+1);N(n,r(t,t.length-2,String((+t[t.length-2]+1)%10)),e),N(n,r(t,Math.floor(t.length/2),String((+t[Math.floor(t.length/2)]+3)%10)),e),N(n,t.slice(0,-1)+String((+t.slice(-1)+2)%10),e),N(n,`9`+t.slice(1),e)}for(;n.length<3;)N(n,String(9e7+Math.floor(Math.random()*9999999)),e);return n}function be(e,t){let n=[`Alex`,`Sam`,`Jordan`,`Taylor`,`Casey`,`Morgan`,`Riley`,`Jamie`,`Avery`,`Quinn`],r=[];for(let n of t)(n.type===`Name`||n.type===`Other`)&&N(r,n.answer,e);for(let t of M(n))N(r,t,e);return r}function xe(e,t){let n=[];for(let r of M(t))N(n,r.answer,e);for(let t of[`Not sure`,`None of these`,`Unknown`,`N/A`,`Something else`])N(n,t,e);return n}function Se(e,t){let n=e.answer,r=[],i=t.filter(t=>t.id!==e.id);switch(e.type){case`Date`:case`Event`:r=ve(n);for(let e of i)(e.type===`Date`||e.type===`Event`)&&N(r,e.answer,n);break;case`Phone number`:r=ye(n);for(let e of i)e.type===`Phone number`&&N(r,e.answer,n);break;case`Name`:r=be(n,i);break;default:r=xe(n,i)}let a=M([n,...M(r).slice(0,3)]);for(;a.length<3;)a.push(`Option ${a.length+1}`);return a.slice(0,4)}var I=null;function L(){return typeof window<`u`&&`Notification`in window}async function Ce(){if(!L())return{ok:!1,reason:`unsupported`};if(Notification.permission===`granted`)return{ok:!0,permission:`granted`};if(Notification.permission===`denied`)return{ok:!1,reason:`denied`,permission:`denied`};try{let e=await Notification.requestPermission();return e===`granted`?{ok:!0,permission:e}:e===`denied`?{ok:!1,reason:`denied`,permission:e}:{ok:!1,reason:`default`,permission:e}}catch{return{ok:!1,reason:`error`}}}function R(){I!=null&&(clearTimeout(I),I=null)}function z(e,t){if(R(),!t||!L()||Notification.permission!==`granted`)return;let[n,r]=(e||`09:00`).split(`:`).map(e=>parseInt(e,10)),i=new Date,a=new Date;a.setHours(n||9,r||0,0,0),a<=i&&a.setDate(a.getDate()+1);let o=a.getTime()-i.getTime();I=setTimeout(()=>{try{new Notification(`Memorized`,{body:`Time for a quick practice session.`,icon:`./icons/icon-192.png`,tag:`memorized-daily`})}catch{}z(e,!0)},o)}function we(e){return e.reason===`unsupported`?`Notifications are not supported in this browser.`:e.reason===`denied`||e.permission===`denied`?`Notifications are blocked. Enable them in your browser site settings if you want a daily reminder.`:e.ok?``:`Could not enable notifications. You can try again from Settings.`}var Te=`0.1.0`,Ee=`modulepreload`,De=function(e,t){return new URL(e,t).href},Oe={},ke=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=De(t,n),t=s(t),t in Oe)return;Oe[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Ee,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Ae=Te.split(`.`).slice(0,2).join(`.`),je=[`Date`,`Name`,`Phone number`,`Event`,`Other`],Me=[{id:`en`,label:`English`},{id:`zh`,label:`中文 (soon)`},{id:`ms`,label:`Bahasa Melayu (soon)`},{id:`ta`,label:`தமிழ் (soon)`}],B=i(),V=`home`,Ne=null,H=``,U=null,W=null,G=document.getElementById(`app`);function K(){a(B)}function q(){document.documentElement.dataset.theme=B.settings.theme===`dark`?`dark`:`light`;let e=B.settings.fontSize;document.documentElement.dataset.font=e==="default"?`default`:e===`xlarge`||e===`extra large`?`xlarge`:`large`;let t=document.querySelector(`meta[name="theme-color"]`);t&&t.setAttribute(`content`,B.settings.theme===`dark`?`#1C1917`:`#0F5C56`)}function J(e){let t=document.querySelector(`.toast`);t&&t.remove();let n=document.createElement(`div`);n.className=`toast`,n.textContent=e,document.body.appendChild(n),clearTimeout(Ne),Ne=setTimeout(()=>n.remove(),2200)}function Pe(){return A(B.items).length}function Fe(){return B.items.filter(ge).length}function Ie(e){let t=String(e||``).trim();if(!t)return;let n=oe(t);if(!n.answer){J(`Could not parse — try again`);return}let r={id:o(),raw:t,type:n.type,question:n.question,answer:n.answer,label:n.label,createdAt:new Date().toISOString(),...de()};B.items.unshift(r),K(),J(`Saved`),Q()}function Le(e){B.items=B.items.filter(t=>t.id!==e),K(),J(`Deleted`),W=null,Q()}function Re(e,t){B.items=B.items.map(n=>n.id===e?{...n,type:t.type,question:t.question.trim(),answer:t.answer.trim(),label:t.label.trim()||t.question.trim().slice(0,40)}:n),K(),W=null,J(`Updated`),Q()}function ze(){let e=A(B.items);if(!e.length){J(`Nothing due right now`);return}U={queue:[...e].sort(()=>Math.random()-.5).map(e=>e.id),index:0,phase:`recall`,input:``,choices:null,selected:null,revealed:!1,lastResult:null},V=`practice`,Q()}function Y(){if(!U)return null;let e=U.queue[U.index];return B.items.find(t=>t.id===e)||null}function Be(e){let t=Y();if(!t)return;let n=e?fe(t):pe(t);B.items=B.items.map(e=>e.id===t.id?n:e),B.stats=he(B.stats),B.stats.totalPracticed=(B.stats.totalPracticed||0)+1,B.stats.strongerCount=Fe(),K(),U.lastResult=e?`correct`:`wrong`,U.phase=`reveal`,U.revealed=!0,Q()}function Ve(){let e=Y();e&&(se(U.input,e.answer)?Be(!0):(U.phase=`mcq`,U.choices=Se(e,B.items),U.selected=null,Q()))}function He(e){let t=Y();t&&U.selected==null&&(U.selected=e,Be(se(e,t.answer)))}function Ue(){if(U){if(U.index>=U.queue.length-1){U=null,V=`home`,J(`Session complete`),Q();return}U.index+=1,U.phase=`recall`,U.input=``,U.choices=null,U.selected=null,U.revealed=!1,U.lastResult=null,Q()}}function We(){let e=Y();e&&(U.phase=`mcq`,U.choices=Se(e,B.items),U.selected=null,Q())}async function Ge(e){if(!e){B.settings.notificationsEnabled=!1,R(),K(),Q();return}let t=await Ce();t.ok?(B.settings.notificationsEnabled=!0,z(B.settings.reminderTime,!0),K(),J(`Daily reminder on`)):(B.settings.notificationsEnabled=!1,K(),J(we(t)||`Notifications unavailable`)),Q()}function Ke(e,t,n){let r=new Blob([t],{type:n||`application/json;charset=utf-8`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=e,a.rel=`noopener`,document.body.appendChild(a),a.click(),a.remove(),setTimeout(()=>URL.revokeObjectURL(i),1500)}function X(){let{filename:e,json:t}=m(B);Ke(e,t,`application/json;charset=utf-8`),J(`Exported ${B.items.length} item${B.items.length===1?``:`s`}`)}async function qe(){if(typeof window.showSaveFilePicker!=`function`){X();return}try{let{filename:e,json:t}=m(B),n=await(await window.showSaveFilePicker({suggestedName:e,types:[{description:`Memorized backup`,accept:{"application/json":[`.json`]}}]})).createWritable();await n.write(t),await n.close(),J(`Saved ${B.items.length} item${B.items.length===1?``:`s`}`)}catch(e){if(e&&e.name===`AbortError`)return;X()}}function Je(){let e=_(B);Ke(ee(),e,`text/csv;charset=utf-8`),J(`CSV: ${B.items.length} item${B.items.length===1?``:`s`}`)}function Ye(){return confirm(`Import backup

OK = Replace all data with this file
Cancel = choose Merge instead`)?`replace`:confirm(`Merge by id?

OK = Merge (same id updates; new ids added)
Cancel = abort import`)?`merge`:null}async function Xe(e){if(!e)return;let t;try{t=await e.text()}catch{J(`Could not read file`);return}let n=h(t);if(!n.ok){J(`Import failed: ${n.error}`);return}let r=Ye();if(!r){J(`Import cancelled`);return}let i=Array.isArray(n.doc.items)?n.doc.items.length:0,a=r===`replace`?`Replace ALL current data with ${i} item${i===1?``:`s`} from the file?`:`Merge ${i} item${i===1?``:`s`} by id into current data?`;if(!confirm(a)){J(`Import cancelled`);return}try{let e=g(B,n.doc,r);B={items:e.items,settings:e.settings,stats:e.stats},K(),q(),B.settings.notificationsEnabled&&L()&&typeof Notification<`u`&&Notification.permission===`granted`?z(B.settings.reminderTime,!0):R(),J(r===`replace`?`Replaced — ${e.importedCount} item${e.importedCount===1?``:`s`}`:`Merged — ${e.importedCount} from file, ${e.totalCount} total`),Q()}catch(e){J(`Import error: ${e?.message||`unknown`}`)}}function Z(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Ze(){return`
    <nav class="nav" aria-label="Main">
      ${[{id:`home`,label:`Home`,icon:`⌂`},{id:`practice`,label:`Practice`,icon:`✎`},{id:`items`,label:`Items`,icon:`☰`}].map(e=>`
        <button type="button" data-nav="${e.id}" class="${V===e.id?`active`:``}">
          <span class="nav-icon" aria-hidden="true">${e.icon}</span>
          ${e.label}
        </button>`).join(``)}
    </nav>`}function Qe(){let e=Pe();return`
    <div class="page">
      <div class="topbar">
        <div class="brand">Memorized</div>
        <button type="button" class="icon-btn" data-go="settings" aria-label="Settings">⚙</button>
      </div>

      <div class="due-banner">
        <span class="pill">${e} due</span>
        <button type="button" class="btn btn-primary" style="width:auto;padding:10px 16px" data-start-practice ${e?``:`disabled`}>Start practice</button>
      </div>

      <div class="card add-box">
        <label class="add-title" for="add-input">Enter an item. Tap Memorized.</label>
        <textarea class="textarea" id="add-input" placeholder="e.g. Mum Birthday 4 Jul 1947"></textarea>
        <div class="btn-row">
          <button type="button" class="btn btn-primary" data-add>Memorized</button>
        </div>
      </div>
    </div>`}function $e(e,t){return`${e.question} ${e.answer} ${e.label} ${e.raw} ${e.type}`.toLowerCase().includes(t)}function et(e){let t=(e||``).trim().toLowerCase(),n=t?B.items.filter(e=>$e(e,t)):B.items;return n.length?`<div class="list">
        ${n.map(e=>`
          <div class="list-item" data-item="${e.id}">
            <div class="body item-row">
              <span class="type-badge">${Z(e.type)}</span>
              <span class="q">${Z(e.question)}</span>
              <span class="meta">${Z(e.answer)} · ${e.intervalDays||D[e.intervalIndex||0]}d</span>
            </div>
            <div class="actions">
              <button type="button" class="tiny-btn" data-edit="${e.id}">Edit</button>
              <button type="button" class="tiny-btn danger" data-delete="${e.id}">Delete</button>
            </div>
          </div>`).join(``)}
      </div>`:`<div class="empty">No matches</div>`}function tt(e){let t=(e||``).trim().toLowerCase();return t?`${B.items.filter(e=>$e(e,t)).length} of ${B.items.length}`:String(B.items.length)}function nt(){let e=G.querySelector(`#items-results`);e&&(e.innerHTML=et(H),$(e));let t=G.querySelector(`[data-items-count]`);t&&(t.textContent=tt(H))}function rt(){return`
      <section class="progress-summary" aria-label="Your progress">
        <div class="stat-grid compact">
          <div class="stat"><div class="num">${B.stats.streak||0}</div><div class="cap">Streak</div></div>
          <div class="stat"><div class="num">${B.stats.totalPracticed||0}</div><div class="cap">Practiced</div></div>
          <div class="stat"><div class="num">${Fe()}</div><div class="cap">Stronger</div></div>
        </div>
        <p class="progress-note">Practice when items are due to keep a gentle streak. “Stronger” = reached the 14-day step or beyond.</p>
      </section>`}function it(){if(!U){let e=Pe();return`
      <div class="page">
        <div class="topbar"><h1>Practice</h1></div>
        ${rt()}
        <div class="card">
          <p>${e?`${e} item${e===1?``:`s`} due today.`:`Nothing due. Add facts on Home, or check back tomorrow.`}</p>
          <button type="button" class="btn btn-primary" data-start-practice ${e?``:`disabled`}>Start practice</button>
        </div>
      </div>`}let e=Y();if(!e)return U=null,it();let t=U.queue.length,n=U.index+1,r=``;if(U.phase===`recall`)r=`
      <div class="card">
        <div class="practice-progress">${n} of ${t}</div>
        <span class="type-badge">${Z(e.type)}</span>
        <div class="question">${Z(e.question)}</div>
        <label class="label" for="recall">Your answer</label>
        <input class="input" id="recall" autocomplete="off" autocapitalize="off" value="${Z(U.input)}" />
        <div class="btn-row">
          <button type="button" class="btn btn-primary" data-submit-recall>Check</button>
          <button type="button" class="btn btn-ghost" data-dont-remember>Don't remember</button>
        </div>
      </div>`;else if(U.phase===`mcq`){let i=U.choices||[];r=`
      <div class="card">
        <div class="practice-progress">${n} of ${t} · multiple choice</div>
        <span class="type-badge">${Z(e.type)}</span>
        <div class="question">${Z(e.question)}</div>
        <div class="mcq">
          ${i.map(e=>`<button type="button" data-mcq="${Z(e)}">${Z(e)}</button>`).join(``)}
        </div>
      </div>`}else{let i=U.lastResult===`correct`;r=`
      <div class="card">
        <div class="practice-progress">${n} of ${t}</div>
        <span class="type-badge">${Z(e.type)}</span>
        <div class="question">${Z(e.question)}</div>
        <div class="feedback ${i?`ok`:`bad`}">
          ${i?`Correct`:`Not quite`} — ${Z(e.answer)}
        </div>
        <p style="margin-top:12px;font-size:var(--font-small)">
          Next review in ${e.intervalDays||D[e.intervalIndex||0]} day${(e.intervalDays||1)===1?``:`s`}.
        </p>
        <div class="btn-row">
          <button type="button" class="btn btn-primary" data-next-card>${n>=t?`Done`:`Next`}</button>
        </div>
      </div>`}return`<div class="page"><div class="topbar"><h1>Practice</h1></div>${rt()}${r}</div>`}function at(){return B.items.length?`
    <div class="page">
      <div class="search-wrap items-search">
        <label class="sr-only" for="items-search">Search your facts</label>
        <input class="input" id="items-search" type="search" placeholder="Search your facts…" autocomplete="off" data-items-search value="${Z(H)}" />
      </div>
      <div class="topbar"><h1>Items</h1><span class="pill muted" data-items-count>${Z(tt(H))}</span></div>
      <div id="items-results">${et(H)}</div>
    </div>`:`
      <div class="page">
        <div class="topbar"><h1>Items</h1></div>
        <div class="empty">No items yet. Add a fact from Home.</div>
      </div>`}function ot(){let e=B.settings,t=L()?Notification.permission===`denied`?`Notifications are blocked. Enable them in your browser site settings if you want a daily reminder.`:`Reminders fire best while the app is open or installed as a PWA. Android Chrome may limit alerts when the site is fully closed.`:`Notifications are not supported in this browser.`;return`
    <div class="page">
      <div class="topbar">
        <button type="button" class="icon-btn" data-go="home" aria-label="Back">←</button>
        <h1 style="flex:1;margin:0">Settings</h1>
      </div>

      <div class="card">
        <div class="settings-row">
          <div class="left"><strong>Theme</strong><span>Light or Dark</span></div>
          <div class="segmented" data-setting="theme">
            <button type="button" data-val="light" class="${e.theme===`light`?`on`:``}">Light</button>
            <button type="button" data-val="dark" class="${e.theme===`dark`?`on`:``}">Dark</button>
          </div>
        </div>

        <div class="settings-row">
          <div class="left"><strong>Font</strong><span>Default · Large · Extra large</span></div>
        </div>
        <div class="segmented" data-setting="fontSize" style="width:100%;margin-bottom:8px">
          <button type="button" data-val="default" class="${e.fontSize==="default"?`on`:``}">Default</button>
          <button type="button" data-val="large" class="${e.fontSize===`large`||!e.fontSize?`on`:``}">Large</button>
          <button type="button" data-val="xlarge" class="${e.fontSize===`xlarge`||e.fontSize===`extra large`?`on`:``}">Extra large</button>
        </div>

        <div class="settings-row">
          <div class="left"><strong>Daily reminder</strong><span>Browser notification</span></div>
          <button type="button" class="toggle ${e.notificationsEnabled?`on`:``}" data-toggle-notif aria-label="Toggle reminder"></button>
        </div>
        <div class="field">
          <label class="label" for="remind-time">Reminder time</label>
          <input class="input" type="time" id="remind-time" value="${Z(e.reminderTime||`09:00`)}" />
        </div>
        <div class="notice">${Z(t)}</div>

        <div class="settings-row" style="margin-top:8px">
          <div class="left"><strong>Language</strong><span>English is fully supported</span></div>
        </div>
        <select class="select" data-lang>
          ${Me.map(t=>`<option value="${t.id}" ${e.language===t.id?`selected`:``}>${Z(t.label)}</option>`).join(``)}
        </select>
      </div>

      <div class="card">
        <h2 style="margin-top:0">Data</h2>
        <p class="hint" style="margin-top:0">Keep a copy of this file to move phones or recover after clearing browser data.</p>
        <div class="btn-row" style="flex-direction:column;gap:8px">
          <button type="button" class="btn btn-primary" data-export-json>Export data</button>
          ${typeof window.showSaveFilePicker==`function`?`<button type="button" class="btn btn-ghost" data-export-save>Save to file…</button>`:``}
          <button type="button" class="btn btn-ghost" data-export-csv>Export as CSV</button>
          <button type="button" class="btn btn-ghost" data-import-trigger>Import / migrate</button>
        </div>
        <input type="file" accept="application/json,.json" hidden data-import-file />
        <div class="notice" style="margin-top:12px">
          Export downloads a readable JSON backup (items + settings). Import asks Replace all vs Merge by id.
        </div>
      </div>

      <div class="card">
        <p style="margin:0;font-size:var(--font-small)">Privacy: all data stays on this device (localStorage). No accounts. No cloud sync. Use Export to keep a portable copy.</p>
      </div>

      <p class="app-version">Release ${Z(Ae)}</p>
    </div>`}function st(){if(!W)return``;let e=B.items.find(e=>e.id===W);return e?`
    <div class="modal-backdrop" data-close-modal>
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="edit-title">
        <h2 id="edit-title">Edit item</h2>
        <div class="field">
          <label class="label" for="edit-type">Type</label>
          <select class="select" id="edit-type">
            ${je.map(t=>`<option value="${t}" ${e.type===t?`selected`:``}>${t}</option>`).join(``)}
          </select>
        </div>
        <div class="field">
          <label class="label" for="edit-label">Label</label>
          <input class="input" id="edit-label" value="${Z(e.label)}" />
        </div>
        <div class="field">
          <label class="label" for="edit-q">Question</label>
          <input class="input" id="edit-q" value="${Z(e.question)}" />
        </div>
        <div class="field">
          <label class="label" for="edit-a">Answer</label>
          <input class="input" id="edit-a" value="${Z(e.answer)}" />
        </div>
        <div class="btn-row two">
          <button type="button" class="btn btn-ghost" data-close-modal>Cancel</button>
          <button type="button" class="btn btn-primary" data-save-edit>Save</button>
        </div>
        <div class="btn-row">
          <button type="button" class="btn btn-danger" data-delete-edit>Delete</button>
        </div>
      </div>
    </div>`:``}function Q(){q(),V===`progress`&&(V=`practice`),V!==`items`&&(H=``);let e=``;switch(V){case`practice`:e=it();break;case`items`:e=at();break;case`settings`:e=ot();break;default:e=Qe()}G.innerHTML=e+(V===`settings`?``:Ze())+st(),ct()}function ct(){G.querySelectorAll(`[data-nav]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-nav`);if(t===`practice`&&!U){V=`practice`,Q();return}t!==`practice`&&(U=null),V=t,Q()})}),G.querySelectorAll(`[data-go]`).forEach(e=>{e.addEventListener(`click`,()=>{V=e.getAttribute(`data-go`),Q()})});let e=G.querySelector(`[data-add]`);e&&e.addEventListener(`click`,()=>{let e=G.querySelector(`#add-input`);Ie(e?.value),e&&(e.value=``)});let t=G.querySelector(`[data-items-search]`);t&&t.addEventListener(`input`,()=>{H=t.value,nt()}),G.querySelectorAll(`[data-start-practice]`).forEach(e=>{e.addEventListener(`click`,ze)});let n=G.querySelector(`#recall`);n&&(n.focus(),n.addEventListener(`input`,()=>{U.input=n.value}),n.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),Ve())}));let r=G.querySelector(`[data-submit-recall]`);r&&r.addEventListener(`click`,Ve);let i=G.querySelector(`[data-dont-remember]`);i&&i.addEventListener(`click`,We),G.querySelectorAll(`[data-mcq]`).forEach(e=>{e.addEventListener(`click`,()=>He(e.getAttribute(`data-mcq`)))});let a=G.querySelector(`[data-next-card]`);a&&a.addEventListener(`click`,Ue),$(G);let o=G.querySelector(`.modal-backdrop`);o&&o.addEventListener(`click`,e=>{e.target===o&&(W=null,Q())}),G.querySelectorAll(`button[data-close-modal]`).forEach(e=>{e.addEventListener(`click`,()=>{W=null,Q()})});let s=G.querySelector(`.modal`);s&&s.addEventListener(`click`,e=>e.stopPropagation());let c=G.querySelector(`[data-save-edit]`);c&&c.addEventListener(`click`,()=>{Re(W,{type:G.querySelector(`#edit-type`).value,label:G.querySelector(`#edit-label`).value,question:G.querySelector(`#edit-q`).value,answer:G.querySelector(`#edit-a`).value})});let l=G.querySelector(`[data-delete-edit]`);l&&l.addEventListener(`click`,()=>{confirm(`Delete this item?`)&&Le(W)}),G.querySelectorAll(`[data-setting]`).forEach(e=>{let t=e.getAttribute(`data-setting`);e.querySelectorAll(`button[data-val]`).forEach(e=>{e.addEventListener(`click`,()=>{B.settings[t]=e.getAttribute(`data-val`),K(),Q()})})});let u=G.querySelector(`[data-toggle-notif]`);u&&u.addEventListener(`click`,()=>{Ge(!B.settings.notificationsEnabled)});let d=G.querySelector(`#remind-time`);d&&d.addEventListener(`change`,()=>{B.settings.reminderTime=d.value||`09:00`,K(),B.settings.notificationsEnabled&&z(B.settings.reminderTime,!0)});let f=G.querySelector(`[data-lang]`);f&&f.addEventListener(`change`,()=>{B.settings.language=f.value,K(),f.value!==`en`&&J(`Language stub — English UI for now`)});let p=G.querySelector(`[data-export-json]`);p&&p.addEventListener(`click`,X);let m=G.querySelector(`[data-export-save]`);m&&m.addEventListener(`click`,()=>qe());let h=G.querySelector(`[data-export-csv]`);h&&h.addEventListener(`click`,Je);let g=G.querySelector(`[data-import-trigger]`),_=G.querySelector(`[data-import-file]`);g&&_&&(g.addEventListener(`click`,()=>_.click()),_.addEventListener(`change`,()=>{let e=_.files&&_.files[0];_.value=``,Xe(e)}))}function $(e){e.querySelectorAll(`[data-edit]`).forEach(e=>{e.addEventListener(`click`,()=>{W=e.getAttribute(`data-edit`),Q()})}),e.querySelectorAll(`[data-delete]`).forEach(e=>{e.addEventListener(`click`,()=>{confirm(`Delete this item?`)&&Le(e.getAttribute(`data-delete`))})})}q(),B.settings.notificationsEnabled&&L()&&Notification.permission===`granted`&&z(B.settings.reminderTime,!0),Q(),ke(async()=>{let{registerSW:e}=await import(`./virtual_pwa-register-Drf_7JqF.js`);return{registerSW:e}},[],import.meta.url).then(({registerSW:e})=>{e({immediate:!0})}).catch(()=>{});export{ke as t};