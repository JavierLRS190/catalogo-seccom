const grid = document.getElementById("grid");
const filtros = document.getElementById("filtros");
const buscador = document.getElementById("buscador");
const selectCategoria = document.getElementById("selectCategoria");
const btnLimpiar = document.getElementById("btnLimpiar");
const resultados = document.getElementById("resultados");
const vacio = document.getElementById("vacio");

// Permite llegar con filtros desde el header o el inicio: catalogo.html?q=camara&cat=Redes
const params = new URLSearchParams(location.search);
let categoriaActiva = CATEGORIAS.includes(params.get("cat")) ? params.get("cat") : "Todos";
buscador.value = params.get("q") || "";

function contar(cat) {
  return cat === "Todos" ? PRODUCTOS.length : PRODUCTOS.filter(p => p.categoria === cat).length;
}

function renderFiltros() {
  const todas = ["Todos", ...CATEGORIAS];

  filtros.innerHTML = todas.map(c =>
    `<button class="chip ${c === categoriaActiva ? "activo" : ""}" data-cat="${esc(c)}">${esc(c)} (${contar(c)})</button>`
  ).join("");

  selectCategoria.innerHTML = todas.map(c =>
    `<option value="${esc(c)}" ${c === categoriaActiva ? "selected" : ""}>${c === "Todos" ? "Todas las categorías" : esc(c)}</option>`
  ).join("");
}

function renderProductos() {
  // Cada palabra escrita debe aparecer en algún campo (en cualquier orden)
  const palabras = normalizar(buscador.value.trim()).split(/\s+/).filter(Boolean);

  const lista = PRODUCTOS.filter(p =>
    (categoriaActiva === "Todos" || p.categoria === categoriaActiva) &&
    palabras.every(w => normalizar([p.nombre, p.marca, p.sku, p.descripcion].join(" ")).includes(w))
  );

  resultados.textContent = `${lista.length} de ${PRODUCTOS.length} productos`;
  vacio.hidden = lista.length > 0;
  grid.innerHTML = lista.map(cardHTML).join("");
}

function cambiarCategoria(cat) {
  categoriaActiva = cat;
  renderFiltros();
  renderProductos();
}

filtros.addEventListener("click", e => {
  const btn = e.target.closest(".chip");
  if (btn) cambiarCategoria(btn.dataset.cat);
});

selectCategoria.addEventListener("change", () => cambiarCategoria(selectCategoria.value));
buscador.addEventListener("input", renderProductos);

btnLimpiar.addEventListener("click", () => {
  buscador.value = "";
  cambiarCategoria("Todos");
  buscador.focus();
});

renderFiltros();
renderProductos();
