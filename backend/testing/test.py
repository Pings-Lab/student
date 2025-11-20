import requests
url="http://127.0.0.1:5000/api/v1/"
session = requests.Session()
#Signup
print("\n------------API testing------------\n")

# Login (server sets JWT cookie)
print("1. Login API\n")
payload = {
    "email": "ken@gmail.com",
    "password": "1234@abC"
}

response = session.post(url+"login", json=payload)
print("result: "+response.text+" "+str(response.status_code))
print("Cookies stored:", response.cookies)

print("\n-----------------------------------\n")

# State API
print("1. State API\n")

response = session.get(url+"state")
print("result: "+response.text+" "+str(response.status_code))

print("\n-----------------------------------\n")
