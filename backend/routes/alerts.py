from flask import jsonify, Blueprint, request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
from models import Profile, Alerts
from extension import db
alert_bp=Blueprint("alerts",__name__,url_prefix="/api/v1/alerts")

@alert_bp.route("/all",methods=["GET"])
@jwt_required()
def view_alerts():
 id=json.loads(get_jwt_identity())
 id=id["id"]
 profile=Profile.query.get(id)
 if not profile:
  return jsonify({"success": False, "msg":"unauthorized access"}), 401


 alerts=Alerts.query.filter_by(uid=id).order_by(Alerts.recdate.desc()).all()
 if not alerts:
  return jsonify({"success": False, "msg": "no alerts"}), 400

 output=[]
 new =0
 for i in alerts:
  if i.read == False:
   new+=1
  a={"id": i.alert_id, "message":i.message, "read": i.read, "recdate": i.recdate.strftime("%H:%M, %d-%m-%Y")}
  output.append(a)

 return jsonify({"success": True, "message": "alerts", "data": output, "new": new}), 200

@alert_bp.route("/read",methods=["PUT"])
@jwt_required()
def mark_read():
 id=json.loads(get_jwt_identity())
 id=id["id"]
 profile=Profile.query.get(id)
 if not profile:
  return jsonify({"success": False, "msg":"unauthorized access"}), 401

 try:
  data=request.json
  aid=data["id"].strip()

  if len(aid) == 20:
   alert=Alerts.query.get(aid)
   if not alert:
    return jsonify({"success": False, "msg": "invalid request"}), 400
   elif alert.read == True:
    return jsonify({"success": False, "msg": "invalid request"}), 400
   else:
      alert.read = True
      db.session.commit()
      return jsonify({"success": True, "msg": "message marked as read"}), 201
  else:
    return jsonify({"success": False, "msg": "invalid request"}), 400

  return jsonify({"success": False, "msg": "something went wrong"}), 500
 except Exception as e:
  current_app.logger.error(f"Failed: {e} | '/alerts/read'")
  return jsonify({"success": False, "msg": "something went wrong"}), 500
