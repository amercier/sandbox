<?php

require_once 'utils.php';

function getAllOrganizations($service, $name = null)
{
  $organizations = array();
  foreach ($service->getOrgRefs() as $orgRef)
  {
    $organizations[ getIdFromRef($orgRef) ] = $service->createSdkObj( $orgRef );
  }
  return $organizations;
}
