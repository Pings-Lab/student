from flask import jsonify, Blueprint, request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
from models import Profile, Alerts, Project, Domains
from utils.id_gen import gen_id
from extension import db
project_bp=Blueprint("projectss",__name__,url_prefix="/api/v1/project")

@project_bp.route("/myprojects",methods=["GET"])
@jwt_required()
def my_projects():
 id=json.loads(get_jwt_identity())
 id=id["id"]
 profile=Profile.query.get(id)
 if not profile:
  return jsonify({"success": False, "msg":"unauthorized access"}), 401


 projects=Project.query.filter(Project.creator_id==id).order_by(Project.createdate.desc()).all()
 if not projects:
  return jsonify({"success": False, "msg": "You have not created or joined any projects"}), 400

 output=[]
 for i in projects:
   dom=Domains.query.get(i.domain).first()
   a={"id": i.pro_id, "name":i.name, "summary": i.summary, "created": i.createdate.strftime("%H:%M, %d-%m-%Y"), "type": i.type, "status": i.status, "domain": dom.domain, "type":dom.type}
   output.append(a)

 return jsonify({"success": True, "message": "alerts", "data": output}), 200

@project_bp.route("/create",methods=["POST"])
@jwt_required()
def create_pro():
 id=json.loads(get_jwt_identity())
 id=id["id"]
 profile=Profile.query.get(id)
 if not profile:
  return jsonify({"success": False, "msg":"unauthorized access"}), 401

 try:
  data=request.json
  name=data["name"].strip()
  domain=data["domain"].strip()
  summary=data["summary"].strip()
  type=data["type"].strip()

  if len(name) > 30:
   return jsonify({"success": False, "msg": "project name should be within 30 characters"}), 400
  if len(domain)==5:
    dom=Domains.query.get(domain)
    if not dom:
     return jsonify({"success": False, "msg": "invalid request"}), 400
  else:
    return jsonify({"success": False, "msg": "invalid request"}), 400
  if len(summary) > 150:
    return jsonify({"success": False, "msg": "project summary should be within 150 characters"}), 400
  if type != 'public' and type != 'private':
    return jsonify({"success": False, "msg": "project should be either private or public"}), 400

  project=Project(
  pro_id=gen_id(20),
  creator_id=id,
  name=name,
  domain=domain,
  summary=summary,
  type=type
  )

  alert=Alerts(
  alert_id=gen_id(20),
  message=f"You have created a new {type} project.",
  uid=id
  )
  db.session.add(project)
  db.session.add(alert)
  db.session.commit()
  return jsonify({"success": True, "msg": "Project Created Successfully"}), 201
 except Exception as e:
  current_app.logger.error(f"Failed: {e} | '/projects/create'")
  return jsonify({"success": False, "msg": "something went wrong"}), 500
