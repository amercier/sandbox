#!/usr/bin/env php
<?php

class VMware_VCloud_Exception extends Exception {
  public function __construct (VMware_VCloud_SDK_Exception $e)
  {
    if( preg_match('/(<\\?xml .*<Error.*<\\/Error>)/s', $e->getMessage(), $matches) )
    {
      $doc = new SimpleXMLElement( $matches[0] );
      $attributes = $doc->attributes();
      parent::__construct( $attributes['message'], intval($attributes['majorErrorCode']) );
    }
    else
    {
      parent::__construct( trim($e->getMessage()), $e->getCode() );
    }
  }
}

function exitWithException (Exception $e)
{
  if( $e instanceof VMware_VCloud_SDK_Exception )
  {
    $e = new VMware_VCloud_Exception($e);
  }

  error_log( $e->getMessage() );
  exit( $e->getCode() === 0 || $e->getCode() >= 256 ? 1 : $e->getCode() );
}

try
{

  /**
   * ---------------------------------------------------------------------------
   * Dependencies
   * ---------------------------------------------------------------------------
   */

  require_once 'vendor/autoload.php';

  /**
   * ---------------------------------------------------------------------------
   * Script parameters
   * ---------------------------------------------------------------------------
   */

  define('OPTION_HOST'         , 'Host');
  define('OPTION_USERNAME'     , 'Username');
  define('OPTION_PASSWORD'     , 'Password');
  define('OPTION_ORGANIZATION' , 'Organization');
  define('OPTION_DATACENTER'   , 'vDC');
  define('OPTION_CATALOG'      , 'Catalog');
  define('OPTION_VAPP_TEMPLATE', 'vApp Template');
  define('OPTION_NUMBER'       , 'Number');

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 1. Read
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function getOption($optArray, $optionName, $defaultValue = false) {
    return ( isset($optArray[ $optionName ]) && $optArray[ $optionName ] !== false )
      ? $optArray[ $optionName ]
      : $defaultValue
      ;
  }

  $o = getopt('h:o:u:p:c:d:v:n:');
  $options = array(
      OPTION_HOST          => getOption($o, 'h'),
      OPTION_ORGANIZATION  => getOption($o, 'o'),
      OPTION_USERNAME      => getOption($o, 'u'),
      OPTION_PASSWORD      => getOption($o, 'p'),
      OPTION_CATALOG       => getOption($o, 'c'),
      OPTION_DATACENTER    => getOption($o, 'd'),
      OPTION_VAPP_TEMPLATE => getOption($o, 'v'),
      OPTION_NUMBER        => getOption($o, 'n', 1),
    );

  foreach( array(OPTION_HOST, OPTION_ORGANIZATION, OPTION_USERNAME, OPTION_PASSWORD, OPTION_DATACENTER, OPTION_VAPP_TEMPLATE, OPTION_NUMBER) as $optionName ) {
    if( $options[$optionName] === false )
    {
      echo $optionName . ': ';
      $options[$optionName] = trim(fgets(STDIN));
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 2. Validate
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  $validators = array(
      OPTION_HOST          => array( new Zend\Validator\NotEmpty(), new Zend\Validator\Hostname(Zend\Validator\Hostname::ALLOW_DNS | Zend\Validator\Hostname::ALLOW_IP | Zend\Validator\Hostname::ALLOW_LOCAL) ),
      OPTION_ORGANIZATION  => array( new Zend\Validator\NotEmpty(), new Zend\Validator\StringLength(array('max' => 64)) ),
      OPTION_USERNAME      => array( new Zend\Validator\NotEmpty(), new Zend\Validator\StringLength(array('max' => 64)) ),
      OPTION_PASSWORD      => array( new Zend\Validator\NotEmpty(), new Zend\Validator\StringLength(array('max' => 64)) ),
      OPTION_DATACENTER    => array( new Zend\Validator\NotEmpty(), new Zend\Validator\StringLength(array('max' => 64)) ),
      OPTION_CATALOG       => array( new Zend\Validator\NotEmpty(), new Zend\Validator\StringLength(array('max' => 64)) ),
      OPTION_VAPP_TEMPLATE => array( new Zend\Validator\NotEmpty(), new Zend\Validator\StringLength(array('max' => 64)) ),
    );

  foreach ( $validators as $optionName => $optionValidators ) {
    foreach ( $optionValidators as $validator )
    {
      if( $options[$optionName] !== false && ! $validator->isValid( $options[$optionName] ) )
      {
        throw new Exception( 'No way! Invalid ' . $optionName . ' (' . implode('. ', $validator->getMessages()) . ')' );
      }
    }
  }

  /**
   * ---------------------------------------------------------------------------
   * Authentication
   * ---------------------------------------------------------------------------
   */

  $auth = array(
    'username' => $options[OPTION_USERNAME] . '@' . $options[OPTION_ORGANIZATION],
    'password' => $options[OPTION_PASSWORD],
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

  echo 'Authenticating on ' . $options[OPTION_HOST] . '... ';

  ob_start();
  $service = VMware_VCloud_SDK_Service::getService();
  $output = ob_get_clean();
  if( $output !== "\n\n" ) {
    throw new Exception('Oh no! Exception while loading VMware SDK for PHP: ' . $output);
  }

  try {
    $result = $service->login($options[OPTION_HOST], $auth, $httpConfig);
    echo "OK\n";
  }
  catch(Exception $e) {
    echo 'NOK - ' . $e->getMessage() . "\n";
    exit(1);
  }

  // Create an SDK Admin object
  $admin = $service->createSDKAdminObj();

  // Create an SDK Extension object
  $sdkExt = $service->createSDKExtensionObj();

  /**
   * ---------------------------------------------------------------------------
   * vApp Template
   * ---------------------------------------------------------------------------
   */

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 1. Organization
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  try {
    echo 'Looking for Organization "' . $options[OPTION_ORGANIZATION] . '"... ';

    $orgRefs = $service->getOrgRefs( $options[OPTION_ORGANIZATION] );
    if ( count($orgRefs) === 0 ) {
      throw new Exception('Argh! Organization "' . $options[OPTION_ORGANIZATION] . '" can\'t be found :s');
    }
    $org = $service->createSDKObj($orgRefs[0]);

    echo 'OK' . "\n";
  }
  catch ( Exception $e ) {
    echo 'NOK' . "\n";
    exitWithException($e);
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 2. Virtual Datacenter
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  try {
    echo 'Looking for Virtual Datacenter "' . $options[OPTION_DATACENTER] . '"... ';

    $vdcRefs = $org->getVdcRefs( $options[OPTION_DATACENTER] );
    if ( count($vdcRefs) === 0 )
    {
      throw new Exception('Outch! Virtual Datacenter "' . $options[OPTION_DATACENTER] . '" can\'t be found :o');
    }
    $vdc = $service->createSDKObj($vdcRefs[0]);

    echo 'OK' . "\n";
  }
  catch ( Exception $e ) {
    echo 'NOK' . "\n";
    exitWithException($e);
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 3. Catalog(s)
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  try {
    if( $options[OPTION_CATALOG] === false )
    {
      echo 'Looking for Catalogs in organization "' . $options[OPTION_ORGANIZATION] . '"... ';

      $catalogRefs = $org->getCatalogRefs();
      if ( count($catalogRefs) === 0 )
      {
        throw new Exception('Ooooh! No Catalogs have been found in organization "' . $options[OPTION_ORGANIZATION] . '" oO');
      }
    }
    else
    {
      echo 'Looking for Catalog "' . $options[OPTION_CATALOG] . '" in organization "' . $options[OPTION_ORGANIZATION] . '"... ';

      $catalogRefs = $org->getCatalogRefs( $options[OPTION_CATALOG] );
      if ( count($catalogRefs) === 0 )
      {
        throw new Exception('Ooooh! Catalog "' . $options[OPTION_CATALOG] . '" does not exist in organization "' . $options[OPTION_ORGANIZATION] . '" oO');
      }
    }

    echo 'OK' . "\n";
  }
  catch ( Exception $e ) {
    echo 'NOK' . "\n";
    exitWithException($e);
  }


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 4. vApp Template
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  try {
    echo 'Looking for vApp Template "' . $options[OPTION_VAPP_TEMPLATE] . '"' . ($options[OPTION_CATALOG] === false ? '' : ' in Catalog "' . $options[OPTION_CATALOG] . '"') . '... ';

    // Catalog item

    $found = false;
    foreach ( $catalogRefs as $catalogRef )
    {
      $catalog = $service->createSDKObj( $catalogRef );
      $catalogItems = $catalog->getCatalogItems( $options[OPTION_VAPP_TEMPLATE] );
      if ( count($catalogItems) === 1 )
      {
        $catalogItem = $catalogItems[0];
        $found = true;
        break;
      }
    }

    if ( !$found )
    {
      throw new Exception('Noooo! vApp Template "' . $options[OPTION_VAPP_TEMPLATE] . '" can\'t be found' . ($options[OPTION_CATALOG] === false ? '' : ' in Catalog "' . $options[OPTION_CATALOG] . '"') . ' ><\'');
    }

    // vApp template

    $vAppTemplateRef = $catalogItem->getEntity();

    echo 'OK' . ($options[OPTION_CATALOG] === false ? ' (found in Catalog "' . $vAppTemplateRef->get_name() . '")' : '') . "\n";
  }
  catch ( Exception $e ) {
    echo 'NOK' . "\n";
    exitWithException($e);
  }

  /**
   * ---------------------------------------------------------------------------
   * Deployment
   * ---------------------------------------------------------------------------
   */

  try {
    for ( $i = 1 ; $i <= $options[OPTION_NUMBER] ; $i++ )
    {
      $vAppName =
        $options[OPTION_NUMBER] === 1
        ? $options[OPTION_VAPP_TEMPLATE]
        : $options[OPTION_VAPP_TEMPLATE] . sprintf(' %02d', $i);

      echo 'Deploying "' . $vAppName . '"...';
      $vAppElement = $vdc->instantiateVAppTemplateDefault( $vAppName, $vAppTemplateRef );
      $taskElement = $vAppElement->getTasks()->getTask()[0];
      $task = $service->createSDKObj( $taskElement );

      while ( $task->isRunning() )
      {
        try
        {
          $task = $service->createSDKObj( $task->wait(1, 1) );
          echo $task->isRunning() ? '.' : '';
        }
        catch ( Exception $e )
        {
          if ( $e->getMessage() !== "Times out.\n" )
          {
            throw $e;
          }
        }
      }

      if ( $task->getTask()->get_status() === 'success' )
      {
        echo " OK\n";
      }
      else
      {
        echo " NOK (" . $task->getTask()->get_status() . ")\n";
      }
    }
  }
  catch(Exception $e) {
    echo ' NOK' . "\n";
    exitWithException($e);
  }

}
catch(Exception $e)
{
  exitWithException($e);
}
