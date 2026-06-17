const WA_NUMBER = "573044529491";

let categoriaActual = "todos";
let textoBusqueda = "";

const productos = [
    {
      id: 1, cat: "perfumes",
      nombre: "Valentino Uomo Eau De Toilette",
      marca: "Valentino",
      desc: "La combinación de notas especiadas y amaderadas con el toque fresco e inesperado de la bergamota la convierten en una fragancia distintiva y sofisticada. 50ml.",
      precio: 250000,
      img: "img/productos/perfume-valentino-uomo.webp",
      badge: "En camino"
    },
    {
      id: 2, cat: "bocinas",
      nombre: "JBL GO 4",
      marca: "JBL",
      desc: "Altavoz portátil, resistente al agua IP67, 7h de batería, sonido potente.",
      precio: 220000,
      img: "img/productos/jbl-go4.webp",
      badge: "Nuevo"
    },
    {
      id: 3, cat: "cargadores",
      nombre: "Adaptador de corriente USB-C de 20 W",
      marca: "Apple",
      desc: "Cargador rápido para iPhone, iPad y otros dispositivos USB-C. Compacto y eficiente.",
      precio: 110000,
      img: "img/productos/cargador-apple-20w-tipo-c.webp",
      badge: "Nuevo"
    },
    {
      id: 4, cat: "relojes",
      nombre: "Reloj Casio MTP-1302D-7A1VDF",
      marca: "Casio",
      desc: "Reloj inteligente con pantalla AMOLED, resistente al agua. Funciones de salud y actividad.",
      precio: 280000,
      img: "img/productos/reloj-casio-mtp-1302d-7a1vdf.jpg",
      badge: "Nuevo"
    },
    {
      id: 5, cat: "fuentes",
      nombre: "CORSAIR CX650 80 Plus Bronce",
      marca: "Corsair",
      desc: "Fuente de alimentación de 650W, certificación 80 Plus Bronze, ventilador de 120mm, eficiente y silenciosa.",
      precio: 310000,
      img: "img/productos/fuente-corsair-cx650.jpg",
      badge: "Nuevo"
    },
];

function formatPrecio(n) {
  return "$" + n.toLocaleString("es-CO");
}

function waLink(producto) {
  const msg = encodeURIComponent(
    `Hola, me interesa el producto: *${producto.nombre}* (${producto.marca}) por ${formatPrecio(producto.precio)}. ¿Está disponible?`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

function renderCard(p, delay) {
  return `
    <div class="card" style="animation-delay:${delay}ms">
        <div class="card-img">
            ${p.badge ? `<span class="${p.badge === "En camino" ? "card-badge-camino" : "card-badge"}">${p.badge}</span>` : ""}
            <img src="${p.img}" alt="${p.nombre}">
        </div>
      <div class="card-body">
        <span class="card-category">${p.cat}</span>
        <div class="card-name">${p.nombre}</div>
        <div class="card-desc">${p.marca} — ${p.desc}</div>
      </div>
      <div class="card-footer">
        <div class="card-price">
          <small>Precio</small>
          ${formatPrecio(p.precio)}
        </div>
        <a class="btn-wa" href="${waLink(p)}" target="_blank">
          ${p.badge === "En camino" ? "Consultar" : "Comprar"}
        </a>
      </div>
    </div>
  `;
}

function render() {
  const grid = document.getElementById("grid");

  let lista = productos;

  // Filtrar por categoría
  if (categoriaActual !== "todos") {
    lista = lista.filter(p => p.cat === categoriaActual);
  }

  // Filtrar por nombre o marca
  if (textoBusqueda.trim() !== "") {
    lista = lista.filter(p =>
        p.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
        p.marca.toLowerCase().includes(textoBusqueda.toLowerCase())
    );
  }

  if (lista.length === 0) {
    grid.innerHTML = `
      <div class="empty">
        <span>🔍</span>
        No encontramos productos con ese nombre.
      </div>
    `;
    return;
  }

  grid.innerHTML = lista.map((p, i) => renderCard(p, i * 60)).join("");
}

document.getElementById("filters").addEventListener("click", e => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  categoriaActual = btn.dataset.cat;
    render();
});

render();

document.getElementById("searchInput").addEventListener("input", e => {
  textoBusqueda = e.target.value;
  render();
});