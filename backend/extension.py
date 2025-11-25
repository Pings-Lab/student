from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask import jsonify
db = SQLAlchemy()
jwt = JWTManager()

@jwt.expired_token_loader
def my_expired_token_callback(jwt_header, jwt_payload):
    return jsonify({
        'msg': 'Your token has expired. Please log in again.',
        'success': False
    }), 401

@jwt.invalid_token_loader
def my_invalid_token_callback(callback_error):
    return jsonify({
        'msg': 'Invalid token provided. Please check your credentials.',
        'success': False
    }), 401


@jwt.unauthorized_loader
def my_unauthorized_callback(callback_error):
    return jsonify({
        'msg': 'Authentication token is missing. Please provide a valid token.',
        'success': False
    }), 401
