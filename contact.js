/**
 * Professional Contact Page - Interactive Components
 * Standalone version with 'cp-' prefix to avoid conflicts
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        animationEnabled: true,
        reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        whatsappNumber: '9789029012',
        whatsappCountryCode: '91' // India country code
    };
    
    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        if (CONFIG.reduceMotion) {
            CONFIG.animationEnabled = false;
        }
        
        initializeComponents();
        setupAnimations();
        setupFormInteractions();
        setupFAQAccordion();
        setupScrollAnimations();
        setupResponsiveBehaviors();
        
        console.log('Contact Page initialized - WhatsApp Integration Active');
    });
    
    /**
     * Initialize all page components
     */
    function initializeComponents() {
        // Add entrance animations to sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.dataset.entered = 'false';
        });
        
        // Initialize form validation
        const contactForm = document.getElementById('cpContactForm');
        if (contactForm) {
            contactForm.noValidate = true;
            
            // Initialize select elements
            const selectElements = contactForm.querySelectorAll('select');
            selectElements.forEach(select => {
                if (select.value) {
                    select.parentElement.classList.add('cp-select-filled');
                }
                
                select.addEventListener('change', function() {
                    if (this.value) {
                        this.parentElement.classList.add('cp-select-filled');
                        this.style.color = 'var(--cp-color-charcoal)';
                    } else {
                        this.parentElement.classList.remove('cp-select-filled');
                    }
                });
            });
        }
    }
    
    /**
     * Setup entrance animations for page elements
     */
    function setupAnimations() {
        if (!CONFIG.animationEnabled) return;
        
        // Animate form card entrance
        const formCard = document.querySelector('.cp-form-card');
        if (formCard) {
            setTimeout(() => {
                formCard.style.animationPlayState = 'running';
            }, 300);
        }
        
        // Animate info items with staggered delay
        const infoItems = document.querySelectorAll('.cp-info-item');
        infoItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 500 + (index * 100));
        });
        
        // Animate trust items
        const trustItems = document.querySelectorAll('.cp-trust-item');
        trustItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        });
        
        // Observer for trust items animation
        const trustObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                    trustObserver.unobserve(item);
                }
            });
        }, { threshold: 0.2 });
        
        trustItems.forEach(item => trustObserver.observe(item));
    }
    
    /**
     * Setup form interactions and validation
     */
    function setupFormInteractions() {
        const contactForm = document.getElementById('cpContactForm');
        if (!contactForm) return;
        
        // Input focus effects
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // Focus effect
            input.addEventListener('focus', function() {
                if (!CONFIG.animationEnabled) return;
                
                const parent = this.closest('.cp-input-group');
                if (parent) {
                    parent.style.transform = 'translateY(-2px)';
                    parent.style.transition = 'transform 0.3s ease';
                }
            });
            
            // Blur effect
            input.addEventListener('blur', function() {
                if (!CONFIG.animationEnabled) return;
                
                const parent = this.closest('.cp-input-group');
                if (parent) {
                    parent.style.transform = 'translateY(0)';
                }
                
                // Validate on blur
                if (this.hasAttribute('required') && !this.value.trim()) {
                    showInputError(this, 'This field is required');
                }
                
                // Email validation on blur
                if (this.type === 'email' && this.value.trim()) {
                    validateEmail(this);
                }
            });
            
            // Real-time validation for email
            if (input.type === 'email') {
                input.addEventListener('input', function() {
                    if (this.value.trim()) {
                        validateEmail(this);
                    } else {
                        clearInputError(this);
                    }
                });
            }
            
            // Real-time validation for phone
            if (input.type === 'tel') {
                input.addEventListener('input', function() {
                    formatPhoneNumber(this);
                });
            }
            
            // Clear errors on input
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    clearInputError(this);
                }
            });
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const formData = new FormData(this);
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                showWhatsAppNotification(formObject);
                submitForm(this, formObject);
            }
        });
    }
    
    /**
     * Validate email input
     */
    function validateEmail(input) {
        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        
        if (email && !isValid) {
            showInputError(input, 'Please enter a valid email address');
            return false;
        } else {
            clearInputError(input);
            return true;
        }
    }
    
    /**
     * Format phone number
     */
    function formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        
        if (value.length > 6) {
            value = value.substring(0, 3) + '-' + value.substring(3, 6) + '-' + value.substring(6);
        } else if (value.length > 3) {
            value = value.substring(0, 3) + '-' + value.substring(3);
        }
        
        input.value = value;
    }
    
    /**
     * Validate entire form
     */
    function validateForm() {
        const form = document.getElementById('cpContactForm');
        const requiredInputs = form.querySelectorAll('[required]');
        let isValid = true;
        
        // Clear all errors first
        requiredInputs.forEach(input => {
            clearInputError(input);
        });
        
        // Validate each required field
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                showInputError(input, 'This field is required');
                isValid = false;
            }
            
            // Additional validation for email
            if (input.type === 'email' && input.value.trim()) {
                if (!validateEmail(input)) {
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    /**
     * Show input error state
     */
    function showInputError(input, message) {
        const parent = input.closest('.cp-input-group');
        if (!parent) return;
        
        // Remove existing error
        clearInputError(input);
        
        // Add error class
        parent.classList.add('cp-error');
        
        // Create error message
        const errorElement = document.createElement('div');
        errorElement.className = 'cp-input-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            position: absolute;
            bottom: -20px;
            left: 0;
            font-size: 0.75rem;
            color: var(--cp-color-error);
            font-weight: 500;
        `;
        
        parent.style.position = 'relative';
        parent.appendChild(errorElement);
        
        // Animate error
        if (CONFIG.animationEnabled) {
            errorElement.style.opacity = '0';
            errorElement.style.transform = 'translateY(-5px)';
            
            setTimeout(() => {
                errorElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                errorElement.style.opacity = '1';
                errorElement.style.transform = 'translateY(0)';
            }, 10);
        }
    }
    
    /**
     * Clear input error state
     */
    function clearInputError(input) {
        const parent = input.closest('.cp-input-group');
        if (!parent) return;
        
        parent.classList.remove('cp-error');
        
        const existingError = parent.querySelector('.cp-input-error');
        if (existingError) {
            if (CONFIG.animationEnabled) {
                existingError.style.opacity = '0';
                existingError.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    existingError.remove();
                }, 300);
            } else {
                existingError.remove();
            }
        }
    }
    
    /**
     * Submit form to WhatsApp
     */
    function submitForm(form, formData) {
        const submitButton = form.querySelector('.cp-submit-button');
        const originalText = submitButton.querySelector('span').textContent;
        const originalIcon = submitButton.querySelector('i').className;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.querySelector('span').textContent = 'Processing...';
        submitButton.querySelector('i').className = 'fas fa-spinner fa-spin';
        
        // Simulate processing delay
        setTimeout(() => {
            // Create WhatsApp message
            const whatsappMessage = createWhatsAppMessage(formData);
            const phoneNumber = CONFIG.whatsappNumber;
            const fullPhoneNumber = CONFIG.whatsappCountryCode + phoneNumber;
            
            // Prepare WhatsApp URL
            const whatsappURL = `https://wa.me/${fullPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Update button to WhatsApp state
            submitButton.querySelector('span').textContent = 'Open WhatsApp';
            submitButton.querySelector('i').className = 'fab fa-whatsapp';
            submitButton.classList.add('cp-whatsapp-active');
            submitButton.disabled = false;
            
            // Store original form reference
            const originalForm = form;
            
            // Replace submit handler with WhatsApp redirection
            const newSubmitHandler = function(e) {
                e.preventDefault();
                window.open(whatsappURL, '_blank');
                
                // Reset form
                setTimeout(() => {
                    originalForm.reset();
                    resetSubmitButton();
                    
                    // Show success notification
                    showSuccessNotification();
                }, 1000);
            };
            
            // Remove old event listeners and add new one
            const newButton = submitButton.cloneNode(true);
            submitButton.parentNode.replaceChild(newButton, submitButton);
            newButton.addEventListener('click', newSubmitHandler);
            
            // Auto-open WhatsApp after 1.5 seconds
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                
                // Reset form after a delay
                setTimeout(() => {
                    originalForm.reset();
                    
                    // Reset select styling
                    const select = originalForm.querySelector('select');
                    if (select) {
                        select.parentElement.classList.remove('cp-select-filled');
                        select.style.color = '';
                    }
                    
                    resetSubmitButton();
                }, 2000);
            }, 1500);
            
        }, 1500);
        
        /**
         * Reset submit button to original state
         */
        function resetSubmitButton() {
            const currentButton = form.querySelector('.cp-submit-button');
            if (currentButton) {
                currentButton.disabled = false;
                currentButton.classList.remove('cp-whatsapp-active');
                currentButton.querySelector('span').textContent = 'Send Message';
                currentButton.querySelector('i').className = 'fas fa-paper-plane';
                
                // Remove all existing click events
                const newButton = currentButton.cloneNode(true);
                currentButton.parentNode.replaceChild(newButton, currentButton);
                
                // Restore original submit functionality
                newButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (validateForm()) {
                        const formData = new FormData(form);
                        const formObject = {};
                        formData.forEach((value, key) => {
                            formObject[key] = value;
                        });
                        submitForm(form, formObject);
                    }
                });
            }
        }
    }
    
    /**
     * Create formatted WhatsApp message from form data
     */
    function createWhatsAppMessage(formData) {
        const timestamp = new Date().toLocaleString();
        const subjectMap = {
            'consultation': 'Consultation Request',
            'project': 'Project Inquiry',
            'partnership': 'Partnership Opportunity',
            'career': 'Career Inquiry',
            'other': 'Other Inquiry'
        };
        
        const subjectText = subjectMap[formData.subject] || formData.subject || 'Not specified';
        
        return `🌟 *NEW CONTACT FORM SUBMISSION* 🌟\n\n` +
               `📋 *CONTACT DETAILS*\n` +
               `👤 Name: ${formData.name || 'Not provided'}\n` +
               `📧 Email: ${formData.email || 'Not provided'}\n` +
               `📱 Phone: ${formData.phone || 'Not provided'}\n` +
               `🎯 Subject: ${subjectText}\n\n` +
               `💬 *MESSAGE*\n${formData.message || 'No message provided'}\n\n` +
               `📅 Submitted: ${timestamp}\n` +
               `🔗 Source: Website Contact Form\n\n` +
               `_Please respond within 24 hours as per your guarantee._`;
    }
    
    /**
     * Show WhatsApp notification
     */
    function showWhatsAppNotification(formData) {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.cp-whatsapp-notification, .cp-success-notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        const notification = document.createElement('div');
        notification.className = 'cp-whatsapp-notification';
        notification.innerHTML = `
            <div class="cp-notification-content">
                <i class="fab fa-whatsapp"></i>
                <div>
                    <h4>Opening WhatsApp</h4>
                    <p>Your message is ready to send to our team</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 4000);
    }
    
    /**
     * Show success notification
     */
    function showSuccessNotification() {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.cp-whatsapp-notification, .cp-success-notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        const notification = document.createElement('div');
        notification.className = 'cp-success-notification';
        notification.innerHTML = `
            <div class="cp-notification-content">
                <i class="fas fa-check-circle"></i>
                <div>
                    <h4>Form Submitted Successfully</h4>
                    <p>Your message has been prepared for WhatsApp</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }
    
    /**
     * Setup FAQ accordion functionality
     */
    function setupFAQAccordion() {
        const faqItems = document.querySelectorAll('.cp-faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.cp-faq-question');
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Toggle current item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    /**
     * Setup scroll-based animations
     */
    function setupScrollAnimations() {
        if (!CONFIG.animationEnabled) return;
        
        const animatedElements = document.querySelectorAll(
            '.cp-detail-item, .cp-map-info, .cp-faq-item'
        );
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.classList.contains('cp-detail-item')) {
                        element.style.opacity = '0';
                        element.style.transform = 'translateY(20px)';
                        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        
                        setTimeout(() => {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                        }, 200);
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => observer.observe(el));
    }
    
    /**
     * Setup responsive behaviors
     */
    function setupResponsiveBehaviors() {
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Re-initialize animations on resize complete
                if (window.innerWidth <= 768) {
                    // Reduce animation intensity on mobile
                    document.body.classList.add('cp-mobile-view');
                } else {
                    document.body.classList.remove('cp-mobile-view');
                }
            }, 250);
        });
        
        // Initial check
        if (window.innerWidth <= 768) {
            document.body.classList.add('cp-mobile-view');
        }
        
        // Add mobile-specific styles
        const mobileStyles = document.createElement('style');
        mobileStyles.id = 'cp-mobile-styles';
        mobileStyles.textContent = `
            .cp-mobile-view .cp-trust-item:hover,
            .cp-mobile-view .cp-detail-item:hover,
            .cp-mobile-view .cp-info-item:hover {
                transform: none !important;
            }
            
            .cp-mobile-view .cp-submit-button:hover {
                transform: none !important;
            }
            
            .cp-mobile-view .cp-form-card {
                animation: none;
                opacity: 1;
                transform: none;
            }
        `;
        
        if (window.innerWidth <= 768) {
            document.head.appendChild(mobileStyles);
        }
    }
})();