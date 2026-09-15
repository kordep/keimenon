/* Shared Greek display helpers. Same convention as the Thucydides reader.
   Never transliterate a whole Italian/English sentence: retain Latin diacritics. */
(()=>{
  function translitGreek(text){
    const MAP={α:'a',β:'b',γ:'g',δ:'d',ε:'e',ζ:'z',η:'ē',θ:'th',ι:'i',κ:'k',λ:'l',μ:'m',ν:'n',ξ:'x',ο:'o',π:'p',ρ:'r',σ:'s',ς:'s',τ:'t',υ:'y',φ:'ph',χ:'ch',ψ:'ps',ω:'ō'};
    return text.split(/(\s+)/).map(word=>{
      if(/^\s+$/.test(word))return word;
      const letters=[];
      for(const ch of word.normalize('NFD')){
        if(/[\u0300-\u036f]/.test(ch)){
          const L=letters[letters.length-1];if(!L)continue;
          if(ch==='\u0345')L.iota=true;
          if(ch==='\u0314')L.rough=true;
          if(ch==='\u0308')L.diaer=true;
        }else letters.push({ch,iota:false,rough:false,diaer:false});
      }
      let out='',roughWord=false;
      for(let i=0;i<letters.length;i++){
        const L=letters[i],lc=L.ch.toLowerCase(),up=L.ch!==lc;let t=MAP[lc];
        if(t===undefined){out+=L.ch;continue;}
        if(lc==='γ'&&i+1<letters.length&&'γκξχ'.includes(letters[i+1].ch.toLowerCase()))t='n';
        if(lc==='υ'&&!L.diaer&&i>0&&'αεηο'.includes(letters[i-1].ch.toLowerCase()))t='u';
        if(lc==='ρ'&&L.rough)t='rh';else if(L.rough)roughWord=true;
        if(L.iota)t+='i';if(up)t=t.charAt(0).toUpperCase()+t.slice(1);out+=t;
      }
      if(roughWord&&out)out=out[0]===out[0].toUpperCase()?'H'+out[0].toLowerCase()+out.slice(1):'h'+out;
      return out;
    }).join('');
  }
  window.KeimenonLanguage={translitGreek,visible:s=>String(s??'').replace(/[\u0370-\u03ff\u1f00-\u1fff][\u0370-\u03ff\u1f00-\u1fff\u0300-\u036f]*/g,translitGreek)};
})();
