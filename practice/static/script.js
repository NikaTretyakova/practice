// Основная инициализация
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initModal();
    initEnrollmentButtons();
    initForm();
    initAnimations();
    initScrollEffects();
});

// Мобильное меню
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('mainNav');
    
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Закрытие при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileBtn.querySelector('i').classList.remove('fa-times');
                mobileBtn.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = 'auto';
            });
        });
    }
}

// Модальное окно
function initModal() {
    const modal = document.getElementById('enrollmentModal');
    const closeBtn = document.querySelector('.modal-close');
    const courseInput = document.getElementById('course');
    
    if (!modal || !closeBtn || !courseInput) return;
    
    // Открытие
    document.querySelectorAll('.enroll-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const course = this.getAttribute('data-course');
            if (course) {
                courseInput.value = course;
                showModal();
            }
        });
    });
    
    // Закрытие
    closeBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') hideModal();
    });
    
    function showModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Анимация
        modal.style.animation = 'none';
        setTimeout(() => {
            modal.style.animation = 'fadeIn 0.3s ease';
        }, 10);
    }
    
    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Кнопки записи
function initEnrollmentButtons() {
    const buttons = document.querySelectorAll('.enroll-button, .button-primary');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 15px 35px rgba(33, 150, 243, 0.4)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Форма - упрощенная версия (без AJAX)
function initForm() {
    const form = document.getElementById('enrollmentForm');
    const phoneInput = document.getElementById('phone');
    
    if (!form || !phoneInput) return;
    
    // Маска телефона
    phoneInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.startsWith('7') || value.startsWith('8')) {
                value = '7' + value.substring(1);
            } else {
                value = '7' + value;
            }
            
            // Форматирование
            let formatted = '+7';
            if (value.length > 1) formatted += ' (' + value.substring(1, 4);
            if (value.length >= 4) formatted += ') ' + value.substring(4, 7);
            if (value.length >= 7) formatted += '-' + value.substring(7, 9);
            if (value.length >= 9) formatted += '-' + value.substring(9, 11);
            
            this.value = formatted.substring(0, 18);
        }
    });
    
    // Валидация перед отправкой
    form.addEventListener('submit', function(e) {
        const fullname = document.getElementById('fullname').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const course = document.getElementById('course').value.trim();
        
        let isValid = true;
        let message = '';
        
        if (!fullname || fullname.split(' ').length < 2) {
            isValid = false;
            message = 'Введите полное ФИО (фамилия, имя, отчество)';
        } else if (!/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(phone)) {
            isValid = false;
            message = 'Введите корректный номер телефона в формате: +7 (999) 123-45-67';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            isValid = false;
            message = 'Введите корректный email адрес';
        } else if (!course) {
            isValid = false;
            message = 'Выберите курс';
        }
        
        if (!isValid) {
            e.preventDefault(); // Останавливаем отправку
            showNotification(message, 'error');
            return false;
        }
        
        // Если все валидно, форма отправится обычным образом
        // Flask обработает её и сделает редирект на /success
    });
}

// Анимации
function initAnimations() {
    // Анимация появления элементов при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Наблюдаем за элементами
    document.querySelectorAll('.course-card, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Анимация шапки
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(33, 150, 243, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(33, 150, 243, 0.1)';
        }
    });
}

// Эффекты скролла
function initScrollEffects() {
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#enrollmentModal') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Обновление активной ссылки при скролле
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
}

// Уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Стили
    Object.assign(notification.style, {
        position: 'fixed',
        top: '30px',
        right: '30px',
        background: type === 'error' ? '#FF5252' : '#4CAF50',
        color: 'white',
        padding: '20px 25px',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        zIndex: '3000',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        maxWidth: '400px',
        transform: 'translateX(150%)',
        transition: 'transform 0.5s ease'
    });
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Авто-закрытие
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Добавляем стили для уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .course-card, .feature-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .button:hover {
        transform: translateY(-3px) !important;
    }
    
    .enroll-button:hover, .submit-button:hover {
        transform: translateY(-2px) !important;
    }
    
    .footer-link:hover {
        transform: translateX(5px) !important;
    }
    
    .social-link:hover {
        transform: translateY(-3px) rotate(5deg) !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1rem;
        font-weight: 500;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);