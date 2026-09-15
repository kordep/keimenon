"""Rebuild Plato Republic from public-domain and openly licensed digital sources.
No LLM, translation generation or approximate alignment: match explicit Stephanus
markers in Burnet + Shorey/Perseus (CC BY-SA 4.0) and Jowett/Gutenberg #55201.
Requires: beautifulsoup4, lxml. Run from any directory.
"""
from pathlib import Path
from collections import OrderedDict
import re, json, hashlib, argparse
from lxml import etree as ET
from bs4 import BeautifulSoup, NavigableString, Comment

ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--work-dir',type=Path,default=ROOT/'platao')
WORK=parser.parse_args().work_dir.resolve()
SOURCE=WORK/'sources'
ns={'t':'http://www.tei-c.org/ns/1.0'}
clean=lambda s:re.sub(r'\s+',' ',s).strip()
def tei_sections(filename):
    xml=ET.parse(str(SOURCE/filename));texts=OrderedDict();book_ids={};current=None
    def walk(el,book):
        nonlocal current
        if not isinstance(el.tag,str):return
        name=ET.QName(el).localname
        if name in {'note','bibl','del'}:return
        if name=='milestone' and el.get('unit')=='section':
            current=el.get('n').lower()
            assert re.fullmatch(r'\d{3}[a-e]',current) and current not in texts,current
            texts[current]=[];book_ids[current]=book
        elif name=='milestone' and el.get('unit')=='para' and current:
            texts[current].append('\n\n')
        if current and el.text:texts[current].append(el.text)
        for child in el:
            walk(child,book)
            if current and child.tail:texts[current].append(child.tail)
        if name in {'p','l'} and current:texts[current].append('\n')
    for book in xml.xpath('//t:div[@subtype="book"]',namespaces=ns):
        for child in book:walk(child,int(book.get('n')))
    return {r:clean(''.join(v)) for r,v in texts.items()},book_ids

greek,books=tei_sections('republic-greek.xml')
shorey,shorey_books=tei_sections('republic-shorey.xml')
assert list(greek)==list(shorey) and books==shorey_books,'Shorey/Greek canonical marker mismatch'
assert all(shorey.values())

html=BeautifulSoup((SOURCE/'republic-jowett-55201.html').read_text(encoding='utf8'),'html.parser')
license_el=html.find(id='pg-footer')
assert license_el
(SOURCE/'GUTENBERG-LICENSE.txt').write_text(license_el.get_text('\n',strip=True),encoding='utf8')
# Only body content between the first canonical marker and the last marker's
# paragraph. Exclude editorial side notes, print pagination and footnotes.
first=html.find(id='stpage327A').find_parent('p')
last=html.find(id='stpage621D').find_parent('p')
english=OrderedDict();current=None

def enwalk(node):
    global current
    if isinstance(node,Comment):return
    if isinstance(node,NavigableString):
        if current:english[current].append(str(node))
        return
    if node.name in {'h1','h2','h3','hr','script','style'}:return
    cls=set(node.get('class',[]))
    if cls & {'sidenote','pagenum','footnote'}:return
    if node.name=='a' and str(node.get('href','')).startswith('#Footnote'):return
    if 'stpagenum' in cls:
        refs=[a.get('id','')[6:].lower() for a in node.find_all(id=True) if a.get('id','').startswith('stpage')]
        # 419A and the erroneous duplicate 419E share one span in Gutenberg.
        # Only the canonical marker present in the Greek source is admitted.
        canonical=[r for r in refs if r in greek]
        if canonical:
            assert len(canonical)==1 and canonical[0] not in english,canonical
            current=canonical[0];english[current]=[]
        return
    for child in node.children:enwalk(child)
    if node.name in {'p','div','br'} and current:english[current].append(' ')

for node in [first,*first.next_siblings]:
    enwalk(node)
    if node is last:break
english={r:clean(''.join(v)) for r,v in english.items()}
assert list(greek)==list(english),'Canonical marker mismatch'
assert len(greek)==1355 and all(greek.values()) and all(english.values())
pages=OrderedDict()
for ref in greek:
    page=ref[:-1]
    pages.setdefault(page,{'ref':page,'book':books[ref],'sections':[]})['sections'].append(ref)
assert len(pages)==278
for forbidden in ['Project Gutenberg','BOOK II','Footnotebook','OF WEALTH, JUSTICE']:
    assert not any(forbidden in t for t in english.values()),forbidden
for ref in ['327a','419a','449a','514a','557a','621d']:
    assert len(greek[ref])>20 and len(english[ref])>20
work={
 'id':'plato-republic','urn':'urn:cts:greekLit:tlg0059.tlg030','initialRef':'327',
 'defaultTranslation':'shorey','editions':[{'id':'shorey','label':'Shorey · Loeb'},{'id':'jowett','label':'Jowett'}],
 'dataLicense':'CC BY-SA 4.0 (Perseus-derived dataset; Jowett source license included separately)',
 'author':{'pt':'Platão','en':'Plato','it':'Platone'},
 'title':{'pt':'A República','en':'The Republic','it':'La Repubblica'},
 'sources':{
  'greek':{'label':'John Burnet · OCT IV · Perseus','editionYear':'1905 (metadata in the supplied Perseus XML)',
    'url':'https://github.com/PerseusDL/canonical-greekLit/blob/master/data/tlg0059/tlg030/tlg0059.tlg030.perseus-grc2.xml'},
  'shorey':{'id':'shorey','label':'Paul Shorey · Loeb · Perseus',
    'editionYear':'1935–37 (printings cited in Perseus metadata)',
    'license':'CC BY-SA 4.0','licenseUrl':'https://creativecommons.org/licenses/by-sa/4.0/',
    'url':'https://github.com/PerseusDL/canonical-greekLit/blob/master/data/tlg0059/tlg030/tlg0059.tlg030.perseus-eng2.xml'},
  'jowett':{'id':'jowett','label':'Benjamin Jowett · 1888 / 1908 · Project Gutenberg #55201',
    'url':'https://www.gutenberg.org/ebooks/55201'}},
 'pages':list(pages.values()),
 'sections':{r:{'ref':r,'book':books[r],'greek':greek[r],'shorey':shorey[r],'jowett':english[r]} for r in greek}
}
(WORK/'republic-data.js').write_text('window.KEIMENON_WORK='+json.dumps(work,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf8')
report={
 'pages':len(pages),'sections':len(greek),'books':{str(b):sum(p['book']==b for p in pages.values()) for b in range(1,11)},
 'sourceSHA256':{f:hashlib.sha256((SOURCE/f).read_bytes()).hexdigest() for f in ['republic-greek.xml','republic-shorey.xml','PERSEUS-LICENSE-README.md','republic-jowett-55201.html']},
 'translations':{'shorey':len(shorey),'jowett':len(english)},
 'method':'Exact matching of canonical Stephanus milestones; no inferred translation alignment.',
 'licensing':'Perseus repository declares CC BY-SA 4.0 unless otherwise indicated; neither the Shorey TEI header nor CTS metadata contain a specific exception. This is a digital-edition license, not a blanket public-domain claim about Loeb printings.',
 'editorialNotes':['Gutenberg duplicate 419E ignored in favour of 419A in the same span; non-section 449 anchor ignored.','Perseus XML specifies Burnet 1905; do not silently copy the 1902 date from the design screenshot.','Gutenberg compilation: primarily Jowett 1888, full Stephanus markers from the 1908 printing.','Notes, bibliography labels, deleted Greek text, page numbers and editorial side notes excluded.']}
(WORK/'corpus-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('PASS:',len(pages),'pages;',len(greek),'paired sections; 10 books; all nonempty')
