from flask import Blueprint, request, jsonify
from utils.validators import valid_pass
from flask_jwt_extended import jwt_required, get_jwt_identity
from extension import db
from models import Auth
from utils.password import hash_password, verify_password
import json

profile_bp = Blueprint('profile',__name__,url_prefix="/api/v1/profile")

@profile_bp.route("/username", methods=["POST"])
def username():
 try:
  data=request.json
  name=data["username"]
 except Exception as e:
  return "missing parameters"

 return "username changed"

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


