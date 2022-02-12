#!/bin/bash -e
sudo useradd -m -s /bin/bash app || echo ""
sudo chown -R app:app /home/app/${APPLICATION_NAME}/
sudo chmod o+x /home/app/
sudo rm -f /tmp/env
sudo rm -rf /home/app/.tmp
sudo rm -rf /home/app/${APPLICATION_NAME}/*