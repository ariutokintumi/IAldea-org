#!/usr/bin/env python3
"""
Inicializa la base SQLite del Memory Kernel a partir de packages/memory-kernel/schema.sql.
Uso: python scripts/init_kernel_db.py [--db ruta/al/archivo.sqlite]
"""

from __future__ import annotations

import argparse
import os
import sqlite3


def main() -> None:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    default_db = os.path.join(root, "data", "ialdea_kernel.sqlite")
    parser = argparse.ArgumentParser(description="Crea el esquema del Kernel IAldea en SQLite.")
    parser.add_argument("--db", default=default_db, help="Ruta del archivo SQLite a crear o actualizar.")
    args = parser.parse_args()

    schema_path = os.path.join(root, "packages", "memory-kernel", "schema.sql")
    if not os.path.isfile(schema_path):
        raise SystemExit(f"No se encuentra el esquema: {schema_path}")

    os.makedirs(os.path.dirname(os.path.abspath(args.db)), exist_ok=True)
    with open(schema_path, encoding="utf-8") as f:
        sql = f.read()

    conn = sqlite3.connect(args.db)
    try:
        conn.executescript(sql)
        conn.commit()
    finally:
        conn.close()

    print(f"Kernel listo: {args.db}")


if __name__ == "__main__":
    main()
