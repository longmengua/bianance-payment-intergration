### Suggested way to generate public/private keys, and give us the rsa_pkcs8.pub 

- openssl genrsa -out rsa_pkcs1.pri 1024
- openssl rsa -in rsa_pkcs1.pri -pubout -out rsa_pkcs8.pub
- openssl pkcs8 -topk8 -inform PEM -in rsa_pkcs1.pri -outform pem -nocrypt -out rsa_pkcs8.pri