<?php

require_once 'try.php';

/**
 * ---------------------------------------------------------------------------
 * Authentication
 * ---------------------------------------------------------------------------
 */

function authenticate($host, $organization, $username, $password)
{

  $auth = array(
    'username' => $username . '@' . $organization,
    'password' => $password,
  );

  $httpConfig = array(
      'proxy_host' => null,
      'proxy_port' => null,
      'proxy_user' => null,
      'proxy_password' => null,
      'ssl_verify_peer' => false,
      'ssl_verify_host' => false,
      'ssl_cafile'  => null,
    );

  ob_start();
  $service = VMware_VCloud_SDK_Service::getService();
  $output = ob_get_clean();
  if( $output !== "\n\n" ) {
    throw new Exception('Oh no! Exception while loading VMware SDK for PHP: ' . $output);
  }

  $result = $service->login($host, $auth, $httpConfig);
  return $service;
}

function tryAuthenticate($options)
{
  return tryOrExit('Authenticating on ' . $options[OPTION_HOST], function()
  {
    global $options;
    return authenticate(
        $options[OPTION_HOST],
        $options[OPTION_ORGANIZATION],
        $options[OPTION_USERNAME],
        $options[OPTION_PASSWORD]
      );
  });
}
