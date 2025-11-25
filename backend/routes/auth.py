from flask import Blueprint, request, jsonify, make_response
import json, uuid
from utils.validators import valid_mobile, valid_email, valid_pass
from models import Auth, Profile
from extension import db
from utils.password import hash_password, verify_password
from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required, get_jwt_identity

auth_bp=Blueprint('auth',__name__,url_prefix="/api/v1")

#signup code block
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
   return jsonify({"success": False, "msg": "missing input values"}), 400

 if not valid_mobile(mobile):
   return jsonify({"success": False, "msg": "invalid mobile format"}), 400

 if not valid_email(email):
   return jsonify({"success": False, "msg": "invalid email format"}), 400

 if not valid_pass(password):
   return jsonify({"success": False, "msg": "invalid password format"}), 400

 if len(f_name) < 3 or len(l_name) < 3:
   return jsonify({"success": False, "msg": "first name and last name should be more than 2 characters"}), 400

 user=Auth.query.filter_by(email=email).first()
 if user:
  return jsonify({"success": False, "msg": "email is already registered"}), 400
 id=str(uuid.uuid4())
 user=Auth(
  id=id[:15],
  f_name=f_name,
  l_name=l_name,
  mobile=mobile,
  email=email,
  password=hash_password(password)
 )

 profile=Profile(
  id=id[:15],
  username=email,
  gender="m",
  country="India",
  pin="582102",
  edu="g",
  dob="2000-01-01"
 )
 try:
  db.session.add(user)
  db.session.add(profile)
  db.session.commit()
  return jsonify({"success": True, "msg": "account created successfully"}), 201
 except Exception as e:
  return jsonify({"success": False, "msg": "something went wrong during signup"}), 500


#login code block
@auth_bp.route("/login",methods=["POST"])
def login():
 try:
  data=request.json
  email=data["email"]
  password=data["password"]
 except Exception as e:
   return jsonify({"success": False, "msg": "missing input values"}), 400

 if not valid_email(email):
   return jsonify({"success": False, "msg": "invalid email format"}), 400

 if not valid_pass(password):
   return jsonify({"success": False, "msg": "invalid password format"}), 400

 user=Auth.query.filter_by(email=email).first()
 if not user:
  return jsonify({"success": False, "msg": "incorrect email or password"}), 400
 elif not verify_password(password, user.password):
  return jsonify({"success": False, "msg": "incorrect email or password"}), 400

 data=json.dumps({"id":user.id})
 access_token = create_access_token(data)
 response = make_response(jsonify({"success":True,"msg": "Login successful"}), 200)

 set_access_cookies(response, access_token)
 return response

#login state API
@auth_bp.route("/state",methods=["GET"])
@jwt_required()
def state():
 token=get_jwt_identity()
 token=json.loads(token)
 user = Auth.query.get(token["id"])
 if not user:
  return jsonify({"success": False, "msg": "unauthorized access"}), 401
 return jsonify({"success": True, "msg": "logged in"}), 200

#forgot password flow
@auth_bp.route("/forgot",methods=["POST"])
def forgot():
 try:
  data=request.json
  email=data["email"]
  mobile=data["mobile"]
 except Exception as e:
   return jsonify({"success": False, "msg": "missing input values"}), 400

 if not valid_email(email):
   return jsonify({"success": False, "msg": "invalid email format"}), 400

 if not valid_mobile(mobile):
   return jsonify({"success": False, "msg": "invalid mobile format"}), 400

 user = Auth.query.filter_by(email=email, mobile=mobile).first()
 if not user:
  return jsonify({"success": False, "msg": "account not found"}), 400
 return jsonify({"success": True, "msg": "recovery email sent"}), 200

