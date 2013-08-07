#!/usr/bin/env php
<?php

try
{
  require_once 'vendor/autoload.php';

  require_once 'lib/options.php';
  require_once 'lib/authentication.php';
  require_once 'lib/organization.php';


  // Options
  $options = getOptions
  (
    array
    (
      OPTION_HOST         => OPTION_REQUIRED,
      OPTION_ORGANIZATION => 'system',
      OPTION_USERNAME     => OPTION_REQUIRED,
      OPTION_PASSWORD     => OPTION_REQUIRED,
    )
  );

  // Authentication
  $service = tryAuthenticate($options);

  //
  print_r( getAllOrganizations($service) );

}
catch(Exception $e)
{
  exitWithException($e);
}
