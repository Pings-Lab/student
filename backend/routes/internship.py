from flask import jsonify, Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import json, uuid
from models import Profile, Internship, Domains
from extension import db
intern_bp=Blueprint("intern",__name__,url_prefix="/api/v1/internship")

@intern_bp.route("/list",methods=["GET"])
@jwt_required()
def view_applied():
 id=json.loads(get_jwt_identity())
 id=id["id"]
 profile=Profile.query.get(id)
 if not profile:
  return jsonify({"success": False, "msg":"unauthorized access"}), 401

 if profile.verified != True:
  return jsonify({"success": False, "msg": "Account not verified"}), 400

 interns=Internship.query.filter_by(uid=id).all()
 if not interns:
  return jsonify({"success": False, "msg": "not applied for any internship"}), 400

 output=[]
 for i in interns:
  domain=Domains.query.get(i.cid)
  a={"id": i.iid, "domain":domain.name, "stack": i.stack, "duration": i.duration, "status": i.status }
  output.append(a)

 return jsonify({"success": True, "message": "internships", "list": output}), 200


@intern_bp.route("/apply",methods=["POST"])
@jwt_required()
def apply_intern():
 id=json.loads(get_jwt_identity())
 id=id["id"]
 profile=Profile.query.get(id)
 if not profile:
  return jsonify({"success": False, "msg":"unauthorized access"}), 401

 if profile.verified != True:
  return jsonify({"success": False, "msg": "Account not verified"}), 400
 try:
  data=request.json
  cid=data["domain"].strip()
 except Exception as e:
  return jsonify({"success": False, "msg":f"missing input parameters {e}"}), 401

 interns=Internship.query.filter_by(uid=id).all()

 if interns:
  for i in interns:
   if cid==i.cid:
     return jsonify({"success": False, "msg":"you have already enrolled for this internship"}), 401

 domain=Domains.query.get(cid)
 if not domain:
  return jsonify({"success": False, "msg":"invalid internship name"}), 401

 iid=str(uuid.uuid4())
 new=Internship(
  iid=iid[:20],
  cid=cid,
  uid=id,
 )

 try:
  db.session.add(new)
  db.session.commit()
  return jsonify({"success": True, "msg":"applied to internship successfully"}), 201
 except Exception as e:
  return jsonify({"success": False, "msg": f"something went wrong {e}"}), 500
