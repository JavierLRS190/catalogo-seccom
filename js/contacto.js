const filas = [
  ["Correo", `<a href="mailto:${esc(EMAIL)}">${esc(EMAIL)}</a>`],
  TELEFONO ? ["Teléfono", `<a href="tel:${esc(TELEFONO.replace(/[^\d+]/g, ""))}">${esc(TELEFONO)}</a>`] : null,
  WHATSAPP ? ["WhatsApp", `<a href="https://wa.me/${esc(WHATSAPP)}" target="_blank" rel="noopener">Escríbenos por WhatsApp</a>`] : null,
  DIRECCION ? ["Dirección", esc(DIRECCION)] : null
].filter(Boolean);

document.getElementById("contactoLista").innerHTML =
  filas.map(([titulo, valor]) => `<li><strong>${titulo}</strong><span>${valor}</span></li>`).join("");

// Formulario NO funcional (demo)
document.getElementById("formContacto").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formMsg").hidden = false;
  e.target.reset();
});
