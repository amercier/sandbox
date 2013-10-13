<?php

namespace Album;

use Album\Model\Album;
use Album\Model\AlbumTable;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;

/**
 * In order to load and configure a module, Zend Framework 2 has a
 * ModuleManager. This will look for Module.php in the root of the module
 * directory (module/Album) and expect to find a class called Album\Module
 * within it. That is, the classes within a given module will have the namespace
 * of the module's name, which is the directory name of the module.
 */
class Module
{
    /**
     * The getAutoloaderConfig() method returns an array that is compatible with
     * ZF2's AutoloaderFactory. We configure it so that we add a class map file
     * to the ClassMapAutoloader and also add this module's namespace to the
     * StandardAutoloader. The standard autoloader requires a namespace and the
     * path where to find the files for that namespace. It is PSR-0 compliant
     * and so classes map directly to files as per the PSR-0 rules.
     *
     * If you are using Composer, you could instead just create an empty
     * getAutoloaderConfig() { } and add to composer.json:
     *
     *     "autoload": {
     *         "psr-0": { "Album": "module/Album/src/" }
     *     }
     *
     * If you go this way, then you need to run php composer.phar update to
     * update the composer autoloading files.
     */
    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\ClassMapAutoloader' => array(
                __DIR__ . '/autoloader_classmap.php',
            ),
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    /**
     * This method returns an array of factories that are all merged together
     * by the ModuleManager before passing to the ServiceManager. The factory
     * for Album\Model\AlbumTable uses the ServiceManager to create an
     * AlbumTableGateway to pass to the AlbumTable. We also tell the
     * ServiceManager that an AlbumTableGateway is created by getting a
     * Zend\Db\Adapter\Adapter (also from the ServiceManager) and using it to
     * create a TableGateway object. The TableGateway is told to use an Album
     * object whenever it creates a new result row. The TableGateway classes use
     * the prototype pattern for creation of result sets and entities. This
     * means that instead of instantiating when required, the system clones a
     * previously instantiated object. See PHP Constructor Best Practices and
     * the Prototype Pattern for more details.
     */
    public function getServiceConfig()
    {
        return array(
            'factories' => array(
                'Album\Model\AlbumTable' =>  function($sm) {
                    $tableGateway = $sm->get('AlbumTableGateway');
                    $table = new AlbumTable($tableGateway);
                    return $table;
                },
                'AlbumTableGateway' => function ($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype(new Album());
                    return new TableGateway('album', $dbAdapter, null, $resultSetPrototype);
                },
             ),
         );
    }
}
