from extension import db
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime

class Auth(db.Model):
  __tablename__='auth'
  id=db.Column(db.String(15), primary_key=True)
  f_name=db.Column(db.String(10))
  l_name=db.Column(db.String(10))
  mobile=db.Column(db.String(10))
  email=db.Column(db.String(60))
  password=db.Column(db.String(200))
  created=db.Column(db.TIMESTAMP)
  def __repr__(self):
        return f'<Auth {self.id}>'
