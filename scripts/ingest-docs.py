#!/usr/bin/env python3
"""
Ingest community documents into the Memory Kernel (Day 3 target).

See docs/planning/plan_01_ingesta_multimodal.md. Not yet implemented: wire OCR,
Whisper, and PDF extraction to `documents` / `chunks` via schema in
packages/memory-kernel/schema.sql.
"""

def main() -> None:
    raise SystemExit(
        "ingest-docs.py: stub — implementar pipeline (PyMuPDF / Tesseract / Whisper) "
        "según docs/planning/plan_01_ingesta_multimodal.md"
    )


if __name__ == "__main__":
    main()
