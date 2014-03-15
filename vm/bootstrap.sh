#!/usr/bin/env bash

apt-get update
apt-get install -y python-software-properties
add-apt-repository ppa:richarvey/nodejs
apt-get update
apt-get install -y git
apt-get install -y nodejs
apt-get install -y npm
apt-get install -y libfontconfig1-dev
cd /vagrant && npm link && passup update
