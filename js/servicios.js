// Productos de la categoría "Servicios"
document.getElementById("servicios-catalogo").innerHTML =
  PRODUCTOS.filter(p => p.categoria === "Servicios").map(cardHTML).join("");

const btn = document.getElementById("waServicios");
btn.href = cotizarURL("Hola, me interesa cotizar un servicio de instalación");
btn.textContent = WHATSAPP ? "Escríbenos por WhatsApp" : "Escríbenos por correo";
if (WHATSAPP) { btn.target = "_blank"; btn.rel = "noopener"; }
