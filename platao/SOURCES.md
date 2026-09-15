# República de Platão — fontes e licenças

## Tradução principal: Paul Shorey / Loeb

A tradução principal dos **dez livros** é a edição digital de Paul Shorey distribuída pelo Perseus, não uma tradução gerada por IA e não a digitalização de um PDF Loeb moderno.

- Texto TEI: `tlg0059.tlg030.perseus-eng2.xml`.
- Fonte: https://github.com/PerseusDL/canonical-greekLit/blob/master/data/tlg0059/tlg030/tlg0059.tlg030.perseus-eng2.xml
- Metadados: *Plato in Twelve Volumes*, volumes 5–6, tradução Paul Shorey, Harvard University Press / William Heinemann, **impressões de 1935–37** conforme o próprio XML/CTS. Não confundir datas das impressões com a primeira publicação dos volumes.
- A declaração do repositório Perseus licencia seu conteúdo sob **Creative Commons Attribution-ShareAlike 4.0 International, salvo indicação contrária**. Não foi encontrada uma exceção específica no cabeçalho TEI de Shorey ou no registro CTS desta obra.
- Declaração original: https://github.com/PerseusDL/canonical-greekLit#readme ; cópia local: `sources/PERSEUS-LICENSE-README.md`.
- Licença: https://creativecommons.org/licenses/by-sa/4.0/

**A base de uso nesta versão é a licença declarada da edição digital**, não uma afirmação de que todas as impressões ou PDFs Loeb sejam de domínio público em todos os países. A declaração do Perseus também adverte que materiais podem ter situações diferentes e recomenda contato em caso de dúvida. Não inclui aparato ou revisões de edições modernas externas ao TEI.

## Original grego

- Platão, *República*, texto de **John Burnet**, *Platonis Opera*, OCT, tomo IV.
- Fonte: https://github.com/PerseusDL/canonical-greekLit/blob/master/data/tlg0059/tlg030/tlg0059.tlg030.perseus-grc2.xml
- Os metadados XML/CTS desta fonte indicam **1905**; a imagem de planejamento dizia 1902. A aplicação segue a identificação da fonte efetivamente usada.
- Edição impressa histórica em domínio público; transcrição digital creditada ao Perseus/Tufts e utilizada sob a mesma declaração CC BY-SA 4.0 do repositório.

## Tradução adicional: Benjamin Jowett

- Project Gutenberg **#55201**, *The Republic of Plato*, tradução de Benjamin Jowett.
- Fonte: https://www.gutenberg.org/ebooks/55201
- Compilação digital baseada principalmente na terceira edição de **1888**, com a numeração Stephanus completa da impressão de **1908**, segundo a nota do transcritor Ed Brandon.
- Tradução histórica em domínio público. Crédito da transcrição: Ed Brandon / Project Gutenberg.
- A licença/condições Gutenberg do arquivo recebido acompanham a distribuição em `sources/GUTENBERG-LICENSE.txt`.
- O ebook #1497 foi considerado, mas não usado no corpus final, por não conter os marcadores Stephanus necessários.

## Transformações e atribuição do corpus do Keimenon

- **278 páginas Stephanus, 1.355 seções, 10 livros**, em cada uma das três fontes.
- O corpus é dividido pelos marcadores explícitos das fontes. Não há alinhamento probabilístico, tradução automática nem texto grego criado pelo modelo.
- Foram omitidas notas editoriais, referências bibliográficas de aparato, texto marcado como deletado no TEI, cabeçalhos/paginação impressa e notas marginais da transcrição Gutenberg. Espaços/quebras foram normalizados.
- Na transcrição Gutenberg, o mesmo marcador contém âncoras `419A` e `419E`; usa-se `419a`, que existe no grego. A âncora `449` sem letra não cria uma seção nova.
- A numeração comum não implica coincidência perfeita entre todas as frases ou opções editoriais dos tradutores. O leitor mostra a seção efetiva de cada fonte e suas atribuições.
- **O dataset adaptado `republic-data.js` é disponibilizado sob CC BY-SA 4.0**, com atribuição ao Perseus/Tufts, Burnet, Shorey, Jowett/Project Gutenberg e às transformações Keimenon descritas acima. Isso não altera a licença do código da interface nem torna públicos os PDFs dos leitores.
- O script de transformação `scripts/build-plato-corpus.py` e o relatório `corpus-validation.json` documentam o processo e hashes. Ao publicar o dataset, manter estes créditos, a licença e o acesso às transformações. O README do Perseus pede que modificações sejam oferecidas ao projeto: `PERSEUS-MODIFICATIONS.md` contém a oferta pública deste dataset e código. Não significa que tenham sido revisados/aceitos pelo Perseus. Nenhuma mensagem externa foi enviada automaticamente.

## Vegetti: privado, não incluído

Mario Vegetti / BUR-Rizzoli será usado apenas quando o leitor fornecer seu próprio PDF. A biblioteca o guarda em IndexedDB separado do leitor de Tucídides. O texto italiano é extraído literalmente e precisa ser revisado e associado a uma referência Stephanus pelo leitor. Nenhum PDF de Vegetti acompanha esta versão.

## Publicação

Endereço deste leitor independente: https://kordep.github.io/keimenon/platao/ . O leitor de Tucídides permanece intacto no endereço principal. O deploy de Platão usa uma lista explícita de arquivos, com o app, fontes/licenças e transformações; não publica a pasta de trabalho inteira, PDFs privados ou dados do navegador.
