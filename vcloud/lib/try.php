<?php

require_once 'error.php';

function tryOrExit($message, $method)
{
  try
  {
    echo $message . '... ';
    $result = $method();
    echo 'OK';
    return $result;
  }
  catch (Exception $e)
  {
    exitWithException($e, 'NOK - ');
  }
}
