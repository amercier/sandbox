<?php
namespace AlbumRest\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;

use Album\Model\Album;
use Album\Form\AlbumForm;
use Album\Model\AlbumTable;
use Zend\View\Model\JsonModel;

class AlbumRestController extends AbstractRestfulController
{
    protected $albumTable;

    protected $acceptCriteria = array(
        'Zend\View\Model\JsonModel' => array(
            'application/json',
        ),
    );

    public function getAlbumTable()
    {
        if (!$this->albumTable) {
            $sm = $this->getServiceLocator();
            $this->albumTable = $sm->get('Album\Model\AlbumTable');
        }
        return $this->albumTable;
    }

    public function getList()
    {
        $viewModel = $this->acceptableViewModelSelector($this->acceptCriteria);

        $results = $this->getAlbumTable()->fetchAll();
        $data = array();
        foreach($results as $result) {
            $data[] = $result;
        }

        $viewModel->content = array('data' => $data);
        return $viewModel;
    }

    public function get($id)
    {
        $viewModel = $this->acceptableViewModelSelector($this->acceptCriteria);

        $data = $this->getAlbumTable()->getAlbum($id);

        $viewModel->content = array('data' => $data);
        return $viewModel;
    }

    public function create($data)
    {
        $viewModel = $this->acceptableViewModelSelector($this->acceptCriteria);

        $form = new AlbumForm();
        $album = new Album();
        $form->setInputFilter($album->getInputFilter());

        if (empty($data['id'])) {
            $data['id'] = 0;
        }
        $form->setData($data);

        if ($form->isValid()) {
            $album->exchangeArray($form->getData());
            $id = $this->getAlbumTable()->saveAlbum($album);
            $viewModel->content = $this->get($id)->content;
            return $viewModel;
        }
    }

    public function update($id, $data)
    {
        $viewModel = $this->acceptableViewModelSelector($this->acceptCriteria);

        $data['id'] = $id;
        $album = $this->getAlbumTable()->getAlbum($id);
        $form  = new AlbumForm();
        $form->bind($album);
        $form->setInputFilter($album->getInputFilter());
        $form->setData($data);
        if ($form->isValid()) {
            $id = $this->getAlbumTable()->saveAlbum($form->getData());
        }

        $viewModel->content = $this->get($id)->content;
        return $viewModel;
    }

    public function delete($id)
    {
        $viewModel = $this->acceptableViewModelSelector($this->acceptCriteria);

        $this->getAlbumTable()->deleteAlbum($id);

        $viewModel->content = array(
            'data' => 'deleted',
        );
        return $viewModel;
    }
}
