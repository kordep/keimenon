/* Local PDF library. No upload, OCR, LLM, telemetry or server persistence.
   IndexedDB is shared by this site's local profiles, NOT an authorization boundary. */
(()=>{
  'use strict';
  const L={
    pt:{title:'Meus livros · PDFs locais',edition:'Edição',choose:'Adicionar / substituir PDF',privacy:'O PDF e os trechos revisados ficam neste navegador, disponíveis aos seus perfis locais. Não são enviados ao GitHub nem à IA. Guarde também o arquivo original: limpar os dados do site apaga esta biblioteca.',limits:'A referência é confirmada por você, não identificada por IA. PDFs digitalizados sem camada de texto exigem transcrição manual ou o fluxo Foto, que usa IA.',empty:'Nenhum PDF adicionado.',stored:'Salvo neste navegador',load:'Lendo o PDF local…',ready:'PDF pronto. Confira a página e selecione somente o trecho da referência.',failed:'Não foi possível abrir ou salvar o PDF.',storage:'Armazenamento indisponível. Use uma janela normal do navegador e confira o espaço livre.',page:'Página do PDF',go:'Abrir página',prev:'Anterior',next:'Próxima',rotate:'Girar página',copy:'Usar texto desta página',append:'Acrescentar texto desta página',ref:'Referência do trecho (livro.capítulo)',text:'Trecho revisado da tradução',review:'A extração pode incluir outros capítulos, notas e cabeçalhos. Recorte e corrija o texto antes de salvar. O original será carregado do corpus verificado.',save:'Salvar trecho e comparar',close:'Fechar',remove:'Remover livro deste navegador',removeConfirm:'Remover este PDF e todos os trechos revisados desta edição? Seu arquivo original e comentários não serão apagados.',replaceConfirm:'Substituir este PDF e apagar os trechos revisados da edição anterior? Os comentários serão mantidos.',invalid:'Informe uma referência válida de Tucídides e um trecho não vazio.',saved:'Trecho salvo neste navegador.',noText:'Esta página não tem texto extraível. Transcreva o excerto manualmente ou use Foto (envio à IA, com sua chave).',extracted:'Texto da página copiado. Revise o recorte e a referência antes de salvar.',overwrite:'Substituir o texto do editor pelo texto desta página?',hint:'Página sugerida para este arquivo reconhecido. Confira o trecho; não é uma identificação automática para outras edições.',unmatched:'Arquivo sem índice de páginas conhecido: procure a passagem no PDF e informe a referência.',savedCount:'trechos revisados',errorPage:'Não foi possível ler esta página.',loading:'Carregando…',needsBook:'Adicione o PDF primeiro.',large:'PDF maior que 250 MB. Use uma cópia menor ou importe excertos por texto/foto.',secure:'Abra o site por HTTPS (ou por um servidor local) para usar a biblioteca de PDFs.',warning:'Ao pedir uma análise, o excerto selecionado e seu contexto serão enviados ao provedor de IA configurado.',discard:'Fechar sem salvar as alterações deste trecho?',pdfLabel:'Texto extraído da página',view:'Prévia do PDF',noOcr:'Sem OCR automático',imported:'Livro adicionado. O arquivo não saiu deste navegador.'},
    en:{title:'My books · local PDFs',edition:'Edition',choose:'Add / replace PDF',privacy:'The PDF and reviewed excerpts stay in this browser, available to your local profiles. They are not sent to GitHub or AI. Keep the original file too: clearing site data erases this library.',limits:'You confirm the reference; AI does not identify it here. Scanned PDFs without text need manual transcription or the Photo workflow, which uses AI.',empty:'No PDF added.',stored:'Saved in this browser',load:'Reading the local PDF…',ready:'PDF ready. Check the page and select only the excerpt for this reference.',failed:'Could not open or save the PDF.',storage:'Storage unavailable. Use a regular browser window and check free space.',page:'PDF page',go:'Open page',prev:'Previous',next:'Next',rotate:'Rotate page',copy:'Use text from this page',append:'Append text from this page',ref:'Excerpt reference (book.chapter)',text:'Reviewed translation excerpt',review:'Extraction may include other chapters, notes and headers. Trim and correct the text before saving. The original comes from the verified corpus.',save:'Save excerpt and compare',close:'Close',remove:'Remove book from this browser',removeConfirm:'Remove this PDF and all reviewed excerpts for this edition? Your original file and comments will not be deleted.',replaceConfirm:'Replace this PDF and erase reviewed excerpts from the previous edition? Comments will be kept.',invalid:'Enter a valid Thucydides reference and a nonempty excerpt.',saved:'Excerpt saved in this browser.',noText:'This page has no extractable text. Transcribe the excerpt manually or use Photo (sent to AI with your key).',extracted:'Page text copied. Review the excerpt and reference before saving.',overwrite:'Replace the editor text with text from this page?',hint:'Suggested page for this recognized file. Check the excerpt; this does not identify passages in other editions.',unmatched:'No known page index for this file: locate the passage in the PDF and enter its reference.',savedCount:'reviewed excerpts',errorPage:'Could not read this page.',loading:'Loading…',needsBook:'Add the PDF first.',large:'PDF exceeds 250 MB. Use a smaller copy or import excerpts via text/photo.',secure:'Open the HTTPS site (or a local web server) to use the PDF library.',warning:'When you request an analysis, the selected excerpt and its context are sent to your configured AI provider.',discard:'Close without saving changes to this excerpt?',pdfLabel:'Extracted page text',view:'PDF preview',noOcr:'No automatic OCR',imported:'Book added. The file did not leave this browser.'},
    it:{title:'I miei libri · PDF locali',edition:'Edizione',choose:'Aggiungi / sostituisci PDF',privacy:'Il PDF e gli estratti rivisti restano in questo browser, disponibili ai tuoi profili locali. Non vengono inviati a GitHub né all’IA. Conserva anche il file originale: cancellare i dati del sito elimina questa biblioteca.',limits:'Sei tu a confermare il riferimento, non l’IA. I PDF scansionati senza testo richiedono trascrizione manuale oppure il flusso Foto, che usa l’IA.',empty:'Nessun PDF aggiunto.',stored:'Salvato in questo browser',load:'Lettura del PDF locale…',ready:'PDF pronto. Controlla la pagina e seleziona solo l’estratto del riferimento.',failed:'Impossibile aprire o salvare il PDF.',storage:'Archiviazione non disponibile. Usa una finestra normale del browser e verifica lo spazio libero.',page:'Pagina del PDF',go:'Apri pagina',prev:'Precedente',next:'Successiva',rotate:'Ruota pagina',copy:'Usa il testo di questa pagina',append:'Aggiungi il testo di questa pagina',ref:'Riferimento dell’estratto (libro.capitolo)',text:'Estratto rivisto della traduzione',review:'L’estrazione può includere altri capitoli, note e intestazioni. Ritaglia e correggi il testo prima di salvare. L’originale proviene dal corpus verificato.',save:'Salva estratto e confronta',close:'Chiudi',remove:'Rimuovi il libro da questo browser',removeConfirm:'Rimuovere questo PDF e tutti gli estratti rivisti di questa edizione? Il file originale e i commenti non saranno eliminati.',replaceConfirm:'Sostituire questo PDF ed eliminare gli estratti rivisti della precedente edizione? I commenti saranno conservati.',invalid:'Inserisci un riferimento valido di Tucidide e un estratto non vuoto.',saved:'Estratto salvato in questo browser.',noText:'Questa pagina non contiene testo estraibile. Trascrivi l’estratto manualmente o usa Foto (invio all’IA con la tua chiave).',extracted:'Testo della pagina copiato. Rivedi l’estratto e il riferimento prima di salvare.',overwrite:'Sostituire il testo dell’editor con quello di questa pagina?',hint:'Pagina suggerita per questo file riconosciuto. Controlla l’estratto: non identifica i passi di altre edizioni.',unmatched:'Nessun indice di pagine noto per questo file: cerca il passo nel PDF e indica il riferimento.',savedCount:'estratti rivisti',errorPage:'Impossibile leggere questa pagina.',loading:'Caricamento…',needsBook:'Aggiungi prima il PDF.',large:'Il PDF supera 250 MB. Usa una copia più piccola o importa estratti tramite testo/foto.',secure:'Apri il sito HTTPS (o un server locale) per usare la biblioteca PDF.',warning:'Quando richiedi un’analisi, l’estratto selezionato e il suo contesto vengono inviati al fornitore di IA configurato.',discard:'Chiudere senza salvare le modifiche a questo estratto?',pdfLabel:'Testo estratto dalla pagina',view:'Anteprima PDF',noOcr:'Senza OCR automatico',imported:'Libro aggiunto. Il file non ha lasciato questo browser.'}
  };
  let app,db,dialog,source='warner',asSecond=false,doc,rotation=0,pageNumber=1,rawText='',busy=false,dirty=false;
  let metadata={},chapters={},hints={},activeHash='',statusKey='',statusError=false;
  const $=id=>document.getElementById(id),t=key=>(L[app?.lang()]||L.pt)[key]||key;
  const key=(s,r)=>s+':'+r;
  function status(k,error=false){statusKey=k;statusError=error;const el=$('bookStatus');el.textContent=t(k);el.className='status '+(error?'err':'ok');}
  function transaction(stores,write,run){return new Promise((resolve,reject)=>{if(!db){reject(new Error('storage'));return;}const tx=db.transaction(stores,write?'readwrite':'readonly');let result;try{result=run(tx);}catch(e){try{tx.abort();}catch(_){}reject(e);return;}tx.oncomplete=()=>resolve(typeof result==='function'?result():result);tx.onerror=()=>reject(tx.error||new Error('storage'));tx.onabort=()=>reject(tx.error||new Error('storage'));});}
  async function get(store,k){let value;await transaction([store],false,tx=>{tx.objectStore(store).get(k).onsuccess=e=>{value=e.target.result;};});return value;}
  function translate(){
    if(!dialog)return;
    dialog.querySelectorAll('[data-book-key]').forEach(el=>el.textContent=t(el.dataset.bookKey));
    $('bookText').setAttribute('aria-label',t('text'));
    $('bookCanvas').setAttribute('aria-label',t('view'));
    if(statusKey)status(statusKey,statusError);
    updateMeta();
  }
  function updateMeta(){
    if(!dialog)return;
    const m=metadata[source];
    $('bookMeta').textContent=m?m.name+' · '+m.pages+' '+t('page')+' · '+Object.values(chapters).filter(x=>x.source===source).length+' '+t('savedCount')+' · '+t('stored'):t('empty');
    $('bookRemove').hidden=!m;
    $('bookPageHint').textContent=m?(hints[source]?.sha256===m.sha256?t('hint'):t('unmatched')):'';
  }
  function lock(on){busy=on;dialog.querySelectorAll('button,input,select,textarea').forEach(el=>el.disabled=on);dialog.setAttribute('aria-busy',String(on));}
  async function loadDocument(blob){await app.pdfReady();return window.pdfjsLib.getDocument({data:new Uint8Array(await blob.arrayBuffer()),isEvalSupported:false}).promise;}
  async function dispose(){if(doc){const old=doc;doc=null;await old.destroy();}activeHash='';}
  async function paint(){
    if(!doc)return;
    pageNumber=Math.min(doc.numPages,Math.max(1,Math.floor(Number(pageNumber)||1)));
    $('bookPage').value=pageNumber;$('bookPage').max=doc.numPages;$('bookTotal').textContent='/ '+doc.numPages;
    const page=await doc.getPage(pageNumber),vp0=page.getViewport({scale:1,rotation:(page.rotate+rotation)%360});
    const viewport=page.getViewport({scale:Math.min(1.5,850/vp0.width),rotation:(page.rotate+rotation)%360});
    const canvas=$('bookCanvas');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
    await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;
    const tc=await page.getTextContent();
    // Read in displayed orientation. Recognized Canfora has parallel Greek/Italian
    // content; use the known Italian half for text extraction, NEVER translate it.
    const knownCanfora=source==='canfora'&&metadata[source]?.sha256===hints.canfora?.sha256;
    if(knownCanfora){
      const rows={};for(const q of tc.items){if(!q.str||q.transform[5]<page.getViewport({scale:1}).height*.49)continue;const x=Math.round(q.transform[4]*10)/10;(rows[x]??=[]).push(q);}
      rawText=Object.keys(rows).map(Number).sort((a,b)=>a-b).map(x=>rows[x].sort((a,b)=>a.transform[5]-b.transform[5]).map(q=>q.str).join('')).join('\n');
    }else{
      const rows={};for(const q of tc.items){if(!q.str)continue;const [x,y]=window.pdfjsLib.Util.applyTransform([q.transform[4],q.transform[5]],viewport.transform);const row=Math.round(y/3)*3;(rows[row]??=[]).push({x,text:q.str});}
      rawText=Object.keys(rows).map(Number).sort((a,b)=>a-b).map(y=>rows[y].sort((a,b)=>a.x-b.x).map(q=>q.text).join(' ')).join('\n');
    }
    page.cleanup();
  }
  async function navigate(change){if(busy||!doc)return;lock(true);try{change();await paint();}catch(e){status('errorPage',true);}finally{lock(false);}}
  async function selectSource(){
    const m=metadata[source],r=app.ref(),saved=chapters[key(source,r)];
    $('bookRef').value=r;$('bookText').value=saved?.text||'';dirty=false;rawText='';rotation=source==='canfora'&&m?.sha256===hints.canfora?.sha256?90:0;
    $('bookCanvas').width=1;$('bookCanvas').height=1;$('bookTotal').textContent='';updateMeta();
    if(!m){await dispose();status('needsBook');return;}
    if(activeHash!==m.sha256){await dispose();doc=await loadDocument(await get('files',source));activeHash=m.sha256;}
    pageNumber=saved?.page||(hints[source]?.sha256===m.sha256?hints[source].pages[r]:null)||1;
    await paint();status('ready');
  }
  async function importFile(file){
    if(!file)return;if(file.size>250*1024*1024){status('large',true);return;}
    if(metadata[source]&&!confirm(t('replaceConfirm')))return;
    status('load');let next;
    try{
      next=await loadDocument(file);
      const bytes=await file.arrayBuffer(),digest=await crypto.subtle.digest('SHA-256',bytes);
      const sha256=Array.from(new Uint8Array(digest),n=>n.toString(16).padStart(2,'0')).join('');
      const meta={source,name:file.name,pages:next.numPages,sha256,updatedAt:new Date().toISOString()};
      await transaction(['files','meta','chapters'],true,tx=>{
        tx.objectStore('files').put(file,source);tx.objectStore('meta').put(meta,source);
        tx.objectStore('chapters').delete(IDBKeyRange.bound(source+':',source+':\uffff'));
      });
      await dispose();doc=next;next=null;activeHash=sha256;metadata[source]=meta;
      for(const k of Object.keys(chapters))if(chapters[k].source===source)delete chapters[k];
      app.changed?.(source);await selectSource();status('imported');
    }catch(e){if(next)await next.destroy();status(db?'failed':'storage',true);}
  }
  async function open(s='warner',second=false,file=null){
    await api.ready;if(busy)return;
    source=s==='canfora'?'canfora':'warner';asSecond=second;$('bookEdition').value=source;
    translate();if(!dialog.open)dialog.showModal();lock(true);
    try{if(!db){status('storage',true);return;}await selectSource();if(file)await importFile(file);}
    catch(e){status(location.protocol==='file:'?'secure':'failed',true);}finally{lock(false);}
  }
  function close(){if(busy)return;if(dirty&&!confirm(t('discard')))return;dialog.close();dirty=false;void dispose();}
  function mount(adapter){
    app=adapter;
    dialog=document.createElement('dialog');dialog.id='bookLibrary';dialog.setAttribute('aria-labelledby','bookTitle');
    dialog.innerHTML=`<div class="book-top"><h2 id="bookTitle" data-book-key="title"></h2><button id="bookClose" data-book-key="close"></button></div>
      <p class="small" data-book-key="privacy"></p><p class="small" data-book-key="limits"></p>
      <div class="book-actions"><div><label for="bookEdition" data-book-key="edition"></label><select id="bookEdition"><option value="warner">Warner · Penguin Classics</option><option value="canfora">Canfora · Einaudi-Gallimard</option></select></div>
      <div><label for="bookFile" data-book-key="choose"></label><input id="bookFile" type="file" accept="application/pdf,.pdf"></div></div>
      <p id="bookMeta" class="small"></p><button id="bookRemove" data-book-key="remove" hidden></button>
      <p id="bookStatus" class="status" role="status" aria-live="polite"></p><p id="bookPageHint" class="small"></p>
      <div class="book-actions"><label for="bookPage" data-book-key="page"></label><input id="bookPage" type="number" min="1" value="1"><span id="bookTotal"></span><button id="bookGo" data-book-key="go"></button><button id="bookPrev" data-book-key="prev"></button><button id="bookNext" data-book-key="next"></button><button id="bookRotate" data-book-key="rotate"></button></div>
      <div class="book-preview"><canvas id="bookCanvas" role="img" width="1" height="1"></canvas></div>
      <div class="book-actions"><button id="bookCopy" data-book-key="copy"></button><button id="bookAppend" data-book-key="append"></button><span class="small" data-book-key="noOcr"></span></div>
      <label for="bookRef" data-book-key="ref"></label><input id="bookRef" type="text" inputmode="decimal" placeholder="2.37">
      <label for="bookText" data-book-key="text"></label><textarea id="bookText" rows="8"></textarea>
      <p class="small" data-book-key="review"></p><p class="small" data-book-key="warning"></p><button id="bookSave" data-book-key="save"></button>`;
    document.body.appendChild(dialog);translate();
    $('bookClose').onclick=close;dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
    $('bookText').oninput=$('bookRef').oninput=()=>{dirty=true;};
    $('bookEdition').onchange=async()=>{if(dirty&&!confirm(t('discard'))){$('bookEdition').value=source;return;}source=$('bookEdition').value;lock(true);try{await selectSource();}catch(e){status('failed',true);}finally{lock(false);}};
    $('bookFile').onchange=async e=>{const f=e.target.files[0];lock(true);try{await importFile(f);}finally{e.target.value='';lock(false);}};
    $('bookGo').onclick=()=>navigate(()=>{pageNumber=Number($('bookPage').value);});
    $('bookPage').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();$('bookGo').click();}};
    $('bookPrev').onclick=()=>navigate(()=>pageNumber--);$('bookNext').onclick=()=>navigate(()=>pageNumber++);
    $('bookRotate').onclick=()=>navigate(()=>{rotation=(rotation+90)%360;});
    const copy=append=>{if(!rawText.trim()){status('noText',true);return;}if(!append&&$('bookText').value.trim()&&!confirm(t('overwrite')))return;$('bookText').value=(append&&$('bookText').value.trim()?$('bookText').value+'\n\n':'')+rawText;dirty=true;status('extracted');};
    $('bookCopy').onclick=()=>copy(false);$('bookAppend').onclick=()=>copy(true);
    $('bookSave').onclick=async()=>{
      const m=$('bookRef').value.trim().match(/^([1-8])[.,](\d{1,3})$/),ref=m?m[1]+'.'+Number(m[2]):'',text=$('bookText').value.trim();
      if(!metadata[source]){status('needsBook',true);return;}
      if(!ref||!text||!app.validRef(ref)){status('invalid',true);return;}
      const entry={source,ref,text,page:pageNumber,sha256:metadata[source].sha256,updatedAt:new Date().toISOString()};lock(true);
      try{await transaction(['chapters'],true,tx=>tx.objectStore('chapters').put(entry,key(source,ref)));chapters[key(source,ref)]=entry;dirty=false;dialog.close();await dispose();app.activate(source,ref,asSecond);}
      catch(e){status('storage',true);}finally{lock(false);}
    };
    $('bookRemove').onclick=async()=>{
      if(!confirm(t('removeConfirm')))return;lock(true);
      try{await transaction(['files','meta','chapters'],true,tx=>{tx.objectStore('files').delete(source);tx.objectStore('meta').delete(source);tx.objectStore('chapters').delete(IDBKeyRange.bound(source+':',source+':\uffff'));});delete metadata[source];for(const k of Object.keys(chapters))if(chapters[k].source===source)delete chapters[k];app.changed?.(source);await selectSource();}
      catch(e){status('storage',true);}finally{lock(false);}
    };
    api.ready=(async()=>{
      try{db=await new Promise((resolve,reject)=>{const req=indexedDB.open('keimenon_books_v1',1);req.onupgradeneeded=()=>{for(const s of ['files','meta','chapters'])req.result.createObjectStore(s);};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);req.onblocked=()=>reject(new Error('blocked'));});
        await transaction(['meta','chapters'],false,tx=>{tx.objectStore('meta').getAll().onsuccess=e=>{metadata=Object.fromEntries(e.target.result.map(x=>[x.source,x]));};tx.objectStore('chapters').getAll().onsuccess=e=>{chapters=Object.fromEntries(e.target.result.map(x=>[key(x.source,x.ref),x]));};});
      }catch(e){db=null;}
      try{const r=await fetch('book-page-hints.json');if(r.ok)hints=await r.json();}catch(e){}
      translate();
    })();
  }
  const api=window.KeimenonBooks={mount,open,translate,ready:Promise.resolve(),get:(s,r)=>chapters[key(s,r)]?.text||null,revision:(s,r)=>{const c=chapters[key(s,r)];return c?c.sha256+':'+c.updatedAt:'';},has:s=>Boolean(metadata[s])};
})();
