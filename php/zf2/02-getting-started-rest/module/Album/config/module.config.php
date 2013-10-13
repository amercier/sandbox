<?php
/**
 * The config information is passed to the relevant components by the
 * ServiceManager. We need two initial sections: controllers and view_manager.
 */
return array(

    /**
     * The controllers section provides a list of all the controllers provided
     * by the module. We will need one controller, AlbumController, which we'll
     * reference as Album\Controller\Album. The controller key must be unique
     * across all modules, so we prefix it with our module name.
     */
    'controllers' => array(
        'invokables' => array(
            'Album\Controller\Album' => 'Album\Controller\AlbumController',
        ),
    ),

    /**
     * Within the view_manager section, we add our view directory to the
     * TemplatePathStack configuration. This will allow it to find the view
     * scripts for the Album module that are stored in our view/ directory.
     */
    'view_manager' => array(
        'template_path_stack' => array(
            'album' => __DIR__ . '/../view',
        ),
    ),

    /**
     * The name of the route is 'album' and has a type of 'segment'. The segment
     * route allows us to specify placeholders in the URL pattern (route) that
     * will be mapped to named parameters in the matched route. In this case,
     * the route is ``/album[/:action][/:id]`` which will match any URL that
     * starts with /album. The next segment will be an optional action name,
     * and then finally the next segment will be mapped to an optional id. The
     * square brackets indicate that a segment is optional. The constraints
     * section allows us to ensure that the characters within a segment are as
     * expected, so we have limited actions to starting with a letter and then
     * subsequent characters only being alphanumeric, underscore or hyphen. We
     * also limit the id to a number.
     *
     * This route allows us to have the following URLs:
     *
     * URL                Page                            Action
     * ---------------    ----------------------------    ----------------------
     * /album             Home (list of albums)           index
     * /album/add         Add new album                   add
     * /album/edit/2      Edit album with an id of 2      edit
     * /album/delete/4    Delete album with an id of 4    delete
     */
    'router' => array(
        'routes' => array(
            'album' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/album[/][:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Album\Controller\Album',
                        'action'     => 'index',
                    ),
                ),
            ),
        ),
    ),
);
