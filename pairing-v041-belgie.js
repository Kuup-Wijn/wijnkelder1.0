/* Stef's Wijnkelder - Belgian food vocabulary patch v0.4.1
   Load AFTER pairing-v04.js */
(function(){
'use strict';
const norm=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s-]/g,' ').replace(/\s+/g,' ').trim();
const phrase=(text,p)=>new RegExp('(^|\\s)'+p.split(' ').join('\\s+')+'(?=\\s|$)').test(text);
const RULES=[
 [['frieten','friet','frites','friets'], ' gefrituurd aardappel zout'],
 [['stoofvlees','vlaamse stoverij','carbonade flamande','stoverij'], ' stoofpot rund gestoofd donker bier'],
 [['puree','aardappelpuree'], ' aardappel boter romig'],
 [['worst','braadworst','chipolata','saucisse'], ' varkensvlees gegrild'],
 [['bloedworst','zwarte pens'], ' varkensvlees worst kruidig krachtig'],
 [['witte pens'], ' varkensvlees worst zacht'],
 [['spek','spekjes'], ' bacon charcuterie varkensvlees zout vet'],
 [['witloof','witlof'], ' groenten bitter'],
 [['witloof met ham','gegratineerd witloof'], ' witloof ham kaas room romig'],
 [['vol-au-vent','vol au vent','videe'], ' kip gevogelte room romig paddenstoel'],
 [['waterzooi'], ' kip gevogelte room romig groenten'],
 [['gentse waterzooi'], ' kip gevogelte room romig groenten'],
 [['garnaalkroket','garnaalkroketten'], ' garnalen gefrituurd romig zout'],
 [['kaaskroket','kaaskroketten'], ' kaas gefrituurd romig zout'],
 [['mosselen','mossel'], ' schelpdieren zout'],
 [['mosselen friet','moules frites'], ' mosselen schelpdieren gefrituurd aardappel zout'],
 [['balletjes in tomatensaus','bouletten tomatensaus'], ' varkensvlees rund tomatensaus'],
 [['luikse balletjes','boulets liegeois','boulets liegeois'], ' rund varkensvlees zoet ui'],
 [['gehaktbal','gehaktballen','boulet','bouletten'], ' rund varkensvlees'],
 [['konijn met pruimen','konijn pruimen'], ' wild gestoofd zoet'],
 [['konijn','lapin'], ' wild gestoofd'],
 [['steak friet','steak frites'], ' rund steak gefrituurd aardappel'],
 [['americain prepare','filet americain'], ' rund tartaar rauw'],
 [['tomaat garnaal','tomate crevette'], ' garnalen tomaat mayonaise romig'],
 [['grijze garnalen','noordzeegarnalen'], ' garnalen schelpdieren zout'],
 [['paling in het groen','paling groen'], ' vette vis kruiden zuur'],
 [['paling'], ' vette vis'],
 [['croque monsieur','croque-monsieur'], ' ham kaas geroosterd'],
 [['hespenrolletjes'], ' ham kaas room romig'],
 [['asperges op vlaamse wijze','asperges vlaamse wijze'], ' asperges ei boter'],
 [['spruitjes'], ' groenten bitter'],
 [['prei'], ' groenten'],
 [['stoemp'], ' aardappel puree boter groenten'],
 [['gratin dauphinois','aardappelgratin'], ' aardappel room kaas romig'],
 [['frikandel'], ' varkensvlees gefrituurd zout'],
 [['mitraillette'], ' rund varkensvlees frieten gefrituurd saus'],
 [['pita'], ' kebab gegrild vlees knoflooksaus'],
 [['martino'], ' rund tartaar rauw pikant'],
 [['speculoos','speculaas'], ' dessert zoet kruidig'],
 [['rijstpap'], ' dessert zoet romig'],
 [['wafel','brusselse wafel','luikse wafel'], ' dessert zoet'],
 [['chocolademousse'], ' dessert zoet chocolade romig']
];
function enrich(txt){const x=norm(txt);let add=[];for(const [names,extra] of RULES){if(names.some(n=>phrase(x,norm(n))))add.push(extra)}return txt+add.join('');}
function install(){const btn=document.getElementById('recommend'),input=document.getElementById('dish');if(!btn||!input||btn.dataset.bePatch)return;const original=btn.onclick;btn.dataset.bePatch='1';btn.onclick=function(ev){const raw=input.value;input.value=enrich(raw);try{if(typeof original==='function')original.call(btn,ev);else if(typeof window.recommendV04==='function')window.recommendV04()}finally{input.value=raw}};}
window.enrichBelgianDishV041=enrich;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
