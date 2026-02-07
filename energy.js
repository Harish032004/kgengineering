// Product Data with real image URLs
const productData = [
  {
    id: 1,
    name: "IE5 Motor",
    image: "ie3.jpg",
    specs: {
      kW: "1.1 kW",
      HP: "1.5 HP",
      RPM: "1500 RPM",
      POLE: " B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 2,
    name: " IE5 Motor",
    image: "https://media.istockphoto.com/id/1988627336/photo/electric-vertical-motor-3d-rendering.webp?a=1&b=1&s=612x612&w=0&k=20&c=BIUZyuRXZ7JfCrjjmAe8dZ3fQVWSnav_jNMyj_fOVOI=",
    specs: {
      kW: "75 kW",
      HP: "100 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 3,
    name: "IE5 Motor",
    image: "ie2.jpg",
    specs: {
      kW: "55 kW",
      HP: "75 HP",
      RPM: "1500 RPM",
      POLE: "b3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 4,
    name: "IE5 Motor",
    image: "ie5.jpg",
    specs: {
      kW: "45 kW",
      HP: "60 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 5,
    name: "IE5 Motor",
    image: "compactie3.jpg",
    specs: {
      kW: "37 kW",
      HP: "50 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 6,
    name: "IE5 Motor",
    image: "heavyduty.jpg",
    specs: {
      kW: "30 kW",
      HP: "40HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 7,
    name: "IE5 Motor",
    image: "ie3variable.jpg",
    specs: {
      kW: "18.5 kW",
      HP: "25 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 8,
    name: " IE5 Motor",
    image: "ie2explosion.jpg",
    specs: {
      kW: "22 kW",
      HP: "30 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 9,
    name: " IE5 Motor",
    image: "ie2explosion.jpg",
    specs: {
      kW: "15 kW",
      HP: "20 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 10,
    name: "IE5 Motor",
    image: "10.jpg",
    specs: {
      kW: "11 kW",
      HP: "15 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 11,
    name: "E5 Motor",
    image: "11.jpg",
    specs: {
      kW: "9.3 kW",
      HP: "12.5 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 12,
    name: "IE5 Motor",
    image: "12.webp",
    specs: {
      kW: "9.3 kW",
      HP: "12.5 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 13,
    name: " IE5 Motor",
    image: "13.webp",
    specs: {
      kW: "7.5 kW",
      HP: "10 HP",
      RPM: "1500 RPM",
      POLE: "B5 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 14,
    name: "IE5 Motor",
    image: "14.jpg",
    specs: {
      kW: "7.5 kW",
      HP: "10 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 15,
    name: "IE5 Motor",
    image: "15.webp",
    specs: {
      kW: "5.5kW",
      HP: "7.5 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 16,
    name: "IE 5 Motor",
    image: "16.webp",
    specs: {
      kW: "3.7kW",
      HP: "5HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
   {
    id: 17,
    name: "IE 5 Motor",
    image: "17.jpg",
    specs: {
      kW: "2.2kW",
      HP: "3 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 18,
    name: "IE 5 Motor",
    image: "18.jpg",
    specs: {
      kW: "1.1kW",
      HP: "1.5 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
   {
    id: 19,
    name: "IE 5 Motor",
    image: "19.jpg",
    specs: {
      kW: "0.75 kW",
      HP: "1 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
  {
    id: 20,
    name: "IE 5 Motor",
    image: "20.jpg",
    specs: {
      kW: "0.55 kW",
      HP: "0.75 HP",
      RPM: "1500 RPM",
      POLE: "B3 4 Pole",
      type: "Synchronous Motor"
    }
  },
];

// Generate fallback SVG images for motors
function generateMotorSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#2FA4A9">
    <rect x="20" y="30" width="60" height="40" rx="5" fill="#AEE6E6" stroke="#2FA4A9" stroke-width="2"/>
    <circle cx="30" cy="50" r="8" fill="#2FA4A9"/>
    <circle cx="70" cy="50" r="8" fill="#2FA4A9"/>
    <rect x="40" y="35" width="20" height="30" fill="#2FA4A9"/>
    <circle cx="50" cy="50" r="15" fill="#FFFFFF" stroke="#2FA4A9" stroke-width="2"/>
  </svg>`;
}

// Handle image loading errors
function handleImageError(imgElement, productName) {
  console.log(`Image failed to load for ${productName}, using SVG fallback`);
  imgElement.style.display = 'none';
  
  // Create SVG fallback
  const svgContainer = document.createElement('div');
  svgContainer.innerHTML = generateMotorSVG();
  svgContainer.style.width = '100%';
  svgContainer.style.height = '100%';
  svgContainer.style.display = 'flex';
  svgContainer.style.alignItems = 'center';
  svgContainer.style.justifyContent = 'center';
  
  imgElement.parentNode.appendChild(svgContainer);
}

// Render product cards with real images
function renderProductCards() {
  const productGrid = document.getElementById('product-grid');
  
  if (!productGrid) {
    console.error('Product grid element not found');
    return;
  }
  
  productGrid.innerHTML = '';
  
  productData.forEach(product => {
    const productCard = document.createElement('article');
    productCard.className = 'product-card';
    productCard.setAttribute('data-product-id', product.id);
    
    // Format specifications for display
    const specsArray = [
      { label: 'kW / HP', value: `${product.specs.kW} / ${product.specs.HP}` },
      { label: 'RPM', value: product.specs.RPM },
      { label: 'POLE', value: product.specs.POLE },
      { label: 'Motor Type', value: product.specs.type }
    ];
    
    // Create specs HTML
    const specsHTML = specsArray.map(spec => `
      <div class="spec-item">
        <span class="spec-label">${spec.label}</span>
        <span class="spec-value">${spec.value}</span>
      </div>
    `).join('');
    
    productCard.innerHTML = `
      <div class="product-image-container">
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          class="product-image" 
          loading="lazy"
          onerror="handleImageError(this, '${product.name.replace(/'/g, "\\'")}')"
        />
      </div>
      <div class="product-content">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-specs">
          ${specsHTML}
        </div>
        <button class="quote-button" data-product-id="${product.id}" data-product-name="${product.name}">
          Get a Quote
        </button>
      </div>
    `;
    
    productGrid.appendChild(productCard);
  });
  
  // Add event listeners to the buttons
  addQuoteButtonListeners();
}

// Format specs for WhatsApp message
function formatSpecsForMessage(product) {
  return `kW/HP: ${product.specs.kW} / ${product.specs.HP}, RPM: ${product.specs.RPM}, POLE: ${product.specs.POLE}, Motor Type: ${product.specs.type}`;
}

// Generate WhatsApp message
function generateWhatsAppMessage(productName, productSpecs) {
  return `Hello,
I am interested in the following product:

Product Name: ${productName}
Specifications: ${productSpecs}

May I know more details about this product?`;
}

// Open WhatsApp with encoded message
function openWhatsApp(productName, productSpecs) {
  const message = generateWhatsAppMessage(productName, productSpecs);
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = "9789029012";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Open in new tab
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

// Show WhatsApp confirmation overlay
function showWhatsAppOverlay(productName, productSpecs) {
  const overlay = document.getElementById('whatsapp-overlay');
  const productNameElement = document.getElementById('selected-product-name');
  
  if (!overlay || !productNameElement) {
    // Fallback: directly open WhatsApp
    openWhatsApp(productName, productSpecs);
    return;
  }
  
  // Store product data in overlay for confirmation
  overlay.dataset.productName = productName;
  overlay.dataset.productSpecs = productSpecs;
  
  productNameElement.textContent = productName;
  overlay.classList.add('active');
}

// Close WhatsApp overlay
function closeWhatsAppOverlay() {
  const overlay = document.getElementById('whatsapp-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

// Add event listeners to quote buttons
function addQuoteButtonListeners() {
  const quoteButtons = document.querySelectorAll('.quote-button');
  
  quoteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const productId = this.getAttribute('data-product-id');
      const productName = this.getAttribute('data-product-name');
      
      // Find product in data
      const product = productData.find(p => p.id == productId);
      
      if (product) {
        const productSpecs = formatSpecsForMessage(product);
        showWhatsAppOverlay(productName, productSpecs);
      }
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
        const productName = overlay.dataset.productName;
        const productSpecs = overlay.dataset.productSpecs;
        
        closeWhatsAppOverlay();
        openWhatsApp(productName, productSpecs);
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
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductListing);
} else {
  initProductListing();
}

// Make handleImageError function available globally for onerror attribute
window.handleImageError = handleImageError;