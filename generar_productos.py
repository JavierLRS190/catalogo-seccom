import csv
import json
import os

EXTS = ("jpg", "jpeg", "png", "webp")

def buscar(base):
    """Devuelve img/<base>.<ext> si existe alguno (jpg, jpeg, png, webp), o '' si no."""
    for ext in EXTS:
        if os.path.exists(f"{base}.{ext}"):
            return f"{base}.{ext}"
    return ""

categorias = []
productos = []

with open("productos.csv", encoding="utf-8-sig", newline="") as f:
    for fila in csv.DictReader(f):
        fila["id"] = int(fila["id"])
        fila["precio"] = float(fila["precio"])
        fila["caracteristicas"] = [c.strip() for c in fila["caracteristicas"].split("|") if c.strip()]

        # Foto principal: la del CSV o img/<id>.jpg|png... (ej. img/03.jpg)
        n = fila["id"]
        principal = fila["imagen"] or buscar(f"img/{n:02d}") or buscar(f"img/{n}")
        fila["imagen"] = principal

        # Galería: la principal + img/<id>-2.jpg y img/<id>-3.jpg (hasta 3 fotos)
        fotos = [principal] if principal else []
        if principal:
            for k in (2, 3):
                extra = buscar(f"img/{n:02d}-{k}")
                if extra:
                    fotos.append(extra)
        fila["imagenes"] = fotos

        productos.append(fila)
        if fila["categoria"] not in categorias:
            categorias.append(fila["categoria"])

with open("js/productos.js", "w", encoding="utf-8") as out:
    out.write("// Archivo generado con generar_productos.py, no editar a mano\n")
    out.write(f"const CATEGORIAS = {json.dumps(categorias, ensure_ascii=False)};\n\n")
    out.write(f"const PRODUCTOS = {json.dumps(productos, ensure_ascii=False, indent=2)};\n")

print(f"Listo: {len(productos)} productos, {len(categorias)} categorías")
faltan = [p for p in productos if len(p["imagenes"]) < 3]
print(f"Con 3 fotos: {len(productos) - len(faltan)} | Con menos de 3: {len(faltan)}")
for p in faltan:
    print(f"  {p['id']:02d} ({len(p['imagenes'])}/3) {p['nombre']}  -> agrega img/{p['id']:02d}-2.jpg" + (f" y img/{p['id']:02d}-3.jpg" if len(p['imagenes']) < 2 else ""))
