from flask import Blueprint, request, jsonify
import json
from utils.validators import valid_mobile, valid_email, valid_pass
auth_bp=Blueprint('auth',__name__,url_prefix="/api/v1")

@auth_bp.route("/signup",methods=["POST"])
def signup():
 try:
  data=request.json
  email=data["email"]
  mobile=data["mobile"]
  password=data["password"]
  f_name=data["f_name"].strip()
  l_name=data["l_name"].strip()
 except Exception as e:
   return "missing input values"

 if not valid_mobile(mobile):
   return "invalid mobile format"

 if not valid_email(email):
   return "Invalid email format"

 if not valid_pass(password):
   return "invalid password"

 if len(f_name) < 3 or len(l_name) < 3:
   return "first name and last name should be more than 2 characters"
 return "signup"

@auth_bp.route("/login",methods=["POST"])
def login():
 try:
  data=request.json
  email=data["email"]
  password=data["password"]
 except Exception as e:
   return "missing input values"

 if not valid_email(email):
   return "Invalid email format"

 if not valid_pass(password):
   return "invalid password"

 return "login"

@auth_bp.route("/state",methods=["GET"])
def state():
 return "logged in"

@auth_bp.route("/forgot",methods=["POST"])
def forgot():
 try:
  data=request.json
  email=data["email"]
  mobile=data["mobile"]
 except Exception as e:
   return "missing input values"

 if not valid_email(email):
   return "Invalid email format"

 if not valid_mobile(mobile):
   return "invalid mobile format"

 return "email sent"

