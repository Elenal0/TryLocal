/**
 * TryLocal - Modern Interactive JavaScript Controller
 * SPIT Mumbai MCA - EIPR Practical Project
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initPageTransitions();
  initWorkflowStepper();
  initTrialSimulator();
  initBrochureViewer();
  initVideoController();
  initVideoOverlay();
  initHIWCarousel();
  initPdfPrintActions();
});

/* ==========================================================================
   Smooth Page Transitions
   ========================================================================== */
function initPageTransitions() {
  window.addEventListener('pageshow', () => {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
  });

  document.querySelectorAll('a[href$=".html"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = anchor.getAttribute('href');
      if (!target || target.startsWith('http') || target.startsWith('#') || target.startsWith('mailto:') || target.startsWith('tel:') || anchor.hasAttribute('target')) return;
      e.preventDefault();
      document.body.style.transition = 'opacity 0.22s ease-out, transform 0.22s ease-out';
      document.body.style.opacity = '0';
      document.body.style.transform = 'translateY(-6px)';
      setTimeout(() => {
        window.location.href = target;
      }, 200);
    });
  });
}

/* ==========================================================================
   1. Mobile Navigation & Sticky Header
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('is-active');
      navMenu.classList.toggle('is-open');
    });

    // Close on nav link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('is-active');
        navMenu.classList.remove('is-open');
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleBtn.classList.remove('is-active');
        navMenu.classList.remove('is-open');
      }
    });
  }
}

/* ==========================================================================
   2. 10-Step Workflow Stepper Controller
   ========================================================================== */
const workflowData = [
  {
    step: 1,
    title: "Customer Enters Location",
    component: "103. Location Service",
    desc: "Customer opens the TryLocal app and enters their current pin-code/area in Mumbai (e.g., Andheri West, Juhu, Bandra) or enables GPS geolocation.",
    highlight: "Service boundary validation ensures rapid 30-45 min delivery turnaround."
  },
  {
    step: 2,
    title: "Nearby Stores Identified",
    component: "104. Store Matching Engine",
    desc: "Algorithm queries registered local boutiques and fashion retailers within a 3–5 km radius to show live inventories.",
    highlight: "Supports neighborhood retail digitalization without requiring high-cost independent warehouses."
  },
  {
    step: 3,
    title: "Browse Live Catalogues & Sizes",
    component: "105. Inventory Engine",
    desc: "Customer filters through curated categories, exact size charts, real store tags, and transparent boutique pricing.",
    highlight: "Zero false listings through automated stock synchronisation."
  },
  {
    step: 4,
    title: "Inventory Availability Verified",
    component: "105. Inventory Engine",
    desc: "Selected sizes are reserved temporarily in store inventory so that trial items are physically placed aside for the order.",
    highlight: "Prevents double-booking or in-store stockouts during delivery preparation."
  },
  {
    step: 5,
    title: "Customer Selects 3 to 5 Outfits",
    component: "106. Product Selection Module",
    desc: "Customer puts together their home trial bundle — picking multiple sizes or matching pieces to compare in person.",
    highlight: "Eliminates fitting dilemma (e.g., ordering both Medium & Large to check shoulders)."
  },
  {
    step: 6,
    title: "Home-Trial Slot Booked",
    component: "107. Trial Slot Manager",
    desc: "Customer chooses a convenient 45-minute trial window (e.g., Evening 6:30 PM - 7:15 PM) matching their schedule at home.",
    highlight: "Scheduled predictability replaces uncertain courier delivery days."
  },
  {
    step: 7,
    title: "Retailer Prepares Items",
    component: "109. Retailer Dashboard",
    desc: "Store staff receives the instant digital trial request, steams the garments, and packs them in an eco-friendly TryLocal hanger bag.",
    highlight: "Structured merchant workflow with digital item barcode tagging."
  },
  {
    step: 8,
    title: "Doorstep Delivery by Runner",
    component: "110. Delivery Management",
    desc: "A dedicated TryLocal delivery partner collects the bag and delivers directly to the customer's doorstep at Grace Pinnacle / home.",
    highlight: "Courteous runner waits 15-20 minutes in apartment lobby while customer evaluates."
  },
  {
    step: 9,
    title: "Home Trial & In-Person Fitting",
    component: "111. Digital Trial Tracker",
    desc: "Customer tries on items in their private bedroom mirror under natural room lighting, checking drape, comfort, and fabric quality.",
    highlight: "The ultimate trial room experience with total privacy and zero fitting room queues."
  },
  {
    step: 10,
    title: "Keep or Return Decision & Instant Bill",
    component: "112. Payment & Fee Adjustment",
    desc: "Customer marks kept items on app. Unwanted garments handed back on the spot. Trial fee (₹200) adjusted; customer billed only for kept items!",
    highlight: "Instant closure: no return parcel packaging, zero post office trips, and instant refunds."
  }
];

function initWorkflowStepper() {
  const stepCards = document.querySelectorAll('.workflow-step-card');
  const infoTitle = document.getElementById('workflow-active-title');
  const infoComp = document.getElementById('workflow-active-comp');
  const infoDesc = document.getElementById('workflow-active-desc');
  const infoHighlight = document.getElementById('workflow-active-highlight');

  if (!stepCards.length) return;

  stepCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      stepCards.forEach(c => c.classList.remove('step-card-active'));
      card.classList.add('step-card-active');

      const data = workflowData[index];
      if (data && infoTitle) {
        infoTitle.textContent = `Step ${data.step}: ${data.title}`;
        if (infoComp) infoComp.textContent = data.component;
        if (infoDesc) infoDesc.textContent = data.desc;
        if (infoHighlight) infoHighlight.textContent = data.highlight;
      }
    });
  });
}

/* ==========================================================================
   3. Try-At-Home Mini-Simulator
   ========================================================================== */
const simulatorCatalogue = [
  { id: 1, name: "Textured Sage Linen Shirt", store: "Vogue Studio (Andheri W)", price: 1450, icon: "👔" },
  { id: 2, name: "Olive Tailored Blazer", store: "Colaba Stitch Co.", price: 2890, icon: "🧥" },
  { id: 3, name: "Comfort Indigo Slim Jeans", store: "Bandra Denim House", price: 1790, icon: "👖" },
  { id: 4, name: "Floral Cotton Summer Dress", store: "Grace Apparel Hub", price: 1650, icon: "👗" },
  { id: 5, name: "Classic Pleated Beige Chinos", store: "Juhu Wardrobe", price: 1550, icon: "🩳" },
  { id: 6, name: "Monochrome City Jacket", store: "Lokhandwala Boutiques", price: 2400, icon: "🥋" }
];

let selectedCart = [simulatorCatalogue[0], simulatorCatalogue[1], simulatorCatalogue[2]]; // default 3 items
let itemDecisions = { 1: 'keep', 2: 'keep', 3: 'return' }; // item id -> 'keep' or 'return'
const TRIAL_FEE_BASE = 200;

function initTrialSimulator() {
  const clothesGrid = document.getElementById('sim-clothes-grid');
  const orderList = document.getElementById('sim-order-list');
  const subtotalEl = document.getElementById('sim-subtotal');
  const trialFeeEl = document.getElementById('sim-trial-fee');
  const feeDiscountEl = document.getElementById('sim-fee-discount');
  const commissionEl = document.getElementById('sim-commission');
  const grandTotalEl = document.getElementById('sim-grand-total');

  if (!clothesGrid || !orderList) return;

  function renderClothes() {
    clothesGrid.innerHTML = '';
    simulatorCatalogue.forEach(item => {
      const isSelected = selectedCart.some(c => c.id === item.id);
      const card = document.createElement('div');
      card.className = `sim-item-card ${isSelected ? 'is-selected' : ''}`;
      card.innerHTML = `
        <div class="sim-item-thumb">${item.icon}</div>
        <div class="sim-item-name">${item.name}</div>
        <div class="sim-item-store">${item.store}</div>
        <div class="sim-item-price">₹${item.price}</div>
        <button class="btn btn-sm ${isSelected ? 'btn-outline-primary' : 'btn-primary'}" style="margin-top:0.4rem; width:100%;">
          ${isSelected ? 'Selected ✓' : '+ Add to Trial'}
        </button>
      `;

      card.addEventListener('click', (e) => {
        if (isSelected) {
          if (selectedCart.length <= 1) {
            alert("Please keep at least 1 item in your trial bag to simulate the trial!");
            return;
          }
          selectedCart = selectedCart.filter(c => c.id !== item.id);
          delete itemDecisions[item.id];
        } else {
          if (selectedCart.length >= 4) {
            alert("Maximum 4 outfits allowed per trial batch for optimal bag handling.");
            return;
          }
          selectedCart.push(item);
          itemDecisions[item.id] = 'keep'; // default keep
        }
        renderClothes();
        renderOrderAndTotals();
      });

      clothesGrid.appendChild(card);
    });
  }

  function renderOrderAndTotals() {
    orderList.innerHTML = '';
    let keptSubtotal = 0;
    let anyKept = false;

    selectedCart.forEach(item => {
      const decision = itemDecisions[item.id] || 'keep';
      if (decision === 'keep') {
        keptSubtotal += item.price;
        anyKept = true;
      }

      const li = document.createElement('li');
      li.className = 'sim-order-row';
      li.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span>${item.icon}</span>
          <div>
            <strong>${item.name}</strong>
            <div style="font-size:0.75rem; color:#64748B;">₹${item.price} • ${item.store}</div>
          </div>
        </div>
        <div class="sim-status-toggle">
          <button class="sim-toggle-btn ${decision === 'keep' ? 'btn-active-keep' : ''}" data-id="${item.id}" data-action="keep">
            Keep ✓
          </button>
          <button class="sim-toggle-btn ${decision === 'return' ? 'btn-active-return' : ''}" data-id="${item.id}" data-action="return">
            Return ✕
          </button>
        </div>
      `;
      orderList.appendChild(li);
    });

    // Add click listeners to keep/return buttons
    orderList.querySelectorAll('.sim-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const action = btn.getAttribute('data-action');
        itemDecisions[id] = action;
        renderOrderAndTotals();
      });
    });

    // Calculate financials
    // Policy from Business Plan Slide 12/13:
    // Trial fee is ₹200; kept ONLY if nothing is bought. If any item is bought, fee is waived / adjusted to ₹0!
    const effectiveFee = anyKept ? 0 : TRIAL_FEE_BASE;
    const commission = Math.round(keptSubtotal * 0.15); // 15% platform commission
    const grandTotal = keptSubtotal + effectiveFee;

    if (subtotalEl) subtotalEl.textContent = `₹${keptSubtotal.toLocaleString('en-IN')}`;
    if (trialFeeEl) trialFeeEl.textContent = `₹${TRIAL_FEE_BASE}`;
    if (feeDiscountEl) feeDiscountEl.textContent = anyKept ? `- ₹${TRIAL_FEE_BASE} (Waived on Purchase)` : `₹0 (Applicable)`;
    if (commissionEl) commissionEl.textContent = `₹${commission.toLocaleString('en-IN')} (Retailer 15%)`;
    if (grandTotalEl) grandTotalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
  }

  renderClothes();
  renderOrderAndTotals();
}

/* ==========================================================================
   4. Brochure Viewer & Tab Switcher
   ========================================================================== */
function initBrochureViewer() {
  const tabs = document.querySelectorAll('.brochure-tab-btn');
  const p1 = document.getElementById('brochure-page-1');
  const p2 = document.getElementById('brochure-page-2');
  const pdfEmbed = document.getElementById('brochure-pdf-embed');

  if (!tabs.length || !p1 || !p2) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const view = tab.getAttribute('data-view');
      if (view === 'spread') {
        p1.style.display = 'flex';
        p2.style.display = 'flex';
        if (pdfEmbed) pdfEmbed.style.display = 'none';
      } else if (view === 'page1') {
        p1.style.display = 'flex';
        p2.style.display = 'none';
        if (pdfEmbed) pdfEmbed.style.display = 'none';
      } else if (view === 'page2') {
        p1.style.display = 'none';
        p2.style.display = 'flex';
        if (pdfEmbed) pdfEmbed.style.display = 'none';
      } else if (view === 'pdf') {
        p1.style.display = 'none';
        p2.style.display = 'none';
        if (pdfEmbed) pdfEmbed.style.display = 'flex';
      }
    });
  });
}

/* ==========================================================================
   5. Promotional Video Player Controller
   ========================================================================== */
function initVideoController() {
  const updateBtn = document.getElementById('btn-update-video');
  const urlInput = document.getElementById('custom-video-url');
  const iframe = document.getElementById('trylocal-video-iframe');
  const placeholder = document.getElementById('video-placeholder');
  const playBtn = document.getElementById('video-play-trigger');

  function loadVideo(url) {
    if (!url || url.includes('YOUR_VIDEO_ID')) {
      alert("Placeholder link detected! Please enter your real Google Drive Video Share ID or YouTube link, or test with any valid embed URL.");
      return;
    }
    
    // Normalize Google Drive link: /view -> /preview
    let embedUrl = url;
    if (embedUrl.includes('drive.google.com') && embedUrl.includes('/view')) {
      embedUrl = embedUrl.replace('/view', '/preview');
    }
    
    if (iframe) {
      iframe.src = embedUrl;
      iframe.style.display = 'block';
    }
    if (placeholder) {
      placeholder.style.display = 'none';
    }
  }

  if (updateBtn && urlInput) {
    updateBtn.addEventListener('click', () => {
      loadVideo(urlInput.value.trim());
    });
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (urlInput && urlInput.value) {
        loadVideo(urlInput.value.trim());
      } else {
        alert("Video Demo Placeholder: Please provide your uploaded Google Drive pitch video link in the box below to play.");
      }
    });
  }
}

/* ==========================================================================
   6. PDF Download & Print Helpers
   ========================================================================== */
function initPdfPrintActions() {
  const printProfileBtns = document.querySelectorAll('.action-download-profile');
  const printBrochureBtns = document.querySelectorAll('.action-download-brochure');

  printProfileBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Inform the user and trigger browser clean print-to-PDF
      window.print();
    });
  });

  printBrochureBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });
}

/* ==========================================================================
   HIW Carousel Controller
   ========================================================================== */
function initHIWCarousel() {
  const track = document.getElementById('hiw-track');
  const prevBtn = document.getElementById('hiw-prev');
  const nextBtn = document.getElementById('hiw-next');
  const dots = document.querySelectorAll('.hiw-dot');
  if (!track) return;

  const slides = track.querySelectorAll('.hiw-slide');
  let current = 0;

  function scrollTo(idx) {
    if (idx < 0) idx = slides.length - 1;
    if (idx >= slides.length) idx = 0;
    current = idx;
    const slide = slides[current];
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => scrollTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => scrollTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => scrollTo(i)));

  // Update dot on native scroll
  track.addEventListener('scroll', () => {
    const scrollLeft = track.scrollLeft;
    let closest = 0;
    slides.forEach((s, i) => {
      if (Math.abs(s.offsetLeft - track.offsetLeft - scrollLeft) < Math.abs(slides[closest].offsetLeft - track.offsetLeft - scrollLeft)) {
        closest = i;
      }
    });
    current = closest;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
  }, { passive: true });
}

/* ==========================================================================
   Video Overlay Controller
   ========================================================================== */
function initVideoOverlay() {
  const overlay = document.getElementById('video-overlay');
  const playBtn = document.getElementById('video-play-btn');
  const iframe = document.getElementById('trylocal-video-iframe');
  if (!overlay || !iframe) return;

  function play() {
    overlay.classList.add('hidden');
    const src = iframe.src;
    if (!src.includes('autoplay=1')) {
      iframe.src = src.replace('autoplay=0', 'autoplay=1');
    }
  }
  overlay.addEventListener('click', play);
  if (playBtn) playBtn.addEventListener('click', (e) => { e.stopPropagation(); play(); });
}
