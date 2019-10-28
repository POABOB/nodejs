#!/bin/sh
cd /opt/lampp/htdocs/nodejs/nodejs/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log