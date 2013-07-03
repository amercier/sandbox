

Setup a development environment
-------------------------------


=== 1/a. Install Composer (skip if already installed) ===

    curl -sS https://getcomposer.org/installer | php

If the installation work correctly, this should display:

    #!/usr/bin/env php
    All settings correct for using Composer
    Downloading...

    Composer successfully installed to: /mnt/hgfs/Documents/sandbox/vcloud/composer.phar
    Use it: php composer.phar


=== 1/b. Upgrade Composer (skip if freshly installed) ===

    php composer.phar self-update

This will upgrade Composer to the latest version. If Composer is already
up-to-date, this will display:

    You are using the latest composer version.


=== 2. Install/upgrade dependencies ===

    php composer.phar install

If the installation work correctly, this should display something like:

    Loading composer repositories with package information
    Installing dependencies (including require-dev)
      - Installing zendframework/zendframework (2.0.8)
        Downloading: 100%

    zendframework/zendframework suggests installing doctrine/common (Doctrine\Common >=2.1 for annotation features)
    zendframework/zendframework suggests installing ext-intl (ext/intl for i18n features)
    zendframework/zendframework suggests installing ircmaxell/random-lib (Fallback random byte generator for Zend\Math\Rand if OpenSSL/Mcrypt extensions are unavailable)
    zendframework/zendframework suggests installing pecl-weakref (Implementation of weak references for Zend\Stdlib\CallbackHandler)
    zendframework/zendframework suggests installing zendframework/zendpdf (ZendPdf for creating PDF representations of barcodes)
    zendframework/zendframework suggests installing zendframework/zendservice-recaptcha (ZendService\ReCaptcha for rendering ReCaptchas in Zend\Captcha and/or Zend\Form)
    Writing lock file
    Generating autoload files
