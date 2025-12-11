// Открытие модального окна при нажатии на кнопку записи
document.addEventListener('DOMContentLoaded', function() {
    const enrollButtons = document.querySelectorAll('.btn-enroll');
    const modal = document.getElementById('enrollmentModal');
    const closeModal = document.querySelector('.close-modal');
    const courseInput = document.getElementById('course');
    
    // Обработка кликов по кнопкам записи
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseName = this.getAttribute('data-course');
            courseInput.value = courseName;
            modal.style.display = 'flex';
        });
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Закрытие при клике вне модального окна
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Обработка отправки формы
    const enrollmentForm = document.getElementById('enrollmentForm');
    enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь можно добавить валидацию данных перед отправкой
        
        // Отправка данных на сервер
        const formData = new FormData(this);
        
        fetch(this.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Перенаправление на страницу успеха или сообщение
                window.location.href = '/success';
            } else {
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});