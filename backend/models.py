from extension import db
from datetime import datetime
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSONB

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
    __tablename__ = 'profile'

    id = db.Column(db.String(15), db.ForeignKey('auth.id'), primary_key=True)
    username = db.Column(db.String(15), nullable=False, unique=True, index=True)
    gender = db.Column(db.String(1))
    country = db.Column(db.String(20))
    pin = db.Column(db.String(6))
    edu = db.Column(db.String(60))
    dob = db.Column(db.Date)
    verified = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"<Profile {self.username}>"

class Domains(db.Model):
    __tablename__ = 'domains'
    id = db.Column(db.String(5), primary_key=True)
    domain = db.Column(db.String(30))
    type = db.Column(db.String(20))
    category = db.Column(db.Integer)
    cost = db.Column(db.Integer)
    dur = db.Column(db.Integer)
    view = db.Column(db.String(100))

    def __repr__(self):
        return f"<Domains {self.name}"

class Internship(db.Model):
   __tablename__ = 'internships'
   iid = db.Column(db.String(20), primary_key=True)
   uid = db.Column(db.String(15), db.ForeignKey('auth.id'))
   cid = db.Column(db.String(5), db.ForeignKey('domains.id'))
   finished = db.Column(db.Integer, default=False)
   progress = db.Column(db.Integer, default=0)
   opted = db.Column(
        db.TIMESTAMP(timezone=True),
        server_default=func.now()
    )
   paid = db.Column(db.Boolean, default=False)
   status = db.Column(db.String(10), default='applied')
   def __repr__(self):
        return f"<Internship {self.iid}"

class Alerts(db.Model):
    __tablename__ = 'alerts'
    alert_id = db.Column(db.String(20), primary_key=True)
    uid = db.Column(db.String(15), db.ForeignKey('auth.id'))
    message = db.Column(db.String(150))
    recdate = db.Column(
        db.TIMESTAMP(timezone=True),
        server_default=func.now()
    )
    read = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"<Domains {self.alert_id}"
