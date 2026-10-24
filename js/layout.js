
// ===== Configuración =====
const NOMBRE_SITIO = "Seccom Net";
const EMAIL = "administraciónseccom@seccom-net.com.mx";
const TELEFONO = "";    // ej. "222 123 4567"  (vacío = no se muestra)
const DIRECCION = "";   // ej. "Calle y número, colonia, Puebla, Pue."  (vacío = no se muestra)
const WHATSAPP = "";    // lada de país + número, sin + ni espacios, ej. "522221234567"  (vacío = se usa el correo)
const NOTA_PRECIO = "Incluye IVA";
const CONTACTO = [EMAIL, TELEFONO, DIRECCION].filter(Boolean).join(" · ");

// ===== Funciones compartidas =====
// Enlace de "Solicitar cotización": WhatsApp si hay número; si no, abre el correo
function cotizarURL(texto) {
  if (WHATSAPP) return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent("Solicitud de cotización")}&body=${encodeURIComponent(texto)}`;
}

const normalizar = t => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const precioMX = n => n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
const esc = t => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const ICONOS = {
  "Videovigilancia": '<path d="M3 8h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3z"/><path d="M16 11l5-3v9l-5-3"/>',
  "Redes y Enlaces": '<path d="M2 9a15 15 0 0 1 20 0"/><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/>',
  "Gabinetes y Montaje": '<rect x="4" y="3" width="16" height="7" rx="1"/><rect x="4" y="13" width="16" height="7" rx="1"/><path d="M8 6.5h.01M8 16.5h.01"/>',
  "Energía y Protección": '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  "Control de acceso": '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  "Licencias": '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h7M9 17h5"/>',
  "Servicios": '<path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.5 2.5-2.2-.5-.5-2.2z"/>'
};
const ICONO_DEFECTO = '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>';

function placeholder(nombre, categoria) {
  const icono = ICONOS[categoria] || ICONO_DEFECTO;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
    <rect width="100%" height="100%" fill="#eef1f5"/>
    <g transform="translate(90 90) scale(5)" fill="none" stroke="#101721" stroke-opacity=".35" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${icono}</g>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}


const EXTS_IMG = ["jpg", "png", "jpeg", "webp"];
const imgBase = p => p.imagen ? p.imagen.replace(/\.[^./]+$/, "") : `img/${String(p.id).padStart(2, "0")}`;
const imgSrc = p => p.imagen || `${imgBase(p)}.${EXTS_IMG[0]}`;

function imgAttrs(p, lazy) {
  return `src="${imgSrc(p)}" alt="${esc(p.nombre)}" data-base="${esc(imgBase(p))}" data-nombre="${esc(p.nombre)}" data-cat="${esc(p.categoria)}" data-paso="${p.imagen ? -1 : 0}" ${lazy ? 'loading="lazy"' : ""} onerror="imgFallback(this)"`;
}

function imgFallback(img) {
  const paso = Number(img.dataset.paso) + 1;
  if (paso >= EXTS_IMG.length) {
    img.onerror = null;
    img.src = placeholder(img.dataset.nombre, img.dataset.cat);
    return;
  }
  img.dataset.paso = paso;
  img.src = `${img.dataset.base}.${EXTS_IMG[paso]}`;
}

function cardHTML(p) {
  return `
    <a class="card" href="producto.html?id=${p.id}">
      <img ${imgAttrs(p, true)}>
      <div class="card__body">
        <span class="tag">${esc(p.categoria)}</span>
        <h3>${esc(p.nombre)}</h3>
        <p class="precio">${precioMX(p.precio)}</p>
      </div>
    </a>`;
}

function renderLayout() {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  if (header) {
    const cats = CATEGORIAS.map(c =>
      `<a href="catalogo.html?cat=${encodeURIComponent(c)}">${esc(c)}</a>`).join("");
    header.innerHTML = `
      <header class="topbar">
        <div class="container topbar__inner">
          <a href="index.html" class="logo"><img src="img/logo.png" alt="${esc(NOMBRE_SITIO)}"></a>
          <form class="topbar__search" action="catalogo.html" method="get">
            <input type="search" name="q" placeholder="Buscar productos..." autocomplete="off">
            <button type="submit">Buscar</button>
          </form>
          <nav>
            <a href="index.html">Inicio</a>
            <a href="catalogo.html">Catálogo</a>
            <div class="dropdown">
              <button type="button" class="dropdown__btn">Categorías ▾</button>
              <div class="dropdown__menu">${cats}</div>
            </div>
            <a href="servicios.html">Servicios</a>
            <a href="quienes-somos.html">Quiénes somos</a>
            <a href="contacto.html">Contacto</a>
          </nav>
        </div>
      </header>`;
  }

  if (footer) {
    footer.innerHTML = `
      <footer class="footer"><div class="container"><p>© ${new Date().getFullYear()} ${esc(NOMBRE_SITIO)} · ${esc(CONTACTO)}</p></div></footer>
      ${WHATSAPP
        ? `<a class="wa-float" href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener">¿Dudas? Contáctanos</a>`
        : `<a class="wa-float wa-float--mail" href="contacto.html">¿Dudas? Contáctanos</a>`}`;
  }
}
renderLayout();
