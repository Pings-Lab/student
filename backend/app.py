import os
from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
import logging
from logging.handlers import RotatingFileHandler

from config import Config
from extension import db, jwt

# Blueprints
from routes.auth import auth_bp
from routes.profile import profile_bp
from routes.domains import domains_bp
from routes.internship import intern_bp
from routes.alerts import alert_bp

load_dotenv()


def create_app(config_class=Config):
    app = Flask(__name__)
    
    # Load config
    app.config.from_object(config_class)

    # CORS setup for Render cross-domain cookie auth
    CORS(
        app,
        supports_credentials=True,
        origins=[os.getenv("TARGET")],    # Frontend origin
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"]
    )

    # Logging setup
    handler = RotatingFileHandler("/home/pradeep/Documents/student/backend/app.log", maxBytes=5 * 1024 * 1024, backupCount=5)
    handler.setLevel(logging.ERROR)
    app.logger.addHandler(handler)

    # Initialize extension objects
    db.init_app(app)
    jwt.init_app(app)

    # Auto-create tables
    with app.app_context():
        db.create_all()

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(domains_bp)
    app.register_blueprint(intern_bp)
    app.register_blueprint(alert_bp)

    # Fix for CORS preflight rejection
    @app.before_request
    def handle_preflight():
        if request.method == "OPTIONS":
            return "", 200

    return app


# ******** LOCAL DEVELOPMENT ONLY ********
if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("DEBUG") == "1"

    app = create_app()
    app.run(host=host, port=port, debug=debug)
