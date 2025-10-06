from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/login')
def home():
    return render_template('login.html')

@app.route('/dashboard')
def dashbaord():
    return render_template('dashboard.html')

@app.route('/addemployee')
def add_employee():
    return render_template('add_employe.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

if __name__ == '__main__':
    app.run(debug=True)



