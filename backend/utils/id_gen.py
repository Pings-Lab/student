import shortuuid
import secrets

def gen_id(n):
    uid = list(shortuuid.uuid()[:n])
    spec = [':', '-', ';', '!']

    for _ in range(3):
        temp = secrets.randbelow(n)
        uid[temp] = secrets.choice(spec)

    return ''.join(uid)

