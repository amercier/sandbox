<?php

/**
 * ---------------------------------------------------------------------------
 * Script parameters
 * ---------------------------------------------------------------------------
 */

define('OPTION_HOST'         , 'h');
define('OPTION_USERNAME'     , 'u');
define('OPTION_PASSWORD'     , 'p');
define('OPTION_ORGANIZATION' , 'o');
define('OPTION_DATACENTER'   , 'v');
define('OPTION_CATALOG'      , 'c');
define('OPTION_VAPP_TEMPLATE', 'v');
define('OPTION_NUMBER'       , 'n');

$OPTION_NAMES = array(
    OPTION_HOST          => 'Host',
    OPTION_USERNAME      => 'Username',
    OPTION_PASSWORD      => 'Password',
    OPTION_ORGANIZATION  => 'Organization',
    OPTION_DATACENTER    => 'vDC',
    OPTION_CATALOG       => 'Catalog',
    OPTION_VAPP_TEMPLATE => 'vApp Template',
    OPTION_NUMBER        => 'Number',
  );

$OPTION_VALIDATORS = array(
    OPTION_HOST          => array( new Zend\Validator\NotEmpty(), new Zend\Validator\Hostname(Zend\Validator\Hostname::ALLOW_DNS | Zend\Validator\Hostname::ALLOW_IP | Zend\Validator\Hostname::ALLOW_LOCAL) ),
    OPTION_ORGANIZATION  => array( new Zend\Validator\NotEmpty(), new Zend\Validator\StringLength(array('max' => 64)) ),
    OPTION_USERNAME      => array( new Zend\Validator\NotEmpty(), new Zend\Validator\StringLength(array('max' => 64)) ),
    OPTION_PASSWORD      => array( new Zend\Validator\NotEmpty(), new Zend\Validator\StringLength(array('max' => 64)) ),
    OPTION_DATACENTER    => array( new Zend\Validator\NotEmpty(), new Zend\Validator\StringLength(array('max' => 64)) ),
    OPTION_CATALOG       => array( new Zend\Validator\NotEmpty(), new Zend\Validator\StringLength(array('max' => 64)) ),
    OPTION_VAPP_TEMPLATE => array( new Zend\Validator\NotEmpty(), new Zend\Validator\StringLength(array('max' => 64)) ),
    OPTION_NUMBER        => array( new Zend\Validator\NotEmpty(), new Zend\Validator\Between(array('min' => 1)) ),
  );

define('OPTION_REQUIRED', md5('required')); // Use this as default value

function getOptions($defaultValues)
{
  global $OPTION_NAMES;
  global $OPTION_VALIDATORS;
  $options = array();

  $opt = getopt(implode(
    '',
    array_map
    (
      function($o) { return $o.':'; },
      array_keys($defaultValues)
    )
  ));

  foreach( $defaultValues as $key => $defaultValue )
  {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // 1. Read
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // If the value is given, set it
    if( isset( $opt[$key] ) && $opt[$key] !== false )
    {
      $options[$key] = $opt[$key];
    }
    // Otherwise, if the default value is OPTION_REQUIRED, ask for the value
    else if ( $defaultValue === OPTION_REQUIRED )
    {
      echo $OPTION_NAMES[$key] . ': ';
      $options[$key] = trim(fgets(STDIN));
    }
    // Otherwise, set the default value
    else
    {
      $options[$key] = $defaultValue;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // 2. Validate
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    $optionValidators = $OPTION_VALIDATORS[ $key ];
    foreach ( $optionValidators as $validator )
    {
      if( $options[$key] !== false && ! $validator->isValid( $options[$key] ) )
      {
        throw new Exception( 'No way! Invalid ' . $OPTION_NAMES[$key] . ' (' . implode('. ', $validator->getMessages()) . ')' );
      }
    }
  }

  return $options;
}
