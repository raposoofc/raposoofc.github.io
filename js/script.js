// Dados e configurações
const portfolioData = {
    skills: {
        frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Styled Components'],
        backend: ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'MongoDB', 'Prisma', 'REST APIs', 'GraphQL'],
        tools: ['Git', 'GitHub', 'Figma', 'VS Code', 'Vercel', 'AWS', 'Jest', 'Docker']
    },
    projects: [
        {
            title: 'E-commerce Platform',
            description: 'Plataforma completa de e-commerce com painel administrativo, sistema de pagamento e gestão de estoque.',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
            liveUrl: '#',
            githubUrl: '#'
        },
        {
            title: 'Task Management App',
            description: 'Aplicativo de gerenciamento de tarefas com colaboração em tempo real e notificações.',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
            technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
            liveUrl: '#',
            githubUrl: '#'
        }
    ]
};

// Variáveis globais
let isMenuOpen = false;
let isScrolling = false;

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
        
        // Fechar menu mobile se estiver aberto
        if (isMenuOpen) {
            toggleMobileMenu();
        }
        
        // Atualizar o link ativo após o scroll
        setTimeout(() => updateActiveNavLink(), 500); // Ajuste após o scroll terminar
    }
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileNav.classList.add('active');
        mobileMenuBtn.innerHTML = '✕';
    } else {
        mobileNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '☰';
    }
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.style.backgroundColor = 'rgba(38, 70, 83, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.backgroundColor = 'rgba(38, 70, 83, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
}

// Active navigation link
function updateActiveNavLink() {
    const sections = ['inicio', 'sobre', 'habilidades', 'projetos', 'experiencia', 'contato'];
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Form handling with EmailJS
function handleContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validação básica
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Por favor, insira um email válido.', 'error');
            return;
        }
        
        // Envio com EmailJS
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        emailjs.send('service_kalwx5d', 'template_3vioc2s', {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message
        }, 'S3dfzq_1HZT3lkoa0')
            .then(() => {
                showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            })
            .catch((error) => {
                showNotification('Erro ao enviar a mensagem. Tente novamente mais tarde.', 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                console.error('Erro no envio do e-mail:', error);
            });
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                if (entry.target.classList.contains('progress-item')) {
                    const progressFill = entry.target.querySelector('.progress-fill');
                    if (progressFill) {
                        const width = progressFill.style.width;
                        progressFill.style.width = '0%';
                        setTimeout(() => {
                            progressFill.style.width = width;
                        }, 200);
                    }
                }
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.card, .project-card, .timeline-item, .progress-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Typing effect for hero section
function setupTypingEffect() {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Parallax effect for hero section
function setupParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image-container');
    
    if (!heroSection || !heroImage) return;
    
    const parallaxScroll = throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled <= window.innerHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    }, 10);
    
    window.addEventListener('scroll', parallaxScroll);
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s';
        imageObserver.observe(img);
    });
}

// Project card interactions
function setupProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth reveal for sections
function setupSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
}

// Preloader
function setupPreloader() {
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }
    });
}

// Event listeners
function setupEventListeners() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            updateActiveNavLink(); // Atualiza o link ativo ao clicar
        });
    });
    
    window.addEventListener('scroll', throttle(() => {
        handleHeaderScroll();
        updateActiveNavLink(); // Atualiza o link ativo ao rolar
    }, 10));
    
    window.addEventListener('resize', debounce(() => {
        if (isMenuOpen && window.innerWidth > 768) {
            toggleMobileMenu();
        }
    }, 250));
    
    document.addEventListener('click', (e) => {
        const mobileNav = document.getElementById('mobileNav');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (isMenuOpen && !mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMobileMenu();
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    emailjs.init('S3dfzq_1HZT3lkoa0'); // Substitua pela sua Public Key
    setupEventListeners();
    handleContactForm();
    setupScrollAnimations();
    setupTypingEffect();
    setupParallaxEffect();
    setupLazyLoading();
    setupProjectInteractions();
    setupSectionReveal();
    setupPreloader();
    
    window.scrollToSection = scrollToSection;
    
    console.log('🚀 Portfólio carregado com sucesso!');
});

window.scrollToSection = scrollToSection;
window.toggleMobileMenu = toggleMobileMenu;

// Service Worker registration (opcional, para PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking (exemplo)
function trackEvent(category, action, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Performance monitoring
function logPerformance() {
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
}

window.addEventListener('load', logPerformance);