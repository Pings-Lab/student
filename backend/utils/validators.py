import re

def valid_mobile(number):
    pattern = r"^[0-9]{10}$"
    if re.fullmatch(pattern, number):
        return True
    else:
        return False

def valid_email(email):
   pattern = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}"
   if re.fullmatch(pattern, email):
     return True
   else:
     return False

def valid_pass(password):
  pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
  if re.fullmatch(pattern, password):
     return True
  else:
     return False
