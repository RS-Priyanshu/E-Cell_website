 const cursor = document.getElementById('custom-cursor');
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .flip-card, .card-3d, .logo-item, .stat-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
        
        // Three.js 3D Scene
        let scene, camera, renderer, particles;
        
        function initThreeJS() {
            // Create scene
            scene = new THREE.Scene();
            
            // Create camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;
            
            // Create renderer
            renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('three-container').appendChild(renderer.domElement);
            
            // Add particles for background effect
            const particleGeometry = new THREE.BufferGeometry();
            const particleCount = 5000;
            
            const posArray = new Float32Array(particleCount * 3);
            for(let i = 0; i < particleCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 50;
            }
            
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            const particleMaterial = new THREE.PointsMaterial({
                size: 0.05,
                color: 0x00ffff,
                transparent: true,
                opacity: 0.8
            });
            
            particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.add(particles);
            
            // Add orbit controls
            const controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
            
            // Handle window resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                
                // Adjust sponsorship track
                adjustSponsorshipTracks();
            });
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                
                particles.rotation.x += 0.0005;
                particles.rotation.y += 0.001;
                
                controls.update();
                renderer.render(scene, camera);
            }
            
            animate();
        }
        
        // Sponsorship tracks adjustment
        function adjustSponsorshipTracks() {
            const rows = document.querySelectorAll('.sponsor-row');
            rows.forEach(row => {
                const logos = row.querySelectorAll('.logo-item');
                const totalWidth = logos.length * 280; // Approximate width of all logos
                row.style.width = totalWidth + 'px';
            });
        }
        
        // Updated counter animation function with smoother increments
        function animateCounter(elementId, targetValue, duration = 1500) {
            const element = document.getElementById(elementId);
            const startValue = 0;
            const startTime = Date.now();
            
            const updateCounter = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smoother animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
                
                element.textContent = currentValue.toLocaleString() + '+';
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = targetValue.toLocaleString() + '+';
                }
            };
            
            requestAnimationFrame(updateCounter);
        }
        
        // Counter animation for about section - First Row
        const aboutObserverRow1 = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate counters for first row with larger numbers
                    setTimeout(() => animateCounter('social-reach', 10000, 1500), 200);
                    setTimeout(() => animateCounter('student-community', 5000, 1500), 400);
                    
                    // Add animation class to stat cards in first row
                    const statCardsRow1 = entry.target.querySelectorAll('.stat-card');
                    statCardsRow1.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('count-up');
                        }, index * 200);
                    });
                    
                    aboutObserverRow1.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        // Counter animation for about section - Second Row
        const aboutObserverRow2 = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate counters for second row with smaller numbers
                    setTimeout(() => animateCounter('startups', 10, 800), 200);
                    setTimeout(() => animateCounter('competition-wins', 10, 800), 400);
                    
                    // Add animation class to stat cards in second row
                    const statCardsRow2 = entry.target.querySelectorAll('.stat-card');
                    statCardsRow2.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('count-up');
                        }, index * 200);
                    });
                    
                    aboutObserverRow2.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        // Counter animation for visitor count
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let count = 100;
                    const target = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
                    const speed = Math.floor(1000 / target); 

                    const interval = setInterval(() => {
                        if (count < target) {
                            count++;
                            document.getElementById("visitor-count").textContent = count;
                        } else {
                            clearInterval(interval);
                        }
                    }, speed);

                    counterObserver.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.5
        });

        // Scroll animations
        document.addEventListener("DOMContentLoaded", () => {
            // Initialize Three.js
            initThreeJS();
            
            // Hide loader after page loads
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 2000);
            
            // Initialize sponsorship tracks
            adjustSponsorshipTracks();
            
            // Add dynamic effects to sponsorship logos
            const logoItems = document.querySelectorAll('.logo-item');
            logoItems.forEach((item, index) => {
                // Add slight delay to each logo for staggered hover effect
                item.style.transitionDelay = `${index * 0.03}s`;
                
                // Add glow effect on hover
                item.addEventListener('mouseenter', function() {
                    this.style.boxShadow = `0 15px 30px rgba(0, 255, 255, 0.4),
                                           0 0 30px rgba(0, 255, 255, 0.3)`;
                    this.style.transform = `translateY(-5px) scale(1.05)`;
                    
                    // Pause animation on this specific row
                    const row = this.closest('.sponsor-row');
                    row.style.animationPlayState = 'paused';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
                    this.style.transform = '';
                    
                    // Resume animation
                    const row = this.closest('.sponsor-row');
                    row.style.animationPlayState = 'running';
                });
            });
            
            // Add random speed variation to rows for more dynamic effect
            setTimeout(() => {
                const row1 = document.querySelector('.row-1');
                const row2 = document.querySelector('.row-2');
                
                // Randomize speeds slightly for more natural look
                row1.style.animationDuration = `${25 + Math.random() * 5}s`;
                row2.style.animationDuration = `${30 + Math.random() * 5}s`;
            }, 1000);
            
            // Observe counters for both rows
            aboutObserverRow1.observe(document.getElementById("about-stats"));
            aboutObserverRow2.observe(document.getElementById("about-stats-row2"));
            counterObserver.observe(document.getElementById("counter-section"));
            
            // Add scroll animations to sections
            const sections = document.querySelectorAll('.content-section, .about-section');
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fadeInUp');
                    }
                });
            }, { threshold: 0.1 });
            
            sections.forEach(section => {
                sectionObserver.observe(section);
            });
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Add click effect to explore button
            const exploreBtn = document.querySelector('button');
            if (exploreBtn) {
                exploreBtn.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                    
                    // Smooth scroll to About section
                    document.querySelector('#about').scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            }
            
            // Control sponsorship animation based on visibility
            const sponsorshipObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const rows = document.querySelectorAll('.sponsor-row');
                    if (entry.isIntersecting) {
                        rows.forEach(row => {
                            row.style.animationPlayState = 'running';
                        });
                    } else {
                        rows.forEach(row => {
                            row.style.animationPlayState = 'paused';
                        });
                    }
                });
            }, { threshold: 0.2 });
            
            sponsorshipObserver.observe(document.getElementById('sponsorship-section'));
        });