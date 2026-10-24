# Seccom Net — Catálogo web

Sitio web estático de catálogo de productos para una empresa de seguridad electrónica y conectividad (cámaras, NVR, redes, control de acceso, servicios de mantenimiento, etc.).

> Proyecto freelance. Los datos, precios e imágenes pertenecen al cliente y se usan aquí solo como muestra de portafolio.

## Qué incluye

- Página de inicio con productos destacados.
- Catálogo con filtros por categoría y búsqueda.
- Página de detalle de cada producto (`producto.html?id=...`).
- Secciones de servicios, quiénes somos y contacto.
- Diseño responsive (celular, tablet y escritorio).
- Script en Python que genera `js/productos.js` a partir de `productos.csv`.

## Tecnologías

HTML, CSS y JavaScript puro (sin frameworks ni dependencias) + Python para generar los datos.

## Estructura

```
index.html, catalogo.html, producto.html,
servicios.html, quienes-somos.html, contacto.html
css/styles.css
js/            -> scripts de cada página y productos.js (datos)
img/           -> imágenes de productos
productos.csv  -> fuente de los datos
generar_productos.py
```

## Cómo correrlo

Es un sitio estático: abre `index.html` en el navegador, o levanta un servidor local:

```bash
python -m http.server 8000
```

y entra a `http://localhost:8000`.

## Autor

Javier López Rosete — [JavierLRS190](https://github.com/JavierLRS190)
