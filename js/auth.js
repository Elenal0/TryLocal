/**
 * TryLocal — Auth & Location Management System (localStorage-based, seeded data)
 */

const SEEDED_USERS = [
  { email: 'demo@trylocal.in', password: 'demo123', name: 'Priya Sharma', phone: '9876543210', address: 'Grace Pinnacle, 1105, Andheri West, Mumbai' },
  { email: 'test@trylocal.in', password: 'test123', name: 'Rahul Mehta', phone: '9988776655', address: 'Lokhandwala Complex, Andheri West, Mumbai' },
  { email: 'nupur@spit.ac.in', password: 'spit2025', name: 'Nupur Thakur', phone: '8340602621', address: 'SPIT Campus, Munshi Nagar, Andheri West' },
];

const ANDHERI_STORES = [
  { id: 's1', name: 'Vogue Studio', area: 'Andheri West', lat: 19.1365, lng: 72.8296, rating: 4.6, deliveryTime: '30 min', address: 'Shop 4, Link Road, Andheri West' },
  { id: 's2', name: 'Grace Apparel Hub', area: 'Andheri West', lat: 19.1330, lng: 72.8260, rating: 4.8, deliveryTime: '25 min', address: 'Near Infinity Mall, Andheri West' },
  { id: 's3', name: 'Bandra Denim House', area: 'Bandra West', lat: 19.0596, lng: 72.8295, rating: 4.5, deliveryTime: '40 min', address: 'Hill Road, Bandra West' },
  { id: 's4', name: 'Colaba Stitch Co.', area: 'Andheri West', lat: 19.1398, lng: 72.8345, rating: 4.3, deliveryTime: '35 min', address: 'Oshiwara New Link Rd, Andheri West' },
  { id: 's5', name: 'Juhu Wardrobe', area: 'Juhu', lat: 19.0988, lng: 72.8267, rating: 4.7, deliveryTime: '35 min', address: 'Juhu Tara Road, Juhu' },
  { id: 's6', name: 'Lokhandwala Boutique', area: 'Andheri West', lat: 19.1420, lng: 72.8310, rating: 4.4, deliveryTime: '20 min', address: 'Main Market, Lokhandwala Complex' },
];

const PRESET_AREAS = [
  { name: 'Andheri West', lat: 19.1365, lng: 72.8296, address: 'Grace Pinnacle, 1105, Andheri West, Mumbai' },
  { name: 'Lokhandwala Complex', lat: 19.1420, lng: 72.8310, address: 'Lokhandwala Market, Andheri West, Mumbai' },
  { name: 'SPIT Campus', lat: 19.1234, lng: 72.8361, address: 'Sardar Patel Institute of Tech, Bhavans Campus, Andheri West' },
  { name: 'Versova Beach', lat: 19.1325, lng: 72.8152, address: 'Yari Road, Versova, Andheri West, Mumbai' },
  { name: 'Juhu Scheme', lat: 19.1030, lng: 72.8270, address: '10th Road, JVPD Scheme, Juhu, Mumbai' },
  { name: 'Bandra West', lat: 19.0600, lng: 72.8320, address: 'Pali Hill / Linking Road, Bandra West, Mumbai' }
];

// Seed users into localStorage on first load
function seedUsers() {
  if (!localStorage.getItem('tl_users')) {
    localStorage.setItem('tl_users', JSON.stringify(SEEDED_USERS));
  }
  if (!localStorage.getItem('tl_location')) {
    localStorage.setItem('tl_location', JSON.stringify(PRESET_AREAS[0]));
  }
  if (!localStorage.getItem('tl_selected_store')) {
    localStorage.setItem('tl_selected_store', JSON.stringify(ANDHERI_STORES[0]));
  }
}

function getUsers() {
  return JSON.parse(localStorage.getItem('tl_users') || '[]');
}

function getCurrentUser() {
  const u = localStorage.getItem('tl_current_user');
  return u ? JSON.parse(u) : null;
}

function setCurrentUser(user) {
  localStorage.setItem('tl_current_user', JSON.stringify(user));
}

function logout() {
  localStorage.removeItem('tl_current_user');
  window.location.href = 'index.html';
}

function login(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (user) {
    setCurrentUser(user);
    return { success: true, user };
  }
  return { success: false, message: 'Invalid email or password.' };
}

function register(name, email, password, phone) {
  const users = getUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: 'An account with this email already exists.' };
  }
  const newUser = { email, password, name, phone, address: 'Andheri West, Mumbai' };
  users.push(newUser);
  localStorage.setItem('tl_users', JSON.stringify(users));
  setCurrentUser(newUser);
  return { success: true, user: newUser };
}

// Cart helpers
function getCart() {
  return JSON.parse(localStorage.getItem('tl_cart') || '[]');
}

function setCart(cart) {
  localStorage.setItem('tl_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  setCart(cart);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  setCart(cart);
}

function updateCartQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty = Math.max(1, qty);
  }
  setCart(cart);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-count-badge');
  const count = getCartCount();
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

// Location helpers
function getUserLocation() {
  return JSON.parse(localStorage.getItem('tl_location') || JSON.stringify(PRESET_AREAS[0]));
}

function setUserLocation(loc) {
  localStorage.setItem('tl_location', JSON.stringify(loc));
  updateLocationUI();
}

function getSelectedStore() {
  return JSON.parse(localStorage.getItem('tl_selected_store') || JSON.stringify(ANDHERI_STORES[0]));
}

function setSelectedStore(store) {
  localStorage.setItem('tl_selected_store', JSON.stringify(store));
}

function updateLocationUI() {
  const loc = getUserLocation();
  document.querySelectorAll('.current-location-text, #current-location-text').forEach(el => {
    el.textContent = loc.name || loc.area || 'Andheri West, Mumbai';
  });
}

// Toast helper
function showToast(message) {
  let toast = document.getElementById('shop-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'shop-toast';
    toast.className = 'shop-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// Update header UI based on auth state
function updateHeaderAuth() {
  seedUsers();
  const user = getCurrentUser();
  const authArea = document.getElementById('header-auth-area');
  if (!authArea) return;

  if (user) {
    authArea.innerHTML = `
      <a href="cart.html" class="header-icon-btn" id="header-cart-btn" title="View Trial Bag">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <span class="cart-count-badge" style="display:${getCartCount() > 0 ? 'flex' : 'none'};">${getCartCount()}</span>
      </a>
      <div class="header-user-dropdown" id="header-user-dropdown">
        <button class="header-icon-btn header-user-btn" id="header-user-btn" title="User Profile">
          <span class="header-user-avatar">${user.name.charAt(0).toUpperCase()}</span>
        </button>
        <div class="user-dropdown-menu" id="user-dropdown-menu">
          <div class="dropdown-user-info">
            <strong>${user.name}</strong>
            <span>${user.email}</span>
            <span style="font-size:0.75rem; color:#BB6C43; margin-top:0.25rem;">📍 ${getUserLocation().name || 'Andheri West'}</span>
          </div>
          <div class="dropdown-divider"></div>
          <a href="shop.html" class="dropdown-item">🛍️ Browse Shop</a>
          <a href="cart.html" class="dropdown-item">🛒 My Trial Bag (${getCartCount()})</a>
          <button class="dropdown-item" onclick="openLocationModal()">📍 Change Location</button>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item dropdown-logout" onclick="logout()">🚪 Logout</button>
        </div>
      </div>
    `;

    // Toggle dropdown
    const userBtn = document.getElementById('header-user-btn');
    const dropdownMenu = document.getElementById('user-dropdown-menu');
    if (userBtn && dropdownMenu) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('is-open');
      });
      document.addEventListener('click', () => {
        dropdownMenu.classList.remove('is-open');
      });
    }
  } else {
    authArea.innerHTML = `
      <a href="login.html" class="btn btn-sm btn-primary" id="header-login-btn">
        <span>🔐 Login</span>
      </a>
    `;
  }

  updateCartBadge();
  updateLocationUI();
}

// ===== INTERACTIVE LOCATION MODAL WITH OPENSTREETMAP =====
let modalMap = null;
let userMarker = null;
let storeMarkers = [];

function ensureLeafletLoaded(callback) {
  if (typeof L !== 'undefined') {
    callback();
    return;
  }
  // Load CSS
  if (!document.querySelector('link[href*="leaflet"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
  }
  // Load JS
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  script.onload = () => callback();
  document.head.appendChild(script);
}

function injectLocationModal() {
  if (document.getElementById('location-modal-overlay')) return;

  const currentLoc = getUserLocation();
  const currentStore = getSelectedStore();

  const modalHtml = `
    <div class="location-modal-overlay" id="location-modal-overlay">
      <div class="location-modal-card" id="location-modal-card">
        <div class="location-modal-header">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span style="font-size:1.5rem;">📍</span>
            <div>
              <h3 style="font-size:1.2rem; font-weight:800; color:var(--color-primary); margin:0;">Set Your Delivery Location</h3>
              <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">Trials are currently live in Andheri West, Bandra & Juhu</p>
            </div>
          </div>
          <button class="location-modal-close" id="location-modal-close" aria-label="Close modal">✕</button>
        </div>

        <div class="location-modal-body">
          <!-- Quick Area Chips -->
          <div class="loc-chips-label">Quick select neighborhood:</div>
          <div class="location-chips-row" id="location-chips-row">
            ${PRESET_AREAS.map((a, i) => `
              <button class="loc-chip ${a.name === currentLoc.name ? 'active' : ''}" data-index="${i}">
                ${a.name}
              </button>
            `).join('')}
          </div>

          <!-- Address Input Row -->
          <div class="loc-input-row" style="margin-top:1rem; margin-bottom:0.75rem;">
            <div style="flex:1;">
              <label style="display:block; font-size:0.78rem; font-weight:700; color:var(--color-primary); margin-bottom:0.35rem;">
                Delivery Street Address
              </label>
              <input type="text" id="loc-address-input" class="loc-address-input" value="${currentLoc.address || currentLoc.name}" placeholder="Enter street, apartment, landmark...">
            </div>
            <div style="min-width:220px;">
              <label style="display:block; font-size:0.78rem; font-weight:700; color:var(--color-primary); margin-bottom:0.35rem;">
                Select Boutique Store
              </label>
              <select id="loc-modal-store-select" class="loc-store-select">
                ${ANDHERI_STORES.map(s => `
                  <option value="${s.id}" ${currentStore && currentStore.id === s.id ? 'selected' : ''}>
                    ${s.name} (${s.area}) • 🛵 ${s.deliveryTime}
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Interactive Leaflet Map -->
          <div class="loc-map-wrapper">
            <div id="loc-modal-map" class="loc-modal-map"></div>
            <div class="loc-map-instruction">
              💡 <em>Click anywhere on the map to drop your home trial pin. Store pins show available boutiques.</em>
            </div>
          </div>
        </div>

        <div class="location-modal-footer">
          <button class="btn btn-outline" id="loc-modal-cancel-btn">Cancel</button>
          <button class="btn btn-primary" id="loc-modal-save-btn">
            <span>✓ Confirm Delivery Location</span>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // Close handlers
  const overlay = document.getElementById('location-modal-overlay');
  const closeBtn = document.getElementById('location-modal-close');
  const cancelBtn = document.getElementById('loc-modal-cancel-btn');
  const saveBtn = document.getElementById('loc-modal-save-btn');

  const closeModal = () => {
    overlay.classList.remove('is-active');
  };

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Save handler
  saveBtn.addEventListener('click', () => {
    const addressInput = document.getElementById('loc-address-input');
    const storeSelect = document.getElementById('loc-modal-store-select');
    
    let activeLoc = getUserLocation();
    activeLoc.address = addressInput.value.trim() || activeLoc.address;
    setUserLocation(activeLoc);

    const chosenStore = ANDHERI_STORES.find(s => s.id === storeSelect.value);
    if (chosenStore) {
      setSelectedStore(chosenStore);
    }

    closeModal();
    showToast(`📍 Location set to: ${activeLoc.name || activeLoc.address} (Store: ${chosenStore ? chosenStore.name : 'Vogue Studio'})`);
    updateHeaderAuth();
  });

  // Chips click handler
  const chipBtns = document.querySelectorAll('.loc-chip');
  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chipBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const area = PRESET_AREAS[parseInt(btn.dataset.index)];
      if (area) {
        document.getElementById('loc-address-input').value = area.address;
        setUserLocation(area);
        if (modalMap && userMarker) {
          modalMap.setView([area.lat, area.lng], 15);
          userMarker.setLatLng([area.lat, area.lng]);
        }
      }
    });
  });
}

function openLocationModal() {
  injectLocationModal();
  const overlay = document.getElementById('location-modal-overlay');
  overlay.classList.add('is-active');

  ensureLeafletLoaded(() => {
    setTimeout(() => {
      initModalMap();
    }, 150);
  });
}

function initModalMap() {
  const mapEl = document.getElementById('loc-modal-map');
  if (!mapEl || typeof L === 'undefined') return;

  const loc = getUserLocation();
  const currentStore = getSelectedStore();

  if (!modalMap) {
    modalMap = L.map('loc-modal-map').setView([loc.lat || 19.1365, loc.lng || 72.8296], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(modalMap);

    // Store marker icon
    const storeIcon = L.divIcon({
      className: 'store-map-marker',
      html: '<div class="marker-pin" style="background:#BB6C43; color:#FFFFFF; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(0,0,0,0.3); font-size:16px;">🏪</div>',
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -36]
    });

    // Home User marker icon
    const homeIcon = L.divIcon({
      className: 'user-home-marker',
      html: '<div class="user-home-pin" style="background:#10B981; color:#FFFFFF; width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(16,185,129,0.5); font-size:18px; border:3px solid #FFFFFF;">📍</div>',
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -40]
    });

    // Add Store markers
    ANDHERI_STORES.forEach(store => {
      const marker = L.marker([store.lat, store.lng], { icon: storeIcon }).addTo(modalMap);
      marker.bindPopup(`
        <div style="font-size:0.85rem; padding:0.25rem;">
          <strong style="color:#4A413C;">${store.name}</strong><br>
          <span style="color:#64748B;">${store.area} • 🛵 ${store.deliveryTime}</span><br>
          <button style="margin-top:0.4rem; background:#BB6C43; color:#FFF; border:none; border-radius:4px; padding:0.3rem 0.6rem; font-size:0.75rem; cursor:pointer;" onclick="selectStoreFromModal('${store.id}')">Select this store</button>
        </div>
      `);
      storeMarkers.push(marker);
    });

    // Add user marker
    userMarker = L.marker([loc.lat || 19.1365, loc.lng || 72.8296], {
      icon: homeIcon,
      draggable: true
    }).addTo(modalMap);

    userMarker.bindPopup('<b>Your Home Trial Destination</b><br>Drag or click map to change.').openPopup();

    userMarker.on('dragend', function (e) {
      const pos = e.target.getLatLng();
      onMapLocationSelected(pos.lat, pos.lng);
    });

    // Map click to move pin
    modalMap.on('click', function (e) {
      userMarker.setLatLng(e.latlng);
      onMapLocationSelected(e.latlng.lat, e.latlng.lng);
    });
  } else {
    modalMap.invalidateSize();
    modalMap.setView([loc.lat || 19.1365, loc.lng || 72.8296], 14);
    if (userMarker) {
      userMarker.setLatLng([loc.lat || 19.1365, loc.lng || 72.8296]);
    }
  }
}

function onMapLocationSelected(lat, lng) {
  let closestArea = PRESET_AREAS[0];
  let minD = 999999;
  PRESET_AREAS.forEach(a => {
    const d = Math.hypot(a.lat - lat, a.lng - lng);
    if (d < minD) {
      minD = d;
      closestArea = a;
    }
  });

  const updatedLoc = {
    name: closestArea.name,
    address: `Pinned Location near ${closestArea.name}, Mumbai`,
    lat: lat,
    lng: lng
  };
  setUserLocation(updatedLoc);
  const input = document.getElementById('loc-address-input');
  if (input) input.value = updatedLoc.address;
}

window.selectStoreFromModal = function(storeId) {
  const store = ANDHERI_STORES.find(s => s.id === storeId);
  if (store) {
    setSelectedStore(store);
    const sel = document.getElementById('loc-modal-store-select');
    if (sel) sel.value = storeId;
    showToast(`Store selected: ${store.name} (${store.deliveryTime})`);
  }
};

window.openLocationModal = openLocationModal;

// Initialize on every page
document.addEventListener('DOMContentLoaded', () => {
  seedUsers();
  updateHeaderAuth();

  // Attach to top bar location click
  document.querySelectorAll('#topbar-location-btn, .location-picker-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openLocationModal();
    });
  });
});
