# PDF.js 4.10.38

Vendored from `pdfjs-dist@4.10.38` (`build/pdf.mjs`, `build/pdf.worker.mjs`) via jsDelivr. Apache-2.0 license included in LICENSE.txt. No CDN dependency at runtime.

The app passes `isEvalSupported: false` to document loading. The public HTTPS site or a local HTTP server is required for module/worker loading (opening the HTML directly with file:// does not work for this PDF library). Modern browser with module workers and Promise.withResolvers required. PDF parsing/rendering is local, not OCR. No password or DRM handling is provided.
