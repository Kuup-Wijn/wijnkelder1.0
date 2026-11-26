/* Stef's Wijnkelder - extra dishes patch v0.4.3. Load last. */
(function(){'use strict';
const n=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s-]/g,' ').replace(/\s+/g,' ').trim();
const rules=[
/* BBQ / grill */
[['bbq','barbecue','barbeque'],' gegrild bbq rokerig'],
[['bbq ribs','sparerribs','spareribs','ribbetjes'],' varkensvlees gegrild bbq rokerig vet zoet'],
[['pulled pork'],' varkensvlees bbq rokerig vet zoet'],
[['bbq kip','kip bbq','gegrilde kip'],' kip gevogelte gegrild bbq rokerig'],
[['bbq worst','worst bbq'],' varkensvlees worst gegrild bbq vet'],
[['mixed grill'],' rund lam varkensvlees gegrild bbq krachtig'],
[['brochette','brochettes','spies','spiesjes'],' gegrild bbq'],
/* Oven dishes */
[['ovenschotel','oven schotel'],' geroosterd oven romig'],
[['aardappelgratin','gratin dauphinois'],' aardappel room kaas romig oven'],
[['lasagne'],' pasta tomatensaus kaas romig oven'],
[['moussaka'],' lam rund aubergine tomaat romig oven'],
[['hachis parmentier','shepherds pie'],' rund aardappel puree oven'],
[['gegratineerd','gratin'],' kaas romig oven'],
/* India */
[['indisch','indiaas','indian'],' indiaas aromatisch kruidig'],
[['tikka masala','chicken tikka'],' indiaas kip curry tomaat romig kruidig'],
[['butter chicken'],' indiaas kip curry boter room romig kruidig'],
[['korma'],' indiaas curry romig mild kruidig'],
[['vindaloo'],' indiaas curry zeer pikant zuur kruidig'],
[['madras'],' indiaas curry pikant kruidig'],
[['dal','dahl'],' indiaas linzen kruidig'],
[['biryani'],' indiaas rijst kruidig aromatisch'],
[['samosa','samosas'],' indiaas gefrituurd kruidig'],
[['naan'],' indiaas brood'],
/* Belgian/Dutch frituur */
[['frituursnack','frituursnacks'],' gefrituurd zout vet'],
[['frikandel','curryworst'],' varkensvlees gefrituurd zout vet'],
[['bitterbal','bitterballen','kroket','vleeskroket'],' rund varkensvlees gefrituurd romig zout vet'],
[['mexicano'],' varkensvlees rund gefrituurd pikant zout vet'],
[['boulet','boulette'],' varkensvlees rund gefrituurd zout vet'],
[['kipcorn'],' kip gevogelte gefrituurd zout vet'],
[['nuggets','kipnuggets','chicken nuggets'],' kip gevogelte gefrituurd zout vet'],
[['loempia','loempias'],' groenten varkensvlees gefrituurd aziatisch'],
[['viandel'],' varkensvlees gefrituurd zout vet'],
[['sitostick','sito stick'],' kip varkensvlees ui gefrituurd zout'],
[['fishstick','fishsticks','visstick','vissticks'],' witte vis gefrituurd zout vet'],
[['kaassouffle','kaassoufflé'],' kaas gefrituurd romig zout vet'],
[['bamischijf','nasischijf'],' aziatisch noedels gefrituurd kruidig'],
[['friet speciaal','frieten speciaal'],' frieten gefrituurd mayonaise ui saus vet zout']
];
function has(x,p){p=n(p);return new RegExp('(^|\\s)'+p.split(' ').join('\\s+')+'(?=\\s|$)').test(x)}
function enrich(txt){const x=n(txt);let a=[];for(const [names,extra] of rules)if(names.some(v=>has(x,v)))a.push(extra);return txt+a.join('')}
function install(){const b=document.getElementById('recommend'),i=document.getElementById('dish');if(!b||!i||b.dataset.extraPatch)return;const old=b.onclick;b.dataset.extraPatch='1';b.onclick=function(e){const raw=i.value;i.value=enrich(raw);try{if(typeof old==='function')old.call(b,e);else if(typeof window.recommendV04==='function')window.recommendV04()}finally{i.value=raw}}}
window.enrichExtraV043=enrich;if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();})();
