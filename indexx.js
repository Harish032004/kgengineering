
        // Simple, Working Industrial Hero
        class IndustrialHero {
            constructor() {
                this.videos = document.querySelectorAll('.video-slide');
                this.indicators = document.querySelectorAll('.indicator');
                this.progressBar = document.getElementById('progressBar');
                this.prevBtn = document.querySelector('.prev');
                this.nextBtn = document.querySelector('.next');
                
                this.currentIndex = 0;
                this.totalVideos = this.videos.length;
                this.autoRotateInterval = 3000;
                this.rotationTimer = null;
                this.manualOverrideTimer = null;
                this.isAutoRotating = true;
                
                this.init();
            }
            
            init() {
                // Start first video
                this.videos[0].play();
                
                // Setup event listeners
                this.setupEvents();
                
                // Start auto rotation
                this.startAutoRotation();
                this.resetProgressBar();
            }
            
            setupEvents() {
                // Arrow buttons
                this.prevBtn.addEventListener('click', () => this.navigate(-1));
                this.nextBtn.addEventListener('click', () => this.navigate(1));
                
                // Indicators
                this.indicators.forEach(indicator => {
                    indicator.addEventListener('click', (e) => {
                        const index = parseInt(e.target.dataset.index);
                        this.goToVideo(index);
                    });
                });
            }
            
            navigate(direction) {
                const newIndex = (this.currentIndex + direction + this.totalVideos) % this.totalVideos;
                this.switchVideo(newIndex);
                this.handleManualInteraction();
            }
            
            goToVideo(index) {
                if (index !== this.currentIndex) {
                    this.switchVideo(index);
                    this.handleManualInteraction();
                }
            }
            
            switchVideo(newIndex) {
                // Hide current video
                this.videos[this.currentIndex].classList.remove('active');
                this.indicators[this.currentIndex].classList.remove('active');
                this.videos[this.currentIndex].pause();
                
                // Update index
                this.currentIndex = newIndex;
                
                // Show new video
                this.videos[this.currentIndex].currentTime = 0;
                this.videos[this.currentIndex].play();
                this.videos[this.currentIndex].classList.add('active');
                this.indicators[this.currentIndex].classList.add('active');
                
                // Reset progress bar
                this.resetProgressBar();
            }
            
            handleManualInteraction() {
                // Stop auto rotation
                this.isAutoRotating = false;
                clearInterval(this.rotationTimer);
                
                // Resume after 8 seconds
                clearTimeout(this.manualOverrideTimer);
                this.manualOverrideTimer = setTimeout(() => {
                    this.isAutoRotating = true;
                    this.startAutoRotation();
                }, 8000);
            }
            
            startAutoRotation() {
                if (!this.isAutoRotating) return;
                
                clearInterval(this.rotationTimer);
                this.rotationTimer = setInterval(() => {
                    const newIndex = (this.currentIndex + 1) % this.totalVideos;
                    this.switchVideo(newIndex);
                }, this.autoRotateInterval);
            }
            
            resetProgressBar() {
                // Reset progress bar animation
                this.progressBar.style.transition = 'none';
                this.progressBar.style.transform = 'translateX(-100%)';
                
                // Force reflow
                void this.progressBar.offsetWidth;
                
                // Start new animation
                this.progressBar.style.transition = `transform ${this.autoRotateInterval}ms linear`;
                this.progressBar.style.transform = 'translateX(0%)';
            }
        }
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            const hero = new IndustrialHero();
            
            // Pause when tab is hidden
            document.addEventListener('visibilitychange', () => {
                const activeVideo = document.querySelector('.video-slide.active');
                if (document.hidden) {
                    activeVideo.pause();
                } else {
                    activeVideo.play();
                }
            });
        });
   