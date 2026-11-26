/* Stef's Wijnkelder - burger patch v0.4.2. Load AFTER v0.4 and v0.4.1 */
(function(){'use strict';
const n=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s-]/g,' ').replace(/\s+/g,' ').trim();
const rules=[
 [['hamburger','burger','cheeseburger'],' rund gegrild vlees brood'],
 [['bacon burger','baconburger'],' rund gegrild vlees bacon charcuterie zout vet'],
 [['cheeseburger'],' rund gegrild vlees kaas vet zout'],
 [['chicken burger','kipburger'],' kip gevogelte gegrild vlees'],
 [['fried chicken burger','crispy chicken burger'],' kip gevogelte gefrituurd vet zout'],
 [['veggie burger','vegetarische burger'],' groenten gegrild'],
 [['smash burger','smashburger'],' rund gegrild vlees krachtig vet'],
 [['hamburger met friet','burger met friet'],' rund gegrild vlees frieten gefrituurd aardappel zout'],
 [['burger bbq','bbq burger'],' rund gegrild vlees bbq rokerig zoet'],
 [['burger pikant','spicy burger'],' rund gegrild vlees pikant']
];
function has(x,p){p=n(p);return new RegExp('(^|\\s)'+p.split(' ').join('\\s+')+'(?=\\s|$)').test(x)}
function enrich(txt){const x=n(txt);let a=[];for(const [names,extra] of rules)if(names.some(v=>has(x,v)))a.push(extra);return txt+a.join('')}
function install(){const b=document.getElementById('recommend'),i=document.getElementById('dish');if(!b||!i||b.dataset.burgerPatch)return;const old=b.onclick;b.dataset.burgerPatch='1';b.onclick=function(e){const raw=i.value;i.value=enrich(raw);try{if(typeof old==='function')old.call(b,e);else if(typeof window.recommendV04==='function')window.recommendV04()}finally{i.value=raw}}}
window.enrichBurgerV042=enrich;if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();})();
