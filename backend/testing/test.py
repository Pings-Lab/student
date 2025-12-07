import requests
url="http://127.0.0.1:5000/api/v1/"
session = requests.Session()
#Signup
print("\n------------API testing------------\n")

# Login (server sets JWT cookie)
def login():
 print("1. Login API\n")
 email=input("Email: ")
 password=input("Password: ")
 payload = {
    "email": email,
    "password": password
 }

 response = session.post(url+"login", json=payload)
 print("result: "+response.text+" "+str(response.status_code))
 print("Cookies stored:", response.cookies)

 print("\n-----------------------------------\n")

# State API
def state():
 print("2. State API\n")

 response = session.get(url+"state")
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")

# Forgot password
def forgot():
 print("3. Forgot password API\n")
 payload ={
   "email": "ken@gmail.com",
   "mobile": "1234567890"
 }
 response = session.post(url+"forgot", json=payload)
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")

# change password
def change_pass():
 print("4. Change password API\n")
 payload ={
   "current_pass": "1234@abC",
   "new_pass": "Abcd@123"
 }
 response = session.post(url+"/profile/password", json=payload)
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")

# Change username
def change_name():
 print("5. Change username API\n")
 payload ={
   "username": "ken",
 }
 response = session.post(url+"/profile/username", json=payload)
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")


# profile info
def info():
 print("6. Update profile info API\n")
 payload ={
   "edu": "VTU Belagavi",
   "pin": "582102",
   "dob": "2003-12-03",
   "gender": "m",
   "mobile": "1234567890"
 }
 response = session.post(url+"/profile/info", json=payload)
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")

# List domains
def dom_list():
 print("7. Domains List API\n")
 response = session.get(url+"/domains/list")
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")

# Send OTP
def send_otp():
 print("8. Account verify API\n")
 response = session.get(url+"/profile/verify")
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")

# Verify account
def verify():
 print("9. Account Verify API\n")
 response = session.post(url+"/profile/verify")
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")

# List internships
def list_interns():
 print("10. List internships API\n")
 response = session.get(url+"/internship/list")
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")

# Apply internships
def apply_intern():
 print("11. Apply internships API\n")
 cid=input("Domain: ")
 payload={
 "domain":cid,
 }
 response = session.post(url+"/internship/apply", json=payload)
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")

# List people
def list_ppl():
 print("12. List people\n")
 response = session.get(url+"/profile/people")
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")

#see alerts
def list_alerts():
 print("13. List alerts\n")
 response = session.get(url+"/alerts/all")
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")

#mark alert read
def mark_read():
 print("14. List alerts\n")
 id=input("aid: ")
 data={
 "id": id
 }
 response = session.put(url+"/alerts/read", json=data)
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")

#list my projects
def my_pro():
 print("15. My Projects\n")
 response = session.get(url+"/project/myprojects")
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")

# create project
def create_pro():
 print("15. Create Project\n")
 payload={"name": "some project", "summary":"testing","type":"public", "domain":"pr001"}
 response = session.post(url+"/project/create", json=payload)
 print("result: "+response.text+" "+str(response.status_code))

 print("\n-----------------------------------\n")

def main():
 print("1.Login 2.State 3.Forgot 4.Change_pass 5.Chnage_name 6.info 7.dom_list 8.Send OTP 9.Verify Account 10. List internships 11. Apply intern 12. List people 13. List alerts 14. Mark read 15. My Projects 16. Create Project")
 while(1==1):
  choice=0
  try:
   choice = int(input())
   if choice<1:
    print("Invalid choice")
  except Exception as e:
    print("choice should be an integer")

  if choice == 1:
   login()
  elif choice == 2:
   state()
  elif choice == 3:
   forgot()
  elif choice == 4:
   change_pass()
  elif choice == 5:
   change_name()
  elif choice == 6:
   info()
  elif choice == 7:
   dom_list()
  elif choice == 8:
   send_otp()
  elif choice == 9:
   verify()
  elif choice == 10:
   list_interns()
  elif choice == 11:
   apply_intern()
  elif choice == 12:
   list_ppl()
  elif choice == 13:
   list_alerts()
  elif choice == 14:
   mark_read()
  elif choice == 15:
   my_pro()
  elif choice == 16:
   create_pro()
  else:
   return 0

if __name__ == "__main__":
  main()
