import requests
url="http://127.0.0.1:5000/api/v1/"
session = requests.Session()
#Signup
print("\n------------API testing------------\n")

# Login (server sets JWT cookie)
def login():
 print("1. Login API\n")
 payload = {
    "email": "ken@gmail.com",
    "password": "Abcd@123"
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
   "dob": "03-12-2003",
   "gender": "m"
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

def main():
 print("1.Login 2.State 3.Forgot 4.Change_pass 5.Chnage_name 6.info 7.dom_list")
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
  else:
   return 0

if __name__ == "__main__":
  main()
