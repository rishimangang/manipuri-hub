const listings = [
  { name: "Ema Keithel Kitchen", category: "Food", location: "Paona Bazar, Imphal", rating: "4.8", emoji: "🍲", color: "#e8b879", description: "A cosy spot inspired by the flavours of Manipuri home cooking. Try the seasonal thali and locally brewed tea.", contact: "tel:+919876543210" },
  { name: "The Green Spoon Café", category: "Food", location: "Keishampat, Imphal", rating: "4.6", emoji: "☕", color: "#b7d5b3", description: "A relaxed café for coffee, baked treats and an unhurried catch-up with friends.", contact: "tel:+919876543211" },
  { name: "Ima Market Finds", category: "Shops", location: "Khwairamband, Imphal", rating: "4.9", emoji: "🧺", color: "#e8a390", description: "Handmade textiles, woven baskets and thoughtful gifts celebrating the craft of Manipur.", contact: "tel:+919876543212" },
  { name: "Sana Bike Care", category: "Services", location: "Tiddim Road, Imphal", rating: "4.5", emoji: "🛵", color: "#9ac5c8", description: "Friendly two-wheeler servicing, puncture repairs and practical advice for your next ride.", contact: "tel:+919876543213" },
  { name: "Loktak Lake View", category: "Places", location: "Sendra, Bishnupur", rating: "4.9", emoji: "🛶", color: "#86bdb7", description: "A peaceful gateway to Manipur’s iconic floating lake. Best enjoyed early morning or at sunset.", contact: "https://maps.google.com/?q=Loktak+Lake" },
  { name: "Kangla Heritage Walk", category: "Places", location: "Kangla, Imphal", rating: "4.7", emoji: "🏯", color: "#d7b67d", description: "Step into a place of deep cultural history at the historic heart of Imphal.", contact: "https://maps.google.com/?q=Kangla+Fort" },
  { name: "Bright Home Repairs", category: "Services", location: "Singjamei, Imphal", rating: "4.6", emoji: "🔧", color: "#a9b9df", description: "For small home fixes, appliance help and a dependable local repair visit.", contact: "tel:+919876543214" },
  { name: "Phanek & Co.", category: "Shops", location: "Thangal Bazar, Imphal", rating: "4.7", emoji: "🧶", color: "#e5a9c3", description: "A colourful collection of traditional handwoven phaneks and contemporary local clothing.", contact: "tel:+919876543215" }
];

const cardGrid = document.querySelector("#cardGrid");
const searchInput = document.querySelector("#searchInput");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");
const modal = document.querySelector("#detailsModal");
let activeCategory = "all";

function cardTemplate(item, index) {
  return `<article class="card"><div class="card-visual" style="--card-bg:${item.color}"><span class="card-tag">${item.category}</span>${item.emoji}</div><div class="card-body"><div class="card-title-row"><h3>${item.name}</h3><span class="rating">★ ${item.rating}</span></div><p class="card-location">⌖ ${item.location}</p><div class="card-actions"><button class="details-button" data-index="${index}">View details →</button><a class="contact-link" href="${item.contact}" target="${item.contact.startsWith("http") ? "_blank" : "_self"}" aria-label="Contact ${item.name}">↗</a></div></div></article>`;
}
function render() {
  const term = searchInput.value.trim().toLowerCase();
  const matches = listings.filter(item => (activeCategory === "all" || item.category === activeCategory) && `${item.name} ${item.category} ${item.location} ${item.description}`.toLowerCase().includes(term));
  cardGrid.innerHTML = matches.map(item => cardTemplate(item, listings.indexOf(item))).join("");
  emptyState.hidden = matches.length !== 0;
  resultCount.textContent = term || activeCategory !== "all" ? `${matches.length} ${matches.length === 1 ? "place" : "places"} found` : "Explore hand-picked local favourites";
  document.querySelector("#listing-label").textContent = activeCategory === "all" ? "LOCAL FAVOURITES" : activeCategory.toUpperCase();
  document.querySelector("#listing-title").textContent = activeCategory === "all" ? "Made for a good day out" : `Explore ${activeCategory.toLowerCase()} nearby`;
}
document.querySelectorAll(".category").forEach(button => button.addEventListener("click", () => {
  activeCategory = button.dataset.category;
  document.querySelectorAll(".category").forEach(item => { item.classList.toggle("active", item === button); item.setAttribute("aria-selected", item === button); });
  render(); document.querySelector(".listings").scrollIntoView({ behavior: "smooth", block: "start" });
}));
document.querySelector("#searchForm").addEventListener("submit", event => { event.preventDefault(); activeCategory = "all"; document.querySelectorAll(".category").forEach((item, i) => { item.classList.toggle("active", i === 0); item.setAttribute("aria-selected", i === 0); }); render(); document.querySelector(".listings").scrollIntoView({ behavior: "smooth", block: "start" }); });
searchInput.addEventListener("input", render);
document.querySelector("#showAll").addEventListener("click", () => { searchInput.value = ""; activeCategory = "all"; document.querySelectorAll(".category").forEach((item, i) => item.classList.toggle("active", i === 0)); render(); });
cardGrid.addEventListener("click", event => { const button = event.target.closest(".details-button"); if (!button) return; const item = listings[button.dataset.index]; document.querySelector("#modalContent").innerHTML = `<div class="modal-visual" style="--card-bg:${item.color}">${item.emoji}</div><div class="modal-body"><p class="eyebrow">${item.category} · ★ ${item.rating}</p><h2 id="modalTitle">${item.name}</h2><p>⌖ ${item.location}</p><p>${item.description}</p><p class="modal-meta">This is a sample listing. Replace its details and contact link in <code>script.js</code> when you add a real local business.</p><a class="modal-contact" href="${item.contact}" target="${item.contact.startsWith("http") ? "_blank" : "_self"}">${item.contact.startsWith("http") ? "Open directions" : "Contact listing"} →</a></div>`; modal.showModal(); });
document.querySelector("#closeModal").addEventListener("click", () => modal.close());
modal.addEventListener("click", event => { if (event.target === modal) modal.close(); });
document.querySelector(".menu-button").addEventListener("click", event => { const nav = document.querySelector(".nav-links"); const isOpen = nav.classList.toggle("open"); event.currentTarget.setAttribute("aria-expanded", isOpen); });
document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", () => document.querySelector(".nav-links").classList.remove("open")));
document.querySelector("#year").textContent = new Date().getFullYear();
render();
