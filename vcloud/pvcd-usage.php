#!/usr/bin/env php
<?php

define('HREF_TO_ID', '/^.*\/([^\/]+)$/');

/**
 * ---------------------------------------------------------------------------
 * Error handling
 * ---------------------------------------------------------------------------
 */

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

/**
 * ---------------------------------------------------------------------------
 * Model
 * ---------------------------------------------------------------------------
 */
abstract class VMWare_VCloud_AbstractVirtualDatacenter
{

  public static function getGetters()
  {
    $class = new ReflectionClass('VMWare_VCloud_AbstractVirtualDatacenter');
    $getters = array();
    return array_map
    (
      function($method) { return $method->getName(); },
      array_filter
      (
        $class->getMethods(),
        function($method) { return preg_match('/^get/', $method->getName()) && !$method->isStatic(); }
      )
    );
  }

  protected $id = null;
  protected $name = null;

  // Order here determine toString order
  public          function getName() { return $this->name; }
  public abstract function getCPUUsed();
  public abstract function getCPULimit();
  public abstract function getCPUAllocation();
  public abstract function getCPUOverhead();
  public abstract function getCPUReserved();
  public abstract function getMemoryUsed();
  public abstract function getMemoryLimit();
  public abstract function getMemoryAllocation();
  public abstract function getMemoryOverhead();
  public abstract function getMemoryReserved();
  public abstract function getStorageUsed();
  public abstract function getStorageLimit();
  public abstract function getStorageAllocation();
  public abstract function getStorageOverhead();
  public          function getId() { return $this->id; }

  public function __construct($id, $name)
  {
    $this->id = $id;
    $this->name = $name;
  }

  public function toString()
  {
    return
      implode( ',', array_map(
        function($getter) { return $this->$getter(); },
        self::getGetters()
      ));
  }

  public function __toString()
  {
    return $this->toString();
  }
}

class VMWare_VCloud_OrganizationVirtualDatacenter extends VMWare_VCloud_AbstractVirtualDatacenter
{
  protected $cpuUsed = null;
  protected $cpuLimit = null;
  protected $cpuAllocation = null;
  protected $cpuOverhead = null;
  protected $cpuReserved = null;
  protected $memoryUsed = null;
  protected $memoryLimit = null;
  protected $memoryAllocation = null;
  protected $memoryOverhead = null;
  protected $memoryReserved = null;
  protected $storageUsed = null;
  protected $storageLimit = null;
  protected $storageAllocation = null;
  protected $storageOverhead = null;

  public function __construct(
      $id,
      $name,
      $cpuUsed,
      $cpuLimit,
      $cpuAllocation,
      $cpuOverhead,
      $cpuReserved,
      $memoryUsed,
      $memoryLimit,
      $memoryAllocation,
      $memoryOverhead,
      $memoryReserved,
      $storageUsed,
      $storageLimit,
      $storageAllocation,
      $storageOverhead
    )
  {
    parent::__construct($id, $name);
    $this->cpuUsed = $cpuUsed;
    $this->cpuLimit = $cpuLimit;
    $this->cpuAllocation = $cpuAllocation;
    $this->cpuOverhead = $cpuOverhead;
    $this->cpuReserved = $cpuReserved;
    $this->memoryUsed = $memoryUsed;
    $this->memoryLimit = $memoryLimit;
    $this->memoryAllocation = $memoryAllocation;
    $this->memoryOverhead = $memoryOverhead;
    $this->memoryReserved = $memoryReserved;
    $this->storageUsed = $storageUsed;
    $this->storageLimit = $storageLimit;
    $this->storageAllocation = $storageAllocation;
    $this->storageOverhead = $storageOverhead;
  }

  /*public function __get($name)
  {
    if ( !in_array($name, VMWare_VCloud_AbstractVirtualDatacenter::getGetters()) )
    {
      throw new Exception('Unknown method "' . $name . '"');
    }

    return $this->$name();
  }*/

  public function getCPUUsed() { return $this->cpuUsed; }
  public function getCPULimit() { return $this->cpuLimit; }
  public function getCPUAllocation() { return $this->cpuAllocation; }
  public function getCPUOverhead() { return $this->cpuOverhead; }
  public function getCPUReserved() { return $this->cpuReserved; }
  public function getMemoryUsed() { return $this->memoryUsed; }
  public function getMemoryLimit() { return $this->memoryLimit; }
  public function getMemoryAllocation() { return $this->memoryAllocation; }
  public function getMemoryOverhead() { return $this->memoryOverhead; }
  public function getMemoryReserved() { return $this->memoryReserved; }
  public function getStorageUsed() { return $this->storageUsed; }
  public function getStorageLimit() { return $this->storageLimit; }
  public function getStorageAllocation() { return $this->storageAllocation; }
  public function getStorageOverhead() { return $this->storageOverhead; }

}

class VMWare_VCloud_ProviderVirtualDatacenter extends VMWare_VCloud_AbstractVirtualDatacenter
{
  protected $organizationVirtualDatacenters = array();

  /**
   * Generic getter. All get* methods share the same implementation: aggregate
   * values from all Organization Virtual Datacenters
   */
  public function get($name)
  {
    if ( !in_array($name, VMWare_VCloud_AbstractVirtualDatacenter::getGetters()) )
    {
      throw new Exception('Unknown method "' . $name . '"');
    }

    $value = 0;
    foreach ($this->organizationVirtualDatacenters as $organizationVirtualDatacenter)
    {
      $value += $organizationVirtualDatacenter->$name();
    }
    return $value;
  }

  public function getCPUUsed() { return $this->get('getCPUUsed'); }
  public function getCPULimit() { return $this->get('getCPULimit'); }
  public function getCPUAllocation() { return $this->get('getCPUAllocation'); }
  public function getCPUOverhead() { return $this->get('getCPUOverhead'); }
  public function getCPUReserved() { return $this->get('getCPUReserved'); }
  public function getMemoryUsed() { return $this->get('getMemoryUsed'); }
  public function getMemoryLimit() { return $this->get('getMemoryLimit'); }
  public function getMemoryAllocation() { return $this->get('getMemoryAllocation'); }
  public function getMemoryOverhead() { return $this->get('getMemoryOverhead'); }
  public function getMemoryReserved() { return $this->get('getMemoryReserved'); }
  public function getStorageUsed() { return $this->get('getStorageUsed'); }
  public function getStorageLimit() { return $this->get('getStorageLimit'); }
  public function getStorageAllocation() { return $this->get('getStorageAllocation'); }
  public function getStorageOverhead() { return $this->get('getStorageOverhead'); }

  /**
   * Add an Organization Virtual Datacenter
   * @throws Exception If it already exists
   */
  public function addOrganizationVirtualDatacenter(VMWare_VCloud_OrganizationVirtualDatacenter $organizationVirtualDatacenter )
  {
    if ( array_key_exists($organizationVirtualDatacenter->getId(), $this->organizationVirtualDatacenters) )
    {
      throw new Exception('Organization Virtual Datacenter "' . $organizationVirtualDatacenter->getName() . '" already exists');
    }
    $this->organizationVirtualDatacenters[] = $organizationVirtualDatacenter;
    return $this;
  }
}

try
{

  /**
   * ---------------------------------------------------------------------------
   * Dependencies
   * ---------------------------------------------------------------------------
   */

  require_once 'vendor/autoload.php';

  class VMWare_VCloud_OrganizationVirtualDatacenterFactory
  {
    public static function createOrganizationVirtualDatacenter( VMware_VCloud_API_QueryResultAdminVdcRecordType $queryResultAdminVdcRecord )
    {
      //$queryResultAdminVdcRecord = (Custom_VCloud_API_QueryResultAdminVdcRecordType)($queryResultAdminVdcRecord);

      return new VMWare_VCloud_OrganizationVirtualDatacenter
      (
        preg_replace(HREF_TO_ID, '$1', $queryResultAdminVdcRecord->get_href()),
        $queryResultAdminVdcRecord->get_name(),
        intval( $queryResultAdminVdcRecord->get_cpuUsedMhz() ),
        intval( $queryResultAdminVdcRecord->get_cpuLimitMhz() ),
        intval( $queryResultAdminVdcRecord->get_cpuAllocationMhz() ),
        intval( $queryResultAdminVdcRecord->get_cpuOverheadMhz() ),
        intval( $queryResultAdminVdcRecord->get_cpuReservedMhz() ),
        intval( $queryResultAdminVdcRecord->get_memoryUsedMB() ),
        intval( $queryResultAdminVdcRecord->get_memoryLimitMB() ),
        intval( $queryResultAdminVdcRecord->get_memoryAllocationMB() ),
        intval( $queryResultAdminVdcRecord->get_memoryOverheadMB() ),
        intval( $queryResultAdminVdcRecord->get_memoryReservedMB() ),
        intval( $queryResultAdminVdcRecord->get_storageUsedMB() ),
        intval( $queryResultAdminVdcRecord->get_storageLimitMB() ),
        intval( $queryResultAdminVdcRecord->get_storageAllocationMB() ),
        intval( $queryResultAdminVdcRecord->get_storageOverheadMB() )
      );
    }
  }

  /**
   * ---------------------------------------------------------------------------
   * Script parameters
   * ---------------------------------------------------------------------------
   */

  define('OPTION_HOST'         , 'Host');
  define('OPTION_USERNAME'     , 'Username');
  define('OPTION_PASSWORD'     , 'Password');

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 1. Read
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function getOption($optArray, $optionName, $defaultValue = false)
  {
    return ( isset($optArray[ $optionName ]) && $optArray[ $optionName ] !== false )
      ? $optArray[ $optionName ]
      : $defaultValue
      ;
  }

  $o = getopt('h:u:p:');
  $options = array(
      OPTION_HOST          => getOption($o, 'h'),
      OPTION_USERNAME      => getOption($o, 'u'),
      OPTION_PASSWORD      => getOption($o, 'p'),
    );

  foreach( array(OPTION_HOST, OPTION_USERNAME, OPTION_PASSWORD) as $optionName )
  {
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
      OPTION_USERNAME      => array( new Zend\Validator\NotEmpty(), new Zend\Validator\StringLength(array('max' => 64)) ),
      OPTION_PASSWORD      => array( new Zend\Validator\NotEmpty(), new Zend\Validator\StringLength(array('max' => 64)) ),
    );

  foreach ( $validators as $optionName => $optionValidators )
  {
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
    'username' => $options[OPTION_USERNAME] . '@system',
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

  ob_start();
  $service = VMware_VCloud_SDK_Service::getService();
  $output = ob_get_clean();
  if( $output !== "\n\n" )
  {
    throw new Exception('Oh no! Exception while loading VMware SDK for PHP: ' . $output);
  }

  try {
    $result = $service->login($options[OPTION_HOST], $auth, $httpConfig);
  }
  catch(Exception $e)
  {
    exitWithException($e);
  }

  // Create an SDK Admin object
  $admin = $service->createSDKAdminObj();

  /**
   * ---------------------------------------------------------------------------
   * Get OrgVDcRecords and build results on this
   * ---------------------------------------------------------------------------
   */

  $providerVirtualDatacenters = array(); // id => VMWare_VCloud_ProviderVirtualDatacenter

  foreach( $service->queryRecordsByType('adminOrgVdc') as $adminOrgVdcRecord )
  {
    $id = preg_replace(HREF_TO_ID, '$1', $adminOrgVdcRecord->get_providerVdc());

    if ( array_key_exists($id, $providerVirtualDatacenters) )
    {
      $providerVirtualDatacenter = $providerVirtualDatacenters[ $id ];
    }
    else
    {
      $providerVirtualDatacenter = new VMWare_VCloud_ProviderVirtualDatacenter($id, $adminOrgVdcRecord->get_providerVdcName());
      $providerVirtualDatacenters[ $id ] = $providerVirtualDatacenter;
    }

    $providerVirtualDatacenter->addOrganizationVirtualDatacenter( VMWare_VCloud_OrganizationVirtualDatacenterFactory::createOrganizationVirtualDatacenter($adminOrgVdcRecord) );
  }

  $output = array_merge(
    array
    (
      implode(',', array_map(function($getter) { return preg_replace('/^get/','',$getter); }, VMWare_VCloud_AbstractVirtualDatacenter::getGetters()))
    ),
    $providerVirtualDatacenters
  );

  echo implode("\n", $output);
}
catch(Exception $e)
{
  exitWithException($e);
}
