const cont = document.getElementById("producto");
const id = Number(new URLSearchParams(location.search).get("id"));
const p = PRODUCTOS.find(x => x.id === id);

if (!p) {
  document.title = `Producto no encontrado | ${NOMBRE_SITIO}`;
  cont.innerHTML = `<p class="vacio">No encontramos ese producto. <a href="catalogo.html">Volver al catálogo</a></p>`;
} else {
  document.title = `${p.nombre} | ${NOMBRE_SITIO}`;

  const cotizar = cotizarURL(`Hola, quiero cotizar: ${p.nombre}${p.sku ? ` (${p.sku})` : ""}`);
  const lista = (p.caracteristicas && p.caracteristicas.length)
    ? `<ul class="producto__lista">${p.caracteristicas.map(c => `<li>${esc(c)}</li>`).join("")}</ul>`
    : "";

  const fotos = p.imagenes || [];

  const relacionados = [
    ...PRODUCTOS.filter(x => x.categoria === p.categoria && x.id !== p.id),
    ...PRODUCTOS.filter(x => x.categoria !== p.categoria)
  ].slice(0, 3);

  cont.innerHTML = `
    <nav class="breadcrumb">
      <a href="index.html">Inicio</a> /
      <a href="catalogo.html?cat=${encodeURIComponent(p.categoria)}">${esc(p.categoria)}</a> /
      ${esc(p.nombre)}
    </nav>

    <section class="producto">
      <div class="producto__img">
        <img ${imgAttrs(p, false)}>
        ${fotos.length > 1 ? `<div class="galeria">${fotos.map((f, i) =>
          `<button type="button" class="thumb ${i === 0 ? "activo" : ""}" data-i="${i}" aria-label="Foto ${i + 1} de ${fotos.length}"><img src="${esc(f)}" alt="" loading="lazy" onerror="this.parentElement.style.display='none'"></button>`
        ).join("")}</div>` : ""}
      </div>

      <div class="producto__info">
        <h1>${esc(p.nombre)}</h1>
        <p class="producto__precio">${precioMX(p.precio)} <small>${esc(NOTA_PRECIO)}</small></p>
        <p class="producto__desc">${esc(p.descripcion)}</p>
        ${p.disponibilidad ? `<p class="disp"><strong>Disponibilidad:</strong> <span class="ok">${esc(p.disponibilidad)}</span></p>` : ""}
        <a class="btn" href="${esc(cotizar)}" ${WHATSAPP ? 'target="_blank" rel="noopener"' : ""}>Solicitar pedido</a>
        ${lista}
        <div class="producto__meta">
          ${p.marca ? `<span>Marca: ${esc(p.marca)}</span>` : ""}
          ${p.sku ? `<span>Modelo: ${esc(p.sku)}</span>` : ""}
          <span>Categoría: <a href="catalogo.html?cat=${encodeURIComponent(p.categoria)}">${esc(p.categoria)}</a></span>
        </div>
      </div>
    </section>

    <section class="relacionados">
      <h2>Productos relacionados</h2>
      <div class="grid">${relacionados.map(cardHTML).join("")}</div>
    </section>
  `;

  const principal = cont.querySelector(".producto__img > img");
  cont.querySelectorAll(".thumb").forEach(btn => btn.addEventListener("click", () => {
    const f = fotos[Number(btn.dataset.i)];
    principal.dataset.base = f.replace(/\.[^./]+$/, "");
    principal.dataset.paso = -1;
    principal.src = f;
    cont.querySelectorAll(".thumb").forEach(b => b.classList.toggle("activo", b === btn));
  }));
}
