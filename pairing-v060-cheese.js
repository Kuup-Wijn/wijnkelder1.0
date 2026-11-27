/* Stef's Wijnkelder v0.6.0 - cheese pairing engine. Load last. */
(function(){'use strict';
const n=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s-]/g,' ').replace(/\s+/g,' ').trim();
const has=(x,a)=>a.some(v=>new RegExp('(^|\\s)'+n(v).split(' ').join('\\s+')+'(?=\\s|$)').test(x));
const groups=[
 {id:'fresh',names:['verse kaas','geitenkaas','chèvre','chevre','feta','ricotta','mozzarella','burrata'],label:'frisse/zachte kaas'},
 {id:'soft',names:['brie','camembert','chaource','coulommiers','reblochon','brillat savarin'],label:'zachte witschimmelkaas'},
 {id:'washed',names:['epoisses','époisses','munster','maroilles','herve','taleggio','livarot','pont l eveque'],label:'gewassen korstkaas'},
 {id:'hard',names:['comte','comté','gruyere','gruyère','beaufort','parmezaan','parmigiano','pecorino','oude gouda','oude kaas','cheddar','manchego'],label:'harde/gerijpte kaas'},
 {id:'blue',names:['blauwe kaas','roquefort','stilton','gorgonzola','bleu d auvergne','fourme d ambert'],label:'blauwschimmelkaas'},
 {id:'goat',names:['geitenkaas','chèvre','chevre','crottin','sainte maure'],label:'geitenkaas'},
 {id:'board',names:['kaasplank','kaasschotel','assortiment kaas','kaas'],label:'kaasplank'}
];
function detect(txt){let x=n(txt);for(const g of groups)if(has(x,g.names))return g;return null}
function cheeseScore(w,g){let c=n(w.c),gr=n(w.g),s=25,why=[];const white=c.includes('wit'),red=c==='rood',sweet=c.includes('zoet')||(w.sweet||0)>=3,spark=c.includes('mousserend'),acid=w.a||3,body=w.b||3,tan=w.tn||0,fruit=w.fruit||3,min=w.mineral||3;
 if(g.id==='fresh'||g.id==='goat'){if(white)s+=28;if(spark)s+=18;s+=acid*5+min*2;if(/sauvignon|riesling|chenin|pinot blanc|weissburg|gruner/i.test(gr))s+=12;if(red&&tan>=3)s-=25;why.push('frisheid en zuur bij frisse kaas')}
 if(g.id==='soft'){if(spark)s+=28;if(white)s+=18;if(red&&tan<=2)s+=15;s+=acid*3+(5-tan)*2;if(/chardonnay|pinot noir|gamay/i.test(gr))s+=12;why.push('voldoende frisheid zonder harde tannine')}
 if(g.id==='washed'){if(white)s+=20;if(sweet)s+=18;if(red&&tan<=2)s+=8;s+=body*3+acid*3;if(/riesling|gewurz|pinot blanc|chardonnay/i.test(gr))s+=12;if(tan>=4)s-=18;why.push('aromatische wijn bij krachtige gewassen korst')}
 if(g.id==='hard'){if(red)s+=20;if(white&&body>=3)s+=15;s+=body*4+acid*2;if(/nebbiolo|sangiovese|tempranillo|chardonnay|chenin/i.test(gr))s+=12;why.push('structuur bij gerijpte harde kaas')}
 if(g.id==='blue'){if(sweet)s+=45;else s-=20;s+=acid*3;if(/riesling/i.test(gr)&&sweet)s+=15;why.push('zoetheid balanceert zout en blauwschimmel')}
 if(g.id==='board'){if(spark)s+=28;if(white&&acid>=4)s+=18;if(red&&tan<=3)s+=15;s+=acid*3;if(/gamay|pinot noir|riesling|chenin/i.test(gr))s+=10;why.push('veelzijdigheid voor een gemengde kaasplank')}
 if(w.sp)s-=3;if(w.t&&w.t<=2028)s+=5;return{s:Math.max(1,Math.min(99,Math.round(s))),why:why.join('; ')}}
function install(){const btn=document.getElementById('recommend'),dish=document.getElementById('dish'),out=document.getElementById('results'),analysis=document.getElementById('analysis');if(!btn||!dish||!out||btn.dataset.cheese060)return;const old=btn.onclick;btn.dataset.cheese060='1';btn.onclick=function(e){const g=detect(dish.value);if(!g){if(typeof old==='function')return old.call(btn,e);return}let list=(typeof wines!=='undefined'?wines:[]).filter(w=>w.q>0).map(w=>({w,...cheeseScore(w,g)})).sort((a,b)=>b.s-a.s).slice(0,3);analysis.innerHTML=`<p class="muted"><strong>Herkend:</strong> ${g.label}</p>`;out.innerHTML='<h2>Beste keuzes</h2>'+list.map((x,i)=>`<div class="card"><strong>${i===0?'Beste match: ':''}${x.w.p} · ${x.w.n} ${x.w.y}</strong><div class="muted">${x.w.c} · ${x.w.g}</div><span class="pill ok">kaas ${x.s}/100</span><p class="muted">${x.why}.</p></div>`).join('')}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();})();
