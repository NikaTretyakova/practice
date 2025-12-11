from flask import Flask, render_template, request, redirect, url_for
import csv
import os
from datetime import datetime

app = Flask(__name__)

# Создаем папку для данных, если её нет
if not os.path.exists('data'):
    os.makedirs('data')

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
    
    # Сохраняем данные в CSV файл
    with open('data/enrollments.csv', 'a', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['timestamp', 'fullname', 'phone', 'email', 'course']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        # Записываем заголовки, если файл пустой
        if csvfile.tell() == 0:
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