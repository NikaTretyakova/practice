from flask import Flask, render_template, request, redirect, url_for
import csv
import os
from datetime import datetime


app = Flask(__name__)


# Создаем папки для данных и статических файлов
if not os.path.exists('data'):
    os.makedirs('data')
if not os.path.exists('static/images'):
    os.makedirs('static/images')


# Главная страница
@app.route('/')
def index():
    return render_template('index.html')


# Страница успешной записи
@app.route('/success')
def success():
    return render_template('success.html')


# Обработка формы записи
@app.route('/submit', methods=['POST'])
def submit_form():
    # Получаем данные из формы
    fullname = request.form.get('fullname')
    phone = request.form.get('phone')
    email = request.form.get('email')
    course = request.form.get('course')
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    # Проверка данных
    if not all([fullname, phone, email, course]):
        return "Ошибка: заполните все обязательные поля", 400
    
    # Сохраняем данные в CSV файл
    csv_file = 'data/enrollments.csv'
    file_exists = os.path.isfile(csv_file)
    
    with open(csv_file, 'a', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['timestamp', 'fullname', 'phone', 'email', 'course']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        # Записываем заголовки, если файл не существует
        if not file_exists:
            writer.writeheader()
        
        writer.writerow({
            'timestamp': timestamp,
            'fullname': fullname,
            'phone': phone,
            'email': email,
            'course': course
        })
    
    # Перенаправляем на страницу успеха
    return redirect(url_for('success'))


if __name__ == '__main__':
    app.run(debug=True, port=5000)
