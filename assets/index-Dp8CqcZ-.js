(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`memorized:v1`,t=`Memorized`,n={theme:`light`,fontSize:`large`,language:`en`,notificationsEnabled:!1,reminderTime:`09:00`,updatedAt:null},r={streak:0,lastPracticeDate:null,totalPracticed:0,strongerCount:0,deletedIds:[]};function i(e){let t=new Map;if(Array.isArray(e))for(let n of e){let e=typeof n==`string`?n:n&&typeof n.id==`string`?n.id:null;if(!e)continue;let r=n&&typeof n==`object`&&typeof n.deletedAt==`string`?n.deletedAt:null,i=t.get(e);(i===void 0||r&&(!i||Date.parse(r)>Date.parse(i)))&&t.set(e,r)}return Array.from(t,([e,t])=>({id:e,deletedAt:t||`1970-01-01T00:00:00.000Z`}))}function a(...e){return i(e.flatMap(e=>Array.isArray(e)?e:[]))}function o(e){if(typeof e!=`string`||!e)return null;let t=Date.parse(e);return Number.isFinite(t)&&t>0?t:null}function s(e){let t=/^m_([0-9a-z]+)_/.exec(typeof e==`string`?e:``);if(!t)return null;let n=parseInt(t[1],36);return Number.isFinite(n)&&n>=15778368e5&&n<41024448e5?n:null}function c(e){if(!e)return null;if(o(e.createdAt)!=null)return e.createdAt;let t=[s(e.id),o(e.lastReviewedAt),o(e.updatedAt)].filter(e=>e!=null);return t.length?new Date(Math.min(...t)).toISOString():null}function l(e){return e.updatedAt||e.lastReviewedAt||e.createdAt||`1970-01-01T00:00:00.000Z`}function u(){return{items:[],settings:{...n},stats:{...r,deletedIds:[]}}}function d(){try{let t=localStorage.getItem(e);if(!t)return u();let a=JSON.parse(t),o={...r,...a.stats||{}};return o.deletedIds=i(o.deletedIds),{items:(Array.isArray(a.items)?a.items:[]).map(e=>{if(!e||typeof e!=`object`)return e;let t=e;if(!t.createdAt){let e=c(t);e&&(t={...t,createdAt:e})}return t.updatedAt||(t={...t,updatedAt:l(t)}),t}),settings:{...n,...a.settings||{}},stats:o}}catch{return u()}}function f(t){localStorage.setItem(e,JSON.stringify({items:t.items,settings:t.settings,stats:t.stats}))}function p(){return`m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function m(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function h(e){return{id:e.id,sentence:e.raw??e.sentence??``,type:e.type??`Other`,question:e.question??``,answer:e.answer??``,label:e.label??``,createdAt:c(e),intervalIndex:e.intervalIndex??0,intervalDays:e.intervalDays??1,dueAt:e.dueAt??e.nextReviewAt??null,lastReviewedAt:e.lastReviewedAt??null,timesCorrect:e.timesCorrect??0,timesWrong:e.timesWrong??0,practiced:!!e.practiced,updatedAt:l(e)}}function g(e){if(!e||typeof e!=`object`)return null;let t=typeof e.id==`string`&&e.id?e.id:p(),n=String(e.sentence??e.raw??``).trim(),r=String(e.question??``).trim(),i=String(e.answer??``).trim();if(!r&&!i&&!n)return null;let a=c({...e,id:t});return{id:t,raw:n||`${r} ${i}`.trim(),type:String(e.type||`Other`),question:r||n||`Fact`,answer:i||`(blank)`,label:String(e.label||r||n||``).slice(0,80),createdAt:a,intervalIndex:Number.isFinite(e.intervalIndex)?e.intervalIndex:0,intervalDays:Number.isFinite(e.intervalDays)?e.intervalDays:1,nextReviewAt:e.dueAt||e.nextReviewAt||new Date().toISOString(),lastReviewedAt:e.lastReviewedAt??null,timesCorrect:Number(e.timesCorrect)||0,timesWrong:Number(e.timesWrong)||0,practiced:!!e.practiced,updatedAt:e.updatedAt||e.lastReviewedAt||a||new Date().toISOString()}}function _(e){let t={...n,...e||{}};return{theme:t.theme,fontSize:t.fontSize,language:t.language,notifications:{enabled:!!t.notificationsEnabled,time:t.reminderTime||`09:00`},updatedAt:t.updatedAt||null}}function v(e){let t={...n};if(!e||typeof e!=`object`)return t;let r={...t,...e};return e.notifications&&typeof e.notifications==`object`&&(r.notificationsEnabled=!!e.notifications.enabled,r.reminderTime=e.notifications.time||t.reminderTime),delete r.notifications,{theme:r.theme===`dark`?`dark`:`light`,fontSize:r.fontSize||t.fontSize,language:r.language||t.language,notificationsEnabled:!!r.notificationsEnabled,reminderTime:r.reminderTime||t.reminderTime,updatedAt:typeof r.updatedAt==`string`?r.updatedAt:null}}function y(e){let t={...r,...e||{}};return{streak:t.streak||0,lastPracticeDate:t.lastPracticeDate??null,totalPracticed:t.totalPracticed||0,strongerCount:t.strongerCount||0,deletedIds:i(t.deletedIds)}}function b(e){return!e||typeof e!=`object`?{...r,deletedIds:[]}:{streak:Number(e.streak)||0,lastPracticeDate:e.lastPracticeDate??null,totalPracticed:Number(e.totalPracticed)||0,strongerCount:Number(e.strongerCount)||0,deletedIds:i(e.deletedIds)}}function x(e,n=new Date){let r={app:t,schemaVersion:1,exportedAt:n.toISOString(),items:(e.items||[]).map(h),settings:_(e.settings),meta:y(e.stats)};return{filename:`memorized-backup-${m(n)}.json`,json:JSON.stringify(r,null,2),doc:r}}function ee(e){let t;try{t=typeof e==`string`?JSON.parse(e):e}catch{return{ok:!1,error:`Not valid JSON`}}if(!t||typeof t!=`object`||Array.isArray(t))return{ok:!1,error:`Backup must be a JSON object`};if(t.app!=null&&t.app!==`Memorized`)return{ok:!1,error:`Unknown app: ${t.app}`};let n=t.schemaVersion;return n==null?{ok:!1,error:`Missing schemaVersion`}:typeof n!=`number`||n<1||n>1?{ok:!1,error:`Unsupported schemaVersion ${n} (supported: 1–1)`}:Array.isArray(t.items)?{ok:!0,doc:t}:{ok:!1,error:`Missing items array`}}function te(e,t,n){let i=t.items.map(g).filter(Boolean),o;if(n===`replace`)o=i;else{let t=new Map(e.items.map(e=>[e.id,e]));for(let e of i)t.set(e.id,e);o=Array.from(t.values())}let s=n===`replace`||t.settings?v(t.settings):{...e.settings},c=n===`merge`&&!t.settings?{...e.settings}:s,l;if(n===`replace`)l=b(t.meta);else if(t.meta){let n=b(t.meta),i={...r,...e.stats};l={streak:Math.max(i.streak||0,n.streak||0),lastPracticeDate:n.lastPracticeDate||i.lastPracticeDate,totalPracticed:Math.max(i.totalPracticed||0,n.totalPracticed||0),strongerCount:Math.max(i.strongerCount||0,n.strongerCount||0),deletedIds:a(i.deletedIds,n.deletedIds)}}else l={...e.stats};return{items:o,settings:c,stats:l,importedCount:i.length,totalCount:o.length}}function ne(e){let t=e=>{let t=String(e??``);return/[",\n\r]/.test(t)?`"${t.replace(/"/g,`""`)}"`:t},n=[`type`,`sentence`,`question`,`answer`,`due`,`interval`],r=(e.items||[]).map(e=>{let n=e.nextReviewAt||e.dueAt||``,r=n?String(n).slice(0,10):``;return[e.type,e.raw??e.sentence??``,e.question,e.answer,r,e.intervalDays??``].map(t)});return[n.join(`,`),...r.map(e=>e.join(`,`))].join(`
`)}function re(e=new Date){return`memorized-items-${m(e)}.csv`}var S=[1,3,7,14,30,90];function C(e=new Date){let t=new Date(e);return t.setHours(0,0,0,0),t}function w(e,t){let n=new Date(e);return n.setDate(n.getDate()+t),n}function ie(e,t){let n=new Date(e);return n.setTime(n.getTime()+t*60*60*1e3),n}function ae(e,t=new Date){return!e.nextReviewAt||new Date(e.nextReviewAt).getTime()<=t.getTime()}function oe(e,t=new Date){return e.filter(e=>ae(e,t))}function se(e=new Date){return{intervalIndex:0,intervalDays:S[0],nextReviewAt:C(e).toISOString(),lastReviewedAt:null,timesCorrect:0,timesWrong:0,practiced:!1,sameDaySecondDone:!1}}function ce(e,t=new Date){let n=e.intervalIndex??0,r=!!e.sameDaySecondDone;if(n===0&&!r)return e.practiced?{...e,intervalIndex:0,intervalDays:S[0],nextReviewAt:C(w(t,S[0])).toISOString(),lastReviewedAt:t.toISOString(),timesCorrect:(e.timesCorrect||0)+1,practiced:!0,sameDaySecondDone:!0}:{...e,intervalIndex:0,intervalDays:4/24,nextReviewAt:ie(t,4).toISOString(),lastReviewedAt:t.toISOString(),timesCorrect:(e.timesCorrect||0)+1,practiced:!0,sameDaySecondDone:!1};let i=Math.min(n+1,S.length-1),a=S[i];return{...e,intervalIndex:i,intervalDays:a,nextReviewAt:C(w(t,a)).toISOString(),lastReviewedAt:t.toISOString(),timesCorrect:(e.timesCorrect||0)+1,practiced:!0,sameDaySecondDone:!0}}function le(e,t=new Date){let n=e.intervalIndex??0,r=!!e.sameDaySecondDone;if(n===0&&!r&&e.practiced)return{...e,intervalIndex:0,intervalDays:4/24,nextReviewAt:ie(t,4).toISOString(),lastReviewedAt:t.toISOString(),timesWrong:(e.timesWrong||0)+1,practiced:!0,sameDaySecondDone:!1};if(n===0&&!r&&!e.practiced)return{...e,intervalIndex:0,intervalDays:S[0],nextReviewAt:t.toISOString(),lastReviewedAt:t.toISOString(),timesWrong:(e.timesWrong||0)+1,practiced:!1,sameDaySecondDone:!1};let i=S[Math.min(n,S.length-1)];return{...e,intervalIndex:n,intervalDays:i,nextReviewAt:C(w(t,i)).toISOString(),lastReviewedAt:t.toISOString(),timesWrong:(e.timesWrong||0)+1,practiced:!0,sameDaySecondDone:r||n>0}}function ue(e,t=new Date){let n=S[1];return{...e,intervalIndex:1,intervalDays:n,nextReviewAt:C(w(t,n)).toISOString(),lastReviewedAt:t.toISOString(),timesWrong:(e.timesWrong||0)+1,practiced:!0,sameDaySecondDone:!0}}function de(e=new Date){let t=C(e);return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`}function fe(e,t=new Date){let n=de(t),r=e.lastPracticeDate;if(r===n)return{...e};let i=de(w(t,-1)),a=e.streak||0;return r===i?a+=1:a=1,{...e,streak:a,lastPracticeDate:n}}function pe(e){return(e.intervalIndex??0)>=3}function me(e){return e.filter(pe)}var he=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];function ge(e){let t=Date.parse(typeof e==`string`?e:``);if(!Number.isFinite(t)||t<=0)return`—`;let n=new Date(t);return`${n.getDate()} ${he[n.getMonth()]} ${n.getFullYear()}`}function _e(e){let t=Number(e?.intervalDays);return Number.isFinite(t)&&t>=0?t:S[Math.min(Math.max(Number(e?.intervalIndex)||0,0),S.length-1)]}function ve(e){let t=Number(e);if(!Number.isFinite(t)||t<=0)return`Today`;if(t<1){let e=Math.max(1,Math.round(t*24*60));if(e<60)return`${e}m`;let n=Math.round(e/60);return n>=24?`1d`:`${n}h`}return`${Math.round(t)}d`}function ye(e){return ve(_e(e))}function T(e){let t=Date.parse(e||``);return Number.isFinite(t)?t:0}function be(){return{items:[],settings:{...n},stats:{...r,deletedIds:[]}}}function xe(e){let t=te(be(),e,`replace`);return{items:t.items,settings:t.settings,stats:t.stats}}function Se(e,t){let i=e||be(),o=t||be(),s=new Map(a(i.stats?.deletedIds,o.stats?.deletedIds).map(e=>[e.id,e.deletedAt])),c=new Map;for(let e of o.items||[])e&&e.id&&c.set(e.id,e);for(let e of i.items||[]){if(!e||!e.id)continue;let t=c.get(e.id);(!t||T(l(e))>=T(l(t)))&&c.set(e.id,e)}let u=[];for(let e of c.values()){if(s.has(e.id)){if(T(s.get(e.id))>=T(l(e)))continue;s.delete(e.id)}u.push(e.updatedAt?e:{...e,updatedAt:l(e)})}u.sort((e,t)=>T(t.createdAt)-T(e.createdAt)||String(e.id).localeCompare(String(t.id)));let d={...n,...i.settings||{}},f={...n,...o.settings||{}},p={...T(f.updatedAt)>T(d.updatedAt)?f:d,notificationsEnabled:!!d.notificationsEnabled},m={...r,...i.stats||{}},h={...r,...o.stats||{}},g=m.lastPracticeDate||``,_=h.lastPracticeDate||``,v,y;return g>_?(v=m.streak||0,y=m.lastPracticeDate):_>g?(v=h.streak||0,y=h.lastPracticeDate):(v=Math.max(m.streak||0,h.streak||0),y=m.lastPracticeDate??h.lastPracticeDate??null),{items:u,settings:p,stats:{streak:v,lastPracticeDate:y,totalPracticed:Math.max(m.totalPracticed||0,h.totalPracticed||0),strongerCount:u.filter(e=>(e.intervalIndex??0)>=3).length,deletedIds:Array.from(s,([e,t])=>({id:e,deletedAt:t})).sort((e,t)=>e.id.localeCompare(t.id))}}}var Ce=`modulepreload`,we=function(e,t){return new URL(e,t).href},Te={},Ee=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=we(t,n),t=s(t),t in Te)return;Te[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Ce,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},De=`https://zzvmimpdstazgrgoqfbu.supabase.co`,Oe=`sb_publishable_1M-DjO-0G8x6Qh9-ucSy2g_V3s8Aq-c`,ke=`user_data`,E=!!Oe,Ae=null;function je(){return window.location.origin+window.location.pathname}function Me(e){return E?(Ae||=Ee(async()=>{let{createClient:e}=await import(`./dist-DGrmSOon.js`);return{createClient:e}},[],import.meta.url).then(({createClient:t})=>{let n=t(De,Oe,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0,flowType:`implicit`}});return n.auth.onAuthStateChange((t,n)=>{setTimeout(()=>e(t,n),0)}),n}),Ae):Promise.resolve(null)}async function D(){let e=await Ae;if(!e)throw Object.assign(Error(`Accounts are not available`),{kind:`unavailable`});return e}async function Ne(e,t){let{data:n,error:r}=await(await D()).auth.signInWithPassword({email:e,password:t});if(r)throw r;return n}async function Pe(e,t){let{data:n,error:r}=await(await D()).auth.signUp({email:e,password:t,options:{emailRedirectTo:je()}});if(r)throw r;return n}async function Fe(e){let{error:t}=await(await D()).auth.resetPasswordForEmail(e,{redirectTo:je()});if(t)throw t}async function Ie(e){let{data:t,error:n}=await(await D()).auth.updateUser({password:e});if(n)throw n;return t}async function Le(){let{error:e}=await(await D()).auth.signOut({scope:`local`});if(e)throw e}function Re(e,t){let n=e?.code||``,r=`${e?.message||``} ${e?.details||``} ${e?.hint||``}`.toLowerCase(),i=`error`;return n===`PGRST205`||n===`42P01`||t===404||r.includes(`does not exist`)||r.includes(`could not find the table`)||r.includes(`schema cache`)?i=`notsetup`:t===401||t===403||n===`PGRST301`||n===`42501`?i=`auth`:(!t||r.includes(`failed to fetch`)||r.includes(`network`))&&(i=`offline`),Object.assign(Error(e?.message||`Sync failed`),{kind:i,code:n,status:t})}async function ze(e){let{data:t,error:n,status:r}=await(await D()).from(ke).select(`data, updated_at`).eq(`user_id`,e).maybeSingle();if(n)throw Re(n,r);return t||null}async function Be(e,t){let{error:n,status:r}=await(await D()).from(ke).upsert({user_id:e,data:t,updated_at:new Date().toISOString()},{onConflict:`user_id`});if(n)throw Re(n,r)}function Ve(e){let t=String(e?.message||``).toLowerCase(),n=String(e?.code||``).toLowerCase(),r=e?.status;return e?.kind===`unavailable`?`Accounts are not available right now.`:typeof navigator<`u`&&navigator.onLine===!1||t.includes(`failed to fetch`)||t.includes(`network`)||t.includes(`load failed`)?`Can’t reach the internet right now. Please check your connection and try again.`:n===`invalid_credentials`||t.includes(`invalid login credentials`)?`That email and password don’t match. Please try again.`:n===`email_not_confirmed`||t.includes(`email not confirmed`)?`Please confirm your email first. Look for our message in your inbox, then sign in.`:n===`user_already_exists`||t.includes(`already registered`)?`There is already an account with this email. Please sign in instead.`:n===`same_password`||t.includes(`different from the old`)?`Please choose a password that is different from your old one.`:n===`weak_password`||t.includes(`password should`)?`Please choose a stronger password (at least 8 characters).`:r===429||n.includes(`rate_limit`)||t.includes(`rate limit`)?`Too many tries just now. Please wait a few minutes and try again.`:n===`email_address_invalid`||t.includes(`invalid email`)||t.includes(`email address`)?`That email address doesn’t look right. Please check it.`:n===`session_not_found`||n===`session_expired`||t.includes(`session`)?`This link has expired. Please ask for a new one.`:n===`signup_disabled`||t.includes(`signups not allowed`)?`New accounts can’t be created right now.`:`Something went wrong. Please try again.`}var He=`jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|sept|september|oct|october|nov|november|dec|december`;new RegExp(String.raw`(?:(?:\d{1,2})(?:st|nd|rd|th)?[\s\-/.,]*(?:${He})[\s\-/.,]*\d{2,4})|(?:(?:${He})[\s\-/.,]*\d{1,2}(?:st|nd|rd|th)?[\s\-/.,]*\d{2,4})|(?:\d{1,2}[\s\-/]\d{1,2}[\s\-/]\d{2,4})|(?:\d{4}-\d{2}-\d{2})`,`i`),new RegExp(String.raw`\b((?:eldest|oldest|youngest|middle)\s+)?(${`daughter|son|wife|husband|spouse|mother|father|mum|mom|dad|brother|sister|sibling|uncle|aunt|cousin|nephew|niece|grandfather|grandmother|grandpa|grandma|partner|fiancé|fiance|fiancée|fiancee|friend|colleague|boss|manager|child|children|kid|kids|eldest|oldest|youngest|middle`})\b`,`i`);function Ue(e,t){let n=We(e),r=We(t);if(!n||!r)return!1;if(n===r)return!0;let i=n.replace(/\D/g,``),a=r.replace(/\D/g,``);if(i.length>=7&&i===a)return!0;let o=Ge(n),s=Ge(r);return!!(o&&s&&o===s||n.length>=4&&r.length>=4&&(n.includes(r)||r.includes(n)))}function We(e){return String(e||``).toLowerCase().replace(/[.,/#'"]/g,` `).replace(/\s+/g,` `).trim()}var O={jan:1,january:1,feb:2,february:2,mar:3,march:3,apr:4,april:4,may:5,jun:6,june:6,jul:7,july:7,aug:8,august:8,sep:9,sept:9,september:9,oct:10,october:10,nov:11,november:11,dec:12,december:12};function Ge(e){let t=e.toLowerCase().replace(/(st|nd|rd|th)/g,``).replace(/,/g,` `).trim(),n=t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);if(n)return`${n[1]}-${k(n[2])}-${k(n[3])}`;if(n=t.match(/^(\d{1,2})\s+([a-z]+)\s+(\d{2,4})$/),n&&O[n[2]])return`${Ke(n[3])}-${k(O[n[2]])}-${k(n[1])}`;if(n=t.match(/^([a-z]+)\s+(\d{1,2})\s+(\d{2,4})$/),n&&O[n[1]])return`${Ke(n[3])}-${k(O[n[1]])}-${k(n[2])}`;if(n=t.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/),n){let e=Ke(n[3]),t=+n[1],r=+n[2];return t>12?`${e}-${k(r)}-${k(t)}`:r>12?`${e}-${k(t)}-${k(r)}`:`${e}-${k(r)}-${k(t)}`}return null}function Ke(e){let t=parseInt(e,10);return String(e).length<=2?t>=50?1900+t:2e3+t:t}function k(e){return String(e).padStart(2,`0`)}var qe=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];function Je(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function A(e,t,n){let r=Ye(t);r&&(e.some(e=>Ye(e)===r)||Ye(n)===r&&e.includes(n)||e.push(t))}function Ye(e){return String(e||``).toLowerCase().replace(/\s+/g,` `).trim()}function Xe(e){let t=String(e).trim(),n=t.match(/(\d{1,2})\s*([A-Za-z]+)\s*(\d{2,4})/);if(n)return{day:+n[1],monthStr:n[2],year:n[3],format:`dmy`};let r=t.match(/([A-Za-z]+)\s*(\d{1,2})\s*(\d{2,4})/);if(r)return{day:+r[2],monthStr:r[1],year:r[3],format:`mdy`};let i=t.match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);return i?{day:+i[1],month:+i[2],year:i[3],format:`num`}:null}function Ze(e,t,n,r){return e.format===`mdy`?`${n} ${t} ${r}`:e.format===`num`?`${t}/${e.month||1}/${r}`:`${t} ${n} ${r}`}function Qe(e){let t=Xe(e),n=[];if(!t)return n.push(`1 Jan 2000`,`15 Mar 1985`,`22 Dec 1999`),n;let r=t.monthStr||qe[(t.month||1)-1]||`Jan`,i=qe.findIndex(e=>e.toLowerCase().startsWith(r.slice(0,3).toLowerCase())),a=t.year,o=t.day;A(n,Ze(t,(o+3-1)%28+1,r,a),e),A(n,Ze(t,o,qe[(i+2+12)%12]||`Mar`,a),e);let s=parseInt(a,10);return A(n,Ze(t,o,r,String((a.length,s+2))),e),A(n,Ze(t,(o+10-1)%28+1,qe[(i+5+12)%12]||`Aug`,a),e),n}function $e(e){let t=String(e).replace(/\D/g,``),n=[];if(t.length>=4){let r=(e,t,n)=>e.slice(0,t)+n+e.slice(t+1);A(n,r(t,t.length-2,String((+t[t.length-2]+1)%10)),e),A(n,r(t,Math.floor(t.length/2),String((+t[Math.floor(t.length/2)]+3)%10)),e),A(n,t.slice(0,-1)+String((+t.slice(-1)+2)%10),e),A(n,`9`+t.slice(1),e)}for(;n.length<3;)A(n,String(9e7+Math.floor(Math.random()*9999999)),e);return n}function et(e,t){let n=[`Alex`,`Sam`,`Jordan`,`Taylor`,`Casey`,`Morgan`,`Riley`,`Jamie`,`Avery`,`Quinn`],r=[];for(let n of t)(n.type===`Name`||n.type===`Other`)&&A(r,n.answer,e);for(let t of Je(n))A(r,t,e);return r}function tt(e,t){let n=[];for(let r of Je(t))A(n,r.answer,e);for(let t of[`Not sure`,`None of these`,`Unknown`,`N/A`,`Something else`])A(n,t,e);return n}function nt(e,t){let n=e.answer,r=[],i=t.filter(t=>t.id!==e.id);switch(e.type){case`Date`:case`Event`:r=Qe(n);for(let e of i)(e.type===`Date`||e.type===`Event`)&&A(r,e.answer,n);break;case`Phone number`:r=$e(n);for(let e of i)e.type===`Phone number`&&A(r,e.answer,n);break;case`Name`:r=et(n,i);break;default:r=tt(n,i)}let a=Je([n,...Je(r).slice(0,3)]);for(;a.length<3;)a.push(`Option ${a.length+1}`);return a.slice(0,4)}var rt=null;function j(){return typeof window<`u`&&`Notification`in window}async function it(){if(!j())return{ok:!1,reason:`unsupported`};if(Notification.permission===`granted`)return{ok:!0,permission:`granted`};if(Notification.permission===`denied`)return{ok:!1,reason:`denied`,permission:`denied`};try{let e=await Notification.requestPermission();return e===`granted`?{ok:!0,permission:e}:e===`denied`?{ok:!1,reason:`denied`,permission:e}:{ok:!1,reason:`default`,permission:e}}catch{return{ok:!1,reason:`error`}}}function at(){rt!=null&&(clearTimeout(rt),rt=null)}function M(e,t){if(at(),!t||!j()||Notification.permission!==`granted`)return;let[n,r]=(e||`09:00`).split(`:`).map(e=>parseInt(e,10)),i=new Date,a=new Date;a.setHours(n||9,r||0,0,0),a<=i&&a.setDate(a.getDate()+1);let o=a.getTime()-i.getTime();rt=setTimeout(()=>{try{new Notification(`Memorized`,{body:`Time for a quick practice session.`,icon:`./icons/icon-192.png`,tag:`memorized-daily`})}catch{}M(e,!0)},o)}function ot(e){return e.reason===`unsupported`?`Notifications are not supported in this browser.`:e.reason===`denied`||e.permission===`denied`?`Notifications are blocked. Enable them in your browser site settings if you want a daily reminder.`:e.ok?``:`Could not enable notifications. You can try again from Settings.`}var st=`0.6.0`,ct=(()=>{let[e,t=`0`]=String(st).split(`.`);return`${e}.${String(t).padStart(2,`0`)}`})(),lt=[{id:`en`,label:`English`},{id:`zh`,label:`中文 (soon)`},{id:`ms`,label:`Bahasa Melayu (soon)`},{id:`ta`,label:`தமிழ் (soon)`}],N=d(),P=`home`,ut=`home`,dt=null,F=``,I=null,L=null,ft=`memorized:sync`,R={ready:!E,user:null},z=null,B={email:``,password:``,showPw:!1,error:``,info:``,busy:!1},V=!1,H=!1,U={status:`idle`,lastSyncedAt:Lt().lastSyncedAt||null,inFlight:null,again:!1,timer:null,retryTimer:null,retryDelay:0,lastAttempt:0},W=document.getElementById(`app`);function G(){f(N),Bt()}function K(){return new Date().toISOString()}function pt(){N.settings.updatedAt=K()}function mt(){document.documentElement.dataset.theme=N.settings.theme===`dark`?`dark`:`light`;let e=N.settings.fontSize;document.documentElement.dataset.font=e==="default"?`default`:e===`xlarge`||e===`extra large`?`xlarge`:`large`;let t=document.querySelector(`meta[name="theme-color"]`);t&&t.setAttribute(`content`,N.settings.theme===`dark`?`#1C1917`:`#0F5C56`)}function q(e){let t=document.querySelector(`.toast`);t&&t.remove();let n=document.createElement(`div`);n.className=`toast`,n.textContent=e,document.body.appendChild(n),clearTimeout(dt),dt=setTimeout(()=>n.remove(),2200)}function ht(){return oe(N.items).length}function gt(){return N.items.filter(pe).length}function _t(e,t){let n=String(e||``).trim(),r=String(t||``).trim();if(!n||!r){q(`Enter both Description and Item`);return}let i={id:p(),raw:`${n} / ${r}`,type:`Other`,question:n,answer:r,label:n.slice(0,40),createdAt:new Date().toISOString(),...se(),updatedAt:new Date().toISOString()};N.items.unshift(i),G(),q(`Saved`),$()}function vt(e){N.items=N.items.filter(t=>t.id!==e),N.stats={...N.stats,deletedIds:a(N.stats.deletedIds,[{id:e,deletedAt:K()}])},G(),q(`Deleted`),L=null,$()}function yt(e,t){let n=String(t.question||``).trim(),r=String(t.answer||``).trim();if(!n||!r){q(`Description and Item are required`);return}N.items=N.items.map(t=>t.id===e?{...t,question:n,answer:r,label:t.label&&String(t.label).trim()||n.slice(0,40),updatedAt:K()}:t),G(),L=null,q(`Updated`),$()}function bt(){let e=oe(N.items);if(!e.length){q(`Nothing due right now`);return}I={mode:`practice`,queue:[...e].sort(()=>Math.random()-.5).map(e=>e.id),index:0,phase:`recall`,input:``,choices:null,selected:null,revealed:!1,lastResult:null,scoreCorrect:0,scoreTotal:0},P=`practice`,$()}function xt(){let e=me(N.items);if(!e.length){q(`No items at 14 days or beyond yet`);return}I={mode:`test`,queue:[...e].sort(()=>Math.random()-.5).map(e=>e.id),index:0,phase:`recall`,input:``,choices:null,selected:null,revealed:!1,lastResult:null,scoreCorrect:0,scoreTotal:0},P=`practice`,$()}function J(){if(!I)return null;let e=I.queue[I.index];return N.items.find(t=>t.id===e)||null}function St(e){let t=J();if(!t)return;let n=I&&I.mode===`test`,r;n?(I.scoreTotal=(I.scoreTotal||0)+1,e&&(I.scoreCorrect=(I.scoreCorrect||0)+1),r=e?{...t,lastReviewedAt:K(),updatedAt:K()}:{...ue(t),updatedAt:K()}):r={...e?ce(t):le(t),updatedAt:K()},N.items=N.items.map(e=>e.id===t.id?r:e),n||(N.stats=fe(N.stats),N.stats.totalPracticed=(N.stats.totalPracticed||0)+1),N.stats.strongerCount=gt(),G(),I.lastResult=e?`correct`:`wrong`,I.phase=`reveal`,I.revealed=!0,$()}function Ct(){let e=J();e&&(Ue(I.input,e.answer)?St(!0):(I.phase=`mcq`,I.choices=nt(e,N.items),I.selected=null,$()))}function wt(e){let t=J();t&&I.selected==null&&(I.selected=e,St(Ue(e,t.answer)))}function Tt(){if(I){if(I.index>=I.queue.length-1){if(I.mode===`test`){I.phase=`score`,$();return}I=null,P=`practice`,q(`Session complete`),$();return}I.index+=1,I.phase=`recall`,I.input=``,I.choices=null,I.selected=null,I.revealed=!1,I.lastResult=null,$()}}function Et(){I=null,P=`practice`,$()}function Dt(e){let t=Number(e.intervalDays);if(Number.isFinite(t)&&t>0&&t<1){let e=Math.max(1,Math.round(t*24));return`Next review in ${e} hour${e===1?``:`s`}.`}let n=e.intervalDays||S[e.intervalIndex||0]||1;return`Next review in ${n} day${n===1?``:`s`}.`}function Ot(e){let[t,n]=String(e||`09:00`).split(`:`),r=parseInt(t,10),i=parseInt(n,10);return(!Number.isFinite(r)||r<0||r>23)&&(r=9),(!Number.isFinite(i)||i<0||i>59)&&(i=0),i=Math.round(i/5)*5,i>=60&&(i=55),`
          <div class="time-picks" role="group" aria-labelledby="remind-time-label">
            <label class="sr-only" for="remind-hour">Hour</label>
            <select class="select time-select" id="remind-hour" data-remind-hour>${Array.from({length:24},(e,t)=>{let n=String(t).padStart(2,`0`);return`<option value="${n}" ${t===r?`selected`:``}>${n}</option>`}).join(``)}</select>
            <span class="time-colon" aria-hidden="true">:</span>
            <label class="sr-only" for="remind-minute">Minute</label>
            <select class="select time-select" id="remind-minute" data-remind-minute>${Array.from({length:12},(e,t)=>{let n=t*5,r=String(n).padStart(2,`0`);return`<option value="${r}" ${n===i?`selected`:``}>${r}</option>`}).join(``)}</select>
          </div>`}function kt(){let e=J();e&&(I.phase=`mcq`,I.choices=nt(e,N.items),I.selected=null,$())}async function At(e){if(!e){N.settings.notificationsEnabled=!1,at(),G(),$();return}let t=await it();t.ok?(N.settings.notificationsEnabled=!0,M(N.settings.reminderTime,!0),G(),q(`Daily reminder on`)):(N.settings.notificationsEnabled=!1,G(),q(ot(t)||`Notifications unavailable`)),$()}function jt(e,t,n){let r=new Blob([t],{type:n||`application/json;charset=utf-8`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=e,a.rel=`noopener`,document.body.appendChild(a),a.click(),a.remove(),setTimeout(()=>URL.revokeObjectURL(i),1500)}function Mt(){let{filename:e,json:t}=x(N);jt(e,t,`application/json;charset=utf-8`),q(`Exported ${N.items.length} item${N.items.length===1?``:`s`}`)}async function Nt(){if(typeof window.showSaveFilePicker!=`function`){Mt();return}try{let{filename:e,json:t}=x(N),n=await(await window.showSaveFilePicker({suggestedName:e,types:[{description:`Memorized backup`,accept:{"application/json":[`.json`]}}]})).createWritable();await n.write(t),await n.close(),q(`Saved ${N.items.length} item${N.items.length===1?``:`s`}`)}catch(e){if(e&&e.name===`AbortError`)return;Mt()}}function Pt(){let e=ne(N);jt(re(),e,`text/csv;charset=utf-8`),q(`CSV: ${N.items.length} item${N.items.length===1?``:`s`}`)}function Ft(){return confirm(`Import backup

OK = Replace all data with this file
Cancel = choose Merge instead`)?`replace`:confirm(`Merge by id?

OK = Merge (same id updates; new ids added)
Cancel = abort import`)?`merge`:null}async function It(e){if(!e)return;let t;try{t=await e.text()}catch{q(`Could not read file`);return}let n=ee(t);if(!n.ok){q(`Import failed: ${n.error}`);return}let r=Ft();if(!r){q(`Import cancelled`);return}let i=Array.isArray(n.doc.items)?n.doc.items.length:0,o=r===`replace`?`Replace ALL current data with ${i} item${i===1?``:`s`} from the file?`:`Merge ${i} item${i===1?``:`s`} by id into current data?`;if(!confirm(o)){q(`Import cancelled`);return}try{let e=te(N,n.doc,r),t=K(),i=new Set(n.doc.items.map(e=>e&&typeof e.id==`string`?e.id:null).filter(Boolean)),o=e.items.map(e=>r===`replace`||i.has(e.id)?{...e,updatedAt:t}:e),s=e.stats.deletedIds||[];if(r===`replace`){let e=new Set(o.map(e=>e.id)),n=N.items.filter(t=>!e.has(t.id)).map(e=>({id:e.id,deletedAt:t}));s=a(N.stats.deletedIds,s,n).filter(t=>!e.has(t.id))}N={items:o,settings:n.doc.settings?{...e.settings,updatedAt:t}:e.settings,stats:{...e.stats,deletedIds:s}},G(),mt(),N.settings.notificationsEnabled&&j()&&typeof Notification<`u`&&Notification.permission===`granted`?M(N.settings.reminderTime,!0):at(),q(r===`replace`?`Replaced — ${e.importedCount} item${e.importedCount===1?``:`s`}`:`Merged — ${e.importedCount} from file, ${e.totalCount} total`),$()}catch(e){q(`Import error: ${e?.message||`unknown`}`)}}function Lt(){try{return JSON.parse(localStorage.getItem(ft)||`{}`)||{}}catch{return{}}}function Rt(e){try{localStorage.setItem(ft,JSON.stringify(e))}catch{}}function zt(e){let{doc:t}=x(e);return JSON.stringify({items:t.items,settings:t.settings,meta:t.meta})}function Bt(e=3e3){R.user&&(clearTimeout(U.timer),U.timer=setTimeout(()=>X(`change`),e))}function Vt(){R.user&&(clearTimeout(U.retryTimer),U.retryDelay=Math.min(Math.max(U.retryDelay*2,15e3),3e5),U.retryTimer=setTimeout(()=>X(`retry`),U.retryDelay))}function Y(e){U.status=e,Gt()}function X(e=`manual`){if(!R.user)return Promise.resolve(!1);if(U.inFlight)return U.again=!0,U.inFlight;if(clearTimeout(U.timer),clearTimeout(U.retryTimer),U.lastAttempt=Date.now(),typeof navigator<`u`&&navigator.onLine===!1)return Y(`offline`),Vt(),Promise.resolve(!1);let t=R.user.id;return Y(`syncing`),U.inFlight=(async()=>{try{let n=await ze(t);if(!R.user||R.user.id!==t)return!1;let r=null;if(n&&n.data){let e=ee(n.data);if(!e.ok)return Y(`newer`),!1;r=xe(e.doc)}let i=zt(N);N=r?Se(N,r):Se(N,null),f(N);let a=zt(N)!==i;return await Be(t,x(N).doc),!R.user||R.user.id!==t?!1:(U.lastSyncedAt=K(),U.retryDelay=0,Rt({userId:t,lastSyncedAt:U.lastSyncedAt}),Y(`ok`),a&&(mt(),Ht()),e===`signin`&&r&&a&&q(`Your facts are up to date`),!0)}catch(e){return e&&e.kind===`notsetup`?Y(`notsetup`):(Y(e&&e.kind===`offline`?`offline`:`error`),Vt()),!1}finally{U.inFlight=null,U.again&&(U.again=!1,Bt(1e3))}})(),U.inFlight}function Ht(){if(I||L||H||V||z)return;let e=document.activeElement;(!e||e.tagName!==`INPUT`&&e.tagName!==`TEXTAREA`||!e.value)&&$()}function Ut(e){let t=Date.parse(e||``);if(!Number.isFinite(t))return``;let n=Math.max(0,Date.now()-t),r=Math.round(n/6e4);if(r<1)return`just now`;if(r<60)return`${r} minute${r===1?``:`s`} ago`;let i=new Date(t),a=i.toLocaleTimeString([],{hour:`numeric`,minute:`2-digit`}),o=new Date;if(i.toDateString()===o.toDateString())return`today at ${a}`;let s=new Date(o);return s.setDate(o.getDate()-1),i.toDateString()===s.toDateString()?`yesterday at ${a}`:i.toLocaleDateString([],{day:`numeric`,month:`short`,year:`numeric`})}function Wt(){switch(U.status){case`syncing`:return`Syncing…`;case`error`:case`offline`:return`Not synced — will retry`;case`notsetup`:return`Sync isn’t set up yet`;case`newer`:return`Please update the app to sync`;default:return U.lastSyncedAt?`Last synced ${Ut(U.lastSyncedAt)}`:`Not synced yet`}}function Gt(){document.querySelectorAll(`[data-sync-status]`).forEach(e=>{e.textContent=Wt(),e.classList.toggle(`warn`,[`error`,`offline`,`notsetup`,`newer`].includes(U.status))}),document.querySelectorAll(`[data-sync-now]`).forEach(e=>{e.disabled=U.status===`syncing`});let e=document.querySelector(`[data-sync-hint]`);e&&(e.hidden=!R.user||U.status!==`error`&&U.status!==`offline`)}function Kt(e,t){let n=R.user?.id||null,r=t?.user||null;if(R={ready:!0,user:r},setTimeout(hn,0),e===`PASSWORD_RECOVERY`){V=!0,B={...B,password:``,showPw:!1,error:``,info:``,busy:!1},$();return}if(!r){clearTimeout(U.timer),clearTimeout(U.retryTimer),U.status=`idle`,$();return}let i=Lt();i.userId&&i.userId!==r.id&&(U.lastSyncedAt=null),!n||n!==r.id?(z&&(z=null,B={...B,password:``,error:``,info:``,busy:!1}),e===`SIGNED_IN`&&$t===`signup`&&q(`Email confirmed. You’re signed in.`),$t=null,V||qt(),X(e===`INITIAL_SESSION`?`open`:`signin`)):V||Gt()}function qt(){P===`account`&&!I&&!L?$():Ht()}function Jt(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function Yt(e){z=e,B={...B,password:``,showPw:!1,error:``,info:``,busy:!1},$();let t=W.querySelector(e===`forgot`||!B.email?`#acct-email`:`#acct-password`);t&&t.focus()}function Z(e,t=``){B.error=e,B.info=t,B.busy=!1,$()}async function Xt(e){if(B.busy)return;let t=B.email.trim(),n=B.password;if(e!==`recovery`){if(!t)return Z(`Please enter your email address.`);if(!Jt(t))return Z(`That email address doesn’t look right. Please check it.`)}if(e===`signin`&&!n)return Z(`Please enter your password.`);if((e===`signup`||e===`recovery`)&&n.length<8)return Z(`Please use at least 8 characters for your password.`);B.busy=!0,B.error=``,B.info=``,$();try{if(e===`signin`)await Ne(t,n),B.password=``,B.busy=!1,z=null,q(`Signed in`),$();else if(e===`signup`){let e=await Pe(t,n);B.password=``,e?.session?(z=null,B.busy=!1,q(`Account created. You’re signed in.`),$()):e?.user&&Array.isArray(e.user.identities)&&e.user.identities.length===0?(z=`signin`,Z(``,`There may already be an account with this email. Please sign in, or use “Forgot password?”.`)):(z=`signin`,Z(``,`Check your email to confirm, then sign in.`))}else e===`forgot`?(await Fe(t),Z(``,`If there is an account for this email, we’ve sent a link to set a new password. Please check your inbox.`)):e===`recovery`&&(await Ie(n),B.password=``,B.busy=!1,V=!1,z=null,P=`account`,q(`Password updated. You’re signed in.`),$(),X(`signin`))}catch(e){Z(Ve(e))}}async function Zt(){if(!R.user)return!1;let e=new Promise(e=>setTimeout(()=>e(!1),6e3));return Promise.race([X(`signout`),e])}async function Qt(e){H=!1,$();let t=await Zt();if(e&&!t&&!confirm(`Some recent changes may not have reached your account yet.

Remove facts from this device anyway?`)){q(`Still signed in`);return}try{await Le()}catch{}e&&(N={items:[],settings:{...N.settings},stats:{streak:0,lastPracticeDate:null,totalPracticed:0,strongerCount:0,deletedIds:[]}},f(N),I=null),R={ready:!0,user:null},z=null,U.status=`idle`,U.lastSyncedAt=null,Rt({}),q(e?`Signed out. Facts removed from this device.`:`Signed out. Your facts stay on this device.`),$()}var $t=null,en=``;function tn(){let e=window.location.hash.replace(/^#/,``),t=window.location.search.replace(/^\?/,``),n=new URLSearchParams(e||t),r=n.get(`type`);r===`recovery`&&(V=!0,P=`account`),r&&($t=r);let i=n.get(`error_code`)||n.get(`error`);i&&(en=i===`otp_expired`||/expired|invalid/i.test(n.get(`error_description`)||``)?`That email link has expired or was already used. Please ask for a new one.`:`That email link didn’t work. Please try again.`,P=`account`,z=`signin`,B.error=en,V=!1,history.replaceState(null,``,window.location.pathname))}function nn(e,t,n){return`
    <div class="field">
      <label class="label" for="acct-password">${e}</label>
      <div class="pw-wrap">
        <input class="input" id="acct-password" type="${B.showPw?`text`:`password`}"
          autocomplete="${t}" autocapitalize="off" spellcheck="false"
          value="${Q(B.password)}" data-acct-password />
        <button type="button" class="pw-toggle" data-pw-toggle aria-pressed="${B.showPw}"
          aria-controls="acct-password">${B.showPw?`Hide`:`Show`}</button>
      </div>
      ${n?`<p class="hint field-hint">${n}</p>`:``}
    </div>`}function rn(){return`
    <div class="field">
      <label class="label" for="acct-email">Email</label>
      <input class="input" id="acct-email" type="email" inputmode="email" autocomplete="email"
        autocapitalize="off" spellcheck="false" value="${Q(B.email)}" data-acct-email />
    </div>`}function an(){return`${B.error?`<div class="form-msg error" role="alert">${Q(B.error)}</div>`:``}${B.info?`<div class="form-msg info" role="status">${Q(B.info)}</div>`:``}`}var on=`Your facts are stored in your private account. Only you can see them.`;function sn(){if(!E)return`
      <div class="card account-card">
        <p style="margin:0">Accounts aren’t available in this version. Your facts stay on this device.</p>
      </div>`;if(!R.ready)return`
      <div class="card account-card">
        <p style="margin:0">Checking your account…</p>
      </div>`;if(R.user)return`
      <div class="card account-card">
        <div class="account-label">Signed in as</div>
        <div class="account-email">${Q(R.user.email||``)}</div>
        <div class="sync-status" data-sync-status aria-live="polite">${Q(Wt())}</div>
        <div class="btn-row two">
          <button type="button" class="btn btn-secondary" data-sync-now ${U.status===`syncing`?`disabled`:``}>Sync now</button>
          <button type="button" class="btn btn-ghost" data-sign-out>Sign out</button>
        </div>
        <p class="privacy-line">${on}</p>
      </div>`;let e=B.busy?`disabled`:``;return z===`signin`?`
      <div class="card account-card">
        <h2 style="margin-top:0">Sign in</h2>
        <form data-auth-form="signin" novalidate>
          ${an()}
          ${rn()}
          ${nn(`Password`,`current-password`)}
          <button type="button" class="link-btn" data-auth-open="forgot">Forgot password?</button>
          <div class="btn-row">
            <button type="submit" class="btn btn-primary" ${e}>${B.busy?`Signing in…`:`Sign in`}</button>
            <button type="button" class="btn btn-ghost" data-auth-cancel>Cancel</button>
          </div>
          <p class="hint auth-switch">New here? <button type="button" class="link-btn inline" data-auth-open="signup">Create account</button></p>
        </form>
        <p class="privacy-line">${on}</p>
      </div>`:z===`signup`?`
      <div class="card account-card">
        <h2 style="margin-top:0">Create account</h2>
        <form data-auth-form="signup" novalidate>
          ${an()}
          ${rn()}
          ${nn(`Password`,`new-password`,`At least 8 characters.`)}
          <div class="btn-row">
            <button type="submit" class="btn btn-primary" ${e}>${B.busy?`Creating…`:`Create account`}</button>
            <button type="button" class="btn btn-ghost" data-auth-cancel>Cancel</button>
          </div>
          <p class="hint auth-switch">Already have an account? <button type="button" class="link-btn inline" data-auth-open="signin">Sign in</button></p>
        </form>
        <p class="privacy-line">${on}</p>
      </div>`:z===`forgot`?`
      <div class="card account-card">
        <h2 style="margin-top:0">Forgot password</h2>
        <p>Enter your email and we’ll send you a link to set a new password.</p>
        <form data-auth-form="forgot" novalidate>
          ${an()}
          ${rn()}
          <div class="btn-row">
            <button type="submit" class="btn btn-primary" ${e}>${B.busy?`Sending…`:`Send reset link`}</button>
            <button type="button" class="btn btn-ghost" data-auth-open="signin">Back to sign in</button>
          </div>
        </form>
      </div>`:`
    <div class="card account-card">
      <p style="margin-top:0">Sign in to keep your facts on all your devices.</p>
      <div class="btn-row">
        <button type="button" class="btn btn-primary" data-auth-open="signin">Sign in</button>
        <button type="button" class="btn btn-ghost" data-auth-open="signup">Create account</button>
      </div>
      <p class="privacy-line">${on}</p>
    </div>`}function cn(){let e=B.busy?`disabled`:``;return`
    <div class="page">
      <div class="topbar"><h1 style="margin:0">Set a new password</h1></div>
      <div class="card account-card">
        <p>Choose a new password for your account.</p>
        <form data-auth-form="recovery" novalidate>
          ${an()}
          ${nn(`New password`,`new-password`,`At least 8 characters.`)}
          <div class="btn-row">
            <button type="submit" class="btn btn-primary" ${e}>${B.busy?`Saving…`:`Save new password`}</button>
            <button type="button" class="btn btn-ghost" data-recovery-cancel>Not now</button>
          </div>
        </form>
      </div>
    </div>`}function ln(){return H?`
    <div class="modal-backdrop" data-signout-backdrop>
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="signout-title">
        <h2 id="signout-title">Keep facts on this device?</h2>
        <p>Your facts stay safe in your account either way. Keep them here to go on practising on this device.</p>
        <div class="btn-row">
          <button type="button" class="btn btn-primary" data-signout-keep>Keep</button>
          <button type="button" class="btn btn-danger" data-signout-remove>Remove from this device</button>
          <button type="button" class="btn btn-ghost" data-signout-cancel>Cancel</button>
        </div>
      </div>
    </div>`:``}function un(){W.querySelectorAll(`[data-auth-open]`).forEach(e=>{e.addEventListener(`click`,()=>Yt(e.getAttribute(`data-auth-open`)))}),W.querySelectorAll(`[data-auth-cancel]`).forEach(e=>{e.addEventListener(`click`,()=>{z=null,B={...B,password:``,error:``,info:``,busy:!1},$()})});let e=W.querySelector(`[data-acct-email]`);e&&e.addEventListener(`input`,()=>B.email=e.value);let t=W.querySelector(`[data-acct-password]`);t&&t.addEventListener(`input`,()=>B.password=t.value);let n=W.querySelector(`[data-pw-toggle]`);n&&n.addEventListener(`click`,()=>{B.showPw=!B.showPw,$();let e=W.querySelector(`[data-acct-password]`);e&&(e.focus(),e.setSelectionRange(e.value.length,e.value.length))}),W.querySelectorAll(`form[data-auth-form]`).forEach(e=>{e.addEventListener(`submit`,t=>{t.preventDefault(),Xt(e.getAttribute(`data-auth-form`))})});let r=W.querySelector(`[data-recovery-cancel]`);r&&r.addEventListener(`click`,()=>{V=!1,B={...B,password:``,error:``,info:``,busy:!1},P=`account`,$(),X(`open`)});let i=W.querySelector(`[data-sync-now]`);i&&i.addEventListener(`click`,async()=>{await X(`manual`)&&q(`Synced`)});let a=W.querySelector(`[data-sign-out]`);a&&a.addEventListener(`click`,()=>{H=!0,$();let e=W.querySelector(`[data-signout-keep]`);e&&e.focus()});let o=W.querySelector(`[data-signout-keep]`);o&&o.addEventListener(`click`,()=>Qt(!1));let s=W.querySelector(`[data-signout-remove]`);s&&s.addEventListener(`click`,()=>Qt(!0));let c=W.querySelector(`[data-signout-cancel]`);c&&c.addEventListener(`click`,()=>{H=!1,$()});let l=W.querySelector(`[data-signout-backdrop]`);l&&l.addEventListener(`click`,e=>{e.target===l&&(H=!1,$())})}function Q(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function dn(){return`
    <nav class="nav" aria-label="Main">
      ${[{id:`home`,label:`Home`,icon:`⌂`},{id:`practice`,label:`Practice`,icon:`✎`},{id:`items`,label:`Items`,icon:`☰`}].map(e=>`
        <button type="button" data-nav="${e.id}" class="${P===e.id?`active`:``}">
          <span class="nav-icon" aria-hidden="true">${e.icon}</span>
          ${e.label}
        </button>`).join(``)}
    </nav>`}function fn(e){let t=Array.from(String(e||``).trim()).find(e=>/[\p{L}\p{N}]/u.test(e));return t?t.toLocaleUpperCase():``}var pn=`<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><circle cx="12" cy="8.5" r="4" fill="currentColor"/><path d="M4 20.5c0-4.1 3.6-6.5 8-6.5s8 2.4 8 6.5" fill="currentColor"/></svg>`;function mn(){let e=R.user?.email||``,t=R.user?fn(e):``;return`<button type="button" class="avatar-btn" data-avatar aria-label="${Q(R.user?e?`Account, signed in as ${e}`:`Account, signed in`:`Account`)}">
            <span class="avatar ${R.user?`in`:`out`}" aria-hidden="true">${t?Q(t):pn}</span>
          </button>`}function hn(){let e=W.querySelector(`[data-avatar]`);if(!e)return;let t=document.createElement(`template`);t.innerHTML=mn().trim();let n=t.content.firstElementChild;e.replaceWith(n),gn(n)}function gn(e){e&&e.addEventListener(`click`,_n)}function _n(){P!==`account`&&(ut=[`home`,`practice`,`items`,`settings`].includes(P)?P:`home`),I=null,z=null,B={...B,password:``,showPw:!1,error:``,info:``,busy:!1},P=`account`,$(),window.scrollTo(0,0);let e=W.querySelector(`#account-title`);e&&e.focus({preventScroll:!0})}function vn(){z=null,B={...B,password:``,showPw:!1,error:``,info:``,busy:!1},P=ut||`home`,ut=`home`,$(),window.scrollTo(0,0)}function yn(){return`
    <div class="page account-page">
      <div class="topbar account-topbar">
        <button type="button" class="back-btn" data-account-back aria-label="Back">
          <span aria-hidden="true">←</span> Back
        </button>
        <h1 id="account-title" class="account-title" tabindex="-1">Account</h1>
      </div>
      ${sn()}
    </div>`}function bn(){let e=ht();return`
    <div class="page">
      <div class="topbar">
        <div class="topbar-left">
          ${mn()}
          <div class="brand">Memorized</div>
        </div>
        <button type="button" class="icon-btn" data-go="settings" aria-label="Settings">⚙</button>
      </div>
      <button type="button" class="sync-hint" data-sync-hint data-open-account
        aria-label="Not synced — will retry. Open Account" ${R.user&&(U.status===`error`||U.status===`offline`)?``:`hidden`}>Not synced — will retry <span aria-hidden="true">›</span></button>

      <div class="due-banner">
        <span class="pill">${e} due</span>
        <button type="button" class="btn btn-primary" style="width:auto;padding:10px 16px" data-start-practice ${e?``:`disabled`}>Start practice</button>
      </div>

      <div class="card add-box">
        <div class="add-title" id="add-heading">Enter Description and Item. Tap Memorize.</div>
        <label class="label" for="add-description">Enter Description</label>
        <input class="input" id="add-description" type="text" autocomplete="off" placeholder="e.g. Emery and Bekky eldest daughter" aria-describedby="add-heading" />
        <label class="label" for="add-item">Enter Item</label>
        <input class="input" id="add-item" type="text" autocomplete="off" placeholder="e.g. Ruth Ong" />
        <div class="btn-row">
          <button type="button" class="btn btn-primary" data-add>Memorize</button>
        </div>
      </div>
    </div>`}function xn(e,t){return`${e.question} ${e.answer} ${e.label} ${e.raw} ${e.type}`.toLowerCase().includes(t)}function Sn(e){let t=ge(c(e)),n=ye(e);return`<span class="nw">Created ${Q(t)}</span><span class="sep" aria-hidden="true"> · </span><span class="nw">Practice ${Q(n)}</span>`}function Cn(e){let t=(e||``).trim().toLowerCase(),n=t?N.items.filter(e=>xn(e,t)):N.items;return n.length?`<div class="list">
        ${n.map(e=>`
          <div class="list-item" data-item="${e.id}">
            <div class="body item-row">
              <span class="type-badge">${Q(e.type)}</span>
              <span class="q">${Q(e.question)}</span>
              <span class="meta">${Q(e.answer)}</span>
              <span class="meta item-dates">${Sn(e)}</span>
            </div>
            <div class="actions">
              <button type="button" class="tiny-btn" data-edit="${e.id}">Edit</button>
              <button type="button" class="tiny-btn danger" data-delete="${e.id}">Delete</button>
            </div>
          </div>`).join(``)}
      </div>`:`<div class="empty">No matches</div>`}function wn(e){let t=(e||``).trim().toLowerCase();return t?`${N.items.filter(e=>xn(e,t)).length} of ${N.items.length}`:String(N.items.length)}function Tn(){let e=W.querySelector(`#items-results`);e&&(e.innerHTML=Cn(F),Mn(e));let t=W.querySelector(`[data-items-count]`);t&&(t.textContent=wn(F))}function En(){return`
      <section class="progress-summary" aria-label="Your progress">
        <div class="stat-grid compact">
          <div class="stat"><div class="num">${N.stats.streak||0}</div><div class="cap">Streak</div></div>
          <div class="stat"><div class="num">${N.stats.totalPracticed||0}</div><div class="cap">Practiced</div></div>
          <div class="stat"><div class="num">${gt()}</div><div class="cap">Stronger</div></div>
        </div>
        <p class="progress-note">Practice when items are due to keep a gentle streak. “Stronger” = reached the 14-day step or beyond.</p>
      </section>`}function Dn(){if(!I){let e=ht(),t=me(N.items).length,n=e?`${e} item${e===1?``:`s`} due today.`:`Add new items, or check back tomorrow.`;return`
      <div class="page">
        <div class="topbar"><h1>Practice</h1></div>
        ${En()}
        <div class="card">
          <p>${n}</p>
          <button type="button" class="btn btn-primary" data-start-practice ${e?``:`disabled`}>Start practice</button>
          ${t?`<button type="button" class="btn btn-ghost" data-start-test style="margin-top:8px">Test</button>
          <p class="hint" style="margin-bottom:0">Test randomly quizzes ${t} item${t===1?``:`s`} at 14 days or beyond. Wrong answers return to the 3-day step.</p>`:``}
        </div>
      </div>`}if(I.phase===`score`)return`
      <div class="page">
        <div class="topbar"><h1>Test</h1></div>
        <div class="card">
          <div class="question">Score</div>
          <p style="font-size:var(--font-title);font-weight:700;color:var(--ink);margin:8px 0">${I.scoreCorrect||0} / ${I.scoreTotal||0}</p>
          <p>Wrong answers were reset to the 3-day practice step.</p>
          <div class="btn-row">
            <button type="button" class="btn btn-primary" data-end-session>Done</button>
          </div>
        </div>
      </div>`;let e=J();if(!e)return I=null,Dn();let t=I.queue.length,n=I.index+1,r=I.mode===`test`,i=r?`Test`:`Practice`,a=``;if(I.phase===`recall`)a=`
      <div class="card">
        <div class="practice-progress">${i} · ${n} of ${t}</div>
        <div class="question">${Q(e.question)}</div>
        <label class="label" for="recall">Your answer</label>
        <input class="input" id="recall" autocomplete="off" autocapitalize="off" value="${Q(I.input)}" />
        <div class="btn-row">
          <button type="button" class="btn btn-primary" data-submit-recall>Check</button>
          <button type="button" class="btn btn-ghost" data-dont-remember>Don't remember</button>
        </div>
      </div>`;else if(I.phase===`mcq`){let r=I.choices||[];a=`
      <div class="card">
        <div class="practice-progress">${i} · ${n} of ${t} · multiple choice</div>
        <div class="question">${Q(e.question)}</div>
        <div class="mcq">
          ${r.map(e=>`<button type="button" data-mcq="${Q(e)}">${Q(e)}</button>`).join(``)}
        </div>
      </div>`}else{let o=I.lastResult===`correct`,s=r?o?`Kept at the current interval.`:`Reset to the 3-day practice step.`:Dt(e);a=`
      <div class="card">
        <div class="practice-progress">${i} · ${n} of ${t}</div>
        <div class="question">${Q(e.question)}</div>
        <div class="feedback ${o?`ok`:`bad`}">
          ${o?`Correct`:`Not quite`} — ${Q(e.answer)}
        </div>
        <p style="margin-top:12px;font-size:var(--font-small)">
          ${Q(s)}
        </p>
        <div class="btn-row">
          <button type="button" class="btn btn-primary" data-next-card>${n>=t?`Done`:`Next`}</button>
        </div>
      </div>`}return`<div class="page"><div class="topbar"><h1>${r?`Test`:`Practice`}</h1></div>${r?``:En()}${a}</div>`}function On(){return N.items.length?`
    <div class="page">
      <div class="search-wrap items-search">
        <label class="sr-only" for="items-search">Search</label>
        <input class="input" id="items-search" type="search" placeholder="Search" autocomplete="off" data-items-search value="${Q(F)}" />
      </div>
      <div class="topbar"><h1>Items</h1><span class="pill muted" data-items-count>${Q(wn(F))}</span></div>
      <div id="items-results">${Cn(F)}</div>
    </div>`:`
      <div class="page">
        <div class="topbar"><h1>Items</h1></div>
        <div class="empty">No items yet. Add a fact from Home.</div>
      </div>`}function kn(){let e=N.settings,t=j()?Notification.permission===`denied`?`Notifications are blocked. Enable them in your browser site settings if you want a daily reminder.`:`Reminders fire best while the app is open or installed as a PWA. Android Chrome may limit alerts when the site is fully closed.`:`Notifications are not supported in this browser.`;return`
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
          <div class="label" id="remind-time-label">Reminder time</div>
          ${Ot(e.reminderTime||`09:00`)}
          <p class="hint" style="margin:6px 0 0">Hour and minute — works on Android Chrome / PWA.</p>
        </div>
        <div class="notice">${Q(t)}</div>

        <div class="settings-row" style="margin-top:8px">
          <div class="left"><strong>Language</strong><span>English is fully supported</span></div>
        </div>
        <select class="select" data-lang>
          ${lt.map(t=>`<option value="${t.id}" ${e.language===t.id?`selected`:``}>${Q(t.label)}</option>`).join(``)}
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
        <p style="margin:0;font-size:var(--font-small)">Privacy: your facts are always kept on this device, and the app works without an account. If you sign in (tap the round icon on Home), a copy is kept in your private account so your devices stay in step. Use Export to keep a portable copy.</p>
      </div>

      <p class="app-version">Release ${Q(ct)}</p>
    </div>`}function An(){if(!L)return``;let e=N.items.find(e=>e.id===L);return e?`
    <div class="modal-backdrop" data-close-modal>
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="edit-title">
        <h2 id="edit-title">Edit item</h2>
        <div class="field">
          <label class="label" for="edit-q">Description</label>
          <input class="input" id="edit-q" value="${Q(e.question)}" autocomplete="off" />
        </div>
        <div class="field">
          <label class="label" for="edit-a">Item</label>
          <input class="input" id="edit-a" value="${Q(e.answer)}" autocomplete="off" />
        </div>
        <div class="btn-row two">
          <button type="button" class="btn btn-ghost" data-close-modal>Cancel</button>
          <button type="button" class="btn btn-primary" data-save-edit>Save</button>
        </div>
        <div class="btn-row">
          <button type="button" class="btn btn-danger" data-delete-edit>Delete</button>
        </div>
      </div>
    </div>`:``}function $(){if(mt(),P===`progress`&&(P=`practice`),P!==`items`&&(F=``),V){W.innerHTML=cn(),jn();return}let e=``;switch(P){case`practice`:e=Dn();break;case`items`:e=On();break;case`settings`:e=kn();break;case`account`:e=yn();break;default:e=bn()}W.innerHTML=e+(P!==`settings`&&P!==`account`?dn():``)+An()+ln(),jn()}function jn(){W.querySelectorAll(`[data-nav]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-nav`);if(t===`practice`&&!I){P=`practice`,$();return}t!==`practice`&&(I=null),P=t,$()})}),W.querySelectorAll(`[data-go]`).forEach(e=>{e.addEventListener(`click`,()=>{P=e.getAttribute(`data-go`),z=null,$()})}),un(),gn(W.querySelector(`[data-avatar]`)),W.querySelectorAll(`[data-open-account]`).forEach(e=>e.addEventListener(`click`,_n));let e=W.querySelector(`[data-account-back]`);e&&e.addEventListener(`click`,vn);let t=W.querySelector(`[data-add]`);t&&t.addEventListener(`click`,()=>{let e=W.querySelector(`#add-description`),t=W.querySelector(`#add-item`);_t(e?.value,t?.value),e&&(e.value=``),t&&(t.value=``)});let n=W.querySelector(`[data-items-search]`);n&&n.addEventListener(`input`,()=>{F=n.value,Tn()}),W.querySelectorAll(`[data-start-practice]`).forEach(e=>{e.addEventListener(`click`,bt)}),W.querySelectorAll(`[data-start-test]`).forEach(e=>{e.addEventListener(`click`,xt)});let r=W.querySelector(`[data-end-session]`);r&&r.addEventListener(`click`,Et);let i=W.querySelector(`#recall`);i&&(i.focus(),i.addEventListener(`input`,()=>{I.input=i.value}),i.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),Ct())}));let a=W.querySelector(`[data-submit-recall]`);a&&a.addEventListener(`click`,Ct);let o=W.querySelector(`[data-dont-remember]`);o&&o.addEventListener(`click`,kt),W.querySelectorAll(`[data-mcq]`).forEach(e=>{e.addEventListener(`click`,()=>wt(e.getAttribute(`data-mcq`)))});let s=W.querySelector(`[data-next-card]`);s&&s.addEventListener(`click`,Tt),Mn(W);let c=W.querySelector(`.modal-backdrop`);c&&c.addEventListener(`click`,e=>{e.target===c&&(L=null,$())}),W.querySelectorAll(`button[data-close-modal]`).forEach(e=>{e.addEventListener(`click`,()=>{L=null,$()})});let l=W.querySelector(`.modal`);l&&l.addEventListener(`click`,e=>e.stopPropagation());let u=W.querySelector(`[data-save-edit]`);u&&u.addEventListener(`click`,()=>{yt(L,{question:W.querySelector(`#edit-q`).value,answer:W.querySelector(`#edit-a`).value})});let d=W.querySelector(`[data-delete-edit]`);d&&d.addEventListener(`click`,()=>{confirm(`Delete this item?`)&&vt(L)}),W.querySelectorAll(`[data-setting]`).forEach(e=>{let t=e.getAttribute(`data-setting`);e.querySelectorAll(`button[data-val]`).forEach(e=>{e.addEventListener(`click`,()=>{N.settings[t]=e.getAttribute(`data-val`),pt(),G(),$()})})});let f=W.querySelector(`[data-toggle-notif]`);f&&f.addEventListener(`click`,()=>{At(!N.settings.notificationsEnabled)});let p=W.querySelector(`[data-remind-hour]`),m=W.querySelector(`[data-remind-minute]`),h=()=>{if(!p||!m)return;let e=p.value||`09`,t=m.value||`00`;N.settings.reminderTime=`${e}:${t}`,pt(),G(),N.settings.notificationsEnabled&&M(N.settings.reminderTime,!0)};p&&p.addEventListener(`change`,h),m&&m.addEventListener(`change`,h);let g=W.querySelector(`[data-lang]`);g&&g.addEventListener(`change`,()=>{N.settings.language=g.value,pt(),G(),g.value!==`en`&&q(`Language stub — English UI for now`)});let _=W.querySelector(`[data-export-json]`);_&&_.addEventListener(`click`,Mt);let v=W.querySelector(`[data-export-save]`);v&&v.addEventListener(`click`,()=>Nt());let y=W.querySelector(`[data-export-csv]`);y&&y.addEventListener(`click`,Pt);let b=W.querySelector(`[data-import-trigger]`),x=W.querySelector(`[data-import-file]`);b&&x&&(b.addEventListener(`click`,()=>x.click()),x.addEventListener(`change`,()=>{let e=x.files&&x.files[0];x.value=``,It(e)}))}function Mn(e){e.querySelectorAll(`[data-edit]`).forEach(e=>{e.addEventListener(`click`,()=>{L=e.getAttribute(`data-edit`),$()})}),e.querySelectorAll(`[data-delete]`).forEach(e=>{e.addEventListener(`click`,()=>{confirm(`Delete this item?`)&&vt(e.getAttribute(`data-delete`))})})}mt(),N.settings.notificationsEnabled&&j()&&Notification.permission===`granted`&&M(N.settings.reminderTime,!0),E&&tn(),$(),E&&(Me(Kt).catch(()=>{R={ready:!0,user:null},qt(),hn()}),setTimeout(()=>{R.ready||(R={ready:!0,user:null},qt())},8e3),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&R.user&&Date.now()-U.lastAttempt>15e3&&X(`visible`)}),window.addEventListener(`online`,()=>{R.user&&X(`online`)}),setInterval(Gt,6e4)),Ee(async()=>{let{registerSW:e}=await import(`./virtual_pwa-register-Dark3o6F.js`);return{registerSW:e}},[],import.meta.url).then(({registerSW:e})=>{e({immediate:!0})}).catch(()=>{});export{Ee as t};