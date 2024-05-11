from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

# Kết nối đến cơ sở dữ liệu
mydb = mysql.connector.connect(
    host="localhost",
    user="username",  # Thay username bằng username của bạn
    password="password",  # Thay password bằng password của bạn
    database="ten_csdl"  # Thay ten_csdl bằng tên cơ sở dữ liệu của bạn
)

@app.route('/get_menu_items')
def get_menu_items():
    cursor = mydb.cursor()
    cursor.execute("SELECT name, price FROM menu_items")
    rows = cursor.fetchall()
    menu_items = []
    for row in rows:
        menu_items.append({'name': row[0], 'price': float(row[1])})
    return jsonify(menu_items)

if __name__ == '__main__':
    app.run(debug=True)
