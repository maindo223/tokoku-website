"use strict";

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

const products = [
  {
    name: 'Rumble (Elemental)',
    price: 'Rp 2.500',
    image: 'download.webs',
    link: 'https://www.itemku.com/dagangan/blox-fruits-roblox-rumble-elemental-aditgemer-shop/2787904'
  },
  {
    name: 'Pulsa XL 15.000',
    price: 'Rp17.000',
    image: 'images.jpeg',
    link: 'https://aditgemer.com/beli/pulsa-telkomsel-50rb'
  },
  {
    name: 'Voucher Game Steam 100rb',
    price: 'Rp99.000',
    image: 'https://i.postimg.cc/DzMqChqF/steam-voucher.png',
    link: 'https://aditgemer.com/beli/steam-voucher-100rb'
  },
  {
    name: 'Mobile Legends • Weekly Diamond Pass',
    price: 'Rp23.500',
    image: 'download (1).jpeg',
    link: 'https://www.itemku.com/dagangan/mobile-legends-weekly-diamond-pass-aditgemer-shop/3070305'
  },
  // Tambah produk lain sesuai kebutuhan
];

// Escape HTML special chars untuk keamanan
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function createProductCard(product, index) {
  const card = document.createElement('article');
  card.className = 'product-card enter-' + (index % 4);
  card.tabIndex = 0;
  card.setAttribute('aria-label', product.name + ' - ' + product.price);

  card.innerHTML = `
    <img class="product-thumb" loading="lazy" src="${product.image}" alt="${escapeHtml(product.name)}" />
    <div class="card-body">
      <h3>${escapeHtml(product.name)}</h3>
      <div class="price">${escapeHtml(product.price)}</div>
    </div>
    <div class="card-actions">
      <a class="buy-btn" href="${product.link}" target="_blank" rel="noopener">Beli Sekarang</a>
    </div>
  `;

  // efek tilt interaktif saat mouse move
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 6;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.04)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });

  // keyboard enter / space untuk klik tombol beli
  card.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      const a = card.querySelector('.buy-btn');
      if (a) a.click();
    }
  });

  return card;
}

function renderProducts(productList) {
  productGrid.innerHTML = '';
  if (productList.length === 0) {
    productGrid.innerHTML = '<p style="text-align:center;opacity:0.5;">Produk tidak ditemukan.</p>';
    return;
  }
  productList.forEach((product, i) => {
    const card = createProductCard(product, i);
    productGrid.appendChild(card);
  });
}

function filterProducts(searchTerm, products) {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return products;
  return products.filter(p => p.name.toLowerCase().includes(term));
}

function sortProducts(products, sortBy) {
  const sorted = [...products];
  if (sortBy === 'price-asc') {
    sorted.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
  } else if (sortBy === 'price-desc') {
    sorted.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
  }
  return sorted;
}

function extractPrice(priceString) {
  // Contoh: "Rp20.000" -> 20000 number
  const num = priceString.replace(/[^0-9]/g, '');
  return Number(num);
}

function updateDisplay() {
  const searchTerm = searchInput.value;
  const sortBy = sortSelect.value;
  let filtered = filterProducts(searchTerm, products);
  let sorted = sortProducts(filtered, sortBy);
  renderProducts(sorted);
}

// Event listeners
searchInput.addEventListener('input', updateDisplay);
sortSelect.addEventListener('change', updateDisplay);

// initial render
updateDisplay();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if(window.scrollY > 30) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});




