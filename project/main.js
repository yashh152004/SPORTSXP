document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const inputs = document.querySelectorAll('.form-input');
    const backgroundImage = document.querySelector('.background-image');
    
    // Enhanced floating label animation
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
            backgroundImage.style.transform = 'scale(1.02)';
            createParticles(input);
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
            backgroundImage.style.transform = 'scale(1)';
        });
        
        // Add keypress effects
        input.addEventListener('keypress', (e) => {
            createRipple(e, input);
            createParticles(input);
        });
    });
    
    // Enhanced form submission animation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = loginForm.querySelector('.enter-btn');
        const originalText = button.textContent;
        
        // Loading animation
        button.style.width = button.offsetWidth + 'px';
        button.textContent = '•••';
        button.style.transform = 'scale(0.95)';
        button.disabled = true;
        
        // Create burst effect
        createBurst(button);
        
        setTimeout(() => {
            // Success animation
            button.style.background = '#00a2ff';
            button.textContent = '✓';
            button.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                // Reset button
                button.style.transform = 'scale(1)';
                button.style.background = 'transparent';
                button.textContent = originalText;
                button.disabled = false;
                
                // Add your login logic here
                console.log('Login attempted');
            }, 1000);
        }, 1500);
    });
    
    // Enhanced hover effects
    document.querySelectorAll('.signup-btn, .enter-btn').forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.transform = 'translateY(-2px)';
            backgroundImage.style.filter = 'brightness(1.1)';
            createHoverParticles(element);
        });
        
        element.addEventListener('mouseout', () => {
            element.style.transform = 'translateY(0)';
            backgroundImage.style.filter = 'brightness(1)';
        });
        
        element.addEventListener('click', (e) => {
            createRipple(e, element);
            createBurst(element);
        });
    });
    
    // Particle effect function
    function createParticles(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#00a2ff';
            particle.style.borderRadius = '50%';
            particle.style.left = `${rect.left + Math.random() * rect.width}px`;
            particle.style.top = `${rect.top + rect.height}px`;
            particle.style.pointerEvents = 'none';
            document.body.appendChild(particle);
            
            const animation = particle.animate([
                { transform: 'translateY(0) scale(1)', opacity: 1 },
                { transform: `translateY(-${20 + Math.random() * 30}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }
    
    // Hover particles effect
    function createHoverParticles(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = '#00a2ff';
            particle.style.borderRadius = '50%';
            particle.style.left = `${rect.left + Math.random() * rect.width}px`;
            particle.style.top = `${rect.top + Math.random() * rect.height}px`;
            particle.style.pointerEvents = 'none';
            document.body.appendChild(particle);
            
            const animation = particle.animate([
                { transform: 'scale(1)', opacity: 1 },
                { transform: `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }
    
    // Ripple effect function
    function createRipple(e, element) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.background = 'rgba(0, 162, 255, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.left = `${e.clientX - rect.left - 50}px`;
        ripple.style.top = `${e.clientY - rect.top - 50}px`;
        ripple.style.animation = 'ripple 0.8s linear';
        ripple.style.pointerEvents = 'none';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 800);
    }
    
    // Burst effect function
    function createBurst(element) {
        const rect = element.getBoundingClientRect();
        const colors = ['#00a2ff', '#ffffff', '#0066cc'];
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.left = `${rect.left + rect.width / 2}px`;
            particle.style.top = `${rect.top + rect.height / 2}px`;
            particle.style.pointerEvents = 'none';
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 10;
            const velocity = 10 + Math.random() * 10;
            const animation = particle.animate([
                { transform: 'scale(1) translate(0, 0)', opacity: 1 },
                {
                    transform: `scale(0) translate(${Math.cos(angle) * velocity * 10}px, ${Math.sin(angle) * velocity * 10}px)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }
    
    // Add keyframe animation for ripple effect
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});