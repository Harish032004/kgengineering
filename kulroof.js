// Hero Section Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp Consultation Function
    const whatsappBtn = document.getElementById('technical-consultation-btn');
    
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click feedback
        this.style.transform = 'scale(0.95)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        
        setTimeout(() => {
            this.style.transform = '';
            this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
        }, 200);
        
        // Open WhatsApp
        const phoneNumber = '919789029012';
        const message = encodeURIComponent(
            'Hello KULROOF Team,\n\nI am interested in a Technical Consultation for Industrial Heat & Waterproofing Solutions.\n\nPlease contact me to discuss:\n1. Site assessment\n2. Technical specifications\n3. Project timeline\n4. Cost estimation\n\nLooking forward to your response.'
        );
        
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        // Track CTA click
        console.log('Technical Consultation CTA clicked - WhatsApp initiated');
    });
    
    // Background Image Loading Enhancement
    const bgImage = document.querySelector('.bg-image');
    const heroImage = document.querySelector('.main-image');
    
    // Preload background image
    if (bgImage) {
        const bgImageUrl = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
        const imgPreload = new Image();
        imgPreload.src = bgImageUrl;
        
        imgPreload.onload = function() {
            // Image loaded successfully
            bgImage.style.opacity = '0.3';
            bgImage.style.transition = 'opacity 0.8s ease';
            
            if (heroImage) {
                heroImage.src = bgImageUrl;
                heroImage.style.opacity = '1';
                heroImage.style.transition = 'opacity 0.8s ease';
            }
        };
        
        imgPreload.onerror = function() {
            console.log('Background image failed to load');
            bgImage.style.backgroundImage = 'linear-gradient(to right, #0F172A, #1E293B)';
        };
    }
    
    // Enhanced hover effects for CTA button
    whatsappBtn.addEventListener('mouseenter', function(e) {
        this.style.cursor = 'pointer';
        
        // Add ripple effect
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        // Remove existing ripples
        const existingRipples = this.querySelectorAll('.ripple-effect');
        existingRipples.forEach(ripple => ripple.remove());
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.8s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            z-index: 1;
        `;
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode === this) {
                this.removeChild(ripple);
            }
        }, 800);
    });
    
    // Add ripple animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Feature items interaction
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'rotate(15deg) scale(1.2)';
                icon.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            
            // Add subtle glow effect
            this.style.boxShadow = '0 4px 12px rgba(47, 164, 169, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = '';
            }
            this.style.boxShadow = 'none';
        });
        
        // Click to highlight feature
        item.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            this.style.background = 'rgba(47, 164, 169, 0.3)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.background = 'rgba(47, 164, 169, 0.1)';
            }, 300);
            
            // Log feature interaction
            console.log(`Feature ${index + 1} clicked: ${this.querySelector('.feature-text').textContent}`);
        });
    });
    
    // Image container interaction with enhanced zoom
    const imageContainer = document.querySelector('.image-container');
    
    if (imageContainer && heroImage) {
        let isHovering = false;
        let zoomInterval;
        
        imageContainer.addEventListener('mouseenter', function() {
            isHovering = true;
            
            // Smooth zoom in
            let zoom = 1;
            clearInterval(zoomInterval);
            
            zoomInterval = setInterval(() => {
                if (!isHovering) {
                    clearInterval(zoomInterval);
                    return;
                }
                
                if (zoom < 1.05) {
                    zoom += 0.005;
                    heroImage.style.transform = `scale(${zoom})`;
                } else {
                    clearInterval(zoomInterval);
                }
            }, 16);
            
            // Enhance overlay cards
            const overlayCards = this.querySelectorAll('.overlay-card');
            overlayCards.forEach(card => {
                card.style.transform = 'translateY(-2px)';
                card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
            });
        });
        
        imageContainer.addEventListener('mouseleave', function() {
            isHovering = false;
            
            // Smooth zoom out
            let zoom = 1.05;
            clearInterval(zoomInterval);
            
            zoomInterval = setInterval(() => {
                if (isHovering) {
                    clearInterval(zoomInterval);
                    return;
                }
                
                if (zoom > 1) {
                    zoom -= 0.01;
                    heroImage.style.transform = `scale(${zoom})`;
                } else {
                    clearInterval(zoomInterval);
                    heroImage.style.transform = 'scale(1)';
                }
            }, 16);
            
            // Reset overlay cards
            const overlayCards = this.querySelectorAll('.overlay-card');
            overlayCards.forEach(card => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
        
        // Mouse move for parallax effect
        imageContainer.addEventListener('mousemove', function(e) {
            if (!isHovering) return;
            
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            heroImage.style.transformOrigin = `${x}% ${y}%`;
        });
    }
    
    // Overlay cards interaction
    const overlayCards = document.querySelectorAll('.overlay-card');
    
    overlayCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.overlay-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.overlay-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
        
        card.addEventListener('click', function() {
            const title = this.querySelector('.overlay-title').textContent;
            const text = this.querySelector('.overlay-text').textContent;
            console.log(`Clicked overlay: ${title} - ${text}`);
            
            // Add click feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Scroll indicator animation
    const dots = document.querySelectorAll('.dot');
    let currentDot = 0;
    
    function animateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentDot].classList.add('active');
        currentDot = (currentDot + 1) % dots.length;
    }
    
    // Start dot animation
    setInterval(animateDots, 1500);
    
    // Scroll to next section on indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    scrollIndicator.addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
        
        // Animate dots on click
        dots.forEach((dot, index) => {
            setTimeout(() => {
                dot.classList.add('active');
                setTimeout(() => dot.classList.remove('active'), 200);
            }, index * 100);
        });
    });
    
    // Staggered loading for performance
    function initStaggeredLoad() {
        const elements = [
            ...document.querySelectorAll('.headline-line'),
            ...document.querySelectorAll('.feature-item'),
            ...document.querySelectorAll('.overlay-card')
        ];
        
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Initialize staggered loading
    initStaggeredLoad();
    
    // Window resize handling
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reset transforms on resize
            document.querySelectorAll('.feature-item, .overlay-card, .cta-button, .hero-image').forEach(el => {
                el.style.transform = '';
            });
            
            // Reset image zoom
            if (heroImage) {
                heroImage.style.transform = 'scale(1)';
                heroImage.style.transformOrigin = 'center center';
            }
            
            // Reinitialize staggered loading for responsive changes
            initStaggeredLoad();
        }, 250);
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Enter key on CTA button
        if (e.key === 'Enter' && document.activeElement === whatsappBtn) {
            whatsappBtn.click();
        }
        
        // Space key on feature items
        featureItems.forEach(item => {
            if (document.activeElement === item && e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
        
        // Space key on overlay cards
        overlayCards.forEach(card => {
            if (document.activeElement === card && e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Initialize focus states for accessibility
    const focusableElements = [whatsappBtn, ...featureItems, ...overlayCards];
    
    focusableElements.forEach(el => {
        el.setAttribute('tabindex', '0');
        
        el.addEventListener('focus', function() {
            this.style.outline = `3px solid #AEE6E6`;
            this.style.outlineOffset = '4px';
        });
        
        el.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Performance optimization with Intersection Observer
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class for potential optimizations
                    entry.target.classList.add('visible');
                    
                    // Lazy load images if needed
                    const images = entry.target.querySelectorAll('img[loading="lazy"]');
                    images.forEach(img => {
                        if (!img.loaded) {
                            img.loaded = true;
                            // Images already loaded in this implementation
                        }
                    });
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '50px' 
        });
        
        const heroSection = document.querySelector('.kulroof-hero');
        if (heroSection) observer.observe(heroSection);
    }
    
    // Add loaded state for better UX
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add a slight delay for final animations
        setTimeout(() => {
            const trustIndicators = document.querySelector('.trust-indicators');
            if (trustIndicators) {
                trustIndicators.style.opacity = '1';
                trustIndicators.style.transform = 'translateY(0)';
            }
            
            // Add loaded class to hero
            const heroSection = document.querySelector('.kulroof-hero');
            if (heroSection) {
                heroSection.classList.add('loaded');
            }
        }, 500);
    });
});
























// Why KULROOF Section Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize section animation on scroll
    initScrollAnimations();
    
    // Initialize hover interactions
    initHoverInteractions();
    
    // Initialize click interactions
    initClickInteractions();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Initialize responsive behavior
    initResponsiveBehavior();

    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const valueBlocks = document.querySelectorAll('.value-block');
        const engineeringStats = document.querySelector('.engineering-stats');
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('value-block')) {
                        entry.target.classList.add('animated');
                    } else if (entry.target === engineeringStats) {
                        entry.target.classList.add('animated');
                    }
                    
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe value blocks
        valueBlocks.forEach(block => {
            observer.observe(block);
        });
        
        // Observe engineering stats
        if (engineeringStats) {
            observer.observe(engineeringStats);
        }
    }

    // ===== HOVER INTERACTIONS =====
    function initHoverInteractions() {
        const valueBlocks = document.querySelectorAll('.value-block');
        const statItems = document.querySelectorAll('.stat-item');
        
        // Enhanced hover effects for value blocks
        valueBlocks.forEach(block => {
            // Add tabindex for keyboard navigation
            block.setAttribute('tabindex', '0');
            
            // Mouse enter effect
            block.addEventListener('mouseenter', function() {
                // Add active class for styling
                this.classList.add('active');
                
                // Animate icon
                const icon = this.querySelector('.value-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.15) rotate(5deg)';
                }
                
                // Highlight points
                const points = this.querySelectorAll('.value-point');
                points.forEach((point, index) => {
                    setTimeout(() => {
                        point.style.transform = 'translateX(5px)';
                        point.style.transition = 'transform 0.3s ease';
                    }, index * 50);
                });
                
                // Log hover for analytics (simulated)
                const blockId = this.id;
                console.log(`Hovered on ${blockId.replace('value-', '')}`);
            });
            
            // Mouse leave effect
            block.addEventListener('mouseleave', function() {
                this.classList.remove('active');
                
                // Reset icon
                const icon = this.querySelector('.value-icon');
                if (icon) {
                    icon.style.transform = '';
                }
                
                // Reset points
                const points = this.querySelectorAll('.value-point');
                points.forEach(point => {
                    point.style.transform = '';
                });
            });
        });
        
        // Stat items hover effect
        statItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const number = this.querySelector('.stat-number');
                if (number) {
                    number.style.transform = 'scale(1.1)';
                    number.style.transition = 'transform 0.3s ease';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const number = this.querySelector('.stat-number');
                if (number) {
                    number.style.transform = '';
                }
            });
        });
    }

    // ===== CLICK INTERACTIONS =====
    function initClickInteractions() {
        const valueBlocks = document.querySelectorAll('.value-block');
        
        valueBlocks.forEach(block => {
            block.addEventListener('click', function(e) {
                // Don't trigger if clicking on a link
                if (e.target.tagName === 'A') return;
                
                // Add click feedback
                this.style.transform = 'translateY(-2px) scale(0.99)';
                this.style.boxShadow = '0 8px 24px rgba(47, 164, 169, 0.2)';
                
                // Remove feedback after animation
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                }, 300);
                
                // Toggle active state
                const isActive = this.classList.contains('clicked');
                valueBlocks.forEach(b => b.classList.remove('clicked'));
                
                if (!isActive) {
                    this.classList.add('clicked');
                    
                    // Highlight this block
                    const blockId = this.id;
                    const blockTitle = this.querySelector('.value-title').textContent;
                    console.log(`Selected value: ${blockTitle}`);
                    
                    // Add visual indicator
                    const indicator = document.createElement('div');
                    indicator.className = 'click-indicator';
                    indicator.innerHTML = '✓ Selected';
                    indicator.style.cssText = `
                        position: absolute;
                        top: 0.5rem;
                        right: 0.5rem;
                        background: #2FA4A9;
                        color: #FFFFFF;
                        padding: 0.25rem 0.75rem;
                        border-radius: 4px;
                        font-size: 0.75rem;
                        font-weight: 600;
                        z-index: 10;
                        animation: slideInRight 0.3s ease;
                    `;
                    
                    // Remove existing indicator
                    const existingIndicator = this.querySelector('.click-indicator');
                    if (existingIndicator) {
                        existingIndicator.remove();
                    }
                    
                    this.appendChild(indicator);
                    
                    // Remove indicator after 2 seconds
                    setTimeout(() => {
                        if (indicator.parentNode === this) {
                            indicator.remove();
                        }
                    }, 2000);
                }
            });
        });
    }

    // ===== KEYBOARD NAVIGATION =====
    function initKeyboardNavigation() {
        const valueBlocks = document.querySelectorAll('.value-block');
        
        valueBlocks.forEach(block => {
            block.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
                
                // Arrow key navigation between blocks
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextBlock = this.nextElementSibling;
                    if (nextBlock && nextBlock.classList.contains('value-block')) {
                        nextBlock.focus();
                    }
                }
                
                if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevBlock = this.previousElementSibling;
                    if (prevBlock && prevBlock.classList.contains('value-block')) {
                        prevBlock.focus();
                    }
                }
            });
        });
        
        // Focus styles
        valueBlocks.forEach(block => {
            block.addEventListener('focus', function() {
                this.style.outline = '3px solid #2FA4A9';
                this.style.outlineOffset = '3px';
            });
            
            block.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }

    // ===== RESPONSIVE BEHAVIOR =====
    function initResponsiveBehavior() {
        let resizeTimer;
        
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                handleResponsiveChanges();
            }, 250);
        });
        
        // Initial responsive setup
        handleResponsiveChanges();
    }
    
    function handleResponsiveChanges() {
        const valueBlocks = document.querySelectorAll('.value-block');
        const engineeringStats = document.querySelector('.engineering-stats');
        
        // Reset animations on mobile for better performance
        if (window.innerWidth <= 768) {
            valueBlocks.forEach(block => {
                block.style.animationDelay = '0s';
                block.style.transition = 'all 0.3s ease';
            });
            
            if (engineeringStats) {
                engineeringStats.style.animationDelay = '0.2s';
            }
        } else {
            // Restore desktop animation delays
            valueBlocks.forEach((block, index) => {
                block.style.animationDelay = `${(index + 1) * 0.1}s`;
            });
            
            if (engineeringStats) {
                engineeringStats.style.animationDelay = '0.5s';
            }
        }
    }

    // ===== STATS COUNTER ANIMATION =====
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsSection = document.querySelector('.engineering-stats');
        
        if (!statsSection || statNumbers.length === 0) return;
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(stat => {
                        const finalValue = stat.textContent;
                        if (finalValue.includes('%')) {
                            animatePercentageCounter(stat, finalValue);
                        } else if (finalValue.includes('/')) {
                            animateTextReveal(stat, finalValue);
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    function animatePercentageCounter(element, finalValue) {
        const numericValue = parseFloat(finalValue);
        const duration = 1500;
        const steps = 60;
        const increment = numericValue / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            element.textContent = current.toFixed(1) + '%';
        }, duration / steps);
    }
    
    function animateTextReveal(element, finalValue) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Initialize stats counter
    setTimeout(initStatsCounter, 1000);

    // ===== PERFORMANCE OPTIMIZATION =====
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add loaded class for potential optimizations
                    entry.target.classList.add('visible');
                }
            });
        }, { rootMargin: '100px' });
        
        const sections = document.querySelectorAll('.value-block, .engineering-stats');
        sections.forEach(section => lazyObserver.observe(section));
    }
    
    // ===== LOADING STATE =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add slight delay for final animations
        setTimeout(() => {
            const section = document.querySelector('.why-kulroof-section');
            if (section) {
                section.classList.add('loaded');
            }
        }, 300);
    });
});













// Services Section Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    
    // Initialize WhatsApp buttons
    initWhatsAppButtons();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize custom solution button
    initCustomSolutionButton();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Initialize responsive behavior
    initResponsiveBehavior();

    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const serviceCards = document.querySelectorAll('.service-card');
        const servicesCta = document.querySelector('.services-cta');
        
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('service-card')) {
                        entry.target.classList.add('animated');
                    } else if (entry.target === servicesCta) {
                        entry.target.classList.add('animated');
                    }
                    
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        
        // Observe service cards
        serviceCards.forEach(card => {
            observer.observe(card);
        });
        
        // Observe CTA section
        if (servicesCta) {
            observer.observe(servicesCta);
        }
    }

    // ===== WHATSAPP BUTTONS =====
    function initWhatsAppButtons() {
        const quoteButtons = document.querySelectorAll('.quote-btn');
        
        quoteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get service name from data attribute
                const serviceName = this.getAttribute('data-service-name');
                
                // Add click feedback
                addClickFeedback(this);
                
                // Open WhatsApp with pre-filled message
                openWhatsAppForService(serviceName);
                
                // Track the click
                trackServiceInquiry(serviceName);
            });
        });
    }
    
    function addClickFeedback(button) {
        // Visual feedback
        button.style.transform = 'scale(0.95)';
        button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        
        // Add success checkmark
        const originalText = button.querySelector('.btn-text').textContent;
        button.querySelector('.btn-text').textContent = 'Request Sent!';
        
        // Reset after animation
        setTimeout(() => {
            button.style.transform = '';
            button.style.boxShadow = '';
            button.querySelector('.btn-text').textContent = originalText;
        }, 1500);
    }
    
    function openWhatsAppForService(serviceName) {
        const phoneNumber = '919789029012';
        const message = encodeURIComponent(
            `Hi, I need details and pricing for ${serviceName}. Please send me:\n\n1. Technical specifications\n2. Pricing structure\n3. Installation timeline\n4. Warranty details\n\nLooking forward to your response.`
        );
        
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }
    
    function trackServiceInquiry(serviceName) {
        console.log(`Service inquiry: ${serviceName}`);
        // In a real implementation, this would send to analytics
    }

    // ===== HOVER EFFECTS =====
    function initHoverEffects() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            // Add tabindex for keyboard navigation
            card.setAttribute('tabindex', '0');
            
            // Mouse enter effect
            card.addEventListener('mouseenter', function() {
                // Add active class
                this.classList.add('active');
                
                // Animate icon
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.15) rotate(5deg)';
                }
                
                // Animate features
                const features = this.querySelectorAll('.feature');
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.transform = 'translateX(5px)';
                        feature.style.transition = 'transform 0.3s ease';
                    }, index * 100);
                });
                
                // Highlight service badge
                const badge = this.querySelector('.service-badge');
                if (badge) {
                    badge.style.transform = 'scale(1.05)';
                    badge.style.transition = 'transform 0.3s ease';
                }
            });
            
            // Mouse leave effect
            card.addEventListener('mouseleave', function() {
                this.classList.remove('active');
                
                // Reset icon
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = '';
                }
                
                // Reset features
                const features = this.querySelectorAll('.feature');
                features.forEach(feature => {
                    feature.style.transform = '';
                });
                
                // Reset badge
                const badge = this.querySelector('.service-badge');
                if (badge) {
                    badge.style.transform = '';
                }
            });
            
            // Click to expand details
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking the quote button
                if (e.target.closest('.quote-btn')) return;
                
                // Toggle expanded state
                const isExpanded = this.classList.contains('expanded');
                
                // Collapse all other cards
                serviceCards.forEach(c => {
                    c.classList.remove('expanded');
                    c.querySelector('.service-benefit').style.maxHeight = '';
                    c.querySelector('.service-features').style.maxHeight = '';
                });
                
                if (!isExpanded) {
                    this.classList.add('expanded');
                    
                    // Expand content smoothly
                    const benefit = this.querySelector('.service-benefit');
                    const features = this.querySelector('.service-features');
                    
                    if (benefit) {
                        benefit.style.maxHeight = benefit.scrollHeight + 'px';
                        benefit.style.transition = 'max-height 0.4s ease';
                    }
                    
                    if (features) {
                        features.style.maxHeight = features.scrollHeight + 'px';
                        features.style.transition = 'max-height 0.4s ease';
                    }
                    
                    // Scroll into view on mobile
                    if (window.innerWidth <= 768) {
                        this.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }
            });
        });
    }

    // ===== CUSTOM SOLUTION BUTTON =====
    function initCustomSolutionButton() {
        const customSolutionBtn = document.getElementById('custom-solution-btn');
        
        if (customSolutionBtn) {
            customSolutionBtn.addEventListener('click', function() {
                // Add click feedback
                this.style.transform = 'scale(0.98)';
                this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                }, 300);
                
                // Open WhatsApp for custom solution
                const phoneNumber = '919789029012';
                const message = encodeURIComponent(
                    `Hi, I need a custom industrial protection solution. Please connect me with your engineering team to discuss:\n\n1. Site requirements\n2. Custom specifications\n3. Technical consultation\n4. Project scope\n\nLooking forward to the discussion.`
                );
                
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                window.open(whatsappUrl, '_blank');
                
                // Track custom solution inquiry
                console.log('Custom solution inquiry initiated');
            });
        }
    }

    // ===== KEYBOARD NAVIGATION =====
    function initKeyboardNavigation() {
        const serviceCards = document.querySelectorAll('.service-card');
        const quoteButtons = document.querySelectorAll('.quote-btn');
        const customSolutionBtn = document.getElementById('custom-solution-btn');
        
        // Card navigation
        serviceCards.forEach(card => {
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
                
                // Arrow key navigation
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextCard = this.nextElementSibling;
                    if (nextCard && nextCard.classList.contains('service-card')) {
                        nextCard.focus();
                    }
                }
                
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevCard = this.previousElementSibling;
                    if (prevCard && prevCard.classList.contains('service-card')) {
                        prevCard.focus();
                    }
                }
            });
        });
        
        // Quote button navigation
        quoteButtons.forEach(button => {
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Custom solution button navigation
        if (customSolutionBtn) {
            customSolutionBtn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
        
        // Focus styles
        const focusableElements = [...serviceCards, ...quoteButtons];
        if (customSolutionBtn) focusableElements.push(customSolutionBtn);
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '3px solid #2FA4A9';
                this.style.outlineOffset = '3px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }

    // ===== RESPONSIVE BEHAVIOR =====
    function initResponsiveBehavior() {
        let resizeTimer;
        
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                handleResponsiveChanges();
            }, 250);
        });
        
        // Initial responsive setup
        handleResponsiveChanges();
    }
    
    function handleResponsiveChanges() {
        const serviceCards = document.querySelectorAll('.service-card');
        const servicesCta = document.querySelector('.services-cta');
        
        // Reset expanded states on resize
        if (window.innerWidth <= 768) {
            serviceCards.forEach(card => {
                card.classList.remove('expanded');
                const benefit = card.querySelector('.service-benefit');
                const features = card.querySelector('.service-features');
                
                if (benefit) benefit.style.maxHeight = '';
                if (features) features.style.maxHeight = '';
            });
            
            // Adjust animation delays for mobile
            serviceCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
            
            if (servicesCta) {
                servicesCta.style.animationDelay = '0.5s';
            }
        } else {
            // Restore desktop animation delays
            serviceCards.forEach((card, index) => {
                card.style.animationDelay = `${(index + 1) * 0.1}s`;
            });
            
            if (servicesCta) {
                servicesCta.style.animationDelay = '0.6s';
            }
        }
    }

    // ===== SERVICE DETAILS MODAL (SIMULATED) =====
    function initServiceDetails() {
        // This would normally show a modal or expandable details
        // For simplicity, we'll log to console
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('dblclick', function() {
                const serviceName = this.querySelector('.service-name').textContent;
                console.log(`Double-clicked for detailed view: ${serviceName}`);
                
                // In a real implementation, this would show a modal
                // with more detailed information about the service
            });
        });
    }
    
    // Initialize service details
    initServiceDetails();

    // ===== PERFORMANCE OPTIMIZATION =====
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { rootMargin: '100px' });
        
        const elements = document.querySelectorAll('.service-card, .services-cta');
        elements.forEach(element => lazyObserver.observe(element));
    }
    
    // ===== LOADING STATE =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add slight delay for final animations
        setTimeout(() => {
            const section = document.querySelector('.services-section');
            if (section) {
                section.classList.add('loaded');
            }
        }, 300);
    });
});













// SIMPLE Before/After Comparison - No Drag Method

document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize comparison interactions
    initComparisonInteractions();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize CTA button
    initCTAButton();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Initialize responsive behavior
    initResponsiveBehavior();

    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const comparisonCards = document.querySelectorAll('.comparison-card');
        const trustIndicators = document.querySelector('.trust-indicators');
        const resultsCTA = document.querySelector('.results-cta');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('comparison-card')) {
                        entry.target.classList.add('animated');
                    } else if (entry.target === trustIndicators || entry.target === resultsCTA) {
                        entry.target.classList.add('animated');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        comparisonCards.forEach(card => observer.observe(card));
        if (trustIndicators) observer.observe(trustIndicators);
        if (resultsCTA) observer.observe(resultsCTA);
    }

    // ===== COMPARISON INTERACTIONS =====
    function initComparisonInteractions() {
        const revealButtons = document.querySelectorAll('.reveal-btn');
        const comparisonCards = document.querySelectorAll('.comparison-card');
        
        // REVEAL BUTTON FUNCTIONALITY
        revealButtons.forEach(button => {
            button.addEventListener('click', function() {
                const comparisonId = this.getAttribute('data-comparison');
                const comparisonCard = this.closest('.comparison-card');
                
                // Add click feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Toggle reveal state
                const isRevealed = comparisonCard.classList.contains('revealed');
                
                if (!isRevealed) {
                    // Reveal comparison
                    revealComparison(comparisonCard);
                } else {
                    // Reset comparison
                    resetComparison(comparisonCard);
                }
            });
            
            // Hover effect for reveal button
            button.addEventListener('mouseenter', function() {
                const arrow = this.closest('.comparison-card').querySelector('.indicator-arrow');
                if (arrow) {
                    arrow.style.transform = 'rotate(10deg)';
                    arrow.style.background = '#259095';
                    arrow.querySelector('.arrow-icon').style.transform = 'translateX(8px)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                const arrow = this.closest('.comparison-card').querySelector('.indicator-arrow');
                const card = this.closest('.comparison-card');
                
                if (arrow && !card.classList.contains('revealed')) {
                    arrow.style.transform = '';
                    arrow.style.background = '#2FA4A9';
                    arrow.querySelector('.arrow-icon').style.transform = '';
                }
            });
        });
        
        // SIDE HOVER EFFECTS
        comparisonCards.forEach(card => {
            const beforeSide = card.querySelector('.before-side');
            const afterSide = card.querySelector('.after-side');
            const indicatorArrow = card.querySelector('.indicator-arrow');
            const indicatorLine = card.querySelector('.indicator-line');
            
            // Before side hover
            if (beforeSide) {
                beforeSide.addEventListener('mouseenter', function() {
                    if (!card.classList.contains('revealed')) {
                        this.style.transform = 'translateX(-20px) translateY(-5px)';
                        this.style.borderColor = '#2FA4A9';
                        this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                        
                        // Highlight problem items
                        const problems = this.querySelectorAll('.problem-item');
                        problems.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.color = '#F87171';
                                item.style.transform = 'translateX(5px)';
                                item.style.transition = 'all 0.3s ease';
                            }, index * 100);
                        });
                        
                        // Animate indicator
                        if (indicatorArrow) {
                            indicatorArrow.style.transform = 'translateX(-10px)';
                            indicatorArrow.style.background = '#F87171';
                        }
                        
                        if (indicatorLine) {
                            indicatorLine.style.height = '60px';
                            indicatorLine.style.background = '#F87171';
                        }
                    }
                });
                
                beforeSide.addEventListener('mouseleave', function() {
                    if (!card.classList.contains('revealed')) {
                        this.style.transform = '';
                        this.style.borderColor = '';
                        this.style.boxShadow = '';
                        
                        // Reset problem items
                        const problems = this.querySelectorAll('.problem-item');
                        problems.forEach(item => {
                            item.style.color = '';
                            item.style.transform = '';
                        });
                        
                        // Reset indicator
                        if (indicatorArrow) {
                            indicatorArrow.style.transform = '';
                            indicatorArrow.style.background = '';
                        }
                        
                        if (indicatorLine) {
                            indicatorLine.style.height = '';
                            indicatorLine.style.background = '';
                        }
                    }
                });
            }
            
            // After side hover
            if (afterSide) {
                afterSide.addEventListener('mouseenter', function() {
                    if (!card.classList.contains('revealed')) {
                        this.style.transform = 'translateX(20px) translateY(-5px)';
                        this.style.borderColor = '#2FA4A9';
                        this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                        
                        // Highlight solution items
                        const solutions = this.querySelectorAll('.solution-item');
                        solutions.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.color = '#AEE6E6';
                                item.style.transform = 'translateX(5px)';
                                item.style.transition = 'all 0.3s ease';
                            }, index * 100);
                        });
                        
                        // Animate indicator
                        if (indicatorArrow) {
                            indicatorArrow.style.transform = 'translateX(10px)';
                            indicatorArrow.style.background = '#2FA4A9';
                        }
                        
                        if (indicatorLine) {
                            indicatorLine.style.height = '60px';
                            indicatorLine.style.background = '#2FA4A9';
                        }
                    }
                });
                
                afterSide.addEventListener('mouseleave', function() {
                    if (!card.classList.contains('revealed')) {
                        this.style.transform = '';
                        this.style.borderColor = '';
                        this.style.boxShadow = '';
                        
                        // Reset solution items
                        const solutions = this.querySelectorAll('.solution-item');
                        solutions.forEach(item => {
                            item.style.color = '';
                            item.style.transform = '';
                        });
                        
                        // Reset indicator
                        if (indicatorArrow) {
                            indicatorArrow.style.transform = '';
                            indicatorArrow.style.background = '';
                        }
                        
                        if (indicatorLine) {
                            indicatorLine.style.height = '';
                            indicatorLine.style.background = '';
                        }
                    }
                });
            }
            
            // Click to reveal overlay
            const sideImages = card.querySelectorAll('.side-image');
            sideImages.forEach(sideImage => {
                sideImage.addEventListener('click', function() {
                    const side = this.closest('.comparison-side');
                    const overlay = this.querySelector('.image-overlay');
                    
                    if (overlay.style.transform === 'translateY(0px)' || overlay.style.transform === '') {
                        // Show overlay
                        overlay.style.transform = 'translateY(0)';
                        setTimeout(() => {
                            overlay.style.opacity = '1';
                        }, 10);
                    } else {
                        // Hide overlay
                        overlay.style.opacity = '0';
                        setTimeout(() => {
                            overlay.style.transform = 'translateY(100%)';
                        }, 300);
                    }
                });
            });
        });
        
        // REVEAL COMPARISON FUNCTION
        function revealComparison(card) {
            card.classList.add('revealed');
            const revealBtn = card.querySelector('.reveal-btn');
            const beforeSide = card.querySelector('.before-side');
            const afterSide = card.querySelector('.after-side');
            const indicatorArrow = card.querySelector('.indicator-arrow');
            const indicatorLine = card.querySelector('.indicator-line');
            
            // Update button text
            if (revealBtn) {
                revealBtn.querySelector('.btn-text').textContent = 'Hide Comparison';
                revealBtn.querySelector('.btn-icon').textContent = '👁️‍🗨️';
            }
            
            // Animate sides
            if (beforeSide) {
                beforeSide.style.transform = 'translateX(-30px) translateY(-10px) scale(0.95)';
                beforeSide.style.borderColor = '#F87171';
                beforeSide.style.boxShadow = '0 12px 32px rgba(248, 113, 113, 0.2)';
            }
            
            if (afterSide) {
                afterSide.style.transform = 'translateX(30px) translateY(-10px) scale(0.95)';
                afterSide.style.borderColor = '#2FA4A9';
                afterSide.style.boxShadow = '0 12px 32px rgba(47, 164, 169, 0.2)';
            }
            
            // Animate indicator
            if (indicatorArrow) {
                indicatorArrow.style.transform = 'scale(1.2) rotate(10deg)';
                indicatorArrow.style.background = 'linear-gradient(to right, #F87171, #2FA4A9)';
                indicatorArrow.querySelector('.arrow-text').textContent = 'Transformation Complete';
            }
            
            if (indicatorLine) {
                indicatorLine.style.height = '80px';
                indicatorLine.style.background = 'linear-gradient(to bottom, #F87171, #2FA4A9)';
            }
            
            // Show overlays
            const overlays = card.querySelectorAll('.image-overlay');
            overlays.forEach(overlay => {
                overlay.style.transform = 'translateY(0)';
                overlay.style.opacity = '1';
                overlay.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            });
            
            // Animate metrics
            const metrics = card.querySelectorAll('.metric-value');
            metrics.forEach((metric, index) => {
                setTimeout(() => {
                    metric.style.transform = 'scale(1.2)';
                    metric.style.transition = 'transform 0.3s ease';
                    setTimeout(() => {
                        metric.style.transform = '';
                    }, 300);
                }, index * 200);
            });
            
            console.log('Comparison revealed');
        }
        
        // RESET COMPARISON FUNCTION
        function resetComparison(card) {
            card.classList.remove('revealed');
            const revealBtn = card.querySelector('.reveal-btn');
            const beforeSide = card.querySelector('.before-side');
            const afterSide = card.querySelector('.after-side');
            const indicatorArrow = card.querySelector('.indicator-arrow');
            const indicatorLine = card.querySelector('.indicator-line');
            
            // Reset button text
            if (revealBtn) {
                revealBtn.querySelector('.btn-text').textContent = 'Quick View Comparison';
                revealBtn.querySelector('.btn-icon').textContent = '👁️';
            }
            
            // Reset sides
            if (beforeSide) {
                beforeSide.style.transform = '';
                beforeSide.style.borderColor = '';
                beforeSide.style.boxShadow = '';
            }
            
            if (afterSide) {
                afterSide.style.transform = '';
                afterSide.style.borderColor = '';
                afterSide.style.boxShadow = '';
            }
            
            // Reset indicator
            if (indicatorArrow) {
                indicatorArrow.style.transform = '';
                indicatorArrow.style.background = '';
                indicatorArrow.querySelector('.arrow-text').textContent = 'Transformed';
            }
            
            if (indicatorLine) {
                indicatorLine.style.height = '';
                indicatorLine.style.background = '';
            }
            
            // Hide overlays
            const overlays = card.querySelectorAll('.image-overlay');
            overlays.forEach(overlay => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.transform = 'translateY(100%)';
                }, 300);
            });
            
            console.log('Comparison reset');
        }
    }

    // ===== HOVER EFFECTS =====
    function initHoverEffects() {
        const indicatorCards = document.querySelectorAll('.indicator-card');
        
        indicatorCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.indicator-icon');
                const number = this.querySelector('.indicator-number');
                
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
                
                if (number) {
                    number.style.transform = 'scale(1.1)';
                    number.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.indicator-icon');
                const number = this.querySelector('.indicator-number');
                
                if (icon) icon.style.transform = '';
                if (number) number.style.transform = '';
            });
        });
    }

    // ===== CTA BUTTON =====
    function initCTAButton() {
        const siteAssessmentBtn = document.getElementById('site-assessment-btn');
        
        if (siteAssessmentBtn) {
            siteAssessmentBtn.addEventListener('click', function() {
                // Visual feedback
                this.style.transform = 'scale(0.98)';
                this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                }, 300);
                
                // Open WhatsApp
                const phoneNumber = '919789029012';
                const message = encodeURIComponent(
                    `Hi KULROOF Team,\n\nI would like to book a professional site assessment for my industrial property.\n\nPlease provide:\n1. Available time slots\n2. Assessment process details\n3. Required preparations\n4. Estimated timeline\n\nLooking forward to your response.`
                );
                
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                window.open(whatsappUrl, '_blank');
                
                console.log('Site assessment booking initiated');
            });
        }
    }

    // ===== KEYBOARD NAVIGATION =====
    function initKeyboardNavigation() {
        const focusableElements = [
            ...document.querySelectorAll('.reveal-btn'),
            ...document.querySelectorAll('.indicator-card'),
            document.getElementById('site-assessment-btn')
        ].filter(el => el);
        
        focusableElements.forEach(element => {
            element.setAttribute('tabindex', '0');
            
            element.addEventListener('focus', function() {
                this.style.outline = '3px solid #2FA4A9';
                this.style.outlineOffset = '3px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
            
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // ===== RESPONSIVE BEHAVIOR =====
    function initResponsiveBehavior() {
        let resizeTimer;
        
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                handleResponsiveChanges();
            }, 250);
        });
        
        handleResponsiveChanges();
    }
    
    function handleResponsiveChanges() {
        const comparisonCards = document.querySelectorAll('.comparison-card');
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Reset revealed state on mobile for better UX
            comparisonCards.forEach(card => {
                card.classList.remove('revealed');
                
                const revealBtn = card.querySelector('.reveal-btn');
                if (revealBtn) {
                    revealBtn.querySelector('.btn-text').textContent = 'Quick View Comparison';
                    revealBtn.querySelector('.btn-icon').textContent = '👁️';
                }
                
                // Reset styles
                const sides = card.querySelectorAll('.comparison-side');
                sides.forEach(side => {
                    side.style.transform = '';
                    side.style.borderColor = '';
                    side.style.boxShadow = '';
                });
                
                const overlays = card.querySelectorAll('.image-overlay');
                overlays.forEach(overlay => {
                    overlay.style.transform = 'translateY(100%)';
                    overlay.style.opacity = '0';
                });
            });
        }
    }

    // ===== LOADING STATE =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        setTimeout(() => {
            const section = document.querySelector('.before-after-section');
            if (section) {
                section.classList.add('loaded');
            }
        }, 300);
    });
});