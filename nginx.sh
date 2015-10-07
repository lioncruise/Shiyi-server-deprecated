#!/bin/sh

rm /etc/nginx/nginx.conf
rm /etc/nginx/sites-enabled/shiyi-server.conf

cp ./nginx/nginx.conf /etc/nginx/
cp ./nginx/shiyi-server.conf /etc/nginx/sites-enabled/

nginx -t

nginx -s reload