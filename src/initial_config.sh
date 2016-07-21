#!/usr/bin/env bash
cd /private/etc
sudo mv apache2/ ~/github/apache-dev/src/
sudo ln -s ~/github/apache-dev/src/apache2/ /private/etc/apache2
