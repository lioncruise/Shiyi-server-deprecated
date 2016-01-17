#!/bin/sh

git pull origin master

gulp compile

pm2 reload production_test_pm2.json