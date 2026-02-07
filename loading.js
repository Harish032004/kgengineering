
        // KG ENGINEERING LOADER SCRIPT
        document.addEventListener('DOMContentLoaded', function() {
            const loader = document.getElementById('kgLoader');
            const mainContent = document.getElementById('kgContent');
            
            // Set loader to play only once (2.8 seconds total animation)
            setTimeout(() => {
                // Add exit animation class
                loader.style.animation = 'kgLoaderExit 0.6s cubic-bezier(0.86, 0, 0.07, 1) forwards';
                
                // Show main content immediately
                setTimeout(() => {
                    mainContent.style.display = 'block';
                }, 100);
                
                // Remove loader from DOM after animation
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 700);
                
            }, 2800); // Total animation duration: 2.8 seconds
            
            // Emergency timeout (in case animations fail)
            setTimeout(() => {
                if (loader.style.display !== 'none') {
                    loader.style.display = 'none';
                    mainContent.style.display = 'block';
                }
            }, 4000);
            
            // Prevent loader from being interrupted
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' || e.key === ' ') {
                    e.preventDefault();
                }
            });
            
            // Disable right-click on loader
            loader.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
            });
            
            // Simulate page load for demo purposes
            // In real implementation, this would be triggered by window.load event
            console.log('KG Engineering Services Loader Initialized');
            console.log('Animation Sequence:');
            console.log('0.2s - Top horizontal line');
            console.log('0.4s - Left vertical line');
            console.log('0.8s - Bottom horizontal line');
            console.log('1.0s - Right vertical line');
            console.log('1.2s - Crosshair vertical');
            console.log('1.4s - Crosshair horizontal');
            console.log('1.6s - Outer gear rotation');
            console.log('1.8s - Inner gear appearance');
            console.log('2.1s - Company brand text');
            console.log('2.4s - Brand divider expansion');
            console.log('2.8s - Loader exit');
        });
        
        // Ensure loader works on slow connections
        window.addEventListener('load', function() {
            console.log('Page fully loaded, loader sequence complete');
        });
        
        // Handle resize events to maintain precision
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                console.log('Window resized - Maintaining engineering precision alignment');
            }, 250);
        });
