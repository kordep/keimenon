# Keimenon — Handoff para o Bira (e para o Claude dele)

Este documento explica o que é o Keimenon, como usar a edição que você recebeu, e por que o produto foi construído do jeito que foi. Ele foi escrito para ser lido tanto por você quanto pelo seu assistente Claude — se você colar este arquivo numa conversa, o Claude saberá orientá-lo em qualquer passo.

## O que é o Keimenon

O Keimenon é uma ferramenta de leitura para quem estuda filosofia política em textos clássicos. A pergunta que ele responde é: **"por que o tradutor escolheu esta palavra?"** — porque em filosofia política a escolha da palavra carrega o argumento: verter *dēmokratia*, *aretē* ou *politeia* de um jeito ou de outro muda a leitura do pensamento.

O fluxo central: você lê Tucídides com o original grego e a tradução lado a lado; clica numa palavra (em qualquer coluna); e recebe uma análise estruturada — o sentido no original, por que o tradutor verteu assim, que alternativas existiam (com atribuição a tradutores reais quando verificável) e o que está filosoficamente em jogo. Abaixo da análise, fontes lexicais independentes: o Wiktionary (grego antigo) e os verbetes literais de dois dicionários de referência, com página citada.

## Como começar (3 passos)

1. **Abra o link e digite a senha** (recebida por canal separado). Só é preciso uma vez por computador: a senha destrava a tradução de Rex Warner (Penguin) e os dois dicionários — *Preus, Historical Dictionary of Ancient Greek Philosophy* e *Peters, Greek Philosophical Terms* — que vêm cifrados dentro do arquivo.
2. **Configure a chave de API** (quem prepara isso é quem te enviou o app — em ⚙ Configurar API). Sem chave, o app ainda funciona: leitura completa da obra e cinco análises de demonstração em Tucídides 2.37.
3. **Leia e clique.** O app abre na Oração Fúnebre (2.37). Palavras sublinhadas têm análises prontas; qualquer palavra pode ser analisada ao vivo.

## O que há na tela

- **Coluna esquerda**: o original grego — por padrão em **transliteração latina** (dēmokratia em vez de δημοκρατία). O botão "ābc transliteração" alterna para os caracteres gregos; a escolha fica lembrada. Mesmo transliterada, cada palavra "sabe" seu grego verdadeiro por trás.
- **Coluna direita**: a tradução — pills **Crawley** (1874, domínio público) e **Warner** (Penguin, 1954) trocam na hora; "+ 2ª tradução" mostra as duas ao mesmo tempo, e a análise passa a comparar os dois tradutores.
- **Setas ‹ ›** (ou ← → no teclado): passam ao parágrafo anterior/seguinte (2.73 → 2.74), pela obra inteira — os 917 capítulos dos 8 livros estão embutidos, em grego e em Crawley.
- **Busca**: digite "2.44" ou "Tucídides 2.44" no passo 1 (✎ Editar entradas). Há também um índice curado de 24 passagens filosóficas com filtros por tema.
- **Quadro de análise** (escuro): a interpretação da IA. No canto direito inferior, **"Sua interpretação"** — escreva sua leitura; ela é salva (automaticamente e pelo botão 💾) e reaparece sempre que você clicar naquela palavra.
- **🗒 Comentários** (menu superior): tudo que você anotou — termo, passagem comentada e comentário — com busca, exclusão e backup em JSON. "⬇ Exportar anotações" gera um documento com os quadros completos (análise da IA + sua interpretação).
- **Boxes 📖/📕** abaixo da análise: fontes lexicais independentes da IA — Wiktionary ao vivo e os verbetes literais dos dois dicionários, localizados pelo lema (clicou πολιτείᾳ, procura πολιτεία; se a palavra não tem verbete, procura o conceito central da análise, ex.: ἀτολμοτέραν → tolma) e com a **página do livro citada**.

## As decisões de projeto e seus porquês

1. **O texto original nunca é gerado pela IA.** O grego vem de fonte autoritativa (edição Stuart Jones via Perseus Digital Library, domínio público, TEI XML). Motivo: um modelo de linguagem pode "alucinar" grego — uma palavra ou acento trocado destruiria a análise filológica. A IA interpreta; a fonte fornece.
2. **Referência canônica, não número de página.** Tucídides se cita por Livro.Capítulo (2.37) — é assim que toda a literatura acadêmica e as bases digitais indexam. A busca aceita o jeito natural de digitar.
3. **A tradução é trazida pelo usuário; esta edição traz o Warner cifrado.** Por direitos autorais, o app público nunca embute traduções modernas — o usuário carrega o PDF da edição que possui. Nesta edição beta, para simplificar sua vida, o Warner vai dentro do arquivo, mas **cifrado com AES-256**: sem a senha, é ilegível. Por favor, não repasse o link com a senha junto.
4. **Análise com honestidade sobre fontes.** No quadro "como outros traduziram", cada alternativa declara a origem: um selo com o tradutor real (ex.: "Hobbes 1629") quando o modelo tem confiança na atribuição, ou o selo "sugestão do modelo" quando é hipótese conceitual. A instrução ao modelo proíbe inventar atribuições. Ainda assim: atribuição de IA merece conferência antes de citação acadêmica.
5. **Dicionários como contrapeso à IA.** Os boxes 📕 mostram o texto *literal* dos livros (não paráfrase da IA) com página citada — para você poder verificar e citar. A IA fica no quadro dela; os livros, nos deles.
6. **Tudo fica no seu computador.** Anotações, dicionários, Warner, preferências e cache de análises vivem no armazenamento do seu navegador — nada sobe para servidor nenhum. Consequências práticas: (a) limpar os dados do navegador apaga suas anotações — use o backup JSON do menu Comentários; (b) trocar de navegador ou computador exige digitar a senha de novo e refazer anotações (ou importar o backup).
7. **A chave de API é sua e fica só na aba.** Ela vai direto do navegador para o provedor de IA (Anthropic/OpenRouter), não passa por intermediários, e morre quando a aba fecha. O app mostra o **custo estimado** de cada análise e o acumulado (⚙ Configurar API) — com a Anthropic, cada análise custa ~1 a 3 centavos de dólar.
8. **Um único arquivo HTML.** O produto inteiro é uma página — sem instalação, sem servidor, funciona até offline (exceto as chamadas de IA e o Wiktionary). É uma decisão de simplicidade para a fase atual; um app desktop com backend está no plano futuro.

## Limites conhecidos desta edição

- Só Tucídides (por escolha: fechar o ciclo completo com qualidade antes de generalizar para Platão, Aristóteles etc.).
- A análise ao vivo exige chave de API configurada e internet.
- O texto do dicionário Peters tem OCR imperfeito no PDF de origem — os trechos dele podem sair com erros de leitura; o Preus é limpo.
- As análises da IA, mesmo boas, são de IA: o app repete em vários pontos o aviso "confira contra uma edição crítica antes de citar". Leve-o a sério.

## Para o Claude do Bira

Se você é o Claude lendo isto: o Bira pode precisar de ajuda com (a) colar a chave de API em ⚙ Configurar API e escolher provedor/modelo; (b) entender por que um box de livro não apareceu (a palavra não tem verbete — normal); (c) recuperar anotações via importação do backup JSON; (d) alternar transliteração/grego. O app não tem servidor: qualquer problema é local ao navegador dele. Não há dados sensíveis no arquivo além do conteúdo cifrado; a senha não deve ser armazenada em texto claro em lugar nenhum.
