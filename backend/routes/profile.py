from flask import Blueprint, request, jsonify
from utils.validators import valid_pass
from flask_jwt_extended import jwt_required, get_jwt_identity
from extension import db
from models import Auth, Profile
from utils.password import hash_password, verify_password
import json
from datetime import datetime

profile_bp = Blueprint('profile',__name__,url_prefix="/api/v1/profile")

@profile_bp.route("/username", methods=["POST"])
@jwt_required()
def username():
 token=get_jwt_identity()
 token=json.loads(token)

 profile=Profile.query.get(token["id"])
 if not profile:
  return jsonify({"success": False, "message": "unauthorized access"}), 401
 try:
  data=request.json
  name=data["username"].strip()
 except Exception as e:
  return jsonify({"success": False, "message": "missing input parameters"}), 400

 if len(name) < 3 or len(name) >20:
   return jsonify({"success": False, "message": "username should be less than 20 chars and more than 3 chars."}), 400

 if profile.username == name:
   return jsonify({"success": False, "message": "this is your current username"}), 400
 names=Profile.query.filter_by(username=name).first()
 if names:
  return jsonify({"success": False, "message": "username is already taken"}), 400

 try:
  profile.username = name
  db.session.commit()
  return jsonify({"success": True, "message": "username changed"}), 200
 except Exception as e:
  return jsonify({"success": False, "message": "something went wrong"}), 400

@profile_bp.route("/password", methods=["POST"])
@jwt_required()
def password():
 id=get_jwt_identity()
 id=json.loads(id)
 id=id["id"]

 user = Auth.query.get(id)
 if not user:
  return jsonify({"success": False, "message": "unauthorized access"}), 401
 try:
  data=request.json
  old_pass=data["current_pass"].strip()
  new_pass=data["new_pass"].strip()
 except Exception as e:
  return jsonify({"success": False, "message": "missing parameters"}), 400

 if not valid_pass(new_pass):
  return jsonify({"success": False, "message": "weak password"}), 400

 if not verify_password(old_pass, user.password):
  return jsonify({"success": False, "message": "incorrect password"}), 400

 if old_pass==new_pass:
  return jsonify({"success": False, "message": "new password cannot old password"}), 400

 try:
  user.password = hash_password(new_pass)
  db.session.commit()
  return jsonify({"success": True, "message": "password changed"}), 200
 except Exception as e:
  return jsonify({"success": False, "message": "something went wrong"}), 500


@profile_bp.route("/info", methods=["POST"])
@jwt_required()
def info():
 id=get_jwt_identity()
 id=json.loads(id)
 id=id["id"]

 user = Auth.query.get(id)
 if not user:
  return jsonify({"success": False, "message": "unauthorized access"}), 401
 try:
  data=request.json
  edu=data["edu"].strip()
  pin=data["pin"].strip()
  dob=data["dob"].strip()
  gender=data["gender"].strip()
 except Exception as e:
  return jsonify({"success": False, "message": "missing parameters"}), 400

 try:
    dob_date = datetime.strptime(dob, "%d-%m-%Y")
 except ValueError:
    return jsonify({"success": False, "message": "invalid date format"}), 400

 min_date = datetime.strptime("01-01-1995", "%d-%m-%Y")
 max_date = datetime.strptime("01-01-2007", "%d-%m-%Y")

 if len(edu) < 10 or len(edu) > 60:
  return jsonify({"success": False, "message": "invalid university name"}), 400

 if len(pin) != 6:
  return jsonify({"success": False, "message": "invalid pin"}), 400

 if not (min_date <= dob_date <= max_date):
  return jsonify({"success": False, "message": "you are not eligible for this internship"}), 400

 gen="mft"
 if gender not in gen:
  return jsonify({"success": False, "message": "invalid gender identity"}), 400
 try:
  profile=Profile.query.get(id)
  profile.edu = edu
  profile.pin = pin
  profile.dob = dob_date
  profile.gender = gender
  db.session.commit()
  return jsonify({"success": True, "message": "profile updated"}), 201
 except Exception as e:
  return jsonify({"success": False, "message": "something went wrong"}), 400
