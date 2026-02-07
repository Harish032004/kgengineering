// Premium Energy Efficient Motors Carousel - PROPER INFINITE SCROLL
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Energy Efficient Motors Carousel...');
    
    // Carousel elements
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselContainer = document.getElementById('carouselContainer');
    const carouselDots = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let productCards = document.querySelectorAll('.product-card');
    
    if (!carouselTrack || !carouselContainer) {
        console.error('Carousel elements not found!');
        return;
    }
    
    // Carousel configuration
    const config = {
        totalItems: productCards.length,
        itemsPerView: 4,
        currentIndex: 0,
        isAnimating: false,
        autoSlideInterval: 5000,
        autoSlideTimer: null,
        isPaused: false,
        transitionSpeed: 600,
        gap: 30,
        cardWidth: 0,
        isMobile: false,
        touchStartX: 0,
        touchEndX: 0,
        swipeThreshold: 50,
        infinite: true,
        clonedItems: []
    };
    
    // Initialize carousel
    function initCarousel() {
        console.log('Initializing carousel with PROPER infinite scrolling...');
        checkMobile();
        
        // Setup infinite carousel with proper cloning
        setupInfiniteCarousel();
        
        calculateCardWidth();
        createDots();
        updateCarousel();
        startAutoSlide();
        setupEventListeners();
        setupTouchEvents();
        loadImages();
        
        // Initial animation
        animateCardsEntrance();
        
        console.log('Carousel initialized successfully');
    }
    
    // Setup infinite carousel by cloning items
    function setupInfiniteCarousel() {
        console.log('Setting up infinite carousel...');
        
        // Store original items
        const originalItems = Array.from(productCards);
        
        // Clear any existing clones
        config.clonedItems.forEach(item => {
            if (item.parentNode) {
                item.parentNode.removeChild(item);
            }
        });
        config.clonedItems = [];
        
        // We need enough clones to fill at least 2 full screens
        const neededClones = Math.max(config.itemsPerView * 2, 6); // At least 2 screens worth
        
        // Clone items at the beginning (end items)
        for (let i = 0; i < neededClones; i++) {
            const originalIndex = (originalItems.length - (i % originalItems.length) - 1) % originalItems.length;
            const clone = originalItems[originalIndex].cloneNode(true);
            clone.classList.add('clone-item');
            clone.style.order = -neededClones + i;
            config.clonedItems.push(clone);
            carouselTrack.insertBefore(clone, carouselTrack.firstChild);
        }
        
        // Clone items at the end (beginning items)
        for (let i = 0; i < neededClones; i++) {
            const originalIndex = i % originalItems.length;
            const clone = originalItems[originalIndex].cloneNode(true);
            clone.classList.add('clone-item');
            clone.style.order = originalItems.length + i;
            config.clonedItems.push(clone);
            carouselTrack.appendChild(clone);
        }
        
        // Update product cards reference
        productCards = document.querySelectorAll('.product-card');
        config.totalItems = productCards.length;
        
        // Start from the middle (original items)
        config.currentIndex = neededClones;
        
        console.log('Infinite setup complete:', {
            originalItems: originalItems.length,
            clones: config.clonedItems.length,
            totalItems: config.totalItems,
            startIndex: config.currentIndex
        });
    }
    
    // Check if mobile
    function checkMobile() {
        config.isMobile = window.innerWidth <= 480;
        console.log('Is mobile:', config.isMobile, 'Width:', window.innerWidth);
    }
    
    // Calculate card width based on viewport
    function calculateCardWidth() {
        const containerWidth = carouselContainer.offsetWidth;
        console.log('Container width:', containerWidth);
        
        // Determine items per view based on screen size
        if (window.innerWidth <= 480) {
            config.itemsPerView = 1;
            config.gap = 12;
        } else if (window.innerWidth <= 576) {
            config.itemsPerView = 2;
            config.gap = 16;
        } else if (window.innerWidth <= 768) {
            config.itemsPerView = 2;
            config.gap = 20;
        } else if (window.innerWidth <= 1024) {
            config.itemsPerView = 3;
            config.gap = 25;
        } else {
            config.itemsPerView = 4;
            config.gap = 30;
        }
        
        // Calculate card width
        const totalGap = (config.itemsPerView - 1) * config.gap;
        config.cardWidth = (containerWidth - totalGap) / config.itemsPerView;
        
        console.log('Card calculation:', {
            itemsPerView: config.itemsPerView,
            cardWidth: config.cardWidth,
            gap: config.gap
        });
        
        // Set card widths for ALL cards (including clones)
        productCards.forEach(card => {
            if (config.isMobile) {
                card.style.width = `calc(100vw - 24px)`;
                card.style.flex = `0 0 calc(100vw - 24px)`;
                card.style.maxWidth = '400px';
                card.style.minWidth = '300px';
                card.style.margin = '0 auto';
                card.style.display = 'flex';
            } else {
                card.style.width = `${config.cardWidth}px`;
                card.style.flex = `0 0 ${config.cardWidth}px`;
                card.style.minWidth = `${config.cardWidth}px`;
                card.style.display = 'flex';
            }
        });
        
        // Set carousel track width
        const trackWidth = productCards.length * (config.cardWidth + config.gap) - config.gap;
        carouselTrack.style.width = `${trackWidth}px`;
    }
    
    // Create navigation dots
    function createDots() {
        carouselDots.innerHTML = '';
        
        // Only show dots for original items (not clones)
        const originalCount = productCards.length - config.clonedItems.length;
        const totalDots = Math.ceil(originalCount / config.itemsPerView);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.setAttribute('data-index', i);
            dot.setAttribute('type', 'button');
            
            if (i === 0) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                console.log('Dot clicked:', i);
                goToSlide(i);
            });
            
            carouselDots.appendChild(dot);
        }
    }
    
    // Update carousel position
    function updateCarousel(instant = false) {
        if (config.isAnimating) return;
        
        config.isAnimating = true;
        
        const translateX = -config.currentIndex * (config.cardWidth + config.gap);
        
        if (instant) {
            carouselTrack.style.transition = 'none';
            carouselTrack.style.transform = `translateX(${translateX}px)`;
        } else {
            carouselTrack.style.transition = `transform ${config.transitionSpeed}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            carouselTrack.style.transform = `translateX(${translateX}px)`;
        }
        
        // Calculate active dot (ignore clones)
        const originalCount = productCards.length - config.clonedItems.length;
        const cloneOffset = config.clonedItems.length / 2; // Half at beginning
        const actualIndex = config.currentIndex - cloneOffset;
        let activeDotIndex = Math.floor(actualIndex / config.itemsPerView);
        
        // Wrap dot index
        const totalDots = Math.ceil(originalCount / config.itemsPerView);
        activeDotIndex = (activeDotIndex + totalDots) % totalDots;
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
            dot.setAttribute('aria-selected', index === activeDotIndex ? 'true' : 'false');
        });
        
        // Reset animation flag
        setTimeout(() => {
            config.isAnimating = false;
            
            // Check if we need to jump (infinite scroll)
            const cloneOffset = config.clonedItems.length / 2;
            const originalCount = productCards.length - config.clonedItems.length;
            const maxIndex = cloneOffset + originalCount;
            const minIndex = cloneOffset;
            
            // If we're at the end clones, jump to beginning clones
            if (config.currentIndex >= maxIndex) {
                setTimeout(() => {
                    config.currentIndex = cloneOffset;
                    updateCarousel(true);
                }, 50);
            }
            // If we're at the beginning clones, jump to end clones
            else if (config.currentIndex < minIndex) {
                setTimeout(() => {
                    config.currentIndex = maxIndex - config.itemsPerView;
                    updateCarousel(true);
                }, 50);
            }
        }, config.transitionSpeed);
    }
    
    // Navigate to next slide
    function nextSlide() {
        console.log('Next slide - Current:', config.currentIndex);
        
        if (config.isAnimating) return;
        
        config.currentIndex += config.itemsPerView;
        updateCarousel();
        resetAutoSlide();
    }
    
    // Navigate to previous slide
    function prevSlide() {
        console.log('Prev slide - Current:', config.currentIndex);
        
        if (config.isAnimating) return;
        
        config.currentIndex -= config.itemsPerView;
        updateCarousel();
        resetAutoSlide();
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (config.isAnimating) return;
        
        const originalCount = productCards.length - config.clonedItems.length;
        const totalDots = Math.ceil(originalCount / config.itemsPerView);
        slideIndex = Math.min(Math.max(slideIndex, 0), totalDots - 1);
        
        const cloneOffset = config.clonedItems.length / 2;
        config.currentIndex = cloneOffset + (slideIndex * config.itemsPerView);
        updateCarousel();
        resetAutoSlide();
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
        if (config.autoSlideTimer) {
            clearInterval(config.autoSlideTimer);
        }
        
        // Don't auto-slide on mobile
        if (config.isMobile) {
            console.log('Auto-slide disabled on mobile');
            return;
        }
        
        config.autoSlideTimer = setInterval(() => {
            if (!config.isPaused) {
                nextSlide();
            }
        }, config.autoSlideInterval);
    }
    
    // Reset auto-slide timer
    function resetAutoSlide() {
        if (config.autoSlideTimer) {
            clearInterval(config.autoSlideTimer);
        }
        startAutoSlide();
    }
    
    // Pause auto-slide
    function pauseAutoSlide() {
        config.isPaused = true;
    }
    
    // Resume auto-slide
    function resumeAutoSlide() {
        config.isPaused = false;
    }
    
    // Animate cards on entrance
    function animateCardsEntrance() {
        const originalCount = productCards.length - config.clonedItems.length;
        const cloneOffset = config.clonedItems.length / 2;
        
        productCards.forEach((card, index) => {
            // Only animate original items (not clones)
            if (index >= cloneOffset && index < cloneOffset + originalCount) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    
                    setTimeout(() => {
                        card.style.transition = '';
                    }, 400);
                }, (index - cloneOffset) * 100);
            }
        });
    }
    
    // Load images
    function loadImages() {
        const images = document.querySelectorAll('.motor-img');
        
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
                img.addEventListener('error', () => {
                    console.error('Image failed to load:', img.src);
                    const fallback = img.parentElement.querySelector('.image-fallback');
                    if (fallback) {
                        fallback.style.display = 'flex';
                        fallback.style.opacity = '0.5';
                    }
                });
            }
        });
    }
    
    // Setup event listeners
    function setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Prev button clicked');
                prevSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Next button clicked');
                nextSlide();
            });
        }
        
        // Pause on hover
        carouselContainer.addEventListener('mouseenter', pauseAutoSlide);
        carouselContainer.addEventListener('mouseleave', resumeAutoSlide);
        
        // Quote buttons
        document.querySelectorAll('.quote-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const phoneNumber = this.getAttribute('data-whatsapp') || '9789029012';
                const productName = this.getAttribute('data-product') || 'Motor';
                const productSpec = this.getAttribute('data-spec') || '';
                
                // Create WhatsApp message
                const message = `Hello! I'm interested in getting a quote for your *${productName}* motor. 

Product Details:
- Model: ${productName}
- Specifications: ${productSpec}

Please share the price and delivery details. Thank you!`;
                
                const encodedMessage = encodeURIComponent(message);
                const whatsappURL = `https://wa.me/91${phoneNumber}?text=${encodedMessage}`;
                
                window.open(whatsappURL, '_blank');
            });
        });
        
        // Window resize - FIXED FOR MOBILE
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                console.log('Window resized to:', window.innerWidth);
                
                const wasMobile = config.isMobile;
                checkMobile();
                calculateCardWidth();
                
                // Force reflow to ensure proper rendering on mobile
                if (config.isMobile) {
                    carouselTrack.style.display = 'none';
                    void carouselTrack.offsetHeight; // Trigger reflow
                    carouselTrack.style.display = 'flex';
                }
                
                updateCarousel(true);
                
                if (!config.isMobile) {
                    startAutoSlide();
                }
            }, 150);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        });
        
        console.log('Event listeners setup complete');
    }
    
    // Touch events for mobile - FIXED
    function setupTouchEvents() {
        if (!config.isMobile) return;
        
        console.log('Setting up touch events for mobile');
        
        let touchStartX = 0;
        let touchStartY = 0;
        let isSwiping = false;
        let isDragging = false;
        
        carouselTrack.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isSwiping = true;
            isDragging = false;
            pauseAutoSlide();
            
            this.style.transition = 'none';
        }, { passive: true });
        
        carouselTrack.addEventListener('touchmove', function(e) {
            if (!isSwiping) return;
            
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const diffX = touchStartX - touchX;
            const diffY = touchStartY - touchY;
            
            // Check if this is a horizontal swipe
            if (Math.abs(diffX) > 5 && !isDragging) {
                isDragging = true;
                e.preventDefault(); // Prevent vertical scroll
            }
            
            if (!isDragging) return;
            
            // Prevent default to stop scrolling
            e.preventDefault();
            
            const currentTranslate = -config.currentIndex * (config.cardWidth + config.gap);
            const dragTranslate = currentTranslate - diffX;
            this.style.transform = `translateX(${dragTranslate}px)`;
        }, { passive: false });
        
        carouselTrack.addEventListener('touchend', function(e) {
            if (!isSwiping) return;
            
            const touch = e.changedTouches[0];
            const touchX = touch.clientX;
            const diff = touchStartX - touchX;
            
            this.style.transition = `transform ${config.transitionSpeed}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            
            if (Math.abs(diff) > config.swipeThreshold && isDragging) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            } else {
                updateCarousel();
            }
            
            isSwiping = false;
            isDragging = false;
            setTimeout(resumeAutoSlide, 1000);
        });
        
        // Also handle mouse events for testing on desktop
        let mouseDown = false;
        let mouseStartX = 0;
        
        carouselTrack.addEventListener('mousedown', function(e) {
            if (!config.isMobile || e.button !== 0) return;
            
            mouseDown = true;
            mouseStartX = e.clientX;
            pauseAutoSlide();
            
            this.style.transition = 'none';
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!mouseDown || !config.isMobile) return;
            
            const diff = mouseStartX - e.clientX;
            const currentTranslate = -config.currentIndex * (config.cardWidth + config.gap);
            const dragTranslate = currentTranslate - diff;
            carouselTrack.style.transform = `translateX(${dragTranslate}px)`;
            e.preventDefault();
        });
        
        document.addEventListener('mouseup', function(e) {
            if (!mouseDown || !config.isMobile) return;
            
            const diff = mouseStartX - e.clientX;
            carouselTrack.style.transition = `transform ${config.transitionSpeed}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            
            if (Math.abs(diff) > config.swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            } else {
                updateCarousel();
            }
            
            mouseDown = false;
            setTimeout(resumeAutoSlide, 1000);
        });
    }
    
    // Initialize on load
    initCarousel();
    
    // Make functions available globally for debugging
    window.carousel = {
        next: nextSlide,
        prev: prevSlide,
        goTo: goToSlide,
        config: config,
        update: updateCarousel
    };
    
    console.log('Infinite Carousel ready!');
});





// Add this script at the end of your body or in a separate JS file
document.addEventListener('DOMContentLoaded', function() {
    const solutionItems = document.querySelectorAll('.solution-item');
    let activeItem = null;
    
    // Check if device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice && window.innerWidth <= 1024) {
        solutionItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // If this item is already active, deactivate it
                if (this.classList.contains('active-mobile')) {
                    this.classList.remove('active-mobile');
                    activeItem = null;
                } else {
                    // Deactivate previously active item
                    if (activeItem && activeItem !== this) {
                        activeItem.classList.remove('active-mobile');
                    }
                    
                    // Activate current item
                    this.classList.add('active-mobile');
                    activeItem = this;
                }
            });
        });
        
        // Close active item when clicking outside
        document.addEventListener('click', function(e) {
            if (activeItem && !activeItem.contains(e.target)) {
                activeItem.classList.remove('active-mobile');
                activeItem = null;
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && activeItem) {
                activeItem.classList.remove('active-mobile');
                activeItem = null;
            }
        });
    }
    
    // Add visibility class on scroll (for animations)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const solutionsSection = document.querySelector('.solutions-categories');
    if (solutionsSection) {
        observer.observe(solutionsSection);
    }
});