import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from config import Config
from extension import db, jwt
import logging
from logging.handlers import RotatingFileHandler

from routes.auth import auth_bp
from routes.profile import profile_bp
from routes.domains import domains_bp
from routes.internship import intern_bp
from routes.alerts import alert_bp

load_dotenv()
def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(app, supports_credentials=True, origins=[os.getenv("TARGET")])
    app.config.from_object(config_class)

    handler = RotatingFileHandler(
    "app.log",
    maxBytes=5*1024*1024,  # 5 MB per file
    backupCount=5          # keep last 5 logs
   )
    handler.setLevel(logging.ERROR)

    app.logger.addHandler(handler)

    db.init_app(app)
    jwt.init_app(app)

    with app.app_context():
        db.create_all()

    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(domains_bp)
    app.register_blueprint(intern_bp)
    app.register_blueprint(alert_bp)

    return app

if __name__=="__main__":
   host=os.getenv("HOST")
   port=os.getenv("PORT")
   debug=True if os.getenv("DEBUG")=="1" else False
   app = create_app()
   app.run(debug=debug, host=host, port=port)
