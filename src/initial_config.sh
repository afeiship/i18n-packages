#!/usr/bin/env bash
cd /private/etc
sudo mv apache2/ ~/git-oschina/apache-dev/src/
sudo ln -s ~/git-oschina/apache-dev/src/apache2/ /private/etc/apache2
