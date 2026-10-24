// Inicio: 20 productos. Primero los destacados (destacado = 1 en productos.csv) y se completa con el resto.
const TOTAL_INICIO = 20;
const productosInicio = [
  ...PRODUCTOS.filter(p => p.destacado),
  ...PRODUCTOS.filter(p => !p.destacado)
].slice(0, TOTAL_INICIO);
document.getElementById("destacados").innerHTML = productosInicio.map(cardHTML).join("");

// Selector de categorías del buscador del inicio
document.getElementById("heroCat").innerHTML = ["Todos", ...CATEGORIAS]
  .map(c => `<option value="${esc(c)}">${c === "Todos" ? "Todas las categorías" : esc(c)}</option>`)
  .join("");
