<?php

namespace Album\Model;

/**
 * For this tutorial, we are going to create a very simple model by creating an
 * AlbumTable class that uses the Zend\Db\TableGateway\TableGateway class in
 * which each album object is an Album object (known as an entity). This is an
 * implementation of the Table Data Gateway design pattern to allow for
 * interfacing with data in a database table. Be aware though that the Table
 * Data Gateway pattern can become limiting in larger systems. There is also
 * a temptation to put database access code into controller action methods as
 * these are exposed by Zend\Db\TableGateway\AbstractTableGateway. Don’t do
 * this!
 */
class Album
{
    public $id;
    public $artist;
    public $title;

    /**
     * Our Album entity object is a simple PHP class. In order to work with
     * Zend\Db’s TableGateway class, we need to implement the exchangeArray()
     * method. This method simply copies the data from the passed in array to
     * our entity’s properties. We will add an input filter for use with our
     * form later.
     */
    public function exchangeArray($data)
    {
        $this->id     = (!empty($data['id']))     ? $data['id']     : null;
        $this->artist = (!empty($data['artist'])) ? $data['artist'] : null;
        $this->title  = (!empty($data['title']))  ? $data['title']  : null;
    }
}
