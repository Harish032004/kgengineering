document.addEventListener('DOMContentLoaded', function() {
    // 1. SELECT ELEMENTS
    const mainNav = document.getElementById('mainNav');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('closeBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    // These might be missing on some pages, so we handle them carefully
    const videos = document.querySelectorAll('.hero-video');
    const videoControls = document.querySelectorAll('.video-control-btn');
    const expandIcons = document.querySelectorAll('.expand-icon');

    // 2. MOBILE MENU LOGIC (This will now always work)
    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop scrolling
        });
    }

    if (closeBtn && mobileNav) {
        closeBtn.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto'; // Start scrolling again
        });
    }

    // 3. VIDEO LOGIC (This only runs IF the video exists)
    if (videos.length > 0) {
        let currentVideoIndex = 0;
        
        function switchVideo(index) {
            videos.forEach(v => v.classList.remove('active'));
            videoControls.forEach(c => c.classList.remove('active'));
            
            videos[index].classList.add('active');
            videoControls[index].classList.add('active');
            currentVideoIndex = index;
        }

        setInterval(() => {
            let next = (currentVideoIndex + 1) % videos.length;
            switchVideo(next);
        }, 3000);
    }

    // 4. MOBILE DROPDOWNS
    expandIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const menu = this.closest('.mobile-nav-link').nextElementSibling;
            if(menu) menu.classList.toggle('active');
        });
    });
});


function injectProfessionalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* 1. Services Main Dropdown */
        .dropdown { position: relative; }
        
        .dropdown:hover > .dropdown-menu {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateY(0);
        }

        .dropdown-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background: #000000 !important;
            min-width: 260px;
            border-top: 3px solid #6ecacb;
            box-shadow: 0 10px 30px rgba(0,0,0,0.8);
            z-index: 9999;
            padding: 10px 0;
        }

        /* 2. Industrial Lubricants Hover (Desktop) */
        @media (min-width: 769px) {
            .dropdown-submenu { position: relative; }

            /* This makes the menu appear when hovering the parent container */
            .dropdown-submenu:hover > .submenu-items {
                display: block !important;
                opacity: 1;
            }

            .submenu-items {
                display: none;
                position: absolute;
                left: 100%; /* Positions to the right */
                top: 0;
                background: #0b0b0b;
                min-width: 200px;
                border-left: 2px solid #6ecacb;
                box-shadow: 10px 0 20px rgba(0,0,0,0.5);
                z-index: 10000;
            }

            .desktop-arrow {
                float: right;
                margin-top: 4px;
                font-size: 0.7rem;
            }
        }

        /* 3. Mobile Navigation Styling */
        @media (max-width: 768px) {
            .submenu-items {
                display: none; /* Controlled by JS toggle */
                background: #111111;
                list-style: none;
                padding-left: 0;
            }
            .submenu-items.active {
                display: block !important;
            }
            .plus-icon {
                float: right;
                color: #6ecacb;
                font-size: 1.2rem;
                transition: transform 0.3s;
            }
        }
    `;
    document.head.appendChild(style);
}
injectProfessionalStyles();


function initMenuLogic() {
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    submenuToggles.forEach(toggle => {
        // Find or create the plus icon for mobile
        let plus = toggle.querySelector('.plus-icon');
        if (!plus) {
            plus = document.createElement('span');
            plus.className = 'plus-icon';
            plus.innerHTML = '+';
            toggle.appendChild(plus);
        }

        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Stop link from opening
                e.stopPropagation();
                
                const parent = this.parentElement;
                const menu = parent.querySelector('.submenu-items');
                
                if (menu) {
                    menu.classList.toggle('active');
                    plus.innerHTML = menu.classList.contains('active') ? '−' : '+';
                    plus.style.transform = menu.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
                }
            }
        });
    });
}

// Call it on load
document.addEventListener('DOMContentLoaded', initMenuLogic);

// Mobile dropdown toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle main dropdown
    const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.closest('.mobile-dropdown');
            parent.classList.toggle('active');
        });
    });

    // Toggle submenu
    const submenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const parent = this.closest('.mobile-dropdown-submenu');
            parent.classList.toggle('active');
        });
    });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-dropdown')) {
            document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            document.querySelectorAll('.mobile-dropdown-submenu').forEach(submenu => {
                submenu.classList.remove('active');
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Mobile dropdown toggle
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle, .mobile-submenu-toggle');
    
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (this.classList.contains('mobile-submenu-toggle')) {
                // Toggle submenu
                const submenu = this.closest('.mobile-dropdown-submenu');
                submenu.classList.toggle('active');
            } else {
                // Toggle main dropdown
                const dropdown = this.closest('.mobile-dropdown');
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-dropdown')) {
            document.querySelectorAll('.mobile-dropdown, .mobile-dropdown-submenu').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
});
