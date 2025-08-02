        // Animate skill bars on scroll
        document.addEventListener('DOMContentLoaded', function() {
            const skillBars = document.querySelectorAll('.skill-progress');
            
            // Set initial width for skill bars with staggered delay
            skillBars.forEach((bar, index) => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 300 + (index * 100));
            });
            
            // Animate elements on scroll
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            
            function checkScroll() {
                animatedElements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    if (rect.top <= windowHeight * 0.85) {
                        el.classList.add('visible');
                    }
                });
            }
            
            // Initial check
            setTimeout(checkScroll, 100);
            
            // Check on scroll
            window.addEventListener('scroll', checkScroll);
            
            // Add hover effects to timeline items
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.querySelector('.timeline-dot').classList.add('animate__animated', 'animate__pulse');
                });
                
                item.addEventListener('mouseleave', function() {
                    this.querySelector('.timeline-dot').classList.remove('animate__animated', 'animate__pulse');
                });
            });
            
            // PDF Generation
            document.getElementById('pdf-button').addEventListener('click', function() {
                const loadingOverlay = document.getElementById('loading-overlay');
                loadingOverlay.classList.remove('hidden');
                
                // Add click animation
                this.classList.add('scale-95');
                setTimeout(() => {
                    this.classList.remove('scale-95');
                }, 200);
                
                // Hide floating buttons temporarily for PDF generation
                const floatingButtons = document.querySelector('.floating-buttons');
                floatingButtons.style.display = 'none';
                
                const element = document.getElementById('cv-content');
                
                // Configure PDF options for A4 size
                const opt = {
                    margin: [0, 0, 0, 0], // No margins for maximum space
                    filename: 'CV_Nicolas_Ariel_Paez.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { 
                        scale: 2, 
                        useCORS: true,
                        letterRendering: true,
                        logging: false,
                        dpi: 300,
                        scrollY: 0
                    },
                    jsPDF: { 
                        unit: 'mm', 
                        format: 'a4', 
                        orientation: 'portrait',
                        compress: true,
                        precision: 2
                    },
                    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
                };
                
                // Small delay to ensure loading overlay is visible
                setTimeout(() => {
                    html2pdf().set(opt).from(element).save().then(() => {
                        // Show floating buttons again after PDF generation
                        floatingButtons.style.display = 'flex';
                        loadingOverlay.classList.add('hidden');
                        
                        // Show success message
                        const successMessage = document.createElement('div');
                        successMessage.className = 'fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce';
                        successMessage.innerHTML = '<i class="fas fa-check-circle mr-2"></i> PDF generado con éxito';
                        document.body.appendChild(successMessage);
                        
                        setTimeout(() => {
                            successMessage.style.opacity = '0';
                            successMessage.style.transition = 'opacity 0.5s ease';
                            setTimeout(() => {
                                document.body.removeChild(successMessage);
                            }, 500);
                        }, 3000);
                    }).catch(err => {
                        console.error('Error generating PDF:', err);
                        floatingButtons.style.display = 'flex';
                        loadingOverlay.classList.add('hidden');
                        alert('Hubo un problema al generar el PDF. Por favor intente nuevamente.');
                    });
                }, 500);
            });
            
            // Add entrance animations to all elements with staggered delay
            animatedElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, 100 + (index * 100));
            });
        });
(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'968e4952f1e4e9b2',t:'MTc1NDE0NTE2NS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();