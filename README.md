#apache-dev
Mac local apache dev config

##Support VirtualHost:
+ `e-httpd` 编辑httpd.conf加载vitualhost.conf文件
  - 即去掉这一行注释：#Include /private/etc/apache2/extra/httpd-vhosts.conf

+ 添加配置文件，如下：
  ```conf
  <VirtualHost *:80>
    ServerName www.apache-dev.com
    DocumentRoot /Users/feizheng/git-oschina/apache-dev
    <Directory "/Users/feizheng/git-oschina/apache-dev">
      Options Indexes FollowSymLinks
      Require all granted
    </Directory>
  </VirtualHost>
  ```
+ 重启apache,`apache-reload`


##Support PHP
+ `e-httpd`，去掉这一行，LoadModule php5_module libexec/apache2/libphp5.so
+ 重启apache,`apache-reload`
+ 测试：http://www.apache-dev.com/index.php
