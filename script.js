// script.js









// About Section Image Slider
document.addEventListener('DOMContentLoaded', function() {
    // Get slider elements
    const sliderImages = document.querySelectorAll('.slider-image');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderContainer = document.querySelector('.slider-container');
    
    // Track current image index
    let currentImageIndex = 0;
    const totalImages = sliderImages.length;
    let isAnimating = false;
    const animationDuration = 400;
    
    // Function to show specific image with smooth transition
    function showImage(index) {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // Remove active class from all images
        sliderImages.forEach(img => {
            img.classList.remove('active');
            img.style.transition = `opacity ${animationDuration}ms ease`;
        });
        
        // Add active class to current image
        sliderImages[index].classList.add('active');
        
        // Button click animation
        const activeBtn = index > currentImageIndex ? nextBtn : prevBtn;
        activeBtn.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            activeBtn.style.transform = 'translateY(-50%) scale(1)';
        }, 200);
        
        // Update current index
        currentImageIndex = index;
        
        // Reset animation flag
        setTimeout(() => {
            isAnimating = false;
        }, animationDuration);
    }
    
    // Function to show next image
    function showNextImage() {
        let nextIndex = currentImageIndex + 1;
        
        // Loop to first image if at the end
        if (nextIndex >= totalImages) {
            nextIndex = 0;
        }
        
        showImage(nextIndex);
    }
    
    // Function to show previous image
    function showPrevImage() {
        let prevIndex = currentImageIndex - 1;
        
        // Loop to last image if at the beginning
        if (prevIndex < 0) {
            prevIndex = totalImages - 1;
        }
        
        showImage(prevIndex);
    }
    
    // Initialize the slider
    function initSlider() {
        // Show first image
        showImage(0);
        
        // Add click animation to buttons
        [prevBtn, nextBtn].forEach(btn => {
            btn.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(-50%) scale(0.85)';
            });
            
            btn.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-50%) scale(1)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-50%) scale(1)';
            });
        });
        
        // Add event listeners to buttons
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);
        
        // Add keyboard navigation
        document.addEventListener('keydown', function(event) {
            // Only handle if slider is in viewport
            const slider = document.querySelector('.image-slider');
            const rect = slider.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isInViewport) {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    showPrevImage();
                } else if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    showNextImage();
                }
            }
        });
        
        // Add touch support for mobile with animation
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 50;
        
        sliderContainer.addEventListener('touchstart', function(event) {
            touchStartX = event.changedTouches[0].screenX;
        }, { passive: true });
        
        sliderContainer.addEventListener('touchmove', function(event) {
            event.preventDefault();
        }, { passive: false });
        
        sliderContainer.addEventListener('touchend', function(event) {
            touchEndX = event.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    // Swipe right - previous image
                    showPrevImage();
                } else {
                    // Swipe left - next image
                    showNextImage();
                }
            }
        }
        
        // Add hover effect to slider container
        sliderContainer.addEventListener('mouseenter', function() {
            this.style.cursor = 'grab';
        });
        
        sliderContainer.addEventListener('mouseleave', function() {
            this.style.cursor = 'default';
        });
        
        // Add mouse wheel support
        // sliderContainer.addEventListener('wheel', function(event) {
        //     event.preventDefault();
        //     if (event.deltaY > 0) {
        //         showNextImage();
        //     } else {
        //         showPrevImage();
        //     }
        // }, { passive: false });
    }
    
    // Preload images for better UX
    function preloadImages() {
        sliderImages.forEach(img => {
            const image = new Image();
            image.src = img.src;
            image.onload = function() {
                img.classList.remove('loading');
            };
            image.onerror = function() {
                console.warn('Failed to load image:', img.src);
                img.classList.remove('loading');
                img.style.display = 'none';
                
                // Show next available image if current one fails
                if (img.classList.contains('active')) {
                    setTimeout(showNextImage, 100);
                }
            };
            
            // Add loading class initially
            img.classList.add('loading');
        });
    }
    
    // Initialize everything
    function init() {
        preloadImages();
        initSlider();
        
        // Update slider container height based on content column
        function updateSliderHeight() {
            if (window.innerWidth > 992) {
                const contentColumn = document.querySelector('.content-column');
                const sliderColumn = document.querySelector('.slider-column');
                
                if (contentColumn && sliderColumn) {
                    const contentHeight = contentColumn.offsetHeight;
                    sliderContainer.style.height = contentHeight + 'px';
                    sliderContainer.style.aspectRatio = 'unset';
                }
            } else {
                sliderContainer.style.height = '';
                sliderContainer.style.aspectRatio = '4/3';
            }
        }
        
        // Initial height update
        setTimeout(updateSliderHeight, 100);
        
        // Update on resize
        window.addEventListener('resize', updateSliderHeight);
        
        // Update on image load
        window.addEventListener('load', updateSliderHeight);
    }
    
    // Initialize the section
    init();
    
    // Export functions for potential reuse (optional)
    window.aboutSectionSlider = {
        next: showNextImage,
        prev: showPrevImage,
        goTo: showImage,
        getCurrentIndex: () => currentImageIndex,
        getTotalImages: () => totalImages
    };
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

sliderContainer.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
    // Removed preventDefault() to allow page scrolling
}, { passive: true });

// DELETE OR COMMENT OUT THIS BLOCK ENTIRELY:
/* sliderContainer.addEventListener('touchmove', function(event) {
    event.preventDefault(); // This was the culprit for mobile
}, { passive: false }); 
*/

sliderContainer.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });



























// Brands Section - Simple functionality for image handling
document.addEventListener('DOMContentLoaded', function() {
    // Get all brand logos
    const brandLogos = document.querySelectorAll('.brand-logo');
    
    // Function to handle image loading errors
    function handleImageError(imgElement, brandName) {
        console.warn(`Failed to load ${brandName} logo. Using fallback.`);
        
        // Create a text-based fallback
        const parent = imgElement.parentElement;
        const fallback = document.createElement('div');
        fallback.className = 'brand-fallback';
        fallback.textContent = brandName;
        fallback.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-weight: 600;
            font-size: 1rem;
            color: #333;
            background-color: #f5f5f5;
            border-radius: 4px;
            padding: 10px;
            text-align: center;
        `;
        
        imgElement.style.display = 'none';
        parent.appendChild(fallback);
    }
    
    // Function to handle image loading success
    function handleImageLoad(imgElement) {
        imgElement.style.opacity = '1';
        imgElement.parentElement.classList.remove('loading');
    }
    
    // Initialize brand logos
    function initBrandLogos() {
        brandLogos.forEach(logo => {
            // Get brand name from alt attribute
            const brandName = logo.getAttribute('alt') || 'Brand';
            
            // Add loading state
            logo.parentElement.classList.add('loading');
            logo.style.opacity = '0.7';
            
            // Check if image is already loaded
            if (logo.complete) {
                handleImageLoad(logo);
            } else {
                // Add load event listener
                logo.addEventListener('load', function() {
                    handleImageLoad(this);
                });
                
                // Add error event listener
                logo.addEventListener('error', function() {
                    handleImageError(this, brandName);
                });
            }
        });
        
        // Add CSS for loading state
        const style = document.createElement('style');
        style.textContent = `
            .brand-item.loading {
                position: relative;
                background-color: #f9f9f9;
                border-radius: 4px;
                min-width: 120px;
                min-height: 60px;
            }
            
            .brand-item.loading::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                height: 40px;
                border: 3px solid #f3f3f3;
                border-top: 3px solid #6ECACB;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg); }
            }
            
            @media (prefers-reduced-motion: reduce) {
                .brand-item.loading::after {
                    animation: none;
                    border: 3px solid #f3f3f3;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Handle responsive layout changes
    function handleResponsiveLayout() {
        const brandsLogos = document.querySelector('.brands-logos');
        const brandItems = document.querySelectorAll('.brand-item');
        
        // Reset any inline styles
        brandsLogos.style.flexWrap = '';
        brandItems.forEach(item => {
            item.style.flex = '';
            item.style.minWidth = '';
        });
        
        // Get container width
        const containerWidth = brandsLogos.offsetWidth;
        
        // Apply tablet/mobile adjustments based on width
        if (containerWidth < 600) {
            // Mobile: vertical stack
            brandsLogos.style.flexDirection = 'column';
            brandItems.forEach(item => {
                item.style.width = '100%';
                item.style.maxWidth = '200px';
                item.style.margin = '0 auto';
            });
        } else if (containerWidth < 1024) {
            // Tablet: wrap to multiple rows
            brandsLogos.style.flexWrap = 'wrap';
            brandsLogos.style.justifyContent = 'center';
        }
        // Desktop: default styles from CSS apply
    }
    
    // Initialize section
    function initBrandsSection() {
        initBrandLogos();
        
        // Handle initial responsive layout
        handleResponsiveLayout();
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResponsiveLayout, 250);
        });
        
        // Handle orientation change
        window.addEventListener('orientationchange', function() {
            setTimeout(handleResponsiveLayout, 100);
        });
    }
    
    // Initialize when DOM is ready
    initBrandsSection();
    
    // Export for potential use (optional)
    window.brandsSection = {
        refreshLayout: handleResponsiveLayout,
        getBrands: () => Array.from(brandLogos).map(logo => logo.alt)
    };
});

// Note: This section requires no JavaScript for basic functionality.
// The JavaScript provided is for enhanced user experience only.






// Solutions Categories - Premium Industrial Animation System with Mobile Support
document.addEventListener('DOMContentLoaded', function() {
    // Section elements
    const section = document.querySelector('.solutions-categories');
    const solutionItems = document.querySelectorAll('.solution-item');
    const titleMain = document.querySelector('.title-main');
    const titleSub = document.querySelector('.title-sub');
    const decoLines = document.querySelectorAll('.deco-line');
    
    // Initialize section state
    let hasAnimated = false;
    let observer;
    let activeMobileItem = null;
    
    // Check if device supports hover
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
    // Advanced intersection observer with multiple thresholds
    const observerOptions = {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(handleIntersection, observerOptions);
        
        if (section) {
            observer.observe(section);
        }
    } else {
        // Fallback for older browsers
        setTimeout(animateSection, 500);
    }
    
    // Intersection handler with advanced logic
    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                const visiblePercentage = entry.intersectionRatio;
                
                // Trigger animation when at least 30% visible
                if (visiblePercentage >= 0.3) {
                    animateSection();
                    hasAnimated = true;
                    
                    // Unobserve after animation
                    if (observer) {
                        observer.unobserve(entry.target);
                    }
                }
            }
        });
    }
    
    // Main animation sequence
    function animateSection() {
        // Add visible class to section
        section.classList.add('visible');
        
        // Animate decorative lines
        animateDecorativeLines();
        
        // Animate title with delay
        setTimeout(() => {
            if (titleMain) titleMain.style.opacity = '1';
            if (titleMain) titleMain.style.transform = 'translateY(0)';
        }, 300);
        
        setTimeout(() => {
            if (titleSub) titleSub.style.opacity = '1';
            if (titleSub) titleSub.style.transform = 'translateY(0)';
        }, 500);
        
        // Animate solution items with staggered delay
        animateSolutionItems();
        
        // Initialize hover/touch effects based on device
        if (hasHover) {
            initializeHoverEffects();
        } else {
            initializeTouchEffects();
        }
        
        // Add performance optimizations
        optimizePerformance();
    }
    
    // Animate decorative lines
    function animateDecorativeLines() {
        decoLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.setProperty('--line-width', '100%');
            }, index * 200);
        });
    }
    
    // Animate solution items with advanced stagger
    function animateSolutionItems() {
        solutionItems.forEach((item, index) => {
            // Calculate delay with easing
            const delay = index * 120 + 600; // Start after header animations
            
            setTimeout(() => {
                // Add visible class
                item.classList.add('visible');
                
                // Add subtle bounce effect
                requestAnimationFrame(() => {
                    item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                });
                
                // Add micro-interaction for first item
                if (index === 0) {
                    setTimeout(() => {
                        item.classList.add('highlight-first');
                    }, 300);
                }
                
            }, delay);
        });
    }
    
    // Initialize hover effects for desktop
    function initializeHoverEffects() {
        solutionItems.forEach(item => {
            const inner = item.querySelector('.solution-inner');
            const icon = item.querySelector('.solution-icon');
            const arrow = item.querySelector('.solution-arrow');
            const overlay = item.querySelector('.solution-overlay');
            
            // Store original positions
            const originalTransform = inner.style.transform;
            
            // Mouse enter with enhanced effects
            item.addEventListener('mouseenter', function(e) {
                // Add active state
                this.classList.add('active-hover');
                
                // Parallax effect on icon
                if (icon) {
                    icon.style.transform = 'scale(1.15) rotate(8deg)';
                }
                
                // Enhanced arrow animation
                if (arrow) {
                    arrow.style.transform = 'translateX(15px) rotate(90deg)';
                }
                
                // Smooth overlay reveal
                if (overlay) {
                    overlay.style.opacity = '1';
                    overlay.style.visibility = 'visible';
                    overlay.style.transform = 'translateY(0)';
                }
                
                // Add floating effect
                requestAnimationFrame(() => {
                    inner.style.transform = originalTransform + ' translateY(-15px)';
                });
            });
            
            // Mouse leave with smooth reset
            item.addEventListener('mouseleave', function(e) {
                // Remove active state
                this.classList.remove('active-hover');
                
                // Reset elements with delay
                setTimeout(() => {
                    if (icon) icon.style.transform = '';
                    if (arrow) arrow.style.transform = '';
                    if (overlay) {
                        overlay.style.opacity = '0';
                        overlay.style.visibility = 'hidden';
                        overlay.style.transform = 'translateY(20px)';
                    }
                    inner.style.transform = originalTransform;
                }, 100);
            });
        });
    }
    
    // Initialize touch effects for mobile
    function initializeTouchEffects() {
        solutionItems.forEach(item => {
            const inner = item.querySelector('.solution-inner');
            const icon = item.querySelector('.solution-icon');
            const arrow = item.querySelector('.solution-arrow');
            const overlay = item.querySelector('.solution-overlay');
            
            // Touch start effect
            item.addEventListener('touchstart', function(e) {
                e.preventDefault();
                
                // Remove active class from other items
                solutionItems.forEach(otherItem => {
                    if (otherItem !== this) {
                        otherItem.classList.remove('active-mobile');
                    }
                });
                
                // Toggle active state
                if (this.classList.contains('active-mobile')) {
                    this.classList.remove('active-mobile');
                    activeMobileItem = null;
                } else {
                    this.classList.add('active-mobile');
                    activeMobileItem = this;
                }
                
                // Add haptic feedback if available
                if (navigator.vibrate) {
                    navigator.vibrate(30);
                }
            }, { passive: false });
            
            // Touch outside to close
            document.addEventListener('touchstart', function(e) {
                if (activeMobileItem && !activeMobileItem.contains(e.target)) {
                    activeMobileItem.classList.remove('active-mobile');
                    activeMobileItem = null;
                }
            });
            
            // Add click support for hybrid devices
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) { // Mobile only
                    e.preventDefault();
                    
                    // Toggle active state
                    if (this.classList.contains('active-mobile')) {
                        this.classList.remove('active-mobile');
                        activeMobileItem = null;
                    } else {
                        // Remove active class from other items
                        solutionItems.forEach(otherItem => {
                            if (otherItem !== this) {
                                otherItem.classList.remove('active-mobile');
                            }
                        });
                        
                        this.classList.add('active-mobile');
                        activeMobileItem = this;
                    }
                }
            });
            
            // Add keyboard support for accessibility
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.classList.toggle('active-mobile');
                }
            });
        });
    }
    
    // Performance optimizations
    function optimizePerformance() {
        // Use will-change strategically
        solutionItems.forEach(item => {
            const inner = item.querySelector('.solution-inner');
            const icon = item.querySelector('.solution-icon');
            
            if (inner) inner.style.willChange = 'transform, box-shadow';
            if (icon) icon.style.willChange = 'transform';
            
            // Remove will-change after animations complete
            setTimeout(() => {
                if (inner) inner.style.willChange = 'auto';
                if (icon) icon.style.willChange = 'auto';
            }, 2000);
        });
        
        // Optimize for GPU
        solutionItems.forEach(item => {
            item.style.transform = 'translateZ(0)';
            item.style.backfaceVisibility = 'hidden';
        });
    }
    
    // Handle responsive behavior
    function handleResponsive() {
        const grid = document.querySelector('.solutions-grid');
        
        if (!grid) return;
        
        // Adjust grid layout based on viewport
        if (window.innerWidth <= 1024) {
            grid.style.gridTemplateColumns = '1fr';
        } else {
            grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        }
        
        // Re-initialize effects based on current device type
        const currentHasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        
        // Remove all event listeners first
        solutionItems.forEach(item => {
            const clone = item.cloneNode(true);
            item.parentNode.replaceChild(clone, item);
        });
        
        // Re-select items and re-initialize effects
        setTimeout(() => {
            const newItems = document.querySelectorAll('.solution-item');
            if (currentHasHover) {
                initializeHoverEffects(newItems);
            } else {
                initializeTouchEffects(newItems);
            }
        }, 50);
    }
    
    // Initialize responsive handling
    handleResponsive();
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResponsive, 250);
    });
    
    // Add keyboard navigation support
    function addKeyboardNavigation() {
        solutionItems.forEach((item, index) => {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `View details for ${item.querySelector('.solution-name').textContent}`);
            
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.classList.toggle('keyboard-active');
                    
                    // Simulate hover state on desktop
                    if (hasHover) {
                        const event = new Event('mouseenter');
                        this.dispatchEvent(event);
                        
                        setTimeout(() => {
                            this.classList.remove('keyboard-active');
                            const leaveEvent = new Event('mouseleave');
                            this.dispatchEvent(leaveEvent);
                        }, 2000);
                    } else {
                        // Toggle mobile active state
                        this.classList.toggle('active-mobile');
                    }
                }
            });
        });
    }
    
    // Initialize keyboard navigation
    addKeyboardNavigation();
    
    // Export for advanced usage (optional)
    window.solutionsCategories = {
        animate: animateSection,
        reset: function() {
            section.classList.remove('visible');
            solutionItems.forEach(item => {
                item.classList.remove('visible', 'active-hover', 'active-mobile');
                item.style.opacity = '0';
                item.style.transform = 'translateY(40px)';
            });
            activeMobileItem = null;
            hasAnimated = false;
            
            // Re-observe if using IntersectionObserver
            if (observer && 'IntersectionObserver' in window) {
                observer.observe(section);
            }
        },
        highlight: function(index) {
            if (solutionItems[index]) {
                solutionItems[index].classList.add('active-mobile');
                setTimeout(() => {
                    solutionItems[index].classList.remove('active-mobile');
                }, 2000);
            }
        },
        getActiveItem: function() {
            return activeMobileItem;
        }
    };
});

// Add CSS for additional states
(function() {
    const style = document.createElement('style');
    style.textContent = `
        .solution-item.keyboard-active {
            outline: 3px solid var(--primary-teal);
            outline-offset: 5px;
        }
        
        .solution-item.highlight-first .solution-inner {
            animation: highlightPulse 2s ease;
        }
        
        @keyframes highlightPulse {
            0%, 100% { box-shadow: 0 25px 50px var(--shadow-strong); }
            50% { box-shadow: 0 35px 70px var(--teal-glow); }
        }
        
        /* Mobile active state styles */
        .solution-item.active-mobile .solution-inner {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px var(--shadow-medium) !important;
        }
        
        /* Smooth scrolling for anchor links */
        html {
            scroll-behavior: smooth;
        }
        
        /* Performance hints */
        .solution-inner {
            contain: layout style paint;
        }
        
        /* Enhanced border for better visibility */
        .solution-inner {
            position: relative;
        }
        
        /* Print optimization */
        @media print {
            .solution-overlay,
            .grid-decoration,
            .icon-glow {
                display: none !important;
            }
            
            .solution-item {
                break-inside: avoid;
            }
            
            .solution-inner {
                border: 2px solid #000 !important;
            }
        }
        
        /* Accessibility improvements */
        .solution-item:focus-visible {
            outline: 3px solid var(--primary-teal);
            outline-offset: 8px;
            border-radius: 24px;
        }
        
        /* Dark mode support for border */
        @media (prefers-color-scheme: dark) {
            .solution-inner {
                border-image-source: linear-gradient(135deg, var(--primary-teal), #7CD8D9) !important;
            }
        }
    `;
    document.head.appendChild(style);
})();






// Premium Energy Efficient Motors Carousel with Mobile Responsive Fixes
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Energy Efficient Motors Carousel...');
    
    // Carousel elements
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselContainer = document.getElementById('carouselContainer');
    const carouselDots = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const productCards = document.querySelectorAll('.product-card');
    
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
        maxIndex: 0,
        isMobile: false,
        touchStartX: 0,
        touchEndX: 0,
        swipeThreshold: 50,
        isDragging: false,
        dragStartX: 0,
        dragCurrentX: 0
    };
    
    // Initialize carousel
    function initCarousel() {
        console.log('Initializing carousel...');
        checkMobile();
        calculateCardWidth();
        createDots();
        updateCarousel();
        startAutoSlide();
        setupEventListeners();
        setupTouchEvents();
        loadImages();
        
        // Initial animation
        animateCardsEntrance();
        
        console.log('Carousel initialized successfully', {
            isMobile: config.isMobile,
            itemsPerView: config.itemsPerView,
            cardWidth: config.cardWidth
        });
    }
    
    // Check if mobile
    function checkMobile() {
        config.isMobile = window.innerWidth <= 480;
        console.log('Is mobile:', config.isMobile, 'Window width:', window.innerWidth);
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
        
        const totalGap = (config.itemsPerView - 1) * config.gap;
        config.cardWidth = (containerWidth - totalGap) / config.itemsPerView;
        
        // Calculate maximum index
        config.maxIndex = Math.max(0, config.totalItems - config.itemsPerView);
        
        // Set card widths - CRITICAL FOR MOBILE
        productCards.forEach(card => {
            if (config.isMobile) {
                // Mobile: full width minus gap
                card.style.width = `calc(100vw - 24px)`;
                card.style.flex = `0 0 calc(100vw - 24px)`;
                card.style.maxWidth = '400px';
                card.style.margin = '0 auto';
            } else {
                // Desktop/tablet: calculated width
                card.style.width = `${config.cardWidth}px`;
                card.style.flex = `0 0 ${config.cardWidth}px`;
            }
        });
        
        // Force layout update
        carouselTrack.style.width = 'max-content';
        carouselTrack.style.display = 'flex';
        
        console.log('Card calculation:', {
            itemsPerView: config.itemsPerView,
            cardWidth: config.cardWidth,
            gap: config.gap,
            maxIndex: config.maxIndex,
            isMobile: config.isMobile
        });
    }
    
    // Create navigation dots
    function createDots() {
        carouselDots.innerHTML = '';
        const totalDots = Math.ceil(config.totalItems / config.itemsPerView);
        
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
            
            dot.addEventListener('touchstart', (e) => {
                e.stopPropagation(); // Prevent triggering carousel swipe
            });
            
            carouselDots.appendChild(dot);
        }
    }
    
    // Update carousel position
    function updateCarousel() {
        if (config.isAnimating) return;
        
        config.isAnimating = true;
        
        const translateX = -config.currentIndex * (config.cardWidth + config.gap);
        carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Update active dot
        const dots = document.querySelectorAll('.dot');
        const activeDotIndex = Math.floor(config.currentIndex / config.itemsPerView);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
        
        // Update active cards
        highlightVisibleCards();
        
        // Reset animation flag
        setTimeout(() => {
            config.isAnimating = false;
        }, config.transitionSpeed);
    }
    
    // Navigate to next slide
    function nextSlide() {
        console.log('Next slide - Current:', config.currentIndex, 'Max:', config.maxIndex);
        
        if (config.currentIndex < config.maxIndex) {
            config.currentIndex++;
        } else {
            // Loop to beginning
            config.currentIndex = 0;
        }
        
        updateCarousel();
        resetAutoSlide();
    }
    
    // Navigate to previous slide
    function prevSlide() {
        console.log('Prev slide - Current:', config.currentIndex);
        
        if (config.currentIndex > 0) {
            config.currentIndex--;
        } else {
            // Loop to end
            config.currentIndex = config.maxIndex;
        }
        
        updateCarousel();
        resetAutoSlide();
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        const maxSlide = Math.floor(config.maxIndex / config.itemsPerView);
        slideIndex = Math.min(Math.max(slideIndex, 0), maxSlide);
        
        config.currentIndex = slideIndex * config.itemsPerView;
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
            if (!config.isPaused && !config.isDragging) {
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
    
    // Highlight visible cards
    function highlightVisibleCards() {
        productCards.forEach((card, index) => {
            card.classList.remove('active-card');
            
            if (index >= config.currentIndex && index < config.currentIndex + config.itemsPerView) {
                card.classList.add('active-card');
            }
        });
    }
    
    // Animate cards on entrance
    function animateCardsEntrance() {
        productCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                
                // Clean up inline styles after animation
                setTimeout(() => {
                    card.style.transition = '';
                }, 400);
            }, index * 100);
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
        
        // Navigation buttons - FIXED
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Prev button clicked');
                prevSlide();
            });
            
            prevBtn.addEventListener('touchstart', function(e) {
                e.stopPropagation(); // Prevent carousel swipe
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Next button clicked');
                nextSlide();
            });
            
            nextBtn.addEventListener('touchstart', function(e) {
                e.stopPropagation(); // Prevent carousel swipe
            });
        }
        
        // Pause on hover (desktop only)
        if (!config.isMobile) {
            carouselTrack.addEventListener('mouseenter', pauseAutoSlide);
            carouselTrack.addEventListener('mouseleave', resumeAutoSlide);
        }
        
        // Quote buttons
      
        
        // Window resize - DEBOUNCED
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                console.log('Window resized to:', window.innerWidth);
                checkMobile();
                calculateCardWidth();
                createDots();
                updateCarousel();
                
                // Restart auto-slide if not mobile
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
    
    // Touch events for mobile
    function setupTouchEvents() {
        if (!config.isMobile) return;
        
        console.log('Setting up touch events for mobile');
        
        let touchStartX = 0;
        let touchEndX = 0;
        let isSwiping = false;
        
        carouselTrack.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            isSwiping = true;
            pauseAutoSlide();
            
            // Add active state
            this.style.transition = 'none';
            this.classList.add('touch-active');
        }, { passive: true });
        
        carouselTrack.addEventListener('touchmove', function(e) {
            if (!isSwiping) return;
            
            e.preventDefault();
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            // Apply drag effect
            const currentTranslate = -config.currentIndex * (config.cardWidth + config.gap);
            const dragTranslate = currentTranslate - (diff * 0.5);
            this.style.transform = `translateX(${dragTranslate}px)`;
        }, { passive: false });
        
        carouselTrack.addEventListener('touchend', function(e) {
            if (!isSwiping) return;
            
            isSwiping = false;
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            // Remove active state
            this.style.transition = `transform ${config.transitionSpeed}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            this.classList.remove('touch-active');
            
            // Determine swipe direction
            if (Math.abs(diff) > config.swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next
                    nextSlide();
                } else {
                    // Swipe right - previous
                    prevSlide();
                }
            } else {
                // Not enough swipe, snap back
                updateCarousel();
            }
            
            setTimeout(resumeAutoSlide, 1000);
        });
        
        // Mouse drag for desktop testing
        carouselTrack.addEventListener('mousedown', function(e) {
            if (!config.isMobile || e.button !== 0) return;
            
            touchStartX = e.clientX;
            isSwiping = true;
            pauseAutoSlide();
            
            this.style.transition = 'none';
            this.classList.add('touch-active');
            
            // Prevent text selection
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isSwiping || !config.isMobile) return;
            
            touchEndX = e.clientX;
            const diff = touchStartX - touchEndX;
            
            // Apply drag effect
            const currentTranslate = -config.currentIndex * (config.cardWidth + config.gap);
            const dragTranslate = currentTranslate - (diff * 0.5);
            carouselTrack.style.transform = `translateX(${dragTranslate}px)`;
        });
        
        document.addEventListener('mouseup', function(e) {
            if (!isSwiping || !config.isMobile) return;
            
            isSwiping = false;
            const diff = touchStartX - touchEndX;
            
            carouselTrack.style.transition = `transform ${config.transitionSpeed}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            carouselTrack.classList.remove('touch-active');
            
            if (Math.abs(diff) > config.swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            } else {
                updateCarousel();
            }
            
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
    
    console.log('Carousel ready!');
});// Add this function to handle mobile tap/hover
function setupMobileTouchHover() {
    const productCards = document.querySelectorAll('.product-card');
    let activeCard = null;
    let isMobile = window.innerWidth <= 768;
    
    productCards.forEach((card, index) => {
        // Set animation delay for each card
        card.style.setProperty('--card-index', index);
        
        // For mobile/touch devices
        if (isMobile) {
            // Touch start (equivalent to mouseenter)
            card.addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Remove active class from other cards
                if (activeCard && activeCard !== this) {
                    activeCard.classList.remove('mobile-active');
                }
                
                // Add active class to current card
                this.classList.add('mobile-active');
                activeCard = this;
                
                // Prevent card click during swipe
                this.addEventListener('click', preventClickDuringSwipe, true);
            }, { passive: false });
            
            // Touch end (equivalent to mouseleave)
            card.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.classList.remove('mobile-active');
                    this.removeEventListener('click', preventClickDuringSwipe, true);
                }, 300);
            });
            
            // Touch cancel
            card.addEventListener('touchcancel', function() {
                this.classList.remove('mobile-active');
                this.removeEventListener('click', preventClickDuringSwipe, true);
            });
            
            // Click/tap
            card.addEventListener('click', function(e) {
                // Add brief active state on click
                this.classList.add('mobile-active');
                setTimeout(() => {
                    this.classList.remove('mobile-active');
                }, 300);
            });
        }
    });
    
    // Prevent click during swipe
    function preventClickDuringSwipe(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    }
    
    // Update on resize
    window.addEventListener('resize', function() {
        isMobile = window.innerWidth <= 768;
    });
}

// Update your existing initCarousel function to include this:
function initCarousel() {
    console.log('Initializing carousel...');
    checkMobile();
    calculateCardWidth();
    createDots();
    updateCarousel();
    startAutoSlide();
    setupEventListeners();
    setupTouchEvents();
    setupMobileTouchHover(); // ADD THIS LINE
    loadImages();
    
    // Initial animation
    animateCardsEntrance();
    
    console.log('Carousel initialized successfully');
}

// Update the touch event handling for better mobile experience
function setupTouchEvents() {
    if (!config.isMobile) return;
    
    console.log('Setting up touch events for mobile');
    
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;
    let isVerticalScroll = false;
    
    carouselTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = true;
        isVerticalScroll = false;
        pauseAutoSlide();
        
        // Add active state
        this.style.transition = 'none';
        this.classList.add('touch-active');
        
        // Remove mobile-active from all cards during swipe
        document.querySelectorAll('.product-card.mobile-active').forEach(card => {
            card.classList.remove('mobile-active');
        });
    }, { passive: true });
    
    carouselTrack.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const diffX = touchStartX - touchX;
        const diffY = touchStartY - touchY;
        
        // Check if vertical scroll (allow page scrolling)
        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 10) {
            isVerticalScroll = true;
            return;
        }
        
        // Horizontal swipe - prevent default to avoid vertical scroll
        e.preventDefault();
        
        touchEndX = touchX;
        const diff = touchStartX - touchEndX;
        
        // Apply drag effect
        const currentTranslate = -config.currentIndex * (config.cardWidth + config.gap);
        const dragTranslate = currentTranslate - (diff * 0.5);
        this.style.transform = `translateX(${dragTranslate}px)`;
    }, { passive: false });
    
    carouselTrack.addEventListener('touchend', function(e) {
        if (!isSwiping || isVerticalScroll) {
            isSwiping = false;
            isVerticalScroll = false;
            return;
        }
        
        const touch = e.changedTouches[0];
        const touchX = touch.clientX;
        const diff = touchStartX - touchX;
        
        // Remove active state
        this.style.transition = `transform ${config.transitionSpeed}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        this.classList.remove('touch-active');
        
        // Determine swipe direction
        if (Math.abs(diff) > config.swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next
                nextSlide();
            } else {
                // Swipe right - previous
                prevSlide();
            }
        } else {
            // Not enough swipe, snap back
            updateCarousel();
        }
        
        isSwiping = false;
        isVerticalScroll = false;
        setTimeout(resumeAutoSlide, 1000);
    });
}

// Update the createDots function for better mobile dots
function createDots() {
    carouselDots.innerHTML = '';
    const totalDots = Math.ceil(config.totalItems / config.itemsPerView);
    
    // Create dots container with proper styling
    carouselDots.style.display = 'flex';
    carouselDots.style.justifyContent = 'center';
    carouselDots.style.alignItems = 'center';
    carouselDots.style.gap = '10px';
    carouselDots.style.marginTop = '15px';
    
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.setAttribute('data-index', i);
        dot.setAttribute('type', 'button');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        
        // Mobile-specific dot styles
        if (config.isMobile) {
            dot.style.width = '12px';
            dot.style.height = '12px';
            dot.style.minWidth = '12px';
            dot.style.minHeight = '12px';
        }
        
        if (i === 0) {
            dot.classList.add('active');
        }
        
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Dot clicked:', i);
            goToSlide(i);
        });
        
        // Touch events for dots
        dot.addEventListener('touchstart', (e) => {
            e.stopPropagation(); // Prevent triggering carousel swipe
        });
        
        carouselDots.appendChild(dot);
    }
}

// Update the navigation buttons for better mobile experience
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Navigation buttons with better mobile support
    if (prevBtn) {
        // Click
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Prev button clicked');
            prevSlide();
            
            // Add feedback on mobile
            if (config.isMobile) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
        
        // Touch
        prevBtn.addEventListener('touchstart', function(e) {
            e.stopPropagation(); // Prevent carousel swipe
            this.style.opacity = '0.7';
        });
        
        prevBtn.addEventListener('touchend', function() {
            this.style.opacity = '';
        });
    }
    
    if (nextBtn) {
        // Click
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next button clicked');
            nextSlide();
            
            // Add feedback on mobile
            if (config.isMobile) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
        
        // Touch
        nextBtn.addEventListener('touchstart', function(e) {
            e.stopPropagation(); // Prevent carousel swipe
            this.style.opacity = '0.7';
        });
        
        nextBtn.addEventListener('touchend', function() {
            this.style.opacity = '';
        });
    }
    
    // Rest of your existing event listener code...
}
// WhatsApp Integration Functions
function setupWhatsAppIntegration() {
    const quoteButtons = document.querySelectorAll('.quote-btn[data-whatsapp]');
    
    quoteButtons.forEach(button => {
        // Remove any existing click listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add new click listener
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const whatsappNumber = this.getAttribute('data-whatsapp');
            const productName = this.getAttribute('data-product');
            const productSpec = this.getAttribute('data-spec');
            
            // Get additional product info from the card
            const productCard = this.closest('.product-card');
            const productDescription = productCard.querySelector('.product-description')?.textContent || '';
            
            // Create the WhatsApp message
            const message = createWhatsAppMessage(productName, productSpec, productDescription);
            
            // Open WhatsApp
            openWhatsApp(whatsappNumber, message);
            
            // Add click feedback
            addClickFeedback(this);
        });
        
        // Add touch events for mobile
        newButton.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95)';
        });
        
        newButton.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    console.log('WhatsApp integration setup complete');
}

function createWhatsAppMessage(productName, productSpec, productDescription) {
    // Create a clean, professional message
    const message = `Hello! I'm interested in getting a quote for your *${productName}* motor.

*Product Details:*
- Model: ${productName}
- Specifications: ${productSpec}
- Description: ${productDescription}

Please share the price and availability details. Also, let me know about:
1. Price for this model
2. Delivery time
3. Warranty information
4. Any discounts for bulk orders

Looking forward to your response!

Best regards,
[Your Name/Company Name]`;
    
    return encodeURIComponent(message);
}

function openWhatsApp(phoneNumber, message) {
    // Format phone number (remove any spaces, dashes, etc.)
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Check if it's an Indian number (add +91 if not present)
    let whatsappNumber = cleanNumber;
    if (whatsappNumber.length === 10) {
        whatsappNumber = '91' + whatsappNumber;
    }
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Open in new tab
    window.open(whatsappURL, '_blank');
    
    // Optional: Track the click
    console.log('WhatsApp opened for:', productName);
}

function addClickFeedback(button) {
    // Add visual feedback
    button.style.transform = 'scale(0.95)';
    button.style.opacity = '0.8';
    
    // Reset after animation
    setTimeout(() => {
        button.style.transform = '';
        button.style.opacity = '';
    }, 300);
}

// Add WhatsApp sharing confirmation modal
function createWhatsAppModal() {
    // Check if modal already exists
    if (document.getElementById('whatsappModal')) return;
    
    const modalHTML = `
    <div id="whatsappModal" class="whatsapp-modal" style="display: none;">
        <div class="whatsapp-modal-content">
            <div class="whatsapp-modal-header">
                <h3>Redirecting to WhatsApp</h3>
                <button class="whatsapp-modal-close">&times;</button>
            </div>
            <div class="whatsapp-modal-body">
                <div class="whatsapp-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <path d="M17.498 14.382C17.642 13.594 18.518 12.975 19.316 13.11C20.248 13.265 21.056 13.847 21.462 14.702C22.175 16.187 21.898 18.345 20.279 19.609C18.855 20.736 16.788 21.119 14.994 20.433C13.069 21.119 10.932 21.224 8.945 20.433C6.475 19.406 4.779 17.183 4.564 14.563C4.326 11.718 6.136 9.024 8.788 7.815C11.44 6.605 14.646 7.089 16.859 9.044C19.072 10.999 19.848 14.074 18.873 16.771C18.631 17.443 18.045 17.935 17.498 18.41C17.447 18.455 17.367 18.511 17.33 18.565C17.254 18.68 17.3 18.844 17.414 18.924C18.132 19.425 19.025 19.699 19.89 19.517C20.692 19.348 21.398 18.856 21.885 18.187C22.761 16.973 22.937 15.377 22.288 14.1C21.885 13.297 21.118 12.715 20.223 12.534C19.108 12.31 17.983 12.96 17.498 13.956C17.312 14.332 17.437 14.775 17.498 14.382Z" fill="#25D366"/>
                        <path d="M12 2C6.486 2 2 6.486 2 12C2 14.546 3.042 16.856 4.769 18.528L4.135 21.865L7.472 21.231C9.144 22.958 11.454 24 14 24C19.514 24 24 19.514 24 14C24 8.486 19.514 2 12 2ZM12 22C9.794 22 7.783 21.209 6.26 19.896L6.031 19.703L3.61 20.39L4.297 17.969L4.104 17.74C2.791 16.217 2 14.206 2 12C2 7.589 5.589 4 10 4C14.411 4 18 7.589 18 12C18 16.411 14.411 20 12 20Z" fill="#25D366"/>
                    </svg>
                </div>
                <p>You're about to be redirected to WhatsApp to send a quote request for this product.</p>
                <p class="product-details"></p>
                <div class="whatsapp-modal-buttons">
                    <button class="whatsapp-confirm-btn">Continue to WhatsApp</button>
                    <button class="whatsapp-cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    const modalStyles = `
    <style>
    .whatsapp-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
    }
    
    .whatsapp-modal-content {
        background: white;
        border-radius: 12px;
        width: 90%;
        max-width: 400px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        overflow: hidden;
    }
    
    .whatsapp-modal-header {
        background: var(--primary-teal);
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .whatsapp-modal-header h3 {
        margin: 0;
        font-size: 1.2rem;
    }
    
    .whatsapp-modal-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        line-height: 1;
    }
    
    .whatsapp-modal-body {
        padding: 25px;
        text-align: center;
    }
    
    .whatsapp-icon {
        margin-bottom: 20px;
    }
    
    .whatsapp-icon svg {
        width: 60px;
        height: 60px;
    }
    
    .whatsapp-modal-body p {
        margin-bottom: 15px;
        color: var(--charcoal);
        line-height: 1.5;
    }
    
    .product-details {
        background: var(--off-white);
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
        text-align: left;
        font-size: 0.9rem;
    }
    
    .whatsapp-modal-buttons {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    
    .whatsapp-confirm-btn {
        flex: 1;
        background: #25D366;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .whatsapp-confirm-btn:hover {
        background: #1da851;
        transform: translateY(-2px);
    }
    
    .whatsapp-cancel-btn {
        flex: 1;
        background: var(--light-grey);
        color: var(--charcoal);
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .whatsapp-cancel-btn:hover {
        background: var(--border-grey);
    }
    
    @media (max-width: 480px) {
        .whatsapp-modal-content {
            width: 95%;
            margin: 20px;
        }
        
        .whatsapp-modal-buttons {
            flex-direction: column;
        }
    }
    </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
}

function showWhatsAppModal(productName, productSpec, callback) {
    const modal = document.getElementById('whatsappModal');
    const productDetails = modal.querySelector('.product-details');
    const confirmBtn = modal.querySelector('.whatsapp-confirm-btn');
    const cancelBtn = modal.querySelector('.whatsapp-cancel-btn');
    const closeBtn = modal.querySelector('.whatsapp-modal-close');
    
    // Set product details
    productDetails.innerHTML = `
        <strong>${productName}</strong><br>
        ${productSpec}
    `;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Setup event listeners
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };
    
    confirmBtn.onclick = () => {
        closeModal();
        if (callback) callback();
    };
    
    cancelBtn.onclick = closeModal;
    closeBtn.onclick = closeModal;
    
    // Close on outside click
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
}

// Update the WhatsApp integration to use modal
function setupWhatsAppIntegrationWithModal() {
    const quoteButtons = document.querySelectorAll('.quote-btn[data-whatsapp]');
    
    // Create modal if it doesn't exist
    createWhatsAppModal();
    
    quoteButtons.forEach(button => {
        // Remove any existing click listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add new click listener
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const whatsappNumber = this.getAttribute('data-whatsapp');
            const productName = this.getAttribute('data-product');
            const productSpec = this.getAttribute('data-spec');
            
            // Get additional product info from the card
            const productCard = this.closest('.product-card');
            const productDescription = productCard.querySelector('.product-description')?.textContent || '';
            
            // Show confirmation modal
            showWhatsAppModal(productName, productSpec, () => {
                // Create the WhatsApp message
                const message = createWhatsAppMessage(productName, productSpec, productDescription);
                
                // Open WhatsApp
                openWhatsApp(whatsappNumber, message);
            });
            
            // Add click feedback
            addClickFeedback(this);
        });
        
        // Add touch events for mobile
        newButton.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95)';
        });
        
        newButton.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Update your initCarousel function to include WhatsApp integration
function initCarousel() {
    console.log('Initializing carousel...');
    checkMobile();
    calculateCardWidth();
    createDots();
    updateCarousel();
    startAutoSlide();
    setupEventListeners();
    setupTouchEvents();
    setupMobileTouchHover();
    setupWhatsAppIntegrationWithModal(); // Use modal version
    loadImages();
    
    // Initial animation
    animateCardsEntrance();
    
    console.log('Carousel initialized successfully');
}






document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('luxuryContactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('fullName').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value || 'N/A';
        const message = document.getElementById('message').value;

        const waNumber = "9789029012";
        const fullMessage = `*New Contact Enquiry*%0a%0a*Name:* ${name}%0a*Phone:* ${phone}%0a*Email:* ${email}%0a*Message:* ${message}`;

        window.open(`https://wa.me/${waNumber}?text=${fullMessage}`, '_blank');
    });
});


















document.addEventListener('DOMContentLoaded', () => {
    // Dynamically set current year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});