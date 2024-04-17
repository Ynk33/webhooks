#!/bin/sh
#!/bin/bash

# Certify the URL with HTTPS using Certbot
certifyHTTPS() {
  # PARAMETERS
  URL=$1

  # BODY
  echo Certifying HTTPS with Certbot...
  certbot --nginx -d $URL -d www.$URL -n
}
