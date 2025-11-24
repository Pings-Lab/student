from extension import db
from datetime import datetime
from sqlalchemy.sql import func

class Auth(db.Model):
    __tablename__ = 'auth'
    id = db.Column(db.String(15), primary_key=True)
    f_name = db.Column(db.String(10))
    l_name = db.Column(db.String(10))
    mobile = db.Column(db.String(10))
    email = db.Column(db.String(60))
    password = db.Column(db.String(200))

    created = db.Column(
        db.TIMESTAMP(timezone=True), 
        server_default=func.now()
    )

    def __repr__(self):
        return f'<Auth {self.id}>'


class Profile(db.Model):
  __tablename__='profile'
  id=db.Column(db.String(15), primary_key=True)
  username=db.Column(db.String(10))
  gender=db.Column(db.String(1))
  country=db.Column(db.String(20))
  pin=db.Column(db.String(6))
  edu=db.Column(db.String(60))
  dob=db.Column(db.Date)
  def __repr__(self):
        return f'<Auth {self.id}>'
