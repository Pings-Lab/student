from flask import Blueprint, request, jsonify
from utils.validators import valid_pass, valid_mobile
from flask_jwt_extended import jwt_required, get_jwt_identity
from extension import db
from models import Auth, Profile
from utils.password import hash_password, verify_password
import json
from datetime import datetime

profile_bp = Blueprint('profile',__name__,url_prefix="/api/v1/profile")

# Username change API
@profile_bp.route("/username", methods=["POST"])
@jwt_required()
def username():
 token=get_jwt_identity()
 token=json.loads(token)

 profile=Profile.query.get(token["id"])
 if not profile:
  return jsonify({"success": False, "msg": "unauthorized access"}), 401
 try:
  data=request.json
  name=data["username"].strip()
 except Exception as e:
  return jsonify({"success": False, "msg": "missing input parameters"}), 400

 if len(name) < 3 or len(name) >20:
   return jsonify({"success": False, "msg": "username should be less than 20 chars and more than 3 chars."}), 400

 if profile.username == name:
   return jsonify({"success": False, "msg": "this is your current username"}), 400
 names=Profile.query.filter_by(username=name).first()
 if names:
  return jsonify({"success": False, "msg": "username is already taken"}), 400

 try:
  profile.username = name
  db.session.commit()
  return jsonify({"success": True, "msg": "username changed"}), 200
 except Exception as e:
  return jsonify({"success": False, "msg": "something went wrong"}), 400

# Password change API
@profile_bp.route("/password", methods=["POST"])
@jwt_required()
def password():
 id=get_jwt_identity()
 id=json.loads(id)
 id=id["id"]

 user = Auth.query.get(id)
 if not user:
  return jsonify({"success": False, "msg": "unauthorized access"}), 401
 try:
  data=request.json
  old_pass=data["current_pass"].strip()
  new_pass=data["new_pass"].strip()
 except Exception as e:
  return jsonify({"success": False, "msg": "missing parameters"}), 400

 if not valid_pass(new_pass):
  return jsonify({"success": False, "msg": "weak password"}), 400

 if not verify_password(old_pass, user.password):
  return jsonify({"success": False, "msg": "incorrect password"}), 400

 if old_pass==new_pass:
  return jsonify({"success": False, "msg": "new password cannot old password"}), 400

 try:
  user.password = hash_password(new_pass)
  db.session.commit()
  return jsonify({"success": True, "msg": "password changed"}), 200
 except Exception as e:
  return jsonify({"success": False, "msg": "something went wrong"}), 500

# Info change API
@profile_bp.route("/info", methods=["POST"])
@jwt_required()
def info():
 id=get_jwt_identity()
 id=json.loads(id)
 id=id["id"]

 user = Auth.query.get(id)
 if not user:
  return jsonify({"success": False, "msg": "unauthorized access"}), 401

 profile = Profile.query.get(id)
 if not profile:
  return jsonify({"success": False, "msg": "unauthorized access"}), 401

 if profile.verified != True:
  return jsonify({"success": False, "msg": "Account not verified"}), 400
 try:
  data=request.json
  mobile=data["mobile"].strip()
  edu=data["edu"].strip()
  pin=data["pin"].strip()
  dob=data["dob"].strip()
  gender=data["gender"].strip()
 except Exception as e:
  return jsonify({"success": False, "msg": "missing parameters"}), 400

 try:
    dob_date = datetime.strptime(dob, "%Y-%m-%d")
 except ValueError:
    return jsonify({"success": False, "msg": "invalid date format"}), 400

 min_date = datetime.strptime("1995-01-01", "%Y-%m-%d")
 max_date = datetime.strptime("2007-01-01", "%Y-%m-%d")

 if len(edu) < 4 or len(edu) > 60:
  return jsonify({"success": False, "msg": "invalid university name"}), 400

 if len(pin) != 6:
  return jsonify({"success": False, "msg": "invalid pin"}), 400

 if not (min_date <= dob_date <= max_date):
  return jsonify({"success": False, "msg": "you are not eligible for this internship"}), 400

 gen="mftl"
 if gender not in gen:
  return jsonify({"success": False, "msg": "invalid gender identity"}), 400

 if not valid_mobile(mobile):
  return jsonify({"success": False, "msg": "invalid mobile format"}), 400
 try:
  profile.edu = edu
  profile.pin = pin
  profile.dob = dob_date
  profile.gender = gender
  user.mobile = mobile
  db.session.commit()
  return jsonify({"success": True, "msg": "profile updated"}), 201
 except Exception as e:
  print(e)
  return jsonify({"success": False, "msg": "something went wrong"}), 400

#get otp
@profile_bp.route("/verify", methods=["GET"])
@jwt_required()
def send_otp():
 id=json.loads(get_jwt_identity())
 id=id["id"]

 profile = Profile.query.get(id)
 if not profile:
  return jsonify({"success": False, "msg": "unauthorized access"}), 401

 if profile.verified == True:
  return jsonify({"success": True, "msg": "Account already verified"}), 200

 return jsonify({"success":True, "msg":"otp sent"}), 200

#send otp
@profile_bp.route("/verify", methods=["POST"])
@jwt_required()
def verify():
 id=json.loads(get_jwt_identity())
 id=id["id"]

 profile = Profile.query.get(id)
 if not profile:
  return jsonify({"success": False, "msg": "unauthorized access"}), 401

 if profile.verified == True:
  return jsonify({"success": True, "msg": "Account already verified"}), 200

 profile.verified = True
 db.session.commit()
 return jsonify({"success":True, "msg":"account verified"}), 200

#get profile info
@profile_bp.route("/info", methods=["GET"])
@jwt_required()
def get_info():
 id=json.loads(get_jwt_identity())
 id=id["id"]

 profile = Profile.query.get(id)
 if not profile:
  return jsonify({"success": False, "msg": "unauthorized access"}), 401

 if profile.verified != True:
  return jsonify({"success": False, "msg": "Account not verified"}), 400

 auth=Auth.query.get(id)
 created = auth.created.strftime("%Y-%m-%d")
 dob = profile.dob.strftime("%Y-%m-%d")
 infobox={"l_name": auth.l_name, "f_name": auth.f_name,"username": profile.username, "gender": profile.gender, "country": profile.country, "dob": dob, "verified": profile.verified, "edu": profile.edu, "mobile": auth.mobile, "email": auth.email, "created": created, "pin": profile.pin}
 return jsonify({"success": True, "message": "user data", "data": infobox}), 200

@profile_bp.route("/people", methods=["GET"])
@jwt_required()
def list_ppl():
 id=json.loads(get_jwt_identity())
 id=id["id"]

 profile = Profile.query.get(id)
 if not profile:
  return jsonify({"success": False, "msg": "unauthorized access"}), 401

 if profile.verified != True:
  return jsonify({"success": False, "msg": "Account not verified"}), 400

 ppl = db.session.query(Profile).filter(Profile.id != id).all()

 output=[]
 for d in ppl:
  pacc=Auth.query.get(d.id)
  temp={ "username": d.username, "gender": d.gender, "country": d.country, "verified": d.verified, "name": f"{pacc.f_name} {pacc.l_name}", "joined": pacc.created.strftime("%Y-%m-%d")}
  output.append(temp)

 return jsonify({"success": True, "msg": "users list", "data": output}), 200
