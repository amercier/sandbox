<?php

namespace Album\Model;

// Add these import statements
use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;

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
 *
 * We also need to set up validation for this form. In Zend Framework 2 this is
 * done using an input filter, which can either be standalone or defined within
 * any class that implements the InputFilterAwareInterface interface, such as a
 * model entity. In our case, we are going to add the input filter to the Album
 * class, which resides in the Album.php file in module/Album/src/Album/Model
 */
class Album implements InputFilterAwareInterface
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

    public function setInputFilter(InputFilterInterface $inputFilter)
    {
        throw new \Exception("Not used");
    }

    public function getInputFilter()
    {
        if (!$this->inputFilter) {

            $inputFilter = new InputFilter();

            $inputFilter->add(array(
                'name'     => 'id',
                'required' => true,
                'filters'  => array(
                    array('name' => 'Int'),
                ),
            ));

            $inputFilter->add(array(
                'name'     => 'artist',
                'required' => true,
                'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
                'validators' => array(
                    array(
                        'name'    => 'StringLength',
                        'options' => array(
                            'encoding' => 'UTF-8',
                            'min'      => 1,
                            'max'      => 100,
                        ),
                    ),
                ),
            ));

            $inputFilter->add(array(
                'name'     => 'title',
                'required' => true,
                'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
                'validators' => array(
                    array(
                        'name'    => 'StringLength',
                        'options' => array(
                            'encoding' => 'UTF-8',
                            'min'      => 1,
                            'max'      => 100,
                        ),
                    ),
                ),
            ));

            $this->inputFilter = $inputFilter;
        }

        return $this->inputFilter;
    }

    public function getArrayCopy()
    {
        return get_object_vars($this);
    }
}
