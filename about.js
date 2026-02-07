/**
 * K.G Engineering - About Page Interactions
 * Industrial Manufacturing Corporate Website
 * Strict Animation Constraints: No opacity/fade effects
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        animationEnabled: true,
        animationThreshold: 0.15,
        reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
    
    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        if (CONFIG.reduceMotion) {
            CONFIG.animationEnabled = false;
        }
        
        initializePage();
        setupAnimations();
        setupInteractions();
        setupResponsiveBehaviors();
    });
    
    /**
     * Initialize page components
     */
    function initializePage() {
        // Set initial states for animated elements
        const animatedElements = document.querySelectorAll(
            '.strength-card, .capability-item, .metric-item, .industry-item'
        );
        
        animatedElements.forEach(el => {
            el.dataset.initialY = '0';
        });
        
        console.log('K.G Engineering About Page initialized');
    }
    
    /**
     * Setup controlled animations according to strict rules
     */
    function setupAnimations() {
        if (!CONFIG.animationEnabled) return;
        
        // 1. Underline expansion animation (intro section)
        const introUnderline = document.querySelector('.intro-underline');
        if (introUnderline) {
            // Already handled by CSS animation, just verify timing
            setTimeout(() => {
                introUnderline.style.transform = 'scaleX(1)';
            }, 1500);
        }
        
        // 2. Element entrance animations (translateY only)
        const entranceElements = document.querySelectorAll(
            '.strength-card, .capability-item'
        );
        
        const observerOptions = {
            threshold: CONFIG.animationThreshold,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const entranceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Reset any previous transforms
                    element.style.transform = '';
                    
                    // Add staggered delay based on element type
                    const delay = element.classList.contains('strength-card') ? 100 : 50;
                    
                    setTimeout(() => {
                        element.style.transition = 'transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)';
                    }, delay);
                    
                    entranceObserver.unobserve(element);
                }
            });
        }, observerOptions);
        
        entranceElements.forEach(el => {
            entranceObserver.observe(el);
        });
        
        // 3. Trust metrics counting animation (translateX for numbers)
        const metricValues = document.querySelectorAll('.metric-value');
        const metricObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const metric = entry.target;
                    
                    // Check if it's a numeric value that can be animated
                    const text = metric.textContent;
                    const numericMatch = text.match(/\d+/);
                    
                    if (numericMatch && !metric.dataset.animated) {
                        metric.dataset.animated = 'true';
                        
                        // Use translateX animation for counting effect
                        animateMetricCount(metric, parseInt(numericMatch[0]), text.includes('+'));
                    }
                    
                    metricObserver.unobserve(metric);
                }
            });
        }, { threshold: 0.5 });
        
        metricValues.forEach(metric => metricObserver.observe(metric));
    }
    
    /**
     * Animate metric counting with translateX effect
     */
    function animateMetricCount(element, targetValue, hasPlusSign) {
        const duration = 2000;
        const startTime = Date.now();
        const originalText = element.textContent;
        
        function updateCount() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for industrial feel
            const easeOut = progress => {
                return 1 - Math.pow(1 - progress, 3);
            };
            
            const easedProgress = easeOut(progress);
            const currentValue = Math.floor(targetValue * easedProgress);
            
            // Apply subtle translateX during animation
            const translateX = (1 - easedProgress) * 10;
            element.style.transform = `translateX(${translateX}px)`;
            
            // Update text
            element.textContent = hasPlusSign ? currentValue + '+' : currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                // Return to original position and text
                element.style.transform = 'translateX(0)';
                element.textContent = originalText;
                element.style.transition = 'transform 0.3s ease';
            }
        }
        
        requestAnimationFrame(updateCount);
    }
    
    /**
     * Setup interactive elements
     */
    function setupInteractions() {
        // Strength cards hover effect enhancement
        const strengthCards = document.querySelectorAll('.strength-card');
        
        strengthCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                if (!CONFIG.animationEnabled) return;
                
                // Enhanced border expansion
                const border = this.querySelector('.strength-border');
                if (border) {
                    border.style.transition = 'all 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)';
                    border.style.width = '60%';
                    border.style.left = '20%';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (!CONFIG.animationEnabled) return;
                
                // Reset border
                const border = this.querySelector('.strength-border');
                if (border) {
                    border.style.width = '';
                    border.style.left = '';
                }
            });
        });
        
        // Industry items hover effect
        const industryItems = document.querySelectorAll('.industry-item');
        
        industryItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                if (!CONFIG.animationEnabled) return;
                
                // Icon micro-movement
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateY(-3px)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (!CONFIG.animationEnabled) return;
                
                // Reset icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        });
        
        // CTA button interaction
        const ctaButton = document.querySelector('.kg-cta-button');
        
        if (ctaButton) {
            ctaButton.addEventListener('mouseenter', function() {
                if (!CONFIG.animationEnabled) return;
                
                // Arrow movement
                const arrow = this.querySelector('i');
                if (arrow) {
                    arrow.style.transform = 'translateX(8px)';
                }
            });
            
            ctaButton.addEventListener('mouseleave', function() {
                if (!CONFIG.animationEnabled) return;
                
                // Reset arrow
                const arrow = this.querySelector('i');
                if (arrow) {
                    arrow.style.transform = '';
                }
            });
        }
        
        // Image hover effect
        const industrialImage = document.querySelector('.image-main');
        
        if (industrialImage) {
            industrialImage.addEventListener('mouseenter', function() {
                if (!CONFIG.animationEnabled) return;
                
                // Very slow zoom effect (industrial feel)
                const img = this.querySelector('img');
                if (img) {
                    img.style.transition = 'transform 10s cubic-bezier(0.2, 0, 0.2, 1)';
                }
            });
            
            industrialImage.addEventListener('mouseleave', function() {
                if (!CONFIG.animationEnabled) return;
                
                // Slow reset
                const img = this.querySelector('img');
                if (img) {
                    img.style.transition = 'transform 4s ease';
                }
            });
        }
    }
    
    /**
     * Setup responsive behaviors
     */
    function setupResponsiveBehaviors() {
        // Disable certain animations on mobile for performance
        const updateForViewport = () => {
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // Reduce animation intensity on mobile
                document.body.classList.add('mobile-view');
                
                // Disable hover transforms on mobile
                const style = document.createElement('style');
                style.id = 'mobile-animation-override';
                style.textContent = `
                    .mobile-view .strength-card:hover,
                    .mobile-view .capability-item:hover,
                    .mobile-view .industry-item:hover,
                    .mobile-view .metric-item:hover {
                        transform: none !important;
                    }
                `;
                
                // Remove existing override if present
                const existing = document.getElementById('mobile-animation-override');
                if (existing) existing.remove();
                
                document.head.appendChild(style);
            } else {
                document.body.classList.remove('mobile-view');
                const existing = document.getElementById('mobile-animation-override');
                if (existing) existing.remove();
            }
        };
        
        // Initial check
        updateForViewport();
        
        // Throttled resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateForViewport, 250);
        });
    }
    
    /**
     * Utility function to check element visibility
     */
    function isElementVisible(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight * 0.85 &&
            rect.bottom >= windowHeight * 0.15
        );
    }
})();