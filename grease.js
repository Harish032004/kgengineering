// Greases Product Data - YOU CAN ADD YOUR OWN IMAGE URLs HERE
const productData = [
  {
    id: 1,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Lithium 12-Hydroxystearate based High Speed Greases",
    image: "devtank.webp", // Replace with your image URL
  },
  {
    id: 2,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Aluminium Complex based Water-Resistant Greases",
    image: "torq.webp", // Replace with your image URL
  },
  {
    id: 3,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Calcium Sulphonate Complex Based Water-Resistant Grease",
    image: "YOUR_IMAGE_URL_HERE_3", // Replace with your image URL
  },
  {
    id: 4,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Lithium-Calcium based Water-Resistant Greases",
    image: "YOUR_IMAGE_URL_HERE_4", // Replace with your image URL
  },
  {
    id: 5,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Inorganic Clay based EP & Heavy Load Greases",
    image: "YOUR_IMAGE_URL_HERE_5", // Replace with your image URL
  },
  {
    id: 6,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Lithium Complex based EP & Heavy Load Greases",
    image: "YOUR_IMAGE_URL_HERE_6", // Replace with your image URL
  },
  {
    id: 7,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Calcium Sulphonate Complex Based EP & Heavy Load Greases",
    image: "YOUR_IMAGE_URL_HERE_7", // Replace with your image URL
  },
  {
    id: 8,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Lithium Calcium based EP & Heavy Load Greases",
    image: "YOUR_IMAGE_URL_HERE_7", // Replace with your image URL
  },
  {
    id: 9,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Inorganic Clay based High Temperature Greases",
    image: "YOUR_IMAGE_URL_HERE_7", // Replace with your image URL
  },
  {
    id: 10,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Lithium based High Temperature Greases",
    image: "YOUR_IMAGE_URL_HERE_7", // Replace with your image URL
  },
  {
    id: 11,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Lithium Complex based High Temperature Greases",
    image: "YOUR_IMAGE_URL_HERE_7", // Replace with your image URL
  },
  {
    id: 12,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Aluminium Complex based High Temperature Greases",
    image: "YOUR_IMAGE_URL_HERE_7", // Replace with your image URL
  },
  {
    id: 13,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Polyurea Based High Temperature Greases",
    image: "YOUR_IMAGE_URL_HERE_7", // Replace with your image URL
  },
  {
    id: 14,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Calcium Sulphonate Complex Based High Temperature Greases",
    image: "YOUR_IMAGE_URL_HERE_7", // Replace with your image URL
  },
  {
    id: 15,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Lithium based Multi-Purpose High Performance Greases",
    image: "YOUR_IMAGE_URL_HERE_7", // Replace with your image URL
  },
  {
    id: 16,
    brand: "TORQ",
    tagline: "LUBRICATION",
    title: "Lithium Complex based Multi-Purpose High Performance Greases",
    image: "YOUR_IMAGE_URL_HERE_7", // Replace with your image URL
  },
 
];

// Generate fallback SVG for greases
function generateGreaseSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#2FA4A9">
    <defs>
      <linearGradient id="greaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#2FA4A9;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#AEE6E6;stop-opacity:1" />
      </linearGradient>
    </defs>
    <ellipse cx="50" cy="65" rx="35" ry="20" fill="url(#greaseGradient)" stroke="#0F172A" stroke-width="1.5"/>
    <rect x="25" y="30" width="50" height="40" rx="8" fill="#AEE6E6" stroke="#2FA4A9" stroke-width="2"/>
    <ellipse cx="50" cy="50" rx="15" ry="8" fill="#2FA4A9" opacity="0.8"/>
    <path d="M35,35 L40,30 L60,30 L65,35 Z" fill="#0F172A" opacity="0.7"/>
  </svg>`;
}

// Handle image loading errors
function handleImageError(imgElement, productTitle) {
  console.log(`Image failed to load for ${productTitle}, using SVG fallback`);
  imgElement.style.display = 'none';
  
  const svgContainer = document.createElement('div');
  svgContainer.innerHTML = generateGreaseSVG();
  svgContainer.style.width = '100%';
  svgContainer.style.height = '100%';
  svgContainer.style.display = 'flex';
  svgContainer.style.alignItems = 'center';
  svgContainer.style.justifyContent = 'center';
  
  imgElement.parentNode.appendChild(svgContainer);
}

// Render product cards
function renderProductCards() {
  const productGrid = document.getElementById('product-grid');
  
  if (!productGrid) {
    console.error('Product grid element not found');
    return;
  }
  
  productGrid.innerHTML = '';
  
  productData.forEach((product) => {
    const productCard = document.createElement('article');
    productCard.className = 'product-card';
    productCard.setAttribute('data-product-id', product.id);
    
    productCard.innerHTML = `
      <div class="product-image-container">
        <img 
          src="${product.image}" 
          alt="${product.title}" 
          class="product-image" 
          loading="lazy"
          onerror="handleImageError(this, '${product.title.replace(/'/g, "\\'")}')"
        />
      </div>
      <div class="product-content">
        <div class="brand-header">
          <div class="brand-name">${product.brand}</div>
          <div class="brand-tagline">${product.tagline}</div>
        </div>
        <div class="product-description">${product.title}</div>
        <button class="quote-button" data-product-id="${product.id}" data-product-title="${product.title}">
          GET A QUOTE <span class="plus-icon">+</span>
        </button>
      </div>
    `;
    
    productGrid.appendChild(productCard);
  });
  
  // Add event listeners to the buttons
  addQuoteButtonListeners();
}

// Generate WhatsApp message
function generateWhatsAppMessage(productTitle) {
  return `Hello,

I am interested in: ${productTitle}

Please provide me with:
1. Price quotation
2. Minimum order quantity
3. Delivery details

Thank you.`;
}

// Open WhatsApp with encoded message
function openWhatsApp(productTitle) {
  const message = generateWhatsAppMessage(productTitle);
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = "9789029012";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

// Show WhatsApp confirmation overlay
function showWhatsAppOverlay(productTitle) {
  const overlay = document.getElementById('whatsapp-overlay');
  const productNameElement = document.getElementById('selected-product-name');
  
  if (!overlay || !productNameElement) {
    openWhatsApp(productTitle);
    return;
  }
  
  overlay.dataset.productTitle = productTitle;
  productNameElement.textContent = productTitle;
  overlay.classList.add('active');
  
  // Prevent body scroll when overlay is active
  document.body.style.overflow = 'hidden';
}

// Close WhatsApp overlay
function closeWhatsAppOverlay() {
  const overlay = document.getElementById('whatsapp-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Add event listeners to quote buttons
function addQuoteButtonListeners() {
  const quoteButtons = document.querySelectorAll('.quote-button');
  
  quoteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const productId = this.getAttribute('data-product-id');
      const productTitle = this.getAttribute('data-product-title');
      
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
      
      showWhatsAppOverlay(productTitle);
    });
  });
}

// Initialize the application
function initProductListing() {
  // Render product cards
  renderProductCards();
  
  // Set up WhatsApp overlay event listeners
  const closeBtn = document.getElementById('close-whatsapp-btn');
  const cancelBtn = document.getElementById('cancel-whatsapp-btn');
  const confirmBtn = document.getElementById('confirm-whatsapp-btn');
  const overlay = document.getElementById('whatsapp-overlay');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeWhatsAppOverlay);
  }
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeWhatsAppOverlay);
  }
  
  if (confirmBtn) {
    confirmBtn.addEventListener('click', function() {
      if (overlay) {
        const productTitle = overlay.dataset.productTitle;
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
        
        closeWhatsAppOverlay();
        setTimeout(() => {
          openWhatsApp(productTitle);
        }, 300);
      }
    });
  }
  
  // Close overlay when clicking outside modal
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeWhatsAppOverlay();
      }
    });
  }
  
  // Add keyboard support
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
      closeWhatsAppOverlay();
    }
  });
  
  // Add touch support for mobile
  addTouchSupport();
}

// Add touch support for mobile devices
function addTouchSupport() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    let touchStartY;
    
    card.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
      this.style.transform = 'translateY(-3px)';
      this.style.backgroundColor = 'var(--color-light-bg)';
      this.style.borderColor = 'var(--color-primary)';
    }, { passive: true });
    
    card.addEventListener('touchend', function(e) {
      this.style.transform = '';
      this.style.backgroundColor = '';
      this.style.borderColor = '';
      
      // Prevent accidental taps while scrolling
      const touchEndY = e.changedTouches[0].clientY;
      if (Math.abs(touchEndY - touchStartY) < 10) {
        const quoteButton = this.querySelector('.quote-button');
        if (quoteButton) {
          quoteButton.style.transform = 'scale(0.95)';
          setTimeout(() => {
            quoteButton.style.transform = '';
          }, 200);
          const productTitle = quoteButton.getAttribute('data-product-title');
          showWhatsAppOverlay(productTitle);
        }
      }
    }, { passive: true });
  });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductListing);
} else {
  initProductListing();
}

// Make handleImageError function available globally
window.handleImageError = handleImageError;