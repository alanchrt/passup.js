#!/usr/bin/env bash

apt-get update
apt-get install -y python-software-properties
add-apt-repository ppa:richarvey/nodejs
apt-get update
apt-get install -y git
apt-get install -y nodejs
apt-get install -y npm
sudo -u vagrant ln -s /vagrant /home/vagrant/passup.js
cd passup.js && npm install -g && passup update
