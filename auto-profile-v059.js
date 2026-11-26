/* Stef's Wijnkelder v0.5.9 - automatic profile for manual and CSV wines. Load last. */
(function(){'use strict';
const KEY='stefWinesV03Full';
const n=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const has=(s,re)=>re.test(n(s));
function profile(w){let color=n(w.c),g=n(w.g),reg=n((w.regio||'')+' '+(w.land||'')+' '+(w.n||''));let p={a:3,b:3,tn:color.includes('rood')?3:0,sweet:color.includes('zoet')?4:0,o:1,fruit:3,mineral:3,aroma:3,freshness:3,style:'evenwichtig',pos:'',neg:'',profileSource:'automatisch startprofiel'};
const set=(x)=>Object.assign(p,x);
if(/riesling/.test(g))set({a:5,b:2,tn:0,o:0,fruit:3,mineral:5,aroma:4,freshness:5,style:'fris · mineraal · citrus · precies',pos:'oesters; schelpdieren; witte vis; ceviche; sushi; Aziatisch; pikant',neg:'zwaar rood vlees; zoete desserts'});
else if(/chenin/.test(g))set({a:5,b:3,tn:0,o:1,fruit:3,mineral:4,aroma:3,freshness:5,style:'fris · mineraal · citrus · steenfruit',pos:'witte vis; schaal- en schelpdieren; gevogelte; romige saus; zachte kaas',neg:'zwaar rood vlees'});
else if(/chardonnay/.test(g))set({a:4,b:4,tn:0,o:2,fruit:3,mineral:3,aroma:3,freshness:4,style:'vol · verfijnd · citrus · steenfruit',pos:'witte vis; kreeft; coquilles; beurre blanc; romige saus; gevogelte; paddenstoelen',neg:'zeer pikant; ceviche'});
else if(/pinot blanc|weissburg/.test(g))set({a:4,b:3,tn:0,o:1,fruit:3,mineral:4,aroma:2,freshness:4,style:'fris · zacht · mineraal',pos:'witte vis; gevogelte; groenten; romige saus',neg:'zwaar rood vlees'});
else if(/sauvignon/.test(g))set({a:5,b:2,tn:0,o:0,fruit:4,mineral:3,aroma:5,freshness:5,style:'zeer fris · aromatisch · citrus · groen',pos:'geitenkaas; schaal- en schelpdieren; witte vis; salades; asperges',neg:'zwaar rood vlees; zeer romige saus'});
else if(/gruner|veltliner/.test(g))set({a:5,b:3,tn:0,o:0,fruit:3,mineral:4,aroma:3,freshness:5,style:'fris · mineraal · peperig',pos:'groenten; asperges; witte vis; schnitzel; Aziatisch',neg:'zwaar zoet dessert'});
else if(/carricante|assyrtiko|albarino/.test(g))set({a:5,b:3,tn:0,o:0,fruit:3,mineral:5,aroma:3,freshness:5,style:'strak · zilt · mineraal · citrus',pos:'oesters; schelpdieren; gegrilde vis; ceviche',neg:'zware stoofpot'});
else if(/pinot noir|spatburg/.test(g))set({a:4,b:2,tn:2,o:1,fruit:4,mineral:3,aroma:4,freshness:4,style:'elegant · fris · rood fruit · aards',pos:'eend; gevogelte; paddenstoelen; kalf; zalm; gegrilde tonijn',neg:'oesters; zeer pikant'});
else if(/gamay/.test(g))set({a:4,b:2,tn:2,o:0,fruit:5,mineral:3,aroma:4,freshness:4,style:'sappig · fris · rood fruit',pos:'charcuterie; gevogelte; paddenstoelen; varkensvlees; lichte pasta; picknick',neg:'oesters; zware steak'});
else if(/nebbiolo|chiavennasca/.test(g))set({a:5,b:3,tn:5,o:1,fruit:3,mineral:4,aroma:5,freshness:5,style:'aromatisch · aards · mineraal · tanninerijk',pos:'truffel; paddenstoelen; kalf; rund; wild; harde kaas',neg:'oesters; rauwe schelpdieren; delicate witte vis; pikant'});
else if(/sangiovese/.test(g))set({a:5,b:3,tn:4,o:1,fruit:4,mineral:3,aroma:4,freshness:5,style:'fris · kersen · kruidig · gestructureerd',pos:'tomatensaus; pasta; pizza; rund; lam; wild; harde kaas',neg:'oesters; rauwe schelpdieren'});
else if(/cabernet franc/.test(g))set({a:4,b:3,tn:3,o:1,fruit:3,mineral:3,aroma:4,freshness:4,style:'fris · kruidig · rood en donker fruit',pos:'gevogelte; varkensvlees; lam; gegrild vlees; paddenstoelen; charcuterie',neg:'oesters; rauwe schelpdieren'});
else if(/mourvedre/.test(g)||/bandol/.test(reg))set({a:3,b:5,tn:5,o:2,fruit:4,mineral:2,aroma:4,freshness:3,style:'krachtig · kruidig · donker fruit · aards',pos:'lamsbout; wild; stoofpot; gegrild rood vlees; gerijpte kaas',neg:'oesters; ceviche; delicate witte vis; lichte salade'});
else if(/tempranillo/.test(g))set({a:3,b:4,tn:4,o:3,fruit:4,mineral:2,aroma:3,freshness:3,style:'vol · kruidig · rijp fruit · hout',pos:'lam; rund; tapas; geroosterd vlees; harde kaas',neg:'oesters; rauwe schelpdieren'});
else if(/garnacha|grenache/.test(g))set({a:3,b:4,tn:3,o:1,fruit:5,mineral:2,aroma:4,freshness:3,style:'rijp · kruidig · rood fruit',pos:'lam; BBQ; stoofpot; gegrild vlees',neg:'oesters; delicate witte vis'});
else if(/agiorgitiko/.test(g))set({a:3,b:4,tn:4,o:2,fruit:4,mineral:2,aroma:3,freshness:3,style:'rijp · kruidig · gestructureerd',pos:'lam; rund; stoofpot; gegrild vlees',neg:'oesters; rauwe schelpdieren'});
else if(/trousseau/.test(g))set({a:4,b:2,tn:2,o:0,fruit:3,mineral:3,aroma:4,freshness:4,style:'licht · kruidig · aards',pos:'charcuterie; gevogelte; paddenstoelen; Comte',neg:'oesters'});
else if(/ciliegiolo/.test(g))set({a:3,b:2,tn:2,o:0,fruit:5,mineral:2,aroma:3,freshness:3,style:'sappig · fruitig · licht',pos:'pizza; pasta; charcuterie; gevogelte',neg:'oesters'});
else if(color.includes('mousserend'))set({a:5,b:2,tn:0,o:0,fruit:3,mineral:4,aroma:3,freshness:5,style:'fris · mousserend · feestelijk',pos:'aperitief; oesters; schelpdieren; sushi; gefrituurd; feest',neg:'zware stoofpot; zeer zoet dessert'});
else if(color.includes('wit'))set({a:4,b:3,tn:0,o:1,fruit:3,mineral:3,aroma:3,freshness:4,style:'fris · wit fruit',pos:'vis; gevogelte; groenten',neg:'zwaar rood vlees'});
else if(color.includes('rood'))set({a:3,b:3,tn:3,o:1,fruit:4,mineral:2,aroma:3,freshness:3,style:'fruitig · medium body',pos:'gegrild vlees; pasta; kaas',neg:'oesters; rauwe schelpdieren'});
if(color.includes('zoet')||/auslese|vin santo|noble/.test(reg))set({sweet:4,a:4,b:3,tn:0,style:p.style+' · zoet',pos:'dessert; foie gras; blauwe kaas; oude kaas',neg:'steak; droge oesters'});
return p}
function should(w){return !w.pos||!w.neg||w.profileSource==='standaard'}
function enrich(w,force){if(!force&&!should(w))return w;let p=profile(w);Object.assign(w,p);return w}
function installManual(){const form=document.getElementById('addForm');if(!form||form.dataset.profile059)return;form.dataset.profile059='1';form.addEventListener('submit',()=>{setTimeout(()=>{let list=typeof wines!=='undefined'?wines:[],w=list[list.length-1];if(w){enrich(w,true);localStorage.setItem(KEY,JSON.stringify(list));let m=document.getElementById('addMsg');if(m)m.textContent='✓ Toegevoegd met automatisch startprofiel en pairings.'}},0)},true)}
function installCSV(){window.autoProfileWine059=enrich;document.addEventListener('click',e=>{if(e.target&&['csvMerge','csvReplace'].includes(e.target.id)){setTimeout(()=>{let list=typeof wines!=='undefined'?wines:[];list.forEach(w=>enrich(w,false));localStorage.setItem(KEY,JSON.stringify(list));if(typeof render==='function')render()},30)}})}
function init(){installManual();installCSV()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
