from flask import Blueprint, jsonify
from models import Profile, Domains
from flask_jwt_extended import jwt_required, get_jwt_identity
import json

domains_bp = Blueprint('domains',__name__,url_prefix="/api/v1/domains")

@domains_bp.route("/list",methods=["GET"])
@jwt_required()
def list_dom():
 id=json.loads(get_jwt_identity())
 id=id["id"]

 profile=Profile.query.get(id)
 if not profile:
   return jsonify({"success": False, "msg": "unauthorized access"}), 401

 if not profile.verified:
   return jsonify({"success": False, "msg": "verify your account"}), 401

 domains=Domains.query.order_by(Domains.id).all()
 output=[{"id": d.id, "name": d.name} for d in domains]

 return jsonify({"success": True, "msg": "domains", "data":output}), 200
