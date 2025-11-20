from flask import Blueprint, request
from utils.validators import valid_pass
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
def password():
 try:
  data=request.json
  old_pass=data["current_pass"].strip()
  new_pass=data["new_pass"].strip()
 except exception as e:
  return "missing parameters"

 if not valid_pass(new_pass):
  return "invalid new password"

 return "password changed"


