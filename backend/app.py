import os
from flask import Flask
from dotenv import load_dotenv

load_dotenv()
app=Flask(__name__)

@app.route("/",methods=[GET])
def home():
 return "hi"

if __name__=="__main__":
   host=os.getenv("HOST")
   port=os.getenv("PORT")
   debug=True if os.getenv("DEBUG")=="1" else False
   app = create_app()
   app.run(debug=debug, host=host, port=port)
