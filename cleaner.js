// SIMPLE DIRECT SOLUTION - Guaranteed to work
document.addEventListener('DOMContentLoaded', function() {
  console.log('Page loaded, setting up quote buttons...');
  
  // Get all quote buttons
  const quoteButtons = document.querySelectorAll('.quote-button');
  console.log('Found buttons:', quoteButtons.length);
  
  // Add click event to each button
  quoteButtons.forEach((button, index) => {
    console.log(`Setting up button ${index + 1}:`, button);
    
    // Get service name directly from button
    const serviceName = button.getAttribute('data-service-name');
    console.log(`Button ${index + 1} service name:`, serviceName);
    
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Button clicked!');
      console.log('Button text:', this.textContent);
      console.log('Service name from attribute:', serviceName);
      
      // Show service name in console
      console.log('Service Name:', serviceName);
      
      // If serviceName is null, try to get from parent
      let actualServiceName = serviceName;
      if (!actualServiceName) {
        console.warn('Service name not found in data attribute, trying parent...');
        const serviceTitle = this.closest('.service-text')?.querySelector('.service-title')?.textContent;
        actualServiceName = serviceTitle || 'Industrial Cleaning Service';
        console.log('Service name from title:', actualServiceName);
      }
      
      // Update overlay text
      const overlayText = document.getElementById('selected-service-name');
      if (overlayText) {
        overlayText.textContent = actualServiceName;
        console.log('Updated overlay text to:', actualServiceName);
      } else {
        console.error('Overlay text element not found!');
      }
      
      // Show overlay
      const overlay = document.getElementById('whatsapp-overlay');
      if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Overlay shown');
        
        // Store service name in overlay for confirm button
        overlay.dataset.serviceName = actualServiceName;
      } else {
        console.error('Overlay not found!');
      }
      
      // Button animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
  
  // Overlay close buttons
  document.getElementById('close-whatsapp-btn')?.addEventListener('click', function() {
    const overlay = document.getElementById('whatsapp-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  document.getElementById('cancel-whatsapp-btn')?.addEventListener('click', function() {
    const overlay = document.getElementById('whatsapp-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Confirm WhatsApp button
  document.getElementById('confirm-whatsapp-btn')?.addEventListener('click', function() {
    const overlay = document.getElementById('whatsapp-overlay');
    if (!overlay) return;
    
    const serviceName = overlay.dataset.serviceName || 'Industrial Cleaning Service';
    console.log('Confirming WhatsApp for service:', serviceName);
    
    // Button animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 150);
    
    // Close overlay
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Redirect to WhatsApp
    setTimeout(() => {
      const message = `Hello,

I am interested in the following service:
Service Name: ${serviceName}

Please provide me with:
• Price
• Minimum quantity

Thank you.`;
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/9789029012?text=${encodedMessage}`;
      
      console.log('Opening WhatsApp URL:', whatsappUrl);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 300);
  });
  
  // Close overlay on outside click
  document.getElementById('whatsapp-overlay')?.addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Escape key to close overlay
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const overlay = document.getElementById('whatsapp-overlay');
      if (overlay && overlay.classList.contains('active')) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
  
  // Debug: Log all elements with data-service-name
  console.log('Debug: All elements with data-service-name attribute:');
  document.querySelectorAll('[data-service-name]').forEach(el => {
    console.log('Element:', el);
    console.log('Service name:', el.getAttribute('data-service-name'));
    console.log('---');
  });
});











/**
 * Enterprise Solutions Coverage System
 * Enhanced with mobile accordion and image support
 */

class EnterpriseSolutions {
  constructor() {
    // DOM Elements
    this.solutionItems = document.querySelectorAll('.enterprise-list-item');
    this.panel = document.querySelector('.enterprise-panel');
    this.panelBadge = document.getElementById('enterprise-panel-badge');
    this.panelTitle = document.getElementById('enterprise-panel-title');
    this.panelImage = document.querySelector('.enterprise-solution-image');
    this.panelText = document.querySelector('.enterprise-panel-text');
    this.featureGrid = document.querySelector('.enterprise-feature-grid');
    this.scaleProgress = document.querySelector('.enterprise-scale-progress');
    this.scaleValue = document.querySelector('.enterprise-scale-value');
    this.scaleNote = document.querySelector('.enterprise-scale-note');
    
    // Solution data with images
    this.solutions = {
      'floor-care': {
        badge: '01',
        title: 'Floor Care Solutions',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
        description: 'Comprehensive floor maintenance solutions designed for high-traffic commercial and hospitality environments. Our systematic approach ensures optimal cleanliness, safety, and longevity for all floor surfaces.',
        features: [
          {
            icon: 'star',
            title: 'Hardwood & Tile Systems',
            text: 'Specialized cleaning and maintenance for all hard surfaces'
          },
          {
            icon: 'grid',
            title: 'Carpet Maintenance',
            text: 'Deep cleaning and protection protocols for carpeted areas'
          },
          {
            icon: 'clock',
            title: 'Scheduled Maintenance',
            text: 'Regular cleaning cycles and preventative care programs'
          },
          {
            icon: 'shield',
            title: 'Safety Treatments',
            text: 'Slip resistance and surface protection applications'
          }
        ],
        scale: 85,
        scaleText: 'High-capacity deployment across multiple facilities with 24/7 support'
      },
      'water-management': {
        badge: '02',
        title: 'Water Management Systems',
        image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=400&fit=crop',
        description: 'Advanced water conservation, treatment, and recycling solutions for sustainable facility operations. Our systems ensure water quality, reduce consumption, and maintain regulatory compliance.',
        features: [
          {
            icon: 'droplet',
            title: 'Water Treatment',
            text: 'Advanced filtration and purification technologies'
          },
          {
            icon: 'monitor',
            title: 'Conservation Monitoring',
            text: 'Real-time water usage tracking and optimization'
          },
          {
            icon: 'check',
            title: 'Quality Control',
            text: 'Continuous water quality testing and compliance'
          },
          {
            icon: 'refresh',
            title: 'Recycling Systems',
            text: 'Water recycling and reuse protocols'
          }
        ],
        scale: 78,
        scaleText: 'Moderate to high deployment with regional support centers'
      },
      'restroom-sanitation': {
        badge: '03',
        title: 'Restroom Sanitation & Odor Control',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop',
        description: 'Complete restroom hygiene solutions with automated systems and advanced odor elimination technology for high-traffic public and private facilities.',
        features: [
          {
            icon: 'automation',
            title: 'Automated Systems',
            text: 'Touchless fixtures and automated cleaning'
          },
          {
            icon: 'odor',
            title: 'Odor Control',
            text: 'Advanced odor elimination technology'
          },
          {
            icon: 'hygiene',
            title: 'Hygiene Monitoring',
            text: 'Real-time sanitation status tracking'
          },
          {
            icon: 'audit',
            title: 'Sanitation Audits',
            text: 'Regular compliance and quality checks'
          }
        ],
        scale: 90,
        scaleText: 'High-volume deployment with rapid response teams'
      },
      'pest-elimination': {
        badge: '04',
        title: 'Pest Elimination Programs',
        image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=400&fit=crop',
        description: 'Integrated pest management solutions specifically designed for hospitality and commercial environments, combining prevention, monitoring, and elimination strategies.',
        features: [
          {
            icon: 'integrated',
            title: 'Integrated Management',
            text: 'Holistic pest control strategies'
          },
          {
            icon: 'prevention',
            title: 'Prevention Protocols',
            text: 'Proactive measures and barrier systems'
          },
          {
            icon: 'monitor',
            title: 'Monitoring Systems',
            text: 'Continuous pest activity tracking'
          },
          {
            icon: 'eco',
            title: 'Eco-friendly Treatments',
            text: 'Environmentally responsible solutions'
          }
        ],
        scale: 82,
        scaleText: 'Strategic deployment with seasonal optimization'
      },
      'housekeeping': {
        badge: '05',
        title: 'Housekeeping Solutions',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
        description: 'Professional housekeeping programs with systematic maintenance protocols for hotels, hospitals, and commercial facilities, ensuring consistent cleanliness standards.',
        features: [
          {
            icon: 'systematic',
            title: 'Systematic Protocols',
            text: 'Structured cleaning procedures and schedules'
          },
          {
            icon: 'quality',
            title: 'Quality Assurance',
            text: 'Regular inspections and performance tracking'
          },
          {
            icon: 'training',
            title: 'Staff Training',
            text: 'Comprehensive training and certification programs'
          },
          {
            icon: 'inventory',
            title: 'Inventory Management',
            text: 'Supply chain and equipment management'
          }
        ],
        scale: 88,
        scaleText: 'Large-scale deployment with multi-shift operations'
      },
      'pool-spa': {
        badge: '06',
        title: 'Pool & Spa Management',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
        description: 'Complete aquatic facility management including advanced water treatment, equipment maintenance, and safety compliance for pools and spa facilities.',
        features: [
          {
            icon: 'chemistry',
            title: 'Water Chemistry',
            text: 'Precise chemical balance management'
          },
          {
            icon: 'equipment',
            title: 'Equipment Maintenance',
            text: 'Regular maintenance and repair services'
          },
          {
            icon: 'safety',
            title: 'Safety Compliance',
            text: 'Full compliance with safety regulations'
          },
          {
            icon: 'energy',
            title: 'Energy Efficiency',
            text: 'Sustainable and energy-saving solutions'
          }
        ],
        scale: 75,
        scaleText: 'Seasonal deployment with peak period support'
      },
      'foodservice-hygiene': {
        badge: '07',
        title: 'Foodservice & Kitchen Hygiene',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
        description: 'Commercial kitchen sanitation solutions and food service hygiene protocols designed for high-volume food preparation environments.',
        features: [
          {
            icon: 'sanitation',
            title: 'Kitchen Sanitation',
            text: 'Complete kitchen cleaning and disinfection'
          },
          {
            icon: 'surface',
            title: 'Surface Protocols',
            text: 'Food contact surface sanitation standards'
          },
          {
            icon: 'waste',
            title: 'Waste Management',
            text: 'Efficient waste disposal and recycling'
          },
          {
            icon: 'hygiene',
            title: 'Hygiene Monitoring',
            text: 'Continuous hygiene compliance tracking'
          }
        ],
        scale: 87,
        scaleText: 'High-frequency deployment in food service facilities'
      },
      'food-safety': {
        badge: '08',
        title: 'Food Safety & Public Health',
        image: 'https://images.unsplash.com/photo-1556906781-2a0b5d1ba5e5?w=600&h=400&fit=crop',
        description: 'Compliance protocols and safety standards for food handling and public health, ensuring regulatory compliance and consumer protection.',
        features: [
          {
            icon: 'compliance',
            title: 'Regulatory Compliance',
            text: 'Full compliance with food safety regulations'
          },
          {
            icon: 'safety',
            title: 'Safety Protocols',
            text: 'Standardized food handling procedures'
          },
          {
            icon: 'health',
            title: 'Public Health',
            text: 'Public health protection measures'
          },
          {
            icon: 'audit',
            title: 'Audit Support',
            text: 'Certification and audit preparation'
          }
        ],
        scale: 92,
        scaleText: 'Industry-wide deployment with regulatory expertise'
      },
      'laundry-programs': {
        badge: '09',
        title: 'Laundry Programs',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        description: 'Industrial laundry solutions and linen management systems for hospitality, healthcare, and commercial facilities.',
        features: [
          {
            icon: 'linen',
            title: 'Linen Management',
            text: 'Complete linen lifecycle management'
          },
          {
            icon: 'equipment',
            title: 'Equipment Maintenance',
            text: 'Regular equipment servicing and repair'
          },
          {
            icon: 'chemical',
            title: 'Chemical Management',
            text: 'Eco-friendly detergents and chemicals'
          },
          {
            icon: 'quality',
            title: 'Quality Control',
            text: 'Quality assurance and inspection protocols'
          }
        ],
        scale: 80,
        scaleText: 'Medium to large-scale laundry facility management'
      },
      'hand-hygiene': {
        badge: '10',
        title: 'Hand Hygiene Systems',
        image: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=600&h=400&fit=crop',
        description: 'Advanced hand washing and sanitization systems for public and private facilities, promoting hygiene and reducing contamination risks.',
        features: [
          {
            icon: 'touchless',
            title: 'Touchless Systems',
            text: 'Automated soap and sanitizer dispensers'
          },
          {
            icon: 'station',
            title: 'Sanitization Stations',
            text: 'Strategic placement of hygiene stations'
          },
          {
            icon: 'monitor',
            title: 'Consumption Monitoring',
            text: 'Usage tracking and refill management'
          },
          {
            icon: 'reporting',
            title: 'Compliance Reporting',
            text: 'Hygiene compliance documentation'
          }
        ],
        scale: 85,
        scaleText: 'Widespread deployment with automated monitoring'
      }
    };
    
    // Current active solution
    this.activeSolution = 'floor-care';
    this.isMobile = window.innerWidth <= 768;
    
    // Initialize
    this.init();
  }
  
  init() {
    // Set initial active state
    this.setActiveSolution('floor-care');
    
    // Bind events
    this.bindEvents();
    
    // Handle responsive changes
    this.handleResponsive();
    
    // Update panel for desktop
    if (!this.isMobile) {
      this.updatePanelContent('floor-care');
    }
  }
  
  bindEvents() {
    // Solution item click events
    this.solutionItems.forEach(item => {
      item.addEventListener('click', (e) => this.handleSolutionClick(e, item));
      item.addEventListener('mouseenter', () => this.handleSolutionHover(item));
      item.addEventListener('mouseleave', () => this.handleSolutionLeave(item));
    });
    
    // Window resize for responsive behavior
    window.addEventListener('resize', () => this.handleResponsive());
  }
  
  handleResponsive() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    if (wasMobile !== this.isMobile) {
      // Reset all mobile expanded states when switching between mobile/desktop
      if (!this.isMobile) {
        this.solutionItems.forEach(item => {
          const mobileContent = item.querySelector('.enterprise-mobile-content');
          if (mobileContent) {
            mobileContent.style.display = 'none';
          }
        });
      }
    }
  }
  
  handleSolutionClick(event, item) {
    event.preventDefault();
    
    // Get solution ID
    const solutionId = item.dataset.solution;
    
    // Prevent duplicate activation
    if (solutionId === this.activeSolution && !this.isMobile) return;
    
    // Toggle active state for mobile
    if (this.isMobile) {
      const isCurrentlyActive = item.classList.contains('active');
      
      // Close all other items on mobile
      this.solutionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherMobileContent = otherItem.querySelector('.enterprise-mobile-content');
          if (otherMobileContent) {
            otherMobileContent.style.display = 'none';
          }
        }
      });
      
      // Toggle current item
      if (isCurrentlyActive) {
        item.classList.remove('active');
        const mobileContent = item.querySelector('.enterprise-mobile-content');
        if (mobileContent) {
          mobileContent.style.display = 'none';
        }
        this.activeSolution = null;
      } else {
        item.classList.add('active');
        const mobileContent = item.querySelector('.enterprise-mobile-content');
        if (mobileContent) {
          mobileContent.style.display = 'block';
        }
        this.activeSolution = solutionId;
        this.animateMobileExpand(item);
      }
    } else {
      // Desktop behavior
      this.setActiveSolution(solutionId);
      this.updateSolutionItemStates(item);
      this.updatePanelContent(solutionId);
      this.animateSolutionClick(item);
    }
  }
  
  animateMobileExpand(item) {
    const mobileContent = item.querySelector('.enterprise-mobile-content');
    if (mobileContent) {
      mobileContent.style.opacity = '0';
      mobileContent.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        mobileContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        mobileContent.style.opacity = '1';
        mobileContent.style.transform = 'translateY(0)';
        
        setTimeout(() => {
          mobileContent.style.transition = '';
        }, 300);
      }, 10);
    }
  }
  
  handleSolutionHover(item) {
    // Only apply hover effects on desktop if not active
    if (!this.isMobile && item.dataset.solution !== this.activeSolution) {
      item.classList.add('enterprise-hover');
    }
  }
  
  handleSolutionLeave(item) {
    if (!this.isMobile) {
      item.classList.remove('enterprise-hover');
    }
  }
  
  setActiveSolution(solutionId) {
    this.activeSolution = solutionId;
  }
  
  updateSolutionItemStates(clickedItem) {
    // Remove active class from all items
    this.solutionItems.forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    
    // Add active class to clicked item
    clickedItem.classList.add('active');
    clickedItem.setAttribute('aria-selected', 'true');
  }
  
  updatePanelContent(solutionId) {
    const solution = this.solutions[solutionId];
    
    if (!solution) {
      console.error(`Solution data not found for: ${solutionId}`);
      return;
    }
    
    // Update panel badge
    if (this.panelBadge) {
      this.panelBadge.textContent = solution.badge;
      this.animateElement(this.panelBadge, 'scale', 1.1);
    }
    
    // Update panel title
    if (this.panelTitle) {
      this.panelTitle.textContent = solution.title;
      this.animateElement(this.panelTitle, 'translateY');
    }
    
    // Update panel image
    if (this.panelImage) {
      this.panelImage.src = solution.image;
      this.panelImage.alt = solution.title;
      this.animateElement(this.panelImage, 'scale', 0.95);
    }
    
    // Update description
    if (this.panelText) {
      this.panelText.textContent = solution.description;
      this.animateElement(this.panelText, 'translateY');
    }
    
    // Update features grid
    if (this.featureGrid && solution.features) {
      this.featureGrid.innerHTML = '';
      
      solution.features.forEach(feature => {
        const featureCard = this.createFeatureCard(feature);
        this.featureGrid.appendChild(featureCard);
      });
    }
    
    // Update operation scale
    if (this.scaleProgress) {
      this.scaleProgress.style.width = `${solution.scale}%`;
      this.animateElement(this.scaleProgress, 'scaleX');
    }
    
    if (this.scaleValue) {
      this.scaleValue.textContent = `${solution.scale}% Deployment`;
    }
    
    if (this.scaleNote) {
      this.scaleNote.textContent = solution.scaleText;
    }
  }
  
  createFeatureCard(feature) {
    const card = document.createElement('div');
    card.className = 'enterprise-feature-card';
    
    // Get icon SVG based on type
    let iconSVG = '';
    switch(feature.icon) {
      case 'star':
        iconSVG = `<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  stroke="#2FA4A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
        break;
      case 'grid':
        iconSVG = `<rect x="3" y="3" width="18" height="18" rx="2" stroke="#2FA4A9" stroke-width="2"/>
                  <path d="M3 9H21" stroke="#2FA4A9" stroke-width="2"/>
                  <path d="M9 21V9" stroke="#2FA4A9" stroke-width="2"/>`;
        break;
      case 'clock':
        iconSVG = `<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                  stroke="#2FA4A9" stroke-width="2"/>
                  <path d="M12 6V12L16 14" stroke="#2FA4A9" stroke-width="2"/>`;
        break;
      case 'shield':
        iconSVG = `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
                  stroke="#2FA4A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
        break;
      default:
        iconSVG = `<circle cx="12" cy="12" r="10" stroke="#2FA4A9" stroke-width="2"/>
                  <path d="M12 16v-4M12 8h.01" stroke="#2FA4A9" stroke-width="2" stroke-linecap="round"/>`;
    }
    
    card.innerHTML = `
      <div class="enterprise-feature-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">${iconSVG}</svg>
      </div>
      <div class="enterprise-feature-content">
        <h4>${feature.title}</h4>
        <p>${feature.text}</p>
      </div>
    `;
    
    return card;
  }
  
  animateSolutionClick(item) {
    // Add click animation for desktop
    if (!this.isMobile) {
      item.style.transform = 'translateX(4px) scale(1.02)';
      
      setTimeout(() => {
        item.style.transform = 'translateX(4px)';
        
        setTimeout(() => {
          item.style.transform = '';
        }, 150);
      }, 100);
    }
  }
  
  animateElement(element, animationType, scaleValue = 1.1) {
    // Only animate on desktop
    if (this.isMobile) return;
    
    const originalTransform = element.style.transform || '';
    
    switch(animationType) {
      case 'scale':
        element.style.transform = `scale(${scaleValue})`;
        break;
      case 'translateY':
        element.style.transform = 'translateY(4px)';
        break;
      case 'scaleX':
        element.style.transform = 'scaleX(1.05)';
        break;
    }
    
    // Reset after animation
    setTimeout(() => {
      element.style.transform = originalTransform;
    }, 300);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the solutions system
  const enterpriseSolutions = new EnterpriseSolutions();
  
  // Handle image loading errors
  document.querySelectorAll('.enterprise-solution-image, .enterprise-mobile-image img').forEach(img => {
    img.addEventListener('error', function() {
      console.log(`Image failed to load: ${this.src}`);
      this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23AEE6E6"/%3E%3Ctext x="200" y="150" font-family="Arial" font-size="20" text-anchor="middle" fill="%232FA4A9"%3ESolution Image%3C/text%3E%3C/svg%3E';
    });
  });
});




/**
 * Capabilities Overview System
 * Professional enterprise-grade interaction handling
 */

class CapabilitiesOverview {
  constructor() {
    // DOM Elements
    this.solutionBands = document.querySelectorAll('.solution-band');
    this.isMobile = window.innerWidth <= 768;
    
    // Initialize
    this.init();
  }
  
  init() {
    // Bind events
    this.bindEvents();
    
    // Handle responsive changes
    this.handleResponsive();
    
    // Set initial active state for first band on mobile
    if (this.isMobile) {
      this.setInitialMobileState();
    }
  }
  
  bindEvents() {
    // Desktop hover events
    this.solutionBands.forEach(band => {
      band.addEventListener('mouseenter', () => this.handleBandHover(band));
      band.addEventListener('mouseleave', () => this.handleBandLeave(band));
      
      // Mobile click events
      band.addEventListener('click', (e) => this.handleBandClick(e, band));
      
      // Keyboard navigation
      band.addEventListener('keydown', (e) => this.handleBandKeydown(e, band));
      
      // Focus events for accessibility
      band.addEventListener('focus', () => this.handleBandFocus(band));
      band.addEventListener('blur', () => this.handleBandBlur(band));
    });
    
    // Window resize for responsive behavior
    window.addEventListener('resize', () => this.handleResponsive());
    
    // Close panels when clicking outside on mobile
    document.addEventListener('click', (e) => this.handleOutsideClick(e));
  }
  
  handleResponsive() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    if (wasMobile !== this.isMobile) {
      // Reset all active states when switching between mobile/desktop
      this.solutionBands.forEach(band => {
        band.classList.remove('active');
        const panel = band.querySelector('.band-panel');
        if (panel) {
          panel.style.maxHeight = '0';
          panel.style.opacity = '0';
          panel.style.visibility = 'hidden';
        }
        // Reset indicator progress
        const progressBar = band.querySelector('.indicator-progress');
        if (progressBar) {
          progressBar.style.width = '0';
        }
      });
      
      // Set first band as active on mobile
      if (this.isMobile && this.solutionBands.length > 0) {
        const firstBand = this.solutionBands[0];
        firstBand.classList.add('active');
        this.activateMobilePanel(firstBand);
      }
    }
  }
  
  setInitialMobileState() {
    // Set first band as active on mobile
    if (this.solutionBands.length > 0) {
      const firstBand = this.solutionBands[0];
      firstBand.classList.add('active');
      this.activateMobilePanel(firstBand);
    }
  }
  
  handleBandHover(band) {
    // Only apply hover effects on desktop
    if (!this.isMobile) {
      band.classList.add('hover');
      this.animateBandHover(band);
    }
  }
  
  handleBandLeave(band) {
    if (!this.isMobile) {
      band.classList.remove('hover');
      // Reset indicator progress on desktop leave
      const progressBar = band.querySelector('.indicator-progress');
      if (progressBar) {
        progressBar.style.width = '0';
      }
    }
  }
  
  handleBandClick(event, band) {
    // Prevent default on mobile
    if (this.isMobile) {
      event.preventDefault();
      event.stopPropagation();
      
      const isActive = band.classList.contains('active');
      
      // Close all other bands
      this.solutionBands.forEach(otherBand => {
        if (otherBand !== band) {
          otherBand.classList.remove('active');
          this.deactivateMobilePanel(otherBand);
        }
      });
      
      // Toggle current band
      if (isActive) {
        band.classList.remove('active');
        this.deactivateMobilePanel(band);
      } else {
        band.classList.add('active');
        this.activateMobilePanel(band);
      }
    }
  }
  
  handleBandKeydown(event, band) {
    // Handle keyboard navigation
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleBandClick(event, band);
    }
    
    // Arrow key navigation for accessibility
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.navigateBands(band, event.key);
    }
  }
  
  handleBandFocus(band) {
    // Add focus styling for accessibility
    band.classList.add('focused');
  }
  
  handleBandBlur(band) {
    band.classList.remove('focused');
  }
  
  handleOutsideClick(event) {
    // Close all bands when clicking outside on mobile
    if (this.isMobile && !event.target.closest('.solution-band')) {
      this.solutionBands.forEach(band => {
        band.classList.remove('active');
        this.deactivateMobilePanel(band);
      });
    }
  }
  
  navigateBands(currentBand, direction) {
    const currentIndex = Array.from(this.solutionBands).indexOf(currentBand);
    let nextIndex;
    
    if (direction === 'ArrowDown') {
      nextIndex = currentIndex < this.solutionBands.length - 1 ? currentIndex + 1 : 0;
    } else if (direction === 'ArrowUp') {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : this.solutionBands.length - 1;
    }
    
    if (nextIndex !== undefined) {
      const nextBand = this.solutionBands[nextIndex];
      nextBand.focus();
      
      // On mobile, also activate the focused band
      if (this.isMobile) {
        this.solutionBands.forEach(band => {
          band.classList.remove('active');
          this.deactivateMobilePanel(band);
        });
        nextBand.classList.add('active');
        this.activateMobilePanel(nextBand);
      }
    }
  }
  
  activateMobilePanel(band) {
    const panel = band.querySelector('.band-panel');
    if (!panel) return;
    
    // Calculate the height needed for the panel content
    const panelContent = panel.querySelector('.panel-content');
    const contentHeight = panelContent ? panelContent.scrollHeight : 0;
    
    // Set the max-height to animate the expansion
    panel.style.maxHeight = `${contentHeight + 40}px`;
    panel.style.opacity = '1';
    panel.style.visibility = 'visible';
    
    // Animate the indicator progress bar on mobile
    const progressBar = band.querySelector('.indicator-progress');
    if (progressBar) {
      // Reset and animate to 100%
      progressBar.style.width = '0';
      setTimeout(() => {
        progressBar.style.transition = 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s';
        progressBar.style.width = '100%';
      }, 50);
    }
    
    // Animate the panel content
    this.animatePanelContent(panelContent);
  }
  
  deactivateMobilePanel(band) {
    const panel = band.querySelector('.band-panel');
    if (panel) {
      panel.style.maxHeight = '0';
      panel.style.opacity = '0';
      panel.style.visibility = 'hidden';
    }
    
    // Reset indicator progress bar
    const progressBar = band.querySelector('.indicator-progress');
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0';
    }
  }
  
  animateBandHover(band) {
    // Animate the top border expansion
    const beforeElement = band;
    if (beforeElement) {
      beforeElement.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    // Animate the progress bar
    const progressBar = band.querySelector('.indicator-progress');
    if (progressBar) {
      progressBar.style.transition = 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s';
      progressBar.style.width = '100%';
    }
  }
  
  animatePanelContent(content) {
    if (!content) return;
    
    content.style.opacity = '0';
    content.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
      
      setTimeout(() => {
        content.style.transition = '';
      }, 300);
    }, 50);
  }
  
  // Public method to programmatically activate a band
  activateBand(solutionId) {
    const targetBand = Array.from(this.solutionBands).find(
      band => band.dataset.solution === solutionId
    );
    
    if (targetBand) {
      if (this.isMobile) {
        this.handleBandClick(new Event('click'), targetBand);
      } else {
        this.handleBandHover(targetBand);
      }
    }
  }
  
  // Public method to deactivate all bands
  deactivateAll() {
    this.solutionBands.forEach(band => {
      band.classList.remove('active', 'hover');
      
      if (this.isMobile) {
        this.deactivateMobilePanel(band);
      } else {
        const progressBar = band.querySelector('.indicator-progress');
        if (progressBar) {
          progressBar.style.width = '0';
        }
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the capabilities system
  const capabilitiesOverview = new CapabilitiesOverview();
  
  // Export to global scope for potential programmatic control
  window.capabilitiesOverview = capabilitiesOverview;
  
  // Set tabindex for keyboard navigation
  document.querySelectorAll('.solution-band').forEach((band, index) => {
    band.setAttribute('tabindex', '0');
    band.setAttribute('role', 'button');
    band.setAttribute('aria-expanded', index === 0 && window.innerWidth <= 768 ? 'true' : 'false');
    
    // Set ARIA attributes for indicator
    const indicator = band.querySelector('.band-indicator');
    const progressBar = band.querySelector('.indicator-progress');
    if (indicator && progressBar) {
      if (window.innerWidth <= 768 && index === 0) {
        indicator.setAttribute('aria-hidden', 'false');
        progressBar.setAttribute('aria-valuenow', '100');
      } else {
        indicator.setAttribute('aria-hidden', 'true');
        progressBar.setAttribute('aria-valuenow', '0');
      }
    }
  });
  
  // Update aria-expanded on resize
  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768;
    document.querySelectorAll('.solution-band').forEach((band, index) => {
      const isActive = band.classList.contains('active');
      band.setAttribute('aria-expanded', isMobile && isActive ? 'true' : 'false');
      
      // Update ARIA for indicator
      const indicator = band.querySelector('.band-indicator');
      const progressBar = band.querySelector('.indicator-progress');
      if (indicator && progressBar) {
        if (isMobile && isActive) {
          indicator.setAttribute('aria-hidden', 'false');
          progressBar.setAttribute('aria-valuenow', '100');
        } else {
          indicator.setAttribute('aria-hidden', 'true');
          progressBar.setAttribute('aria-valuenow', '0');
        }
      }
    });
  });
  
  // Update aria-expanded on click
  document.addEventListener('click', (e) => {
    const band = e.target.closest('.solution-band');
    if (band && window.innerWidth <= 768) {
      const isActive = band.classList.contains('active');
      band.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      
      // Update ARIA for indicator
      const indicator = band.querySelector('.band-indicator');
      const progressBar = band.querySelector('.indicator-progress');
      if (indicator && progressBar) {
        indicator.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        progressBar.setAttribute('aria-valuenow', isActive ? '100' : '0');
      }
      
      // Update other bands
      document.querySelectorAll('.solution-band').forEach(otherBand => {
        if (otherBand !== band) {
          otherBand.setAttribute('aria-expanded', 'false');
          const otherIndicator = otherBand.querySelector('.band-indicator');
          const otherProgressBar = otherBand.querySelector('.indicator-progress');
          if (otherIndicator && otherProgressBar) {
            otherIndicator.setAttribute('aria-hidden', 'true');
            otherProgressBar.setAttribute('aria-valuenow', '0');
          }
        }
      });
    }
  });
});

// Fallback for older browsers
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

