import os
from flask import Flask
from dotenv import load_dotenv
from routes.auth import auth_bp

load_dotenv()
app=Flask(__name__)

app.register_blueprint(auth_bp)

if __name__=="__main__":
   host=os.getenv("HOST")
   port=os.getenv("PORT")
   debug=True if os.getenv("DEBUG")=="1" else False
   app.run(debug=debug, host=host, port=port)
