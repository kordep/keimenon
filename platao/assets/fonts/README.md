# Fontes locais — Keimenon v0.7.0

Arquivos WOFF2 obtidos dos pacotes Fontsource via jsDelivr para distribuição local. A interface não consulta Google Fonts nem CDN para carregar tipografia em runtime.

| Família | Pacote Fontsource | Pesos/subconjuntos |
|---|---|---|
| Space Grotesk | @fontsource/space-grotesk@5.2.8 | 300 latin (marca) |
| Cardo | @fontsource/cardo@5.2.7 | 400 latin, latin-ext, greek, greek-ext (leitura, transliteração e grego politônico) |
| IBM Plex Sans | @fontsource/ibm-plex-sans@5.2.8 | 400, 500, 600 latin (interface) |
| Space Mono | @fontsource/space-mono@5.2.9 | 400 latin (metadados) |

Licenças OFL originais acompanham cada família em `*-LICENSE.txt`; preservar na distribuição. Fonte dos arquivos: `https://cdn.jsdelivr.net/npm/@fontsource/{familia}@{versao}/files/{familia}-{subconjunto}-{peso}-normal.woff2`, licença no caminho `/LICENSE` do pacote.

A fonte Space Grotesk 600 histórica na raiz é mantida por compatibilidade. Ao modificar a tipografia no futuro, preservar estes binários versionados para os snapshots anteriores.
