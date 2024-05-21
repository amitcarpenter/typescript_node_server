import smtplib
import dns.resolver
import sys
import json

def verify_email(email):
    domain = email.split('@')[1]
    try:
        records = dns.resolver.resolve(domain, 'MX')
        mx_record = records[0].exchange
        mx_record = str(mx_record)
    except Exception as e:
        return {"success": False, "error": str(e)}

    try:
        server = smtplib.SMTP()
        server.set_debuglevel(0)
        server.connect(mx_record)
        server.helo(server.local_hostname)
        server.mail('me@domain.com')
        code, message = server.rcpt(email)
        server.quit()
        if code == 250:
            return {"success": True}
        else:
            return {"success": False, "error": "Invalid recipient"}
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    email = sys.argv[1]
    result = verify_email(email)
    print(json.dumps(result))
