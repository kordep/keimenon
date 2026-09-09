# Keimenon · public preview v0.8.0

Comparative Thucydides reader, with PT / EN / IT interface.

- Site: https://kordep.github.io/keimenon/
- Book guide: https://kordep.github.io/keimenon/guia.html
- Public texts: Thucydides (Henry Stuart Jones / Perseus) and Crawley (Perseus eng6).
- Warner and Canfora are **not distributed**. Readers can import their own PDFs into IndexedDB, inspect pages, and save reviewed excerpts against a canonical reference.
- `book-page-hints.json` contains only SHA-256 fingerprints and numeric page suggestions for recognized files, never book text.
- Local PDF reading uses bundled PDF.js 4.10.38, with evaluation disabled. No PDF upload or automatic OCR. PDFs without text require manual transcription or the separate, opt-in AI photo workflow.
- Book data is stored locally, shared by local profiles, not synced or included in the administrative backup. Keep original files. This is not authentication.
- AI calls are optional, use a reader-supplied key held in the tab, and send the required excerpt/image to the chosen provider.
- No online login, community backend, or additional authors in this release.
- Fonts and PDF.js licenses are in `assets/`.

This public deployment replaces the old sealed presentation UI. There is no shared site password in the current app.
