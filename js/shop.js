/**
 * TryLocal — Shop Page Logic
 * Product catalogue, filtering, search, cart integration
 */

// ===== SEEDED PRODUCT DATA =====
const STORES = [
  { id: 's1', name: 'Vogue Studio', area: 'Andheri West', lat: 19.1365, lng: 72.8296, rating: 4.6, deliveryTime: '30 min' },
  { id: 's2', name: 'Grace Apparel Hub', area: 'Andheri West', lat: 19.1330, lng: 72.8260, rating: 4.8, deliveryTime: '25 min' },
  { id: 's3', name: 'Bandra Denim House', area: 'Bandra West', lat: 19.0596, lng: 72.8295, rating: 4.5, deliveryTime: '40 min' },
  { id: 's4', name: 'Colaba Stitch Co.', area: 'Andheri West', lat: 19.1398, lng: 72.8345, rating: 4.3, deliveryTime: '35 min' },
  { id: 's5', name: 'Juhu Wardrobe', area: 'Juhu', lat: 19.0988, lng: 72.8267, rating: 4.7, deliveryTime: '35 min' },
  { id: 's6', name: 'Lokhandwala Boutique', area: 'Andheri West', lat: 19.1420, lng: 72.8310, rating: 4.4, deliveryTime: '20 min' },
];

const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🛍️' },
  { id: 'shirts', name: 'Shirts', icon: '👔' },
  { id: 'dresses', name: 'Dresses', icon: '👗' },
  { id: 'jeans', name: 'Jeans & Pants', icon: '👖' },
  { id: 'jackets', name: 'Jackets', icon: '🧥' },
  { id: 'ethnic', name: 'Ethnic Wear', icon: '🥻' },
  { id: 'accessories', name: 'Accessories', icon: '👜' },
];

const PRODUCTS = [
  { id: 1, name: 'Textured Sage Linen Shirt', category: 'shirts', store: 's1', price: 1450, originalPrice: 1899, sizes: ['S', 'M', 'L', 'XL'], colors: ['Sage', 'White', 'Beige'], rating: 4.5, reviews: 128, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop', badge: 'Bestseller' },
  { id: 2, name: 'Olive Tailored Blazer', category: 'jackets', store: 's4', price: 2890, originalPrice: 3499, sizes: ['M', 'L', 'XL'], colors: ['Olive', 'Charcoal', 'Navy'], rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop', badge: 'Premium' },
  { id: 3, name: 'Comfort Indigo Slim Jeans', category: 'jeans', store: 's3', price: 1790, originalPrice: 2299, sizes: ['28', '30', '32', '34', '36'], colors: ['Indigo', 'Black', 'Light Blue'], rating: 4.3, reviews: 256, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop', badge: '' },
  { id: 4, name: 'Floral Cotton Summer Dress', category: 'dresses', store: 's2', price: 1650, originalPrice: 2199, sizes: ['XS', 'S', 'M', 'L'], colors: ['Floral Pink', 'Floral Blue', 'White'], rating: 4.8, reviews: 312, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop', badge: 'Trending' },
  { id: 5, name: 'Classic Pleated Beige Chinos', category: 'jeans', store: 's5', price: 1550, originalPrice: 1899, sizes: ['30', '32', '34', '36'], colors: ['Beige', 'Olive', 'Grey'], rating: 4.4, reviews: 167, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop', badge: '' },
  { id: 6, name: 'Monochrome City Jacket', category: 'jackets', store: 's6', price: 2400, originalPrice: 3199, sizes: ['M', 'L', 'XL', 'XXL'], colors: ['Black', 'Charcoal'], rating: 4.6, reviews: 94, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', badge: 'New' },
  { id: 7, name: 'Silk Anarkali Kurta Set', category: 'ethnic', store: 's2', price: 3200, originalPrice: 4500, sizes: ['S', 'M', 'L', 'XL'], colors: ['Maroon', 'Teal', 'Gold'], rating: 4.9, reviews: 201, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop', badge: 'Premium' },
  { id: 8, name: 'Oversized Denim Jacket', category: 'jackets', store: 's3', price: 2100, originalPrice: 2799, sizes: ['S', 'M', 'L', 'XL'], colors: ['Light Blue', 'Dark Wash'], rating: 4.5, reviews: 143, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=500&fit=crop', badge: '' },
  { id: 9, name: 'Embroidered Palazzo Pants', category: 'ethnic', store: 's5', price: 1350, originalPrice: 1799, sizes: ['S', 'M', 'L', 'XL'], colors: ['White', 'Black', 'Navy'], rating: 4.2, reviews: 78, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop', badge: '' },
  { id: 10, name: 'Premium Oxford Button-Down', category: 'shirts', store: 's1', price: 1699, originalPrice: 2199, sizes: ['S', 'M', 'L', 'XL'], colors: ['White', 'Light Blue', 'Pink'], rating: 4.6, reviews: 187, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop', badge: 'Bestseller' },
  { id: 11, name: 'A-Line Midi Skirt', category: 'dresses', store: 's6', price: 1250, originalPrice: 1699, sizes: ['XS', 'S', 'M', 'L'], colors: ['Beige', 'Black', 'Burgundy'], rating: 4.4, reviews: 112, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=500&fit=crop', badge: '' },
  { id: 12, name: 'Leather Tote Bag', category: 'accessories', store: 's4', price: 2450, originalPrice: 3299, sizes: ['One Size'], colors: ['Tan', 'Black', 'Burgundy'], rating: 4.7, reviews: 298, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=500&fit=crop', badge: 'Popular' },
  { id: 13, name: 'Bandhani Silk Dupatta', category: 'ethnic', store: 's2', price: 890, originalPrice: 1299, sizes: ['One Size'], colors: ['Red', 'Yellow', 'Pink'], rating: 4.3, reviews: 67, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop', badge: '' },
  { id: 14, name: 'Relaxed Fit Cargo Pants', category: 'jeans', store: 's6', price: 1850, originalPrice: 2399, sizes: ['30', '32', '34', '36'], colors: ['Olive', 'Khaki', 'Black'], rating: 4.5, reviews: 134, image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=400&h=500&fit=crop', badge: 'New' },
  { id: 15, name: 'Printed Wrap Dress', category: 'dresses', store: 's1', price: 1980, originalPrice: 2599, sizes: ['XS', 'S', 'M', 'L'], colors: ['Green Print', 'Blue Print'], rating: 4.6, reviews: 156, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop', badge: 'Trending' },
  { id: 16, name: 'Statement Chain Necklace', category: 'accessories', store: 's5', price: 750, originalPrice: 999, sizes: ['One Size'], colors: ['Gold', 'Silver'], rating: 4.1, reviews: 45, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop', badge: '' },
  { id: 17, name: 'Mandarin Collar Kurta', category: 'ethnic', store: 's4', price: 1599, originalPrice: 2099, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['White', 'Navy', 'Maroon'], rating: 4.5, reviews: 189, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop', badge: '' },
  { id: 18, name: 'Striped Linen Casual Shirt', category: 'shirts', store: 's6', price: 1299, originalPrice: 1699, sizes: ['S', 'M', 'L', 'XL'], colors: ['Blue Stripe', 'Green Stripe'], rating: 4.3, reviews: 98, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop', badge: '' },
];

// ===== SHOP PAGE CONTROLLER =====
let currentCategory = 'all';
let currentSort = 'popular';
let searchQuery = '';
let priceRange = [0, 5000];

function getStoreById(id) {
  return STORES.find(s => s.id === id) || {};
}

function getFilteredProducts() {
  let filtered = [...PRODUCTS];

  // Category filter
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  // Search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      getStoreById(p.store).name?.toLowerCase().includes(q)
    );
  }

  // Price range
  filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

  // Sort
  switch (currentSort) {
    case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
    case 'newest': filtered.sort((a, b) => b.id - a.id); break;
    default: filtered.sort((a, b) => b.reviews - a.reviews); break; // popular
  }

  return filtered;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function renderProducts() {
  const grid = document.getElementById('shop-products-grid');
  const countEl = document.getElementById('shop-results-count');
  if (!grid) return;

  const products = getFilteredProducts();
  if (countEl) countEl.textContent = `${products.length} product${products.length !== 1 ? 's' : ''} found`;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="shop-empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search query</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(p => {
    const store = getStoreById(p.store);
    const discount = Math.round((1 - p.price / p.originalPrice) * 100);
    const inCart = getCart().some(item => item.id === p.id);

    return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-img-wrap">
          <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          <button class="product-wishlist-btn" title="Add to wishlist">♡</button>
          <div class="product-quick-actions">
            <button class="quick-add-btn ${inCart ? 'in-cart' : ''}" data-id="${p.id}" title="${inCart ? 'In Cart' : 'Add to Trial Bag'}">
              ${inCart ? '✓ Added' : '+ Add to Trial'}
            </button>
          </div>
        </div>
        <div class="product-info">
          <div class="product-store-tag">
            <span class="store-dot"></span>
            ${store.name} · ${store.deliveryTime}
          </div>
          <h3 class="product-name">${p.name}</h3>
          <div class="product-rating">
            <span class="stars">${renderStars(p.rating)}</span>
            <span class="rating-count">(${p.reviews})</span>
          </div>
          <div class="product-price-row">
            <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
            <span class="product-original-price">₹${p.originalPrice.toLocaleString('en-IN')}</span>
            <span class="product-discount">${discount}% off</span>
          </div>
          <div class="product-sizes">
            ${p.sizes.slice(0, 4).map(s => `<span class="size-chip">${s}</span>`).join('')}
            ${p.sizes.length > 4 ? `<span class="size-chip more">+${p.sizes.length - 4}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Bind quick add buttons
  grid.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const product = PRODUCTS.find(p => p.id === id);
      if (product && !getCart().some(item => item.id === id)) {
        addToCart({ ...product, selectedSize: product.sizes[0], selectedColor: product.colors[0] });
        btn.classList.add('in-cart');
        btn.innerHTML = '✓ Added';
        showToast(`${product.name} added to trial bag!`);
      }
    });
  });
}

function renderCategories() {
  const container = document.getElementById('shop-categories');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button class="shop-cat-btn ${cat.id === currentCategory ? 'active' : ''}" data-cat="${cat.id}">
      <span class="cat-icon">${cat.icon}</span>
      <span class="cat-name">${cat.name}</span>
    </button>
  `).join('');

  container.querySelectorAll('.shop-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.cat;
      renderCategories();
      renderProducts();
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('shop-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'shop-toast';
    toast.className = 'shop-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function initShopPage() {
  renderCategories();
  renderProducts();

  // Search
  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        searchQuery = searchInput.value;
        renderProducts();
      }, 300);
    });
  }

  // Sort
  const sortSelect = document.getElementById('shop-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      renderProducts();
    });
  }

  // Price filter
  const priceSlider = document.getElementById('shop-price-slider');
  const priceLabel = document.getElementById('shop-price-label');
  if (priceSlider) {
    priceSlider.addEventListener('input', () => {
      priceRange[1] = parseInt(priceSlider.value);
      if (priceLabel) priceLabel.textContent = `Up to ₹${priceRange[1].toLocaleString('en-IN')}`;
      renderProducts();
    });
  }
}

// ===== CART PAGE CONTROLLER =====
function renderCartPage() {
  const cartContainer = document.getElementById('cart-items-list');
  const cartSummary = document.getElementById('cart-summary');
  const emptyState = document.getElementById('cart-empty-state');
  if (!cartContainer) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartContainer.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'none';
    if (emptyState) emptyState.style.display = 'flex';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  cartContainer.style.display = 'flex';
  if (cartSummary) cartSummary.style.display = 'flex';

  cartContainer.innerHTML = cart.map(item => {
    const store = getStoreById(item.store);
    return `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-img-wrap">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-store">${store.name || 'TryLocal Store'} · ${store.deliveryTime || '30 min'}</div>
          <h3 class="cart-item-name">${item.name}</h3>
          <div class="cart-item-meta">
            <span>Size: <strong>${item.selectedSize || item.sizes?.[0] || '-'}</strong></span>
            <span>Color: <strong>${item.selectedColor || item.colors?.[0] || '-'}</strong></span>
          </div>
          <div class="cart-item-price-row">
            <span class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</span>
            <span class="cart-item-original">₹${item.originalPrice?.toLocaleString('en-IN') || ''}</span>
          </div>
        </div>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
          </div>
          <button class="cart-remove-btn" data-id="${item.id}" title="Remove">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Quantity buttons
  cartContainer.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const item = getCart().find(i => i.id === id);
      if (item && item.qty > 1) {
        updateCartQty(id, item.qty - 1);
        renderCartPage();
      }
    });
  });
  cartContainer.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const item = getCart().find(i => i.id === id);
      if (item) {
        updateCartQty(id, item.qty + 1);
        renderCartPage();
      }
    });
  });
  cartContainer.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(parseInt(btn.dataset.id));
      renderCartPage();
      showToast('Item removed from trial bag');
    });
  });

  // Summary
  if (cartSummary) {
    const subtotal = getCartTotal();
    const trialFee = 200;
    const feeWaived = subtotal > 0;
    const total = subtotal + (feeWaived ? 0 : trialFee);
    const store = getSelectedStore();

    cartSummary.innerHTML = `
      <h3 class="summary-title">Trial Bag Summary</h3>
      <div class="summary-store">
        <span>📍</span>
        <span>${store ? store.name + ', ' + store.area : 'Select a store on the map below'}</span>
      </div>
      <div class="summary-rows">
        <div class="summary-row">
          <span>Items (${getCartCount()})</span>
          <span>₹${subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div class="summary-row">
          <span>Home Trial Fee</span>
          <span>₹${trialFee}</span>
        </div>
        <div class="summary-row summary-discount">
          <span>Trial Fee Adjustment</span>
          <span>${feeWaived ? `- ₹${trialFee} (Waived)` : '₹0'}</span>
        </div>
        <div class="summary-row summary-total">
          <span>Total Payable</span>
          <span>₹${total.toLocaleString('en-IN')}</span>
        </div>
      </div>
      <button class="btn btn-lg btn-primary summary-checkout-btn" style="width:100%; margin-top:1rem;" onclick="handleCheckout()">
        <span>🛵 Book Home Trial</span>
      </button>
      <p class="summary-note">💡 Trial fee is waived when you keep at least 1 item. Our valet collects returns on the spot!</p>
    `;
  }
}

function handleCheckout() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html?redirect=cart.html';
    return;
  }
  const store = getSelectedStore();
  if (!store) {
    showToast('Please select a store from the map first!');
    const mapSection = document.getElementById('cart-map-section');
    if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  // Simulate booking
  showToast('🎉 Trial booked! Your valet will arrive in ~' + store.deliveryTime);
  setTimeout(() => {
    setCart([]);
    renderCartPage();
  }, 2000);
}

// ===== MAP / LOCATION =====
function initStoreMap() {
  const mapContainer = document.getElementById('store-map');
  if (!mapContainer || typeof L === 'undefined') return;

  // Center on Andheri West
  const map = L.map('store-map').setView([19.1365, 72.8296], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  // Custom icon
  const storeIcon = L.divIcon({
    className: 'store-map-marker',
    html: '<div class="marker-pin">🏪</div>',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -42],
  });

  const selectedStore = getSelectedStore();

  STORES.forEach(store => {
    const marker = L.marker([store.lat, store.lng], { icon: storeIcon }).addTo(map);
    const isSelected = selectedStore && selectedStore.id === store.id;

    marker.bindPopup(`
      <div class="map-popup">
        <strong>${store.name}</strong>
        <div>${store.area} · ⭐ ${store.rating}</div>
        <div>🛵 ${store.deliveryTime} delivery</div>
        <button class="map-select-store-btn" onclick="selectStoreFromMap('${store.id}')">${isSelected ? '✓ Selected' : 'Select Store'}</button>
      </div>
    `);

    if (isSelected) marker.openPopup();
  });

  // Store selector dropdown
  renderStoreDropdown();
}

function selectStoreFromMap(storeId) {
  const store = STORES.find(s => s.id === storeId);
  if (store) {
    setSelectedStore(store);
    showToast(`Selected: ${store.name}, ${store.area}`);
    renderStoreDropdown();
    renderCartPage();
    // Refresh map popups
    setTimeout(() => initStoreMap(), 300);
  }
}

function renderStoreDropdown() {
  const dropdown = document.getElementById('store-dropdown');
  if (!dropdown) return;

  const selected = getSelectedStore();

  dropdown.innerHTML = `
    <option value="">Choose a nearby store...</option>
    ${STORES.map(s => `
      <option value="${s.id}" ${selected && selected.id === s.id ? 'selected' : ''}>
        ${s.name} — ${s.area} (${s.deliveryTime}) ⭐ ${s.rating}
      </option>
    `).join('')}
  `;

  dropdown.addEventListener('change', () => {
    const store = STORES.find(s => s.id === dropdown.value);
    if (store) {
      setSelectedStore(store);
      showToast(`Selected: ${store.name}`);
      renderCartPage();
      initStoreMap();
    }
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('shop-products-grid')) initShopPage();
  if (document.getElementById('cart-items-list')) {
    renderCartPage();
    initStoreMap();
  }
});
