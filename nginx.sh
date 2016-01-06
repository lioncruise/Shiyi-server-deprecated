#!/bin/sh

rm /etc/nginx/nginx.conf
rm /etc/nginx/sites-enabled/shiyi-server.conf
rm /etc/nginx/sites-enabled/shiyi-server-test.conf

cp ./nginx/nginx.conf /etc/nginx/
cp ./nginx/shiyi-server.conf /etc/nginx/sites-enabled/
cp ./nginx/shiyi-server-test.conf /etc/nginx/sites-enabled/

nginx -t

nginx -s reload