/* Data-driven, local-first reader. Work data is supplied by window.KEIMENON_WORK.
   No account dashboard; each work has separate notes, passages, cache and PDF DB.
   The legacy Thucydides HTML is intentionally not changed by this reader. */
(()=>{
'use strict';
const assetBase=new URL('.',document.currentScript.src),work=window.KEIMENON_WORK;
const $=id=>document.getElementById(id),esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const {translitGreek,visible}=window.KeimenonLanguage;
const I={
pt:{api:'Configurar API',back:'← Voltar à leitura',authorWork:'Autor / texto',book:'Livro',go:'Ir',translation:'Tradução',myPassages:'Minhas Passagens',addTranslation:'Adicionar tradução',import:'Importar texto',books:'Meus livros',comments:'Comentários',previous:'← Página anterior',next:'Próxima página →',selectHelp:'Clique numa palavra ou selecione um trecho para analisar ou comentar.',meaning:'Sentido no original',choice:'A escolha do tradutor',stakes:'O que está em jogo',aiWarning:'Análise gerada por IA — verifique as referências antes de citar.',analyze:'Analisar com IA',alternatives:'Outras traduções / hipóteses da IA',source:'Fonte / referência',wording:'Expressão',effect:'Comentário',yourComment:'Seu comentário',saveComment:'Salvar comentário',passageComments:'Comentários desta passagem',myComments:'Meus comentários',community:'Comentários da comunidade',communityPending:'A comunidade online ainda não está disponível. Seus comentários não são publicados.',sources:'Fontes e limites desta versão',sourcesInfo:'Original de Burnet e tradução principal de Paul Shorey/Loeb, via Perseus. Edições digitais usadas sob a licença declarada CC BY-SA 4.0; isso não é uma declaração de domínio público de qualquer PDF da Loeb. Jowett é alternativa em domínio público via Gutenberg #55201. Notas editoriais e paginação impressa foram removidas. A divisão segue os marcadores Stephanus de cada fonte; diferenças editoriais podem existir. Vegetti não está incluído.',sourceDetails:'Documentação das fontes',savedComments:'Comentários salvos',localNotes:'Comentários privados deste leitor de Platão, salvos somente neste navegador.',exportNotes:'Exportar comentários',importNotes:'Importar comentários',close:'Fechar',apiPrivacy:'A chave fica somente na memória desta aba. Ao clicar numa palavra com a chave configurada, o trecho e seu contexto são enviados ao provedor escolhido, que pode cobrar pela chamada. Sem chave: leitura, comentários e análises já salvas continuam disponíveis.',provider:'Provedor',model:'Modelo',key:'Chave de API',apply:'Aplicar',importHelp:'Cole uma passagem, dê um nome e confirme a referência Stephanus. Sem IA: o original vem do corpus. Para um PDF de Vegetti, use Meus livros.',name:'Nome da passagem',excerpt:'Trecho revisado',saveCompare:'Salvar e comparar',localFooter:'Platão · leitura local · dados separados de Tucídides',original:'Original — grego',transliterated:'Original — grego transliterado',transliterate:'Transliterar',page:'Página',all:'Página inteira',of:'de',columns:'colunas',removeTranslation:'Remover esta tradução',invalidRef:'Referência não encontrada. Use uma página ou letra existente: 327, 327a, 557a.',fallback:'Não há trecho revisado desta edição nesta referência. {edition} foi mantido.',privateEdition:'PDF privado · trecho revisado pelo leitor',personalSource:'Passagem pessoal · privada neste navegador',publicDomain:'Domínio público',noPassages:'Nenhuma passagem importada ainda.',noNotes:'Nenhum comentário salvo nesta passagem.',saved:'Salvo neste navegador.',storageError:'Não foi possível salvar. Confira o espaço e as permissões do navegador.',unsaved:'Descartar as alterações ainda não salvas?',deleteComment:'Excluir comentário',deleteConfirm:'Excluir este comentário deste navegador?',open:'Abrir no texto',about:'Sobre',noKey:'Configure uma chave para criar uma análise. Você já pode escrever seu comentário abaixo.',loading:'Consultando o modelo…',cached:'Análise salva — nenhuma chamada ao modelo.',apiError:'Não foi possível concluir a análise.',hypothesis:'IA · hipótese não atribuída',analysisReady:'Análise concluída e salva localmente.',noStoredAnalysis:'Sem análise associada a este comentário.',noteSearch:'Buscar comentários…',badBackup:'Este arquivo não é um backup válido de comentários da República de Platão.',importedNotes:'Comentários importados.',invalidImport:'Informe um nome, uma referência válida e um trecho não vazio.',bookRef:'Referência Stephanus (ex.: 327, 327a, 557a)',bookInvalid:'Informe uma referência válida da República e um trecho não vazio.',noHints:'Localize a passagem no PDF e confirme a referência Stephanus; não há alinhamento automático de Vegetti.'},
en:{api:'API settings',back:'← Back to reading',authorWork:'Author / text',book:'Book',go:'Go',translation:'Translation',myPassages:'My passages',addTranslation:'Add translation',import:'Import text',books:'My books',comments:'Comments',previous:'← Previous page',next:'Next page →',selectHelp:'Click a word or select an excerpt to analyze or comment.',meaning:'Meaning in the original',choice:'The translator’s choice',stakes:'What is at stake',aiWarning:'AI-generated analysis — verify references before citing.',analyze:'Analyze with AI',alternatives:'Other translations / AI hypotheses',source:'Source / reference',wording:'Wording',effect:'Comment',yourComment:'Your comment',saveComment:'Save comment',passageComments:'Comments on this passage',myComments:'My comments',community:'Community comments',communityPending:'The online community is not available yet. Your comments are not published.',sources:'Sources and limitations',sourcesInfo:'Burnet’s Greek and Paul Shorey’s Loeb translation via Perseus. These digital editions use the repository’s stated CC BY-SA 4.0 license; this is not a blanket public-domain claim about Loeb PDFs. Jowett is a public-domain alternative via Gutenberg #55201. Editorial notes and print pagination omitted. Segmentation follows each source’s Stephanus markers; editorial differences may occur. Vegetti is not included.',sourceDetails:'Source documentation',savedComments:'Saved comments',localNotes:'Private comments for this Plato reader, saved only in this browser.',exportNotes:'Export comments',importNotes:'Import comments',close:'Close',apiPrivacy:'The key stays only in this tab’s memory. Clicking a word with a configured key sends the excerpt and context to your selected provider, which may charge for the call. Without a key: reading, comments and saved analyses remain available.',provider:'Provider',model:'Model',key:'API key',apply:'Apply',importHelp:'Paste a passage, name it and confirm the Stephanus reference. No AI: the original comes from the corpus. For a Vegetti PDF, use My books.',name:'Passage name',excerpt:'Reviewed excerpt',saveCompare:'Save and compare',localFooter:'Plato · local reading · data separate from Thucydides',original:'Original — Greek',transliterated:'Original — transliterated Greek',transliterate:'Transliterate',page:'Page',all:'Whole page',of:'of',columns:'columns',removeTranslation:'Remove this translation',invalidRef:'Reference not found. Use an existing page or section: 327, 327a, 557a.',fallback:'No reviewed excerpt for this edition at this reference. {edition} was retained.',privateEdition:'Private PDF · reader-reviewed excerpt',personalSource:'Personal passage · private in this browser',publicDomain:'Public domain',noPassages:'No imported passages yet.',noNotes:'No comments saved for this passage.',saved:'Saved in this browser.',storageError:'Could not save. Check browser storage and permissions.',unsaved:'Discard unsaved changes?',deleteComment:'Delete comment',deleteConfirm:'Delete this comment from this browser?',open:'Open in text',about:'About',noKey:'Configure a key to create an analysis. You can already write your comment below.',loading:'Contacting the model…',cached:'Saved analysis — no model call.',apiError:'Could not complete the analysis.',hypothesis:'AI · unattributed hypothesis',analysisReady:'Analysis complete and saved locally.',noStoredAnalysis:'No analysis attached to this comment.',noteSearch:'Search comments…',badBackup:'This is not a valid comment backup for Plato’s Republic.',importedNotes:'Comments imported.',invalidImport:'Enter a name, a valid reference and a nonempty excerpt.',bookRef:'Stephanus reference (e.g. 327, 327a, 557a)',bookInvalid:'Enter a valid Republic reference and a nonempty excerpt.',noHints:'Find the passage in the PDF and confirm the Stephanus reference; Vegetti is not automatically aligned.'},
it:{api:'Configura API',back:'← Torna alla lettura',authorWork:'Autore / testo',book:'Libro',go:'Vai',translation:'Traduzione',myPassages:'I miei passi',addTranslation:'Aggiungi traduzione',import:'Importa testo',books:'I miei libri',comments:'Commenti',previous:'← Pagina precedente',next:'Pagina successiva →',selectHelp:'Clicca su una parola o seleziona un estratto per analizzare o commentare.',meaning:'Significato nell’originale',choice:'La scelta del traduttore',stakes:'La posta in gioco',aiWarning:'Analisi generata dall’IA — verifica i riferimenti prima di citare.',analyze:'Analizza con IA',alternatives:'Altre traduzioni / ipotesi dell’IA',source:'Fonte / riferimento',wording:'Espressione',effect:'Commento',yourComment:'Il tuo commento',saveComment:'Salva commento',passageComments:'Commenti su questo passo',myComments:'I miei commenti',community:'Commenti della comunità',communityPending:'La comunità online non è ancora disponibile. I tuoi commenti non vengono pubblicati.',sources:'Fonti e limiti della versione',sourcesInfo:'Originale di Burnet e traduzione principale di Paul Shorey/Loeb, tramite Perseus. Edizioni digitali utilizzate secondo la licenza dichiarata CC BY-SA 4.0, non una dichiarazione di pubblico dominio per qualsiasi PDF Loeb. Jowett è l’alternativa di pubblico dominio tramite Gutenberg #55201. Note editoriali e paginazione a stampa escluse. La divisione segue i marcatori Stephanus delle fonti; possono esserci differenze editoriali. Vegetti non è incluso.',sourceDetails:'Documentazione delle fonti',savedComments:'Commenti salvati',localNotes:'Commenti privati di questo lettore di Platone, salvati solo in questo browser.',exportNotes:'Esporta commenti',importNotes:'Importa commenti',close:'Chiudi',apiPrivacy:'La chiave rimane solo nella memoria di questa scheda. Cliccando una parola con la chiave configurata, l’estratto e il contesto vengono inviati al fornitore scelto, che può addebitare la chiamata. Senza chiave restano disponibili lettura, commenti e analisi già salvate.',provider:'Fornitore',model:'Modello',key:'Chiave API',apply:'Applica',importHelp:'Incolla un passo, assegnagli un nome e conferma il riferimento Stephanus. Senza IA: l’originale proviene dal corpus. Per un PDF di Vegetti, usa I miei libri.',name:'Nome del passo',excerpt:'Estratto rivisto',saveCompare:'Salva e confronta',localFooter:'Platone · lettura locale · dati separati da Tucidide',original:'Originale — greco',transliterated:'Originale — greco traslitterato',transliterate:'Traslittera',page:'Pagina',all:'Pagina intera',of:'di',columns:'colonne',removeTranslation:'Rimuovi questa traduzione',invalidRef:'Riferimento non trovato. Usa una pagina o sezione esistente: 327, 327a, 557a.',fallback:'Nessun estratto rivisto di questa edizione per il riferimento. È stato mantenuto {edition}.',privateEdition:'PDF privato · estratto rivisto dal lettore',personalSource:'Passo personale · privato in questo browser',publicDomain:'Pubblico dominio',noPassages:'Nessun passo importato.',noNotes:'Nessun commento salvato per questo passo.',saved:'Salvato in questo browser.',storageError:'Impossibile salvare. Verifica spazio e permessi del browser.',unsaved:'Scartare le modifiche non salvate?',deleteComment:'Elimina commento',deleteConfirm:'Eliminare questo commento dal browser?',open:'Apri nel testo',about:'Su',noKey:'Configura una chiave per creare un’analisi. Puoi già scrivere il tuo commento qui sotto.',loading:'Consultazione del modello…',cached:'Analisi salvata — nessuna chiamata al modello.',apiError:'Impossibile completare l’analisi.',hypothesis:'IA · ipotesi non attribuita',analysisReady:'Analisi completata e salvata localmente.',noStoredAnalysis:'Nessuna analisi associata a questo commento.',noteSearch:'Cerca commenti…',badBackup:'Il file non è un backup valido dei commenti della Repubblica di Platone.',importedNotes:'Commenti importati.',invalidImport:'Inserisci un nome, un riferimento valido e un estratto non vuoto.',bookRef:'Riferimento Stephanus (es.: 327, 327a, 557a)',bookInvalid:'Inserisci un riferimento valido della Repubblica e un estratto non vuoto.',noHints:'Cerca il passo nel PDF e conferma il riferimento Stephanus; Vegetti non viene allineato automaticamente.'}
};
const prefix='keimenon:'+work.id+':v1:';
function read(k,fallback){try{return JSON.parse(localStorage.getItem(prefix+k))??fallback;}catch(_){return fallback;}}
function write(k,v){try{localStorage.setItem(prefix+k,JSON.stringify(v));return true;}catch(_){return false;}}
const pages=new Map(work.pages.map(p=>[p.ref,p]));
const editions=work.editions||[{id:'jowett',label:'Jowett'}],defaultTranslation=work.defaultTranslation||editions[0].id;
const isPublicEdition=s=>editions.some(e=>e.id===s);
function normalizeRef(raw){const m=String(raw).trim().toLowerCase().match(/^(\d{3})\s*([a-e]?)$/);if(!m)return '';const r=m[1]+m[2];return (m[2]?work.sections[r]:pages.has(r))?r:'';}
let lang=read('language',(navigator.language||'pt').slice(0,2));if(!I[lang])lang='pt';const t=k=>(I[lang][k]||k).replace('{edition}',editions.find(e=>e.id===defaultTranslation)?.label||defaultTranslation);
let ref=normalizeRef(location.hash.slice(1))||normalizeRef(read('lastRef',''))||work.initialRef;
let primary=defaultTranslation,secondary=null,personalId=null,translit=read('translit',true),selection=null,result=null,noteKey='',serial=0,request=null;
const notes=()=>read('notes',{}),passages=()=>read('passages',[]);
const noteID=s=>JSON.stringify([ref,s.side,s.target.normalize('NFC'),s.source]);
const refs=()=>work.sections[ref]?[ref]:pages.get(ref).sections;
const original=()=>refs().map(r=>work.sections[r].greek).join('\n\n');
function editionText(source){
  if(isPublicEdition(source))return refs().map(r=>work.sections[r][source]).join('\n\n');
  if(source==='vegetti')return window.KeimenonBooks.get('vegetti',ref);
  if(source==='personal'){const x=passages().find(x=>x.id===personalId&&x.ref===ref);return x?.text||null;}
  return null;
}
function editionName(source){return source==='personal'?(passages().find(x=>x.id===personalId)?.name||t('myPassages')):source==='vegetti'?'Vegetti':editions.find(e=>e.id===source)?.label||source;}
function dirty(){return selection&&$('userNote').value!==(notes()[noteKey]?.text||'');}
function canLeave(){return !dirty()||confirm(t('unsaved'));}
function cancelAnalysis(){serial++;request?.abort();request=null;$('analyzeBtn').disabled=false;}
function status(k,error=false){$('readerStatus').textContent=k?t(k):'';$('readerStatus').className='status '+(error?'err':'ok');}
function localize(){
  document.documentElement.lang=lang==='pt'?'pt-BR':lang;$('uiLang').value=lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
  $('readerWork').textContent=work.author[lang]+' · '+work.title[lang];
  document.querySelector('.betaflag').textContent='beta · '+work.author[lang];
  $('bookSelect').replaceChildren(...Array.from({length:10},(_,i)=>new Option(t('book')+' '+(i+1),i+1)));
  $('userNote').setAttribute('aria-label',t('yourComment'));$('noteSearch').placeholder=t('noteSearch');
  $('closeAnalysisBtn').title=t('close');$('closeAnalysisBtn').setAttribute('aria-label',t('close'));
  window.KeimenonBooks.translate();renderReader();renderComments();renderNotes();
}
function tokens(target,text,side,section){
  let index=0;
  for(const chunk of text.split(/(\s+)/)){
    if(/^\s+$/.test(chunk)){target.append(document.createTextNode(chunk));continue;}
    if(!chunk)continue;
    const span=document.createElement('span');span.className='w';span.dataset.token=section+':'+index++;span.dataset.raw=chunk;span.dataset.ref=section;span.dataset.side=side;
    span.textContent=side==='orig'&&translit?translitGreek(chunk):chunk;
    span.tabIndex=0;span.setAttribute('role','button');
    span.onclick=()=>{if(!window.getSelection()?.isCollapsed)return;pick(side,[span]);};
    span.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(side,[span]);}};
    if(selection?.side===side&&selection.ids.includes(span.dataset.token))span.classList.add('sel');
    target.append(span);
  }
}
function fillColumn(id,side,source){
  const el=$(id);el.replaceChildren();
  if(side==='orig'||isPublicEdition(source)){
    for(const part of refs()){
      const block=document.createElement('div');block.className='part';block.dataset.ref=part;
      const label=document.createElement('span');label.className='part-ref';label.textContent=part;block.append(label);
      tokens(block,work.sections[part][side==='orig'?'greek':source],side,part);el.append(block);
    }
  }else tokens(el,editionText(source)||'',side,ref);
}
function provenance(source){
  if(isPublicEdition(source)){
    const data=work.sources[source];
    return esc(data.label)+'<br><a href="'+esc(data.url)+'" target="_blank" rel="noopener noreferrer">'+esc(data.license||t('publicDomain'))+' ↗</a>';
  }
  return esc(t(source==='personal'?'personalSource':'privateEdition'));
}
function renderReader(){
  const page=pages.get(ref.slice(0,3)),idx=work.pages.indexOf(page);
  $('refInput').value=ref;$('bookSelect').value=page.book;
  $('passageTitle').textContent=work.author[lang]+' · '+work.title[lang]+' '+ref;
  $('passageMeta').textContent=t('book')+' '+page.book+' · Stephanus '+ref;
  $('sectionNav').innerHTML=[page.ref,...page.sections].map(r=>'<button data-ref="'+r+'" class="'+(r===ref?'on':'')+'">'+esc(r===page.ref?t('all')+' '+r:r)+'</button>').join('');
  $('sectionNav').querySelectorAll('button').forEach(b=>b.onclick=()=>navigate(b.dataset.ref));
  $('originalHead').textContent=t(translit?'transliterated':'original');$('translitBtn').textContent=translit?'Ἑλληνικά':t('transliterate');
  $('origProvenance').innerHTML=esc(work.sources.greek.label)+'<br><a href="'+esc(work.sources.greek.url)+'" target="_blank" rel="noopener noreferrer">Perseus · '+ref+' ↗</a>';
  fillColumn('origRender','orig');fillColumn('transRender','trans',primary);$('transHead').textContent=editionName(primary);$('transProvenance').innerHTML=provenance(primary);
  $('compare').classList.toggle('three',Boolean(secondary));$('trans2Col').hidden=!secondary;
  if(secondary){fillColumn('trans2Render','trans2',secondary);$('trans2Head').textContent=editionName(secondary);$('trans2Provenance').innerHTML=provenance(secondary);}
  for(const s of [...editions.map(e=>e.id),'vegetti'])$('readSrc-'+s).classList.toggle('on',primary===s);
  $('personalBtn').classList.toggle('on',primary==='personal');$('addTransBtn').hidden=Boolean(secondary);
  $('secondPicker').querySelectorAll('button').forEach(b=>b.hidden=b.dataset.source===primary);
  $('columnCount').textContent=(secondary?3:2)+' '+t('of')+' 3 '+t('columns');
  for(const id of ['removePrimaryTrans','removeSecondTrans']){$(id).title=t('removeTranslation');$(id).setAttribute('aria-label',t('removeTranslation'));}
  $('prevPage').disabled=idx===0;$('nextPage').disabled=idx===work.pages.length-1;
  $('pageCount').textContent=t('page')+' '+(idx+1)+' '+t('of')+' '+work.pages.length;
  correspondences();
}
function clearSelection(){cancelAnalysis();selection=null;result=null;noteKey='';$('result').style.display='none';}
function navigate(raw,force=false){
  const next=normalizeRef(raw);if(!next){status('invalidRef',true);$('refInput').value=ref;return false;}
  if(!force&&!canLeave())return false;
  clearSelection();ref=next;let fallback=false;
  if(primary==='personal'&&!editionText(primary)){primary=secondary&&editionText(secondary)?secondary:defaultTranslation;secondary=null;personalId=null;fallback=true;}
  if(primary==='vegetti'&&!editionText(primary)){primary=defaultTranslation;fallback=true;}
  if(secondary===primary||secondary&&!editionText(secondary))secondary=null;
  $('secondPicker').classList.remove('open');write('lastRef',ref);
  if(location.hash!=='#comentarios')history.replaceState(null,'','#'+ref);
  status(fallback?'fallback':'');renderReader();$('myPassageComments').open=false;renderComments();return true;
}
function choose(source,second=false){
  if(!canLeave())return;
  if(source==='vegetti'&&!editionText(source)){window.KeimenonBooks.open('vegetti',second);return;}
  if(second){if(source===primary)return;secondary=source;}
  else{const previous=primary;primary=source;if(secondary===source)secondary=previous;}
  clearSelection();status('');$('secondPicker').classList.remove('open');renderReader();
}
function pick(side,spans){
  if(!spans.length||!canLeave())return;
  const target=spans.map(s=>s.dataset.raw).join(' ').replace(/^[\s.,;:!?·“”‘’«»()]+|[\s.,;:!?·“”‘’«»()]+$/g,'');
  if(!target||target.length>400)return;
  cancelAnalysis();selection={side,target,ids:spans.map(s=>s.dataset.token),source:side==='orig'?'greek':side==='trans'?primary:secondary};
  result=null;noteKey=noteID(selection);showSelection();void analyze();
}
function showSelection(){
  $('result').style.display='block';$('resultTitle').textContent=t('about')+' '+visible(selection.target);$('resultGloss').textContent='';$('analysisContent').hidden=true;$('alternativesBox').hidden=true;
  $('userNote').value=notes()[noteKey]?.text||'';$('noteStatus').textContent='';
  $('analysisStatus').textContent=t('noKey');setDictionary(selection.source==='greek'?selection.target:'');renderReader();
}
function setDictionary(lemma){const valid=/[\u0370-\u03ff\u1f00-\u1fff]/.test(lemma);$('dictionaryLink').hidden=!valid;if(valid)$('dictionaryLink').href='https://en.wiktionary.org/wiki/'+encodeURIComponent(lemma)+'#Ancient_Greek';}
function correspondences(){
  document.querySelectorAll('.w.corr').forEach(e=>e.classList.remove('corr'));
  if(!result)return;
  for(const [id,key] of [['origRender','corr_original'],['transRender','corr_traducao'],['trans2Render','corr_traducao2']]){
    const target=String(result[key]||'').normalize('NFC').toLowerCase();if(!target)continue;
    $(id).querySelectorAll('.w').forEach(s=>{const raw=s.dataset.raw.normalize('NFC').replace(/[.,;:!?·“”‘’()]/g,'').toLowerCase();if(raw&&(target===raw||target.split(/\s+/).includes(raw)))s.classList.add('corr');});
  }
}
function renderAnalysis(data){
  result=data;$('analysisContent').hidden=false;$('alternativesBox').hidden=false;
  $('resultTitle').textContent=t('about')+' '+visible(data.lemma||selection.target);$('resultGloss').textContent=visible(data.gloss||'');
  $('meaning').textContent=visible(data.sentido||'');$('choice').textContent=visible(data.escolha||'');$('stakes').textContent=visible(data.em_jogo||'');
  $('alternatives').innerHTML=[...(Array.isArray(data.alternativas)?data.alternativas:[])].filter(a=>a&&typeof a==='object').sort((a,b)=>Number(!a.fonte)-Number(!b.fonte)).map(a=>'<tr><td class="alternative-source">'+esc(a.fonte?visible(a.fonte)+(a.referencia?' · '+visible(a.referencia):' · '+work.title[lang]+' '+ref):t('hypothesis'))+'</td><td class="alternative-term">'+esc(visible(a.termo))+'</td><td>'+esc(visible(a.efeito))+'</td></tr>').join('');
  setDictionary(data.lema_grego||(selection.source==='greek'?selection.target:''));correspondences();
}
async function analyze(){
  if(!selection)return;cancelAnalysis();const ticket=serial,s={...selection},readingRef=ref;
  const content=[original(),editionText(primary)||'',secondary?editionText(secondary)||'':''];
  const signature=JSON.stringify([work.id,ref,s.side,s.target,primary,secondary,content,lang,$('provider').value,$('model').value.trim()]);
  try{
    const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(signature));
    const cacheKey=Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');if(ticket!==serial)return;
    const cache=read('analyses',{}),saved=cache[cacheKey];
    if(saved){renderAnalysis(saved);$('analysisStatus').textContent=t('cached');return;}
    const key=$('apikey').value.trim();if(!key){$('analysisStatus').textContent=t('noKey');return;}
    $('analysisStatus').textContent=t('loading');$('analyzeBtn').disabled=true;request=new AbortController();
    const system='Analyze word choices in Plato’s Republic. Respond in '+({pt:'Brazilian Portuguese',en:'English',it:'Italian'}[lang])+'. Return ONLY JSON with lemma (transliterated), lema_grego (Greek dictionary lemma, internal lookup only), gloss, sentido, escolha, em_jogo, alternativas [{termo,efeito,fonte,referencia}], corr_original, corr_traducao, corr_traducao2. In visible fields, transliterate all Greek. Correspondence fields must quote the supplied original/translation exactly. Never invent the original or attribute a translation without a verifiable published source. Use fonte:null for AI hypotheses; do not invent page numbers. Citations must identify Republic and the Stephanus reference. Explain uncertainty.';
    const user='Work: Plato, Republic. Stephanus: '+readingRef+'\nTarget ('+s.side+'): '+s.target+'\nGreek: '+content[0]+'\nTranslation ('+editionName(primary)+'): '+content[1]+(secondary?'\nSecond translation ('+editionName(secondary)+'): '+content[2]:'');
    const provider=$('provider').value,model=$('model').value.trim();
    const anth=provider==='anthropic';
    const endpoint=anth?'https://api.anthropic.com/v1/messages':provider==='openrouter'?'https://openrouter.ai/api/v1/chat/completions':'https://api.openai.com/v1/chat/completions';
    const headers=anth?{'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'}:{'content-type':'application/json',authorization:'Bearer '+key};
    const body=anth?{model,max_tokens:1800,system,messages:[{role:'user',content:user}]}:{model,max_tokens:1800,messages:[{role:'system',content:system},{role:'user',content:user}]};
    const response=await fetch(endpoint,{method:'POST',headers,body:JSON.stringify(body),signal:request.signal});const json=await response.json();if(!response.ok)throw Error(json.error?.message||'HTTP '+response.status);
    const raw=anth?json.content.map(x=>x.text||'').join(''):json.choices?.[0]?.message?.content;
    const data=JSON.parse(String(raw).replace(/^\s*```(?:json)?\s*/,'').replace(/\s*```\s*$/,''));
    if(!data||typeof data!=='object'||Array.isArray(data))throw Error('Invalid JSON');if(ticket!==serial)return;
    cache[cacheKey]=data;const entries=Object.entries(cache).slice(-500);const persisted=write('analyses',Object.fromEntries(entries));
    renderAnalysis(data);$('analysisStatus').textContent=t(persisted?'analysisReady':'storageError');
  }catch(e){if(ticket===serial&&e.name!=='AbortError')$('analysisStatus').textContent=t('apiError')+' '+String(e.message||'');}
  finally{if(ticket===serial){request=null;$('analyzeBtn').disabled=false;}}
}
function commentRows(){return Object.values(notes()).filter(n=>n&&normalizeRef(n.ref)&&typeof n.text==='string').sort((a,b)=>String(b.updatedAt).localeCompare(String(a.updatedAt)));}
function commentMarkup(rows){return rows.length?rows.map(n=>'<article class="comment-entry"><strong>'+esc(visible(n.target))+'</strong> <span class="small">'+esc(n.ref)+'</span><div>'+esc(visible(n.text))+'</div><button data-open-note="'+esc(n.id)+'">'+esc(t('open'))+'</button><button data-delete-note="'+esc(n.id)+'">'+esc(t('deleteComment'))+'</button></article>').join(''):'<p class="small">'+esc(t('noNotes'))+'</p>';}
function bindComments(box){
  box.querySelectorAll('[data-open-note]').forEach(b=>b.onclick=()=>{
    const n=notes()[b.dataset.openNote];if(!n||!canLeave())return;
    if(location.hash==='#comentarios'){history.replaceState(null,'','#'+n.ref);commentsRoute();}
    primary=n.primary&&isPublicEdition(n.primary)?n.primary:defaultTranslation;secondary=null;navigate(n.ref,true);
    selection={side:n.side||'orig',source:n.source||'greek',target:n.target,ids:[]};noteKey=n.id;showSelection();if(n.analysis)renderAnalysis(n.analysis);else $('analysisStatus').textContent=t('noStoredAnalysis');$('result').scrollIntoView({behavior:'smooth',block:'start'});
  });
  box.querySelectorAll('[data-delete-note]').forEach(b=>b.onclick=()=>{if(!confirm(t('deleteConfirm')))return;const data=notes();delete data[b.dataset.deleteNote];if(!write('notes',data)){alert(t('storageError'));return;}if(noteKey===b.dataset.deleteNote)$('userNote').value='';renderComments();renderNotes();});
}
function renderComments(){const rows=commentRows().filter(n=>n.ref===ref);$('commentsCount').textContent='('+rows.length+')';$('passageCommentsList').innerHTML=commentMarkup(rows);bindComments($('passageCommentsList'));}
function renderNotes(){const query=$('noteSearch').value.toLowerCase();const rows=commentRows().filter(n=>visible([n.target,n.ref,n.text].join(' ')).toLowerCase().includes(query));$('notesList').innerHTML=commentMarkup(rows);bindComments($('notesList'));}
function commentsRoute(){const on=location.hash==='#comentarios';document.body.classList.toggle('comments-page',on);$('notesPanel').hidden=!on;if(on)renderNotes();else{const next=normalizeRef(location.hash.slice(1));if(next)navigate(next,true);}}
function renderPersonal(){const rows=passages();$('personalList').innerHTML=rows.length?rows.map(p=>'<button class="passage-option" data-id="'+esc(p.id)+'">'+esc(p.name)+'<span>'+esc(p.ref)+'</span></button>').join(''):'<p>'+esc(t('noPassages'))+'</p>';$('personalList').querySelectorAll('button').forEach(b=>b.onclick=()=>{const p=passages().find(p=>p.id===b.dataset.id);if(!p||!canLeave())return;personalId=p.id;primary='personal';secondary=null;$('personalDialog').close();navigate(p.ref,true);});}
async function pdfReady(){if(window.pdfjsLib)return;window.pdfjsLib=await import(new URL('assets/pdfjs/pdf.mjs',assetBase).href);window.pdfjsLib.GlobalWorkerOptions.workerSrc=new URL('assets/pdfjs/pdf.worker.mjs',assetBase).href;}
const pdfLimits={
 pt:{limits:'Este leitor de Platão não faz OCR automático. PDFs só com imagem exigem transcrição manual. Confira a referência Stephanus antes de salvar.',noText:'Esta página não tem texto extraível. Transcreva o excerto manualmente no campo abaixo; não há envio automático à IA.'},
 en:{limits:'This Plato reader does not perform automatic OCR. Image-only PDFs require manual transcription. Check the Stephanus reference before saving.',noText:'This page has no extractable text. Transcribe the excerpt manually below; nothing is automatically sent to AI.'},
 it:{limits:'Questo lettore di Platone non esegue OCR automatico. I PDF composti solo da immagini richiedono trascrizione manuale. Controlla il riferimento Stephanus prima di salvare.',noText:'Questa pagina non contiene testo estraibile. Trascrivi manualmente l’estratto qui sotto; nulla viene inviato automaticamente all’IA.'}
};
const bookLabels=Object.fromEntries(['pt','en','it'].map(l=>[l,{ref:I[l].bookRef,invalid:I[l].bookInvalid,unmatched:I[l].noHints,...pdfLimits[l]}]));
window.KeimenonBooks.mount({lang:()=>lang,ref:()=>ref,normalizeRef,validRef:r=>Boolean(normalizeRef(r)),pdfReady,database:'keimenon_books_'+work.id.replace(/-/g,'_')+'_v1',editions:[{id:'vegetti',label:'Mario Vegetti · BUR/Rizzoli · PDF'}],labels:bookLabels,refPlaceholder:'327a, 557a',pageHints:false,
 activate:(source,r,second)=>{clearSelection();navigate(r,true);if(second&&primary!==source)secondary=source;else{primary=source;secondary=null;}renderReader();},
 changed:source=>{if(primary===source)primary=defaultTranslation;if(secondary===source)secondary=null;clearSelection();renderReader();}
});
$('cfgToggle').onclick=()=>$('apiDialog').showModal();
for(const b of document.querySelectorAll('[data-close]'))b.onclick=()=>{const dialog=$(b.dataset.close);if(dialog.id==='importDialog'&&$('importText').value.trim()&&!confirm(t('unsaved')))return;dialog.close();};
$('provider').onchange=()=>{$('model').value={openai:'gpt-4o-mini',anthropic:'claude-sonnet-4-20250514',openrouter:'openai/gpt-4o-mini'}[$('provider').value];};
$('uiLang').onchange=()=>{const next=$('uiLang').value;if(!canLeave()){$('uiLang').value=lang;return;}clearSelection();lang=next;write('language',lang);status('');localize();};
$('refForm').onsubmit=e=>{e.preventDefault();navigate($('refInput').value);};$('bookSelect').onchange=()=>{const book=+$('bookSelect').value;if(!navigate(work.pages.find(p=>p.book===book).ref))$('bookSelect').value=pages.get(ref.slice(0,3)).book;};
$('prevPage').onclick=()=>navigate(work.pages[work.pages.indexOf(pages.get(ref.slice(0,3)))-1]?.ref||ref);
$('nextPage').onclick=()=>navigate(work.pages[work.pages.indexOf(pages.get(ref.slice(0,3)))+1]?.ref||ref);
$('translitBtn').onclick=()=>{translit=!translit;write('translit',translit);renderReader();};
for(const edition of editions)$('readSrc-'+edition.id).onclick=()=>choose(edition.id);
$('readSrc-vegetti').onclick=()=>choose('vegetti');
$('addTransBtn').onclick=()=>$('secondPicker').classList.toggle('open');$('secondPicker').querySelectorAll('button').forEach(b=>b.onclick=()=>choose(b.dataset.source,true));
$('removePrimaryTrans').onclick=()=>{if(secondary&&canLeave()){primary=secondary;secondary=null;clearSelection();renderReader();}};
$('removeSecondTrans').onclick=()=>{if(canLeave()){secondary=null;clearSelection();renderReader();}};
$('booksBtn').onclick=()=>{if(canLeave())window.KeimenonBooks.open('vegetti');};
$('importBtn').onclick=()=>{if(!canLeave())return;$('importRef').value=ref;$('importStatus').textContent='';$('importDialog').showModal();};
$('importApply').onclick=()=>{const r=normalizeRef($('importRef').value),text=$('importText').value.trim(),name=$('importName').value.trim();if(!r||!text||!name){$('importStatus').textContent=t('invalidImport');return;}const all=passages(),p={id:crypto.randomUUID(),ref:r,text,name,updatedAt:new Date().toISOString()};all.push(p);if(!write('passages',all)){$('importStatus').textContent=t('storageError');return;}personalId=p.id;primary='personal';secondary=null;$('importDialog').close();$('importText').value='';navigate(r,true);};
$('personalBtn').onclick=()=>{renderPersonal();$('personalDialog').showModal();};
$('notesBtn').onclick=()=>{const url=new URL(location.href);url.hash='comentarios';if(!window.open(url.href,'_blank'))location.hash='comentarios';};
$('commentsBackBtn').onclick=()=>{if(canLeave()){location.hash=ref;commentsRoute();}};
$('noteSearch').oninput=renderNotes;
$('closeAnalysisBtn').onclick=()=>{if(canLeave()){cancelAnalysis();$('result').style.display='none';}};$('analyzeBtn').onclick=analyze;
$('noteSaveBtn').onclick=()=>{if(!selection)return;const data=notes(),text=$('userNote').value;if(!text.trim())return;data[noteKey]={id:noteKey,work:work.id,ref,primary,secondary,side:selection.side,source:selection.source,target:selection.target,text,analysis:result,updatedAt:new Date().toISOString()};const ok=write('notes',data);$('noteStatus').textContent=t(ok?'saved':'storageError');if(ok){renderComments();renderNotes();}};
$('notesExport').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({work:work.id,notes:commentRows()},null,2)],{type:'application/json'}));a.download=work.id+'-comments.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};
$('notesImport').onclick=()=>$('notesFile').click();$('notesFile').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;const data=JSON.parse(await file.text());if(data.work!==work.id||!Array.isArray(data.notes))throw Error();const all=notes();for(const n of data.notes){if(!n||!normalizeRef(n.ref)||typeof n.text!=='string'||typeof n.target!=='string'||typeof n.id!=='string')throw Error();all[n.id]=n;}if(!write('notes',all)){alert(t('storageError'));return;}renderNotes();renderComments();alert(t('importedNotes'));}catch(_){alert(t('badBackup'));}finally{e.target.value='';}};
document.addEventListener('mouseup',()=>{const sel=window.getSelection();if(!sel||sel.isCollapsed||sel.toString().length<2||sel.toString().length>400)return;for(const [id,side] of [['origRender','orig'],['transRender','trans'],['trans2Render','trans2']]){const box=$(id);if(!box.contains(sel.anchorNode)||!box.contains(sel.focusNode))continue;const range=sel.getRangeAt(0);const spans=[...box.querySelectorAll('.w')].filter(e=>range.intersectsNode(e));pick(side,spans);break;}});
window.addEventListener('hashchange',commentsRoute);window.addEventListener('beforeunload',e=>{if(dirty()||$('importText').value.trim()){e.preventDefault();e.returnValue='';}});
window.addEventListener('storage',e=>{if(e.key===prefix+'notes'){renderComments();renderNotes();}});
window.KeimenonReader={workId:work.id,normalizeRef,navigate,state:()=>({ref,primary,secondary,translit})};
localize();window.KeimenonBooks.ready.then(()=>{navigate(ref,true);commentsRoute();});
})();
