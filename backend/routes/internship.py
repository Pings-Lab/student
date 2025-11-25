from flask import jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
from models import Profile, Internship, Domains
intern_bp=Blueprint("intern",__name__,url_prefix="/api/v1/internship")

@intern_bp.route("/list",methods=["GET"])
@jwt_required()
def view_applied():
 id=json.loads(get_jwt_identity())
 id=id["id"]
 profile=Profile.query.get(id)
 if not profile:
  return jsonify({"success": False, "msg":"unauthorized access"}), 401

 interns=Internship.query.filter_by(uid=id).all()
 if not interns:
  return jsonify({"success": False, "msg": "not applied for any internship"}), 400

 output=[]
 for i in interns:
  domain=Domains.query.get(i.cid)
  a={"id": i.iid, "domain":domain.name, "stack": i.stack, "duration": i.duration, "status": i.status }
  output.append(a)

 return jsonify({"success": True, "message": "internships", "list": output}), 200
