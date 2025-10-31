from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

import sqlite3

# Initialize Flask app
app = Flask(__name__)

# Configure the database (using SQLite for simplicity)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///employe.db"   # Path

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False    # Suppress warning and enables resource optimization by disabling modification tracking 

# Initialize SQLAlchemy
db = SQLAlchemy(app)

class Employee(db.Model):    # Inheriting from db.Model which is a base class for all models in SQLAlchemy.  If i dont do this, SQLAlchemy wont recognise it as a database and then it wont create a table for it.
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique= True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'Employee {self.username, self.email, self.password}'




def get_employe():
    return Employee.query.all()                          # Return the fetched employee records



@app.route('/', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        if email and password:                      # Return the add_employee dashboard once the email and password tab is filled
            
            return redirect("/add_employee")
        else:
            return render_template('/add_employee')
        
    return render_template('signup.html')



@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/add_employee')
def add_employee():
    return render_template('add_employee.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route("/Logout")
def logout():
    return redirect("/login")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

