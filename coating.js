function sendWhatsAppInquiry() {
    const phoneNumber = "919789029012"; // Added country code 91 for India
    const message = "Hi, I am interested in a Site Inspection for Industrial Floor Coating. Please provide more details.";
    
    // URL encoding the message
    const encodedMessage = encodeURIComponent(message);
    
    // Constructing the wa.me URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Opening in a new tab
    window.open(whatsappUrl, '_blank');
}

// FLOOR COATING SECTION INTERACTIVITY
document.addEventListener('DOMContentLoaded', function() {
    // Get all problem and solution cards
    const problemCards = document.querySelectorAll('.problem-card');
    const solutionCards = document.querySelectorAll('.solution-card');
    
    // Initialize card pairing functionality
    initCardPairing();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize CTA button
    initCTAButton();
    
    // Initialize animation on scroll
    initScrollAnimations();
    
    // Function to initialize card pairing
    function initCardPairing() {
        // Add click event to problem cards
        problemCards.forEach(card => {
            card.addEventListener('click', function() {
                const cardNumber = this.getAttribute('data-card');
                highlightPairedCard(cardNumber, 'problem');
            });
            
            // Add keyboard support
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const cardNumber = this.getAttribute('data-card');
                    highlightPairedCard(cardNumber, 'problem');
                }
            });
        });
        
        // Add click event to solution cards
        solutionCards.forEach(card => {
            card.addEventListener('click', function() {
                const cardNumber = this.getAttribute('data-card');
                highlightPairedCard(cardNumber, 'solution');
            });
            
            // Add keyboard support
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const cardNumber = this.getAttribute('data-card');
                    highlightPairedCard(cardNumber, 'solution');
                }
            });
        });
    }
    
    // Function to highlight paired cards
    function highlightPairedCard(cardNumber, cardType) {
        // Remove previous highlights
        problemCards.forEach(card => {
            card.style.transform = '';
            card.style.animation = '';
        });
        
        solutionCards.forEach(card => {
            card.style.transform = '';
            card.style.animation = '';
        });
        
        // Highlight the clicked card
        const clickedCard = document.querySelector(`.${cardType}-card[data-card="${cardNumber}"]`);
        if (clickedCard) {
            clickedCard.style.animation = 'pulse 0.5s ease';
            clickedCard.style.transform = 'translateY(-8px)';
            
            // Remove animation after it completes
            setTimeout(() => {
                clickedCard.style.animation = '';
            }, 500);
        }
        
        // Highlight the corresponding paired card
        if (cardType === 'problem') {
            const pairedSolutionCard = document.querySelector(`.solution-card[data-card="${cardNumber}"]`);
            if (pairedSolutionCard) {
                pairedSolutionCard.style.animation = 'cardHighlight 1s ease';
                pairedSolutionCard.style.transform = 'translateY(-8px)';
                
                setTimeout(() => {
                    pairedSolutionCard.style.animation = '';
                }, 1000);
                
                // Scroll to the paired card on mobile
                if (window.innerWidth < 992) {
                    pairedSolutionCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        } else {
            const pairedProblemCard = document.querySelector(`.problem-card[data-card="${cardNumber}"]`);
            if (pairedProblemCard) {
                pairedProblemCard.style.animation = 'cardHighlight 1s ease';
                pairedProblemCard.style.transform = 'translateY(-8px)';
                
                setTimeout(() => {
                    pairedProblemCard.style.animation = '';
                }, 1000);
                
                // Scroll to the paired card on mobile
                if (window.innerWidth < 992) {
                    pairedProblemCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        }
    }
    
    // Function to initialize hover effects
    function initHoverEffects() {
        // Add tabindex for keyboard navigation
        problemCards.forEach(card => {
            card.setAttribute('tabindex', '0');
        });
        
        solutionCards.forEach(card => {
            card.setAttribute('tabindex', '0');
        });
        
        // Add focus styles for accessibility
        const allCards = document.querySelectorAll('.problem-card, .solution-card, .roi-card');
        allCards.forEach(card => {
            card.addEventListener('focus', function() {
                this.style.outline = `2px solid var(--primary-aqua)`;
                this.style.outlineOffset = '2px';
            });
            
            card.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }
    
    // Function to initialize CTA button
    function initCTAButton() {
        const ctaButton = document.querySelector('.cta-button');
        
        if (ctaButton) {
            ctaButton.addEventListener('click', function() {
                // Add click animation
                this.style.animation = 'pulse 0.3s ease';
                
                // Remove animation after completion
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
                
                // In a real implementation, this would open a contact form or navigate to contact page
                alert('Thank you for your interest! A flooring specialist will contact you shortly.');
                
                // Log the action (for analytics in real implementation)
                console.log('Floor coating CTA clicked');
            });
            
            // Add keyboard support
            ctaButton.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    }
    
    // Function to initialize scroll animations
    function initScrollAnimations() {
        // Create an Intersection Observer to animate elements when they come into view
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a subtle animation to cards when they come into view
                    const cards = entry.target.querySelectorAll('.problem-card, .solution-card, .roi-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe the main section
        const section = document.getElementById('floorCoatingMatters');
        if (section) {
            observer.observe(section);
            
            // Set initial state for cards
            const cards = section.querySelectorAll('.problem-card, .solution-card, .roi-card');
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
        }
    }
    
    // Handle window resize for responsive behavior
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reset card transforms on resize
            problemCards.forEach(card => {
                card.style.transform = '';
            });
            
            solutionCards.forEach(card => {
                card.style.transform = '';
            });
        }, 250);
    });
});


















        // Enhanced scroll animation with Intersection Observer
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate-on-scroll');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        
                        // Add a subtle pulse animation to coating cards when they first appear
                        if (entry.target.classList.contains('coating-card')) {
                            setTimeout(() => {
                                entry.target.style.animation = 'cardPulse 1.5s ease';
                                setTimeout(() => {
                                    entry.target.style.animation = '';
                                }, 1500);
                            }, 300);
                        }
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            elements.forEach(element => {
                observer.observe(element);
            });
        };
        
        // Enhanced hover effects
        const enhanceHoverEffects = () => {
            const coatingCards = document.querySelectorAll('.coating-card');
            
            coatingCards.forEach(card => {
                // Add a unique data attribute for each card
                card.setAttribute('data-coating-type', card.querySelector('.coating-name').textContent.toLowerCase().replace(/ /g, '-'));
                
                // Add hover sound effect simulation (visual feedback only)
                card.addEventListener('mouseenter', function() {
                    this.style.zIndex = '10';
                    
                    // Create a subtle ripple effect
                    const ripple = document.createElement('div');
                    ripple.style.position = 'absolute';
                    ripple.style.width = '100%';
                    ripple.style.height = '100%';
                    ripple.style.top = '0';
                    ripple.style.left = '0';
                    ripple.style.background = 'radial-gradient(circle at center, rgba(47, 164, 169, 0.1) 0%, transparent 70%)';
                    ripple.style.borderRadius = '12px';
                    ripple.style.zIndex = '-1';
                    ripple.style.animation = 'ripple 0.6s ease-out forwards';
                    
                    this.appendChild(ripple);
                    
                    // Remove ripple after animation completes
                    setTimeout(() => {
                        if (this.contains(ripple)) {
                            this.removeChild(ripple);
                        }
                    }, 600);
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.zIndex = '1';
                });
            });
            
            // Industry card hover effects
            const industryCards = document.querySelectorAll('.industry-card');
            industryCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const icon = this.querySelector('.industry-icon');
                    icon.style.transform = 'scale(1.1)';
                });
                
                card.addEventListener('mouseleave', function() {
                    const icon = this.querySelector('.industry-icon');
                    icon.style.transform = '';
                });
            });
        };
        
        // Initialize animations and effects
        document.addEventListener('DOMContentLoaded', () => {
            // Add CSS for ripple animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    0% { transform: scale(0.8); opacity: 0.6; }
                    100% { transform: scale(1.2); opacity: 0; }
                }
                
                @keyframes floatIcon {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                
                /* Make icons float slightly on some cards */
                .coating-card:nth-child(2) .coating-icon,
                .coating-card:nth-child(5) .coating-icon {
                    animation: floatIcon 3s ease-in-out infinite;
                }
            `;
            document.head.appendChild(style);
            
            // Initialize animations
            animateOnScroll();
            enhanceHoverEffects();
            
            // Add some interactive feedback for section titles
            const sectionTitles = document.querySelectorAll('h2');
            sectionTitles.forEach(title => {
                title.addEventListener('mouseenter', function() {
                    const afterElement = this.querySelector('::after') || this;
                    afterElement.style.transform = 'scaleX(1.2)';
                    setTimeout(() => {
                        afterElement.style.transform = '';
                    }, 300);
                });
            });
        });
        
        // Re-initialize on window resize for responsiveness
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                animateOnScroll();
            }, 250);
        });
 






          // FLOOR COATING PROCESS INTERACTIVITY
        document.addEventListener('DOMContentLoaded', function() {
            // Get all step content elements
            const stepContents = document.querySelectorAll('.step-content');
            
            // Initialize accordion functionality
            initAccordion();
            
            // Initialize hover effects
            initHoverEffects();
            
            // Initialize animations
            initAnimations();
            
            // Initialize CTA button
            initCTA();
            
            // Function to initialize accordion
            function initAccordion() {
                // Add click event to each step content
                stepContents.forEach(content => {
                    const toggle = content.querySelector('.step-toggle');
                    
                    // Handle click on the entire content area
                    content.addEventListener('click', function(e) {
                        // Don't trigger if clicking the toggle button (it has its own handler)
                        if (e.target === toggle || toggle.contains(e.target)) {
                            return;
                        }
                        toggleStep(this);
                    });
                    
                    // Handle click on toggle button
                    toggle.addEventListener('click', function(e) {
                        e.stopPropagation(); // Prevent triggering parent click
                        toggleStep(content);
                    });
                });
                
                // Function to toggle step
                function toggleStep(stepContent) {
                    const isActive = stepContent.classList.contains('active');
                    
                    // On mobile, close all steps first (accordion behavior)
                    if (window.innerWidth <= 768) {
                        stepContents.forEach(content => {
                            content.classList.remove('active');
                        });
                        
                        // Open clicked step if it wasn't active
                        if (!isActive) {
                            stepContent.classList.add('active');
                            
                            // Add animation to step number
                            const stepNumber = stepContent.closest('.process-step').querySelector('.step-number');
                            stepNumber.style.animation = 'pulse 0.5s ease';
                            
                            setTimeout(() => {
                                stepNumber.style.animation = '';
                            }, 500);
                        }
                    } else {
                        // On desktop, just toggle the clicked step (non-accordion)
                        stepContent.classList.toggle('active');
                        
                        // Add animation to step number
                        const stepNumber = stepContent.closest('.process-step').querySelector('.step-number');
                        stepNumber.style.animation = 'pulse 0.5s ease';
                        
                        setTimeout(() => {
                            stepNumber.style.animation = '';
                        }, 500);
                    }
                }
                
                // Add keyboard support
                stepContents.forEach(content => {
                    content.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleStep(this);
                        }
                    });
                });
            }
            
            // Function to initialize hover effects
            function initHoverEffects() {
                // Add hover effect to step numbers
                const stepNumbers = document.querySelectorAll('.step-number');
                
                stepNumbers.forEach(number => {
                    number.addEventListener('mouseenter', function() {
                        this.style.animation = 'pulse 0.5s ease';
                    });
                    
                    number.addEventListener('mouseleave', function() {
                        this.style.animation = '';
                    });
                });
                
                // Add hover effect to CTA button
                const ctaButton = document.querySelector('.process-cta-button');
                if (ctaButton) {
                    ctaButton.addEventListener('mouseenter', function() {
                        this.style.animation = 'pulse 0.5s ease';
                    });
                    
                    ctaButton.addEventListener('mouseleave', function() {
                        this.style.animation = '';
                    });
                }
            }
            
            // Function to initialize animations
            function initAnimations() {
                // Animate steps on page load
                const steps = document.querySelectorAll('.process-step');
                
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.animation = 'slideIn 0.5s ease forwards';
                        step.style.opacity = '0';
                    }, index * 100);
                });
            }
            
            // Function to initialize CTA button
            function initCTA() {
                const ctaButton = document.querySelector('.process-cta-button');
                
                if (ctaButton) {
                    ctaButton.addEventListener('click', function() {
                        // Add click animation
                        this.style.animation = 'pulse 0.3s ease';
                        
                        setTimeout(() => {
                            this.style.animation = '';
                        }, 300);
                        
                        // Show confirmation (in real app, this would open a form)
                        alert('Thank you! Our team will contact you within 24 hours to schedule your free inspection.');
                    });
                }
            }
            
            // Handle window resize
            let resizeTimer;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    // Reset all steps on mobile resize
                    if (window.innerWidth <= 768) {
                        // Keep only first step open on mobile
                        stepContents.forEach((content, index) => {
                            if (index === 0) {
                                content.classList.add('active');
                            } else {
                                content.classList.remove('active');
                            }
                        });
                    } else {
                        // On desktop, all steps can be independently toggled
                        // No automatic state change needed
                    }
                }, 250);
            });
            
            // Auto-scroll to active step on mobile when opened
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(mutation => {
                    if (mutation.attributeName === 'class') {
                        const target = mutation.target;
                        if (target.classList.contains('active') && window.innerWidth <= 768) {
                            // Smooth scroll to the step
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }
                    }
                });
            });
            
            // Observe each step content for class changes
            stepContents.forEach(content => {
                observer.observe(content, { attributes: true });
            });
        });
   







        

// JavaScript for Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // CTA Button Animation
    const ctaBtn = document.getElementById('requestInspectionBtn');
    
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            // Add click animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulseBadge 0.3s ease';
            }, 10);
            
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
            
            // In a real implementation, this would trigger WhatsApp or contact form
            console.log('Site inspection requested');
            alert('Thank you! Our team will contact you within 24 hours to schedule your free site assessment.');
            
            // For WhatsApp integration:
            // sendWhatsAppInquiry();
        });
        
        // Add keyboard support
        ctaBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Floating stats hover effect
    const floatingStats = document.querySelectorAll('.floating-stat');
    
    floatingStats.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const heroSection = document.querySelector('.floor-coating-hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection && window.innerWidth > 768) {
            heroSection.style.backgroundPosition = `center ${rate}px`;
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                entry.target.classList.add('animated');
                
                // Special animation for stats
                if (entry.target.classList.contains('floating-stat')) {
                    entry.target.style.animationPlayState = 'running';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll('.hero-content-section, .hero-visual-section, .floating-stat, .quality-badge');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// WhatsApp Integration Function (example)
function sendWhatsAppInquiry() {
    const phoneNumber = "+1234567890"; // Replace with actual number
    const message = encodeURIComponent(
        "Hello! I'm interested in scheduling a free site assessment for industrial floor coating."
    );
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
}








// JavaScript for WhatsApp Integration
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp Phone Number
    const whatsappNumber = '9789029012';
    
    // Function to open WhatsApp with pre-filled message
    function openWhatsApp() {
        const message = encodeURIComponent(
            "Hi! I have queries about floor coating and cleaning services. Can you please help?"
        );
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');
        
        // Log the action
        console.log('WhatsApp consultation requested');
        
        // Show confirmation
        showNotification('Opening WhatsApp for consultation...');
    }
    
    // Function to show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'whatsapp-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-aqua);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Add animation keyframes for notification
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOutRight {
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Main CTA Button
    const mainCtaBtn = document.getElementById('whatsappConsultationBtn');
    if (mainCtaBtn) {
        mainCtaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulseBadge 0.3s ease';
            }, 10);
            
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
            
            // Open WhatsApp
            setTimeout(() => {
                openWhatsApp();
            }, 300);
        });
        
        // Keyboard support
        mainCtaBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Frame WhatsApp Button
    const frameWhatsappBtn = document.getElementById('frameWhatsappBtn');
    if (frameWhatsappBtn) {
        frameWhatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Open WhatsApp
            openWhatsApp();
        });
    }
    
    // Service items hover effect
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
        
        // Click to open WhatsApp with specific service query
        item.addEventListener('click', function() {
            const serviceTitle = this.querySelector('.service-title').textContent;
            const message = encodeURIComponent(
                `Hi! I'm interested in ${serviceTitle} services. Can you provide more details?`
            );
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
            window.open(whatsappURL, '_blank');
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Special animation for consultation frame
                if (entry.target.classList.contains('consultation-frame')) {
                    entry.target.style.animationPlayState = 'running';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll(
        '.hero-content-section, .hero-visual-section, .consultation-frame, .quality-badge, .service-item'
    );
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
    
    // Add WhatsApp click tracking
    document.addEventListener('click', function(e) {
        if (e.target.closest('#whatsappConsultationBtn, #frameWhatsappBtn, .service-item')) {
            // You can add analytics tracking here
            console.log('WhatsApp consultation initiated');
        }
    });
});

// WhatsApp Integration Function
function sendWhatsAppInquiry() {
    const phoneNumber = "9789029012";
    const message = encodeURIComponent(
        "Hi! I have queries about floor coating and cleaning services. Can you please help?"
    );
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
}