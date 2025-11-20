from flask import Blueprint, request, jsonify
import json, uuid
from utils.validators import valid_mobile, valid_email, valid_pass
from models import Auth
from extension import db
from utils.password import hash_password, verify_password
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

 user=Auth.query.filter_by(email=email).first()
 if user:
  return "email is already registered"
 id=str(uuid.uuid4())
 user=Auth(
  id=id[:15],
  f_name=f_name,
  l_name=l_name,
  mobile=mobile,
  email=email,
  password=hash_password(password)
 )
 try:
  db.session.add(user)
  db.session.commit()
  return "Account created successfully"
 except Exception as e:
  return "something went wrong during signup"


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

 user=Auth.query.filter_by(email=email).first()
 if not user:
  return "invalid email or password"
 elif not verify_password(password, user.password):
  return "invalid email or password"

 return "logged in"

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

