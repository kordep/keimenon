# Keimenon · Platão / A República · preview v0.1.0

Leitor independente de Tucídides, com a mesma identidade editorial.

**Site:** https://kordep.github.io/keimenon/platao/ — subsite autocontido, sem substituir o leitor de Tucídides. Texto principal completo dos dez livros (grego, Shorey e Jowett); notas/aparato editorial não são exibidos.

## Corpus e abertura

- Original grego de Burnet/Perseus + **Paul Shorey / Loeb** como tradução principal dos dez livros.
- **278 páginas Stephanus, 1.355 seções** em grego, Shorey e Jowett, todas não vazias e pareadas por marcadores explícitos.
- Jowett é tradução adicional opcional, não substitui Shorey na abertura.
- Digite `327`, `327a`, `557a` etc. As letras disponíveis são as existentes na fonte; `327d`, por exemplo, não é inventada. A navegação por livro respeita a divisão original e não assume que toda página tem cinco letras.
- Créditos/licenças em `SOURCES.md`: a edição digital Shorey/Perseus usa a declaração **CC BY-SA 4.0** do repositório, não uma afirmação de domínio público de qualquer PDF Loeb moderno.

## O que funciona

- UI PT / EN / IT, original + uma ou duas traduções, no máximo três colunas.
- Grego/transliteração preservando seleção; escolha de palavras e trechos.
- Análise opcional por OpenAI / Anthropic / OpenRouter com chave só na memória da aba. Sem chave, leitura e comentários funcionam; análises já salvas são reutilizadas.
- Alternativas distinguem atribuições e hipóteses de IA. Não há análises acadêmicas fictícias embutidas.
- Comentários por palavra/seleção, recolhidos ao fim da passagem; página independente de comentários, exportação/importação JSON.
- Importar texto com referência Stephanus confirmada; biblioteca de passagens pessoais.
- **Meus livros** preparado para PDF de Vegetti: IndexedDB, prévia/rotação, extração literal, revisão e associação de trecho à referência. Não há PDF Vegetti embutido nem alinhamento automático de sua edição.
- Dados separados dos de Tucídides. Nenhum login, painel “meu keimenon” ou comunidade fictícia.

## Como abrir

- `index.html` pode ser aberto diretamente para leitura, comentários e análises. Para importar PDFs, use **HTTPS ou servidor local**, por causa dos módulos/worker do PDF.js.
- Na raiz do projeto: `python scripts/build-plato-preview.py`, depois `node scripts/serve-plato-preview.cjs`. Abra `http://127.0.0.1:8793/`.
- No pacote: execute `ABRIR-PLATAO.bat` (Node.js necessário). Mantenha a janela do servidor aberta enquanto usa o leitor.
- Não trocar a porta/caminho durante testes com dados importantes: a persistência do navegador depende da origem. O futuro site terá armazenamento distinto; exporte comentários e mantenha os PDFs originais.

## Limites desta primeira versão

- Sem identificação automática por foto/OCR; importação de texto e PDF exige confirmação manual da referência. PDF só com imagem requer transcrição manual. PDF protegido por senha/DRM não suportado.
- Os testes de Vegetti usam **PDF sintético**. O PDF real do usuário ainda não foi fornecido nem validado.
- As análises foram testadas com respostas controladas, sem chamadas pagas reais. Respostas de IA exigem conferência acadêmica.
- PDF e trechos revisados não têm backup/sincronização automática. Limpar dados do site apaga a biblioteca; guardar os arquivos originais.
- Ocorrências lexicais na obra e dicionários PDF do leitor antigo ainda não foram incorporados ao novo motor.

## Arquitetura / retomada

- `index.html`: casca da página; `republic-data.js`: somente dados da obra.
- Na raiz: `keimenon-reader.js` e `.css` são o motor orientado a dados; `keimenon-design.css`, `assets/fonts/`, `keimenon-language.js`, `keimenon-books.js` e `assets/pdfjs/` são compartilhados.
- `keimenon-ux.html` de Tucídides foi preservado byte a byte. O helper de livros ganhou opções com defaults retrocompatíveis; o site público de Tucídides não foi republicado nesta rodada.
- localStorage: `keimenon:plato-republic:v1:{language,lastRef,translit,notes,passages,analyses}`. IndexedDB: `keimenon_books_plato_republic_v1`.
- Cache de IA inclui obra, referência, alvo, lado, edições, **conteúdo dos textos**, idioma, provedor e modelo (SHA-256). Respostas atrasadas são descartadas após mudança de contexto.
- Regerar corpus: `python scripts/build-plato-corpus.py`; no pacote, `python tools/build-plato-corpus.py --work-dir .`. Dependências Python: `beautifulsoup4`, `lxml`.
- Teste: `node tests/plato-reader.cjs`. Compara corpus, navegação, seleção, notas, cache, UI, importação PDF e isolamento de dados. Regressões do leitor antigo passaram também.

## Publicação

`python scripts/build-plato-public.py` gera apenas `_deploy/platao/`, no repositório público existente `kordep/keimenon`. HTML, estilos, scripts e assets ficam autocontidos na subpasta. O site de Tucídides continua em `https://kordep.github.io/keimenon/`, sem alteração do seu HTML. Futuramente os dois leitores podem usar `/platao` e `/tucidides` no domínio próprio.

Créditos, licenças, inputs e transformações acompanham o corpus. `PERSEUS-MODIFICATIONS.md` faz uma oferta pública do dataset e script ao Perseus, sem alegar revisão/aceitação pelo projeto; não foi enviado email/issue/PR automaticamente. Nunca incluir o PDF Vegetti do usuário.
