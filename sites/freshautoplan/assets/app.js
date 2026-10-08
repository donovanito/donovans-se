(function(){
"use strict";
var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var store={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

/* Mobile nav */
var hdr=$(".hdr"),burger=$(".burger");
if(burger){burger.addEventListener("click",function(){var o=hdr.classList.toggle("open");burger.setAttribute("aria-expanded",o)})}

/* Notice */
var nb=$("[data-dismiss]");
if(nb){var nbox=nb.closest(".notice");if(store.get("fa-notice")==="1"){nbox.hidden=true}
nb.addEventListener("click",function(){nbox.hidden=true;store.set("fa-notice","1")})}

/* Checklist folds: open on desktop, closed on phones */
$$("details.fold").forEach(function(d){d.open=window.matchMedia("(min-width:901px)").matches});

/* Stockholm time helpers */
function sthlm(){
  var p={};new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Stockholm",weekday:"short",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});
  var wd={Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6,Sun:0}[p.weekday];
  return {wd:wd,h:(+p.hour)%24,m:+p.minute,d:+p.day,mo:+p.month,y:+p.year};
}
function openStatus(){
  var t=sthlm(),wk=t.wd>=1&&t.wd<=5,open=wk&&t.h>=9&&t.h<15,txt;
  if(open){txt="Support öppen till 15.00"}
  else{var next=(wk&&t.h<9)?"idag 09.00":(t.wd===5&&t.h>=15)||t.wd===6?"måndag 09.00":t.wd===0?"imorgon 09.00":"imorgon 09.00";txt="Support stängd - öppnar "+next}
  $$("[data-open-status]").forEach(function(el){el.innerHTML='<span class="dot'+(open?" on":"")+'"></span>'+txt});
}
openStatus();

/* Körjournal countdown */
var MN=["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"];
function korjournal(){
  var els=$$("[data-korjournal]");if(!els.length)return;
  var t=sthlm(),mo=t.mo,y=t.y;
  if(t.d>4){mo+=1;if(mo>12){mo=1;y+=1}}
  var today=Date.UTC(t.y,t.mo-1,t.d),dl=Date.UTC(y,mo-1,4),days=Math.round((dl-today)/864e5);
  var prev=mo-2<0?11:mo-2;
  var msg=(days===0?"<b>Idag</b> är sista dagen":"<b>"+days+" dagar kvar</b>")+" att rapportera "+MN[prev]+" (senast 4 "+MN[mo-1]+")";
  els.forEach(function(el){el.innerHTML=msg});
}
korjournal();

/* Tabs */
$$("[role=tablist]").forEach(function(list){
  var tabs=$$("[role=tab]",list);
  function sel(t){tabs.forEach(function(x){var on=x===t;x.setAttribute("aria-selected",on);var p=document.getElementById(x.getAttribute("aria-controls"));if(p)p.hidden=!on})}
  tabs.forEach(function(t,i){t.addEventListener("click",function(){sel(t)});
    t.addEventListener("keydown",function(e){var n=e.key==="ArrowRight"?i+1:e.key==="ArrowLeft"?i-1:null;if(n===null)return;n=(n+tabs.length)%tabs.length;tabs[n].focus();sel(tabs[n])})});
});

/* Knowledge search */
var FAQ=window.FAQ||[];
function score(f,terms){
  var q=f.q.toLowerCase(),a=f.a.replace(/<[^>]+>/g," ").toLowerCase(),c=f.cat.toLowerCase(),s=0;
  for(var i=0;i<terms.length;i++){var t=terms[i],hit=0;
    if(q.indexOf(t)>-1){s+=5;hit=1}if(c.indexOf(t)>-1){s+=2;hit=1}if(a.indexOf(t)>-1){s+=1;hit=1}
    if(!hit)return 0}
  return s;
}
function search(query){
  var terms=query.toLowerCase().split(/\s+/).filter(function(x){return x.length>1});
  if(!terms.length)return [];
  return FAQ.map(function(f){return {f:f,s:score(f,terms)}}).filter(function(x){return x.s>0}).sort(function(a,b){return b.s-a.s}).map(function(x){return x.f});
}
var hs=$("#heroSearch");
if(hs){
  var box=$("#suggest"),idx=-1;
  function render(){
    var v=hs.value.trim();if(v.length<2){box.classList.remove("show");box.innerHTML="";return}
    var r=search(v).slice(0,5);
    box.innerHTML=r.length?r.map(function(f){return '<a href="hjalp.html?q='+encodeURIComponent(v)+'#'+f.id+'">'+esc(f.q)+'<small>'+esc(f.cat)+'</small></a>'}).join("")+'<a href="hjalp.html?q='+encodeURIComponent(v)+'"><b>Visa alla träffar</b></a>':'<a href="hjalp.html#kontakt"><b>Inga träffar</b> - skapa ett ärende eller kontakta oss<small>Vi lär oss av sökningar utan svar</small></a>';
    box.classList.add("show");idx=-1;
  }
  hs.addEventListener("input",render);
  hs.addEventListener("keydown",function(e){var items=$$("a",box);
    if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();if(!items.length)return;idx=(idx+(e.key==="ArrowDown"?1:-1)+items.length)%items.length;items.forEach(function(a,i){a.classList.toggle("act",i===idx)})}
    if(e.key==="Enter"){e.preventDefault();if(idx>-1&&items[idx])location.href=items[idx].href;else if(hs.value.trim())location.href="hjalp.html?q="+encodeURIComponent(hs.value.trim())}
    if(e.key==="Escape"){box.classList.remove("show")}});
  document.addEventListener("click",function(e){if(!e.target.closest(".search"))box.classList.remove("show")});
  $$("[data-q]").forEach(function(c){c.addEventListener("click",function(e){e.preventDefault();location.href="hjalp.html?q="+encodeURIComponent(c.getAttribute("data-q"))})});
}

/* Help page */
var list=$("#faqList");
if(list){
  var cats=[];FAQ.forEach(function(f){if(cats.indexOf(f.cat)<0)cats.push(f.cat)});
  var expanded=false,cur="Alla",input=$("#faqSearch"),count=$("#faqCount"),facets=$("#facets");
  facets.innerHTML=["Alla"].concat(cats).map(function(c){return '<button type="button" class="chip'+(c==="Alla"?" on":"")+'" data-c="'+esc(c)+'">'+esc(c)+'</button>'}).join("");
  facets.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;cur=b.getAttribute("data-c");$$("button",facets).forEach(function(x){x.classList.toggle("on",x===b)});draw()});
  function hl(txt,terms){var out=esc(txt);terms.forEach(function(t){out=out.replace(new RegExp("("+t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","ig"),"<mark>$1</mark>")});return out}
  function draw(){
    var v=input.value.trim(),terms=v.toLowerCase().split(/\s+/).filter(function(x){return x.length>1});
    var res=terms.length?search(v):FAQ.slice();
    if(cur!=="Alla")res=res.filter(function(f){return f.cat===cur});
    count.textContent=res.length+(res.length===1?" svar":" svar")+(v?' för "'+v+'"':"");
    var total=res.length,limit=!v&&cur==="Alla"&&!expanded&&window.matchMedia("(max-width:900px)").matches?8:0;
    if(limit&&res.length>limit)res=res.slice(0,limit);else limit=0;
    list.innerHTML=res.length?res.map(function(f){return '<details class="q" id="'+f.id+'"><summary><span class="cat">'+esc(f.cat)+'</span>'+hl(f.q,terms)+'</summary><div class="a">'+f.a+'<div class="fb">Hjälpte svaret? <button type="button" data-fb="1">Ja</button><button type="button" data-fb="0">Nej</button></div></div></details>'}).join(""):'<div class="card"><h3>Hittade inget svar</h3><p>Prova ett annat sökord, eller <a href="#kontakt">kontakta oss</a>. Beskriv gärna med registreringsnummer till hands.</p></div>';
    if(limit){var mb=document.createElement("button");mb.type="button";mb.className="btn btn-ghost more";mb.textContent="Visa alla "+total+" svar";mb.addEventListener("click",function(){expanded=true;draw()});list.appendChild(mb)}
    if(res.length===1)list.querySelector("details").open=true;
  }
  input.addEventListener("input",draw);
  list.addEventListener("click",function(e){var b=e.target.closest("[data-fb]");if(!b)return;b.parentNode.innerHTML=b.getAttribute("data-fb")==="1"?"Tack! Bra att det hjälpte.":'Tack. <a href="#kontakt">Skapa ett ärende</a> så hjälper vi dig vidare.'});
  var qp=new URLSearchParams(location.search).get("q");if(qp)input.value=qp;
  draw();
  if(location.hash){var t=document.getElementById(location.hash.slice(1));if(t&&t.tagName==="DETAILS"){t.open=true;setTimeout(function(){t.scrollIntoView({block:"center"})},50)}}
}

/* Triage */
var tri=$("#triage");
if(tri){
  var T=[
   {l:"Skada eller olycka",t:"Skada eller olycka",s:["Ring <b>112</b> om någon är skadad.","Behöver bilen bärgas? Ring bilmärkets mobilitetsgaranti, annars <b>020-45 00 00</b> (vardagar 09-16).","Anmäl skadan direkt: <a href='mailto:insurance@autoplan.se'>insurance@autoplan.se</a> eller 0771-22 00 00 (knappval Försäkringsservice).","Glasskada? Boka Carglass eller Ryds Bilglas - du får digital skadeanmälan."],k:"skada"},
   {l:"Bilen har stannat",t:"Driftstopp",s:["Kolla bilens handlingar: finns mobilitetsgaranti, ring bilmärkets vägassistans först.","Saknas garanti: ring <b>0771-22 00 00</b>, knappval Assistans.","Kostnaden faktureras via AutoPlan till kunden."],k:"assistans"},
   {l:"Kort borttappat eller stulet",t:"Spärra kortet nu",s:["Ring <b>0771-22 00 00</b> och spärra kortet omedelbart.","Utanför öppettid kopplas du till Swedbanks Kundcenter.","Beställ nytt kort som ärende i kundportalen."],k:"kort"},
   {l:"Faktura, kostnad eller löneavdrag",t:"Kostnader och avdrag",s:["Din <b>Förarredovisning</b> kommer i början av varje månad och visar alla kostnader per datum.","Trängselskatt kommer med ca två månaders fördröjning.","Oklar post? Skapa ett ärende i kundportalen och ange registreringsnummer."],k:"förarredovisning"},
   {l:"Parkeringsbot",t:"Parkeringsbot",s:["Betala alltid inom föreskriven tid, annars tillkommer förseningsavgift + 250 kr admin.","Vill du bestrida en parkeringsanmärkning behövs fullmakt - beställ i kundportalen.","Kontrollavgift bestrids hos parkeringsbolaget."],k:"parkeringsbot"},
   {l:"Inloggning eller BankID",t:"Inloggning",s:["Sedan 27 maj 2026 loggar alla in med <b>Mobilt BankID</b> på autoplan.se.","Gamla appen och gamla hemsidan är nedstängda.","Fungerar det ändå inte: ring förarsupport 0771-22 00 00."],k:"bankid"},
   {l:"Något annat",t:"Något annat",s:["Skapa ett ärende i kundportalen - då kan du följa hela processen.","Vill du prata: 0771-22 00 00 (vardagar 09-15). Ha registreringsnumret till hands.","Frågor om bilpolicy eller vagnparksstrategi: kontakta er Account Manager."],k:""}
  ];
  function home(){tri.innerHTML='<h3>Vad gäller det?</h3>'+T.map(function(o,i){return '<button type="button" class="opt" data-i="'+i+'">'+esc(o.l)+'</button>'}).join("")}
  tri.addEventListener("click",function(e){
    var b=e.target.closest("[data-i]");
    if(b){var o=T[+b.getAttribute("data-i")];tri.innerHTML='<div class="res"><h4>'+esc(o.t)+'</h4><ol>'+o.s.map(function(x){return "<li>"+x+"</li>"}).join("")+'</ol><p><a class="btn btn-primary btn-sm" href="https://autoplan.powerappsportals.com/" rel="noopener">Skapa ärende i portalen</a></p></div><p><button type="button" class="btn btn-ghost btn-sm" data-back="1">Tillbaka</button> '+(o.k?'<a class="small" href="hjalp.html?q='+encodeURIComponent(o.k)+'">Visa relaterade svar</a>':"")+'</p>';return}
    if(e.target.closest("[data-back]"))home();
  });
  home();
}

/* Checklists */
$$("[data-checklist]").forEach(function(box){
  var key="fa-cl-"+box.getAttribute("data-checklist"),boxes=$$("input[type=checkbox]",box),bar=$(".progress i",box.parentNode)||$(".progress i"),lab=$("[data-cl-label]",box.parentNode);
  var saved={};try{saved=JSON.parse(store.get(key)||"{}")}catch(e){}
  boxes.forEach(function(c,i){c.checked=!!saved[i];c.addEventListener("change",function(){var o={};boxes.forEach(function(x,j){if(x.checked)o[j]=1});store.set(key,JSON.stringify(o));upd()})});
  function upd(){var n=boxes.filter(function(x){return x.checked}).length;if(bar)bar.style.width=(n/boxes.length*100)+"%";if(lab)lab.textContent=n+" av "+boxes.length+" klara"+(n===boxes.length?" - redo att lämna tillbaka":"")}
  upd();
});

/* Tables: stack as cards on small screens */
$$("table.t").forEach(function(t){
  var heads=$$("thead th",t).map(function(h){return h.textContent.trim()});
  if(!heads.length)return;t.classList.add("stack");
  $$("tbody tr",t).forEach(function(tr){$$("td",tr).forEach(function(td,i){td.setAttribute("data-label",heads[i]||"")})});
});

/* Copy */
$$("[data-copy]").forEach(function(b){b.addEventListener("click",function(){
  var txt=b.getAttribute("data-copy"),old=b.textContent;
  function done(){b.textContent="Kopierat";setTimeout(function(){b.textContent=old},1400)}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done,done)}else{var ta=document.createElement("textarea");ta.value=txt;document.body.appendChild(ta);ta.select();try{document.execCommand("copy")}catch(e){}ta.remove();done()}
})});

/* Prototype forms */
$$("[data-proto-form]").forEach(function(f){f.addEventListener("submit",function(e){
  e.preventDefault();if(!f.checkValidity()){f.reportValidity();return}
  var s=$(".success",f.parentNode);if(s){s.classList.add("show");f.hidden=true;s.scrollIntoView({block:"center",behavior:"smooth"})}
})});

/* Fleet size qualifier */
var rg=$("#fleetRange");
if(rg){
  var out=$("#fleetOut"),res=$("#fleetRes");
  function q(){var n=+rg.value;out.textContent=n>=200?"200+":n;
    if(n>=10){res.className="result good";res.innerHTML="<b>Bra match.</b> Er vagnpark ligger inom vår helhetslösning. Lämna uppgifter nedan så bokar vi ett behovssamtal."}
    else{res.className="result info";res.innerHTML="<b>Under 10 fordon.</b> Vår helhetslösning riktar sig till vagnparker över 10 fordon. Lämna uppgifter ändå så återkommer vi med besked."}}
  rg.addEventListener("input",q);q();
}

/* Filters (partners) */
$$("[data-filter]").forEach(function(g){
  var items=$$("[data-cat]");
  g.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var c=b.getAttribute("data-f");$$("button",g).forEach(function(x){x.classList.toggle("on",x===b)});items.forEach(function(i){i.hidden=!(c==="Alla"||i.getAttribute("data-cat")===c)})});
});
})();
