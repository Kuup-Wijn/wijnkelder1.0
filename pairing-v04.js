/* Stef's Wijnkelder - pairing engine v0.4 */
(function(){
'use strict';
const norm=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[^a-z0-9\s-]/g,' ').replace(/\s+/g,' ').trim();
const phrase=(text,p)=>new RegExp('(^|\\s)'+p.split(' ').map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('\\s+')+'(?=\\s|$)').test(text);
const any=(text,list)=>list.some(x=>phrase(text,norm(x)));
const uniq=a=>[...new Set(a)];
const D={
 cuisine:{thai:['thais','thaise','thai','pad thai','tom kha','tom yum','groene curry','rode curry'],japanese:['sushi','sashimi','maki','nigiri','ramen','udon','soba','teriyaki','japans'],korean:['koreaans','kimchi','bulgogi','gochujang'],indian:['indiaas','tikka','masala','vindaloo','korma','biryani','naan'],turkish:['kebab','doner','durum','kofta','turks'],levant:['libanees','mezze','hummus','falafel','shawarma'],mexican:['mexicaans','taco','tacos','burrito','enchilada','al pastor'],italian:['pizza','pasta','risotto','lasagne','carbonara'],spanish:['tapas','paella'],moroccan:['marokkaans','tajine','couscous'],vietnamese:['vietnamees','pho','banh mi']},
 ingredient:{oyster:['oester','oesters'],shellfish:['mossel','mossels','vongole','kokkel','venusschelp'],crustacean:['garnaal','garnalen','gamba','gambas','kreeft','langoustine','coquille','coquilles'],delicateFish:['witte vis','witvis','kabeljauw','schelvis','zeetong','tong','tarbot','zeebaars','dorade'],firmFish:['heilbot','monkfish','zeeduivel'],fatFish:['zalm','makreel','sardine','sardines'],tuna:['tonijn','tuna'],chicken:['kip','kalkoen','gevogelte'],duck:['eend'],pork:['varken','varkensvlees','kotelet','procureur','buikspek'],bacon:['spek','bacon','pancetta','salami','prosciutto','ham'],veal:['kalf','kalfsvlees'],beef:['rund','rundvlees','steak','entrecote','biefstuk'],lamb:['lam','lamsvlees','lamsbout','lamsrack'],game:['wild','hert','everzwijn','ree'],mushroom:['paddenstoel','paddenstoelen','champignon','champignons','truffel'],cheese:['kaas','parmezaan','mozzarella','comte','gruyere'],blueCheese:['blauwe kaas','roquefort','stilton'],tofu:['tofu','tempeh']},
 dish:{pizza:['pizza'],pasta:['pasta','spaghetti','lasagne','tagliatelle','carbonara'],risotto:['risotto'],sushi:['sushi','sashimi','maki','nigiri'],kebab:['kebab','doner','durum','shawarma','kofta'],curry:['curry','korma','vindaloo','masala'],noodles:['noedels','noedel','noodles','ramen','udon','soba','pad thai'],tacos:['taco','tacos'],stew:['stoofpot','stoofvlees','ragout','daube','tajine']},
 prep:{raw:['rauw','sashimi','tartaar','ceviche'],steamed:['gestoomd','gepocheerd'],fried:['gebakken','pan gebakken','meuniere'],grilled:['gegrild','grill','bbq','barbecue','geroosterd'],friedDeep:['gefrituurd','tempura','friet'],smoked:['gerookt','rook'],stewed:['gestoofd','stoofpot','tajine']},
 sauce:{tomato:['tomaat','tomatensaus','bolognese','marinara'],cream:['room','roomsaus','romig','creme'],butter:['boter','beurre blanc','beurre noisette','meuniere'],mayo:['mayonaise','mayonnaise','mayo','aioli'],citrus:['citroen','limoen','citrus','yuzu'],soy:['soja','sojasaus','miso'],coconut:['kokos','kokosmelk'],mustard:['mosterd','mosterdsaus'],pepper:['pepersaus','zwarte peper'],garlic:['knoflook','looksaus'],sweet:['honing','zoete saus','teriyaki'],herb:['rozemarijn','tijm','oregano','basilicum']},
 flavor:{spicy:['pikant','pittig','spicy','chili','sambal','sriracha','harissa','gochujang','jalapeno','wasabi'],verySpicy:['zeer pikant','heel pikant','extra pittig','extra pikant'],umami:['umami','soja','miso','parmezaan','paddenstoel','truffel'],salty:['zilt','zout','kappertjes','olijf','soja'],sweet:['zoet','honing','teriyaki'],acidic:['zuur','citroen','limoen','azijn','ceviche'],smoky:['rokerig','gerookt','bbq']}
};
function classify(text){const x=norm(text),r={raw:x,cuisine:[],ingredient:[],dish:[],prep:[],sauce:[],flavor:[],intensity:2,fat:1,heat:0,acid:1,sweet:0,umami:0};
 for(const group of ['cuisine','ingredient','dish','prep','sauce','flavor'])for(const [k,v] of Object.entries(D[group]))if(any(x,v))r[group].push(k);
 r.cuisine=uniq(r.cuisine);r.ingredient=uniq(r.ingredient);r.dish=uniq(r.dish);r.prep=uniq(r.prep);r.sauce=uniq(r.sauce);r.flavor=uniq(r.flavor);
 if(r.ingredient.some(i=>['beef','lamb','game'].includes(i))||r.dish.includes('stew'))r.intensity=5;
 else if(r.ingredient.some(i=>['duck','pork','bacon','fatFish','tuna'].includes(i))||r.dish.some(i=>['pizza','kebab','curry'].includes(i)))r.intensity=4;
 else if(r.ingredient.some(i=>['chicken','veal','firmFish','crustacean'].includes(i)))r.intensity=3;
 if(r.ingredient.some(i=>['oyster','shellfish','delicateFish'].includes(i))&&r.prep.includes('raw'))r.intensity=1;
 if(r.sauce.some(s=>['cream','butter','mayo','coconut'].includes(s))||r.ingredient.some(i=>['fatFish','pork','bacon'].includes(i)))r.fat=4;
 if(r.flavor.includes('spicy'))r.heat=3;if(r.flavor.includes('verySpicy'))r.heat=5;
 if(r.sauce.includes('citrus')||r.sauce.includes('tomato')||r.flavor.includes('acidic'))r.acid=4;
 if(r.sauce.includes('sweet')||r.flavor.includes('sweet'))r.sweet=3;
 if(r.flavor.includes('umami')||r.sauce.includes('soy')||r.ingredient.includes('mushroom'))r.umami=4;
 return r;}
function tagsFrom(r){const map={oyster:'oesters',shellfish:'schelpdieren',crustacean:'schelpdieren',delicateFish:'witte vis',firmFish:'witte vis',fatFish:'vette vis',tuna:'tonijn',chicken:'gevogelte',duck:'eend',pork:'varkensvlees',bacon:'charcuterie',veal:'kalf',beef:'rund',lamb:'lam',game:'wild',mushroom:'paddenstoelen',blueCheese:'blauwe kaas',pizza:'pizza',pasta:'pasta',sushi:'sushi',kebab:'gegrild vlees',curry:'Aziatisch',noodles:'Aziatisch',stew:'stoofpot',tomato:'tomatensaus',cream:'romige saus',butter:'beurre blanc',citrus:'citroen',spicy:'zeer pikant',raw:'rauw',grilled:'gegrild vlees',smoked:'gerookt',friedDeep:'gefrituurd'};return uniq([...r.ingredient,...r.dish,...r.sauce,...r.flavor,...r.prep].map(x=>map[x]).filter(Boolean));}
function hardReject(w,r){const red=w.c==='Rood',sweet=(w.sweet||0)>=3,tannin=w.tn||0,body=w.b||3;
 if((r.ingredient.includes('oyster')||r.ingredient.includes('shellfish'))&&(red||tannin>=2||body>=4))return 'te veel tannine/body voor rauwe, zilte schelpdieren';
 if(r.ingredient.includes('delicateFish')&&red)return 'rode wijn overstemt delicate witte vis';
 if(r.heat>=3&&tannin>=4)return 'stevige tannine versterkt de hitte';
 if(r.heat>=4&&(w.o||0)>=3)return 'veel hout en alcoholwarmte werken minder goed bij zeer pikant';
 if(r.dish.includes('sushi')&&red&&tannin>=3)return 'tannine botst met rauwe vis, soja en wasabi';
 if(r.sweet===0&&sweet&&!r.ingredient.includes('blueCheese'))return 'zoete wijn past niet bij dit hartige gerecht';
 return '';}
function scoreWine(w,r){const reject=hardReject(w,r);if(reject)return{ok:false,score:0,why:reject};let s=40,reasons=[],tags=tagsFrom(r),pos=norm(w.pos||''),neg=norm(w.neg||'');
 for(const t of tags){const z=norm(t);if(pos.includes(z)){s+=9;reasons.push(t)}if(neg.includes(z))s-=28;}
 s-=Math.abs((w.b||3)-r.intensity)*5;
 if(r.acid>=4)s+=(w.a||3)*3;
 if(r.fat>=4)s+=(w.a||3)*3+Math.min(w.b||3,3)*2;
 if(r.heat>=3){s+=(w.a||3)*4-(w.tn||0)*6-(w.o||0)*4;if(w.c==='Wit'||w.c==='Mousserend')s+=8;if((w.sweet||0)>0)s+=6;}
 if(r.umami>=4)s+=(w.a||3)*2-(w.tn||0)*2;
 if(r.sauce.includes('tomato')){s+=(w.a||3)*4;if((w.g||'').match(/Sangiovese|Ciliegiolo|Barbera/i))s+=14;}
 if(r.dish.includes('pizza')){if(w.c==='Rood'&&(w.a||0)>=3)s+=10;if(r.ingredient.includes('bacon')&&(w.tn||0)<=3)s+=8;}
 if(r.cuisine.includes('thai')||r.cuisine.includes('indian')){if((w.g||'').match(/Riesling/i))s+=15;if(w.c==='Rood'&&(w.tn||0)>=3)s-=15;}
 if(r.dish.includes('sushi')){if(w.c==='Mousserend')s+=16;if((w.g||'').match(/Riesling/i))s+=14;}
 if(r.dish.includes('kebab')){if(r.ingredient.includes('lamb')||r.ingredient.includes('beef')){s+=(w.b||3)*3+(w.tn||0)*2}else if(r.ingredient.includes('chicken')){if(w.c==='Wit'||(w.tn||0)<=2)s+=10}}
 if(r.ingredient.includes('pork')||r.ingredient.includes('bacon')){s+=(w.a||3)*3;if((w.tn||0)>4)s-=8;}
 if(r.ingredient.includes('fatFish')){s+=(w.a||3)*3;if((w.tn||0)>=4)s-=18;}
 if(r.ingredient.includes('mushroom')){if((w.g||'').match(/Pinot Noir|Nebbiolo|Gamay|Trousseau|Chardonnay/i))s+=15;}
 return{ok:s>=45,score:Math.max(1,Math.min(100,Math.round(s))),why:reasons.length?'match op '+uniq(reasons).slice(0,4).join(', '):'structurele match op zuur, body, saus en intensiteit'};}
function labels(r){const n={thai:'Thais',japanese:'Japans/sushi',korean:'Koreaans',indian:'Indiaas',turkish:'Turks/kebab',levant:'Levant/mezze',mexican:'Mexicaans',italian:'Italiaans',spanish:'Spaans',moroccan:'Marokkaans',vietnamese:'Vietnamees',oyster:'oesters',shellfish:'schelpdieren',crustacean:'schaaldieren',delicateFish:'delicate witte vis',firmFish:'stevige witte vis',fatFish:'vette vis',tuna:'tonijn',chicken:'kip/gevogelte',duck:'eend',pork:'varken',bacon:'spek/charcuterie',veal:'kalf',beef:'rund',lamb:'lam',game:'wild',mushroom:'paddenstoelen',pizza:'pizza',pasta:'pasta',risotto:'risotto',sushi:'sushi',kebab:'kebab',curry:'curry',noodles:'noedels',tacos:'tacos',stew:'stoofpot',raw:'rauw',steamed:'gestoomd',fried:'gebakken',grilled:'gegrild/BBQ',friedDeep:'gefrituurd',smoked:'gerookt',stewed:'gestoofd',tomato:'tomaat',cream:'room',butter:'boter',mayo:'mayonaise',citrus:'citrus',soy:'soja/miso',coconut:'kokos',mustard:'mosterd',pepper:'peper',garlic:'knoflook',sweet:'zoet',herb:'kruiden',spicy:'pikant',verySpicy:'zeer pikant',umami:'umami',salty:'zilt',acidic:'zuur',smoky:'rokerig'};return uniq([...r.cuisine,...r.ingredient,...r.dish,...r.prep,...r.sauce,...r.flavor].map(x=>n[x]||x));}
function recommendV04(){const input=document.querySelector('#dish'),out=document.querySelector('#results'),analysis=document.querySelector('#analysis');const txt=(input?.value||'').trim();if(!txt){out.innerHTML='<div class="card warn">Typ eerst een gerecht.</div>';return;}const r=classify(txt),occ=document.querySelector('#occasion')?.value||'Gewone avond';const labs=labels(r);analysis.innerHTML='<p class="muted"><strong>Herkend:</strong> '+(labs.join(' · ')||'algemeen gerecht')+'<br>Intensiteit '+r.intensity+'/5 · vet '+r.fat+'/5 · pikant '+r.heat+'/5 · zuur '+r.acid+'/5</p>';
 const ranked=[],rejected=[];(window.wines||wines).filter(w=>w.q>0).forEach(w=>{const z=scoreWine(w,r);if(!z.ok){rejected.push([w,z.why]);return;}let total=z.score;if(cur>=w.f&&cur<=w.t)total+=8;if(w.t<=2028)total+=4;if(occ==='Gewone avond'&&w.sp)total-=8;if(occ==='Speciale gelegenheid'&&w.sp)total+=10;ranked.push({w,z,total:Math.min(99,Math.round(total))});});ranked.sort((a,b)=>b.total-a.total);
 const top=ranked.slice(0,3);out.innerHTML='<h2>Beste keuzes</h2>'+top.map((x,i)=>`<div class="card"><strong>${i===0?'Beste match: ':''}${x.w.p} · ${x.w.n} ${x.w.y}</strong><div class="muted">${x.w.c} · ${x.w.g}</div><span class="pill ok">match ${x.total}/100</span><span class="pill">drinken ${x.w.f}–${x.w.t}</span><p class="muted">${x.z.why}. ${x.w.sp&&occ==='Gewone avond'?'Dit is een bijzondere fles; bewaar hem eventueel voor een beter moment.':'De score houdt rekening met gerecht, bereiding, saus, drinkvenster en gelegenheid.'}</p></div>`).join('')+(top.length? '':'<div class="card warn">Geen veilige match gevonden. Verruim de omschrijving of kies een andere stijl.</div>');}
window.classifyDishV04=classify;window.recommendV04=recommendV04;const btn=document.querySelector('#recommend');if(btn)btn.onclick=recommendV04;
})();
