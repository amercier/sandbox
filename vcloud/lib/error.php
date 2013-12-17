<?php

// -----------------------------------------------------------------------------
// Error handling
// -----------------------------------------------------------------------------

/**
 * A utility exception class that convert an Exception into another exception:
 *   - if the message is a <Error> XML, parse the it to extract the error message & code
 *   - otherwise, simply keep the original message & code
 */
class VMware_VCloud_Exception extends Exception
{
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

/**
 * Convert an Exception into a VMware_VCloud_Exception
 *
 *   - if a VMware_VCloud_SDK_Exception, returns a VMware_VCloud_SDK_Exception
 *   - otherwise, return the original error
 *
 * @param Exception $e The exception to convert
 * @return Returns the converted error
 */
function convertException (Exception $e)
{
  return ($e instanceof VMware_VCloud_SDK_Exception) ? new VMware_VCloud_Exception($e) : $e;
}

/**
 * Extract the message from an Exception
 * @param The original exception
 * @return string Returns the exception message
 */
function getExceptionMessage (Exception $e)
{
  return convertException($e)->getMessage();
}

/**
 * Exit this script because of an exception. Show the error message and exit
 * returning the exception code (or 1 if >=256)
 *
 * @param Exception $e The exception
 */
function exitWithException (Exception $e, $prefix = '', $suffix = '')
{
  $e = convertException($e);
  error_log( $prefix . $e->getMessage() . $suffix );
  exit( $e->getCode() === 0 || $e->getCode() >= 256 ? 1 : $e->getCode() );
}
