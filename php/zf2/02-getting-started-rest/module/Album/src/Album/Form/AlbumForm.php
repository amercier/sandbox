<?php

namespace Album\Form;

use Zend\Form\Form;

/**
 * Form to add new albums. There are two bits to this part:
 *
 *   - Display a form for user to provide details
 *   - Process the form submission and store to database
 *
 * We use Zend\Form to do this. The Zend\Form component manages the form and,
 * form validation, we add a Zend\InputFilter to our Album entity.
 */
class AlbumForm extends Form
{
    /**
     * Within the constructor of AlbumForm we do several things. First, we set
     * the name of the form as we call the parent’s constructor. We then set the
     * form’s method, in this case, post. Finally, we create four form elements:
     * the id, title, artist, and submit button. For each item we set various
     * attributes and options, including the label to be displayed.
     */
    public function __construct($name = null)
    {
        // we want to ignore the name passed
        parent::__construct('album');

        $this->add(array(
            'name' => 'id',
            'type' => 'Hidden',
        ));
        $this->add(array(
            'name' => 'title',
            'type' => 'Text',
            'options' => array(
                'label' => 'Title',
            ),
        ));
        $this->add(array(
            'name' => 'artist',
            'type' => 'Text',
            'options' => array(
                'label' => 'Artist',
            ),
        ));
        $this->add(array(
            'name' => 'submit',
            'type' => 'Submit',
            'attributes' => array(
                'value' => 'Go',
                'id' => 'submitbutton',
            ),
        ));
    }
}
