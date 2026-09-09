/* Keimenon Platform Adapter — local-first.
   Future server version: preserve this public API and replace localStorage calls with authenticated HTTP requests. */
(function(){
  "use strict";
  const KEYS={profiles:"keimenon_profiles_v1",current:"keimenon_current_profile",activity:"keimenon_activity_v1",analyses:"keimenon_analysis_library_v1"};
  const read=(k,fallback)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):fallback}catch(e){return fallback}};
  const write=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}};
  const uid=()=>globalThis.crypto?.randomUUID?.()||("p_"+Date.now().toString(36)+Math.random().toString(36).slice(2));
  const lang=()=>localStorage.getItem("keimenon_ui_lang")||"pt";
  const WORDS={
    en:{"Administrador local":"Local administrator","leitor":"reader","atividades":"activities","análises":"analyses","sem atividade":"no activity","Quando":"When","Perfil":"Profile","Atividade":"Activity","Detalhes":"Details","Entrada no perfil local":"Local profile login","Perfil local criado":"Local profile created","Passagem pesquisada":"Passage searched","Leitura comparativa aberta":"Comparative reading opened","Chamada à IA":"AI call","Comentário salvo":"Comment saved"},
    it:{"Administrador local":"Amministratore locale","leitor":"lettore","atividades":"attività","análises":"analisi","sem atividade":"nessuna attività","Quando":"Quando","Perfil":"Profilo","Atividade":"Attività","Detalhes":"Dettagli","Entrada no perfil local":"Accesso al profilo locale","Perfil local criado":"Profilo locale creato","Passagem pesquisada":"Passo cercato","Leitura comparativa aberta":"Lettura comparata aperta","Chamada à IA":"Chiamata all’IA","Comentário salvo":"Commento salvato"}
  };
  const T=s=>WORDS[lang()]?.[s]||s;
  const displayName=p=>p.name==="Administrador local"?T(p.name):p.name;
  const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

  function ensureProfiles(){
    let ps=read(KEYS.profiles,[]);
    if(!ps.length){
      const old=(localStorage.getItem("keimenon_user")||"").trim();
      ps=[{id:uid(),name:old||(lang()==="it"?"Amministratore locale":lang()==="en"?"Local administrator":"Administrador local"),role:"admin",createdAt:new Date().toISOString()}];
      write(KEYS.profiles,ps);
    }
    if(!localStorage.getItem(KEYS.current)||!ps.some(p=>p.id===localStorage.getItem(KEYS.current))) localStorage.setItem(KEYS.current,ps[0].id);
    return ps;
  }
  function current(){const ps=ensureProfiles();return ps.find(p=>p.id===localStorage.getItem(KEYS.current))||ps[0]}
  function track(type,detail={}){
    const p=current(), rows=read(KEYS.activity,[]), now=new Date(), last=rows[rows.length-1];
    const duplicate=last&&last.profileId===p.id&&last.type===type&&JSON.stringify(last.detail||{})===JSON.stringify(detail)&&now-new Date(last.at)<60000;
    if(duplicate) last.at=now.toISOString();
    else rows.push({id:uid(),at:now.toISOString(),profileId:p.id,profileName:p.name,type,detail});
    write(KEYS.activity,rows.slice(-10000));
    if(document.getElementById("adminActivity")) renderAdmin();
  }
  function archiveAnalysis(entry){
    const p=current(), rows=read(KEYS.analyses,[]);
    const key=[entry.ref||"?",entry.side||"",entry.target||"",entry.model||""].join("|");
    const old=rows.findIndex(x=>x.key===key);
    const item={...entry,key,id:old>=0?rows[old].id:uid(),profileId:p.id,profileName:p.name,updatedAt:new Date().toISOString()};
    if(old>=0) rows[old]=item; else rows.push(item);
    write(KEYS.analyses,rows.slice(-5000));
  }
  function renameCurrent(name){
    name=String(name||"").trim(); if(!name)return;
    const ps=ensureProfiles(), id=current().id, p=ps.find(x=>x.id===id); if(!p)return;
    p.name=name; write(KEYS.profiles,ps); renderProfiles();
  }
  function profileName(id){return ensureProfiles().find(p=>p.id===id)?.name||"perfil removido"}
  function detailText(x){
    const d=x.detail||{};
    return [d.ref,d.target,d.model,d.note].filter(Boolean).join(" · ")||"—";
  }
  function renderAdmin(){
    const box=document.getElementById("adminArea"), out=document.getElementById("adminActivity"); if(!box||!out)return;
    const me=current(); box.style.display=me.role==="admin"?"block":"none"; if(me.role!=="admin")return;
    const acts=read(KEYS.activity,[]), analyses=read(KEYS.analyses,[]), ps=ensureProfiles();
    const by={}; ps.forEach(p=>by[p.id]={p,events:0,analyses:0,last:null});
    acts.forEach(a=>{const b=by[a.profileId];if(b){b.events++;if(!b.last||a.at>b.last)b.last=a.at}});
    analyses.forEach(a=>{if(by[a.profileId])by[a.profileId].analyses++});
    out.innerHTML='<div class="cost-summary">'+Object.values(by).map(x=>'<div class="cost-kpi"><b>'+esc(displayName(x.p))+'</b>'+x.events+' '+T("atividades")+' · '+x.analyses+' '+T("análises")+'<br><span class="small">'+(x.last?new Date(x.last).toLocaleString():T("sem atividade"))+'</span></div>').join("")+'</div>'+ 
      '<div style="overflow-x:auto"><table class="cost-table"><thead><tr><th>'+T("Quando")+'</th><th>'+T("Perfil")+'</th><th>'+T("Atividade")+'</th><th>'+T("Detalhes")+'</th></tr></thead><tbody>'+acts.slice(-200).reverse().map(a=>'<tr><td>'+new Date(a.at).toLocaleString()+'</td><td>'+esc(a.profileName==="Administrador local"?T(a.profileName):(a.profileName||profileName(a.profileId)))+'</td><td>'+esc(T(a.type))+'</td><td>'+esc(detailText(a))+'</td></tr>').join("")+'</tbody></table></div>';
  }
  function renderProfiles(){
    const sel=document.getElementById("profileSelect"), badge=document.getElementById("profileBadge"); if(!sel)return;
    const ps=ensureProfiles(), me=current();
    sel.innerHTML=ps.map(p=>'<option value="'+esc(p.id)+'" '+(p.id===me.id?'selected':'')+'>'+esc(p.name)+' — '+(p.role==='admin'?'admin':'leitor')+'</option>').join("");
    if(badge) badge.textContent=me.name;
    renderAdmin();
  }
  function mount(){
    ensureProfiles(); renderProfiles();
    const sel=document.getElementById("profileSelect"), add=document.getElementById("profileAdd");
    if(sel)sel.onchange=()=>{localStorage.setItem(KEYS.current,sel.value);track("Entrada no perfil local");location.reload()};
    if(add)add.onclick=()=>{
      const name=prompt("Nome do novo perfil local:")?.trim();if(!name)return;
      const ps=ensureProfiles();if(ps.some(p=>p.name.toLowerCase()===name.toLowerCase()))return alert("Já existe um perfil com esse nome.");
      const p={id:uid(),name,role:"reader",createdAt:new Date().toISOString()};ps.push(p);write(KEYS.profiles,ps);localStorage.setItem(KEYS.current,p.id);track("Perfil local criado");location.reload();
    };
    const exportBtn=document.getElementById("adminExport");
    if(exportBtn)exportBtn.onclick=()=>{
      const payload={exportedAt:new Date().toISOString(),profiles:ensureProfiles(),activity:read(KEYS.activity,[]),analyses:read(KEYS.analyses,[])};
      const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}));a.download="keimenon-admin-backup.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
    };
  }
  window.KeimenonPlatform={mode:"local",mount,current,renameCurrent,profiles:ensureProfiles,track,archiveAnalysis,activities:()=>read(KEYS.activity,[]),analyses:()=>read(KEYS.analyses,[]),renderAdmin};
})();
