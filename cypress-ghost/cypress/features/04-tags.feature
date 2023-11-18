Feature: Administrar tags

    Scenario: Crear tag
    Given Se autentica el usuario
    When Se crea el tag con nombre:"tag-prueba" y descripcion:"esto es una prueba"
    Then Validar que exista un tag con nombre:"tag-prueba" , descripcion:"esto es una prueba" y cantidad de posts:"0"

    Scenario: Editar tag
    Given Se autentica el usuario
    And Se crea el tag con nombre:"tag-edicion" y descripcion:"esto es una prueba"
    When Se edita el tag con nombre:"tag-edicion" y nueva  descripcion:"esto es una edición"
    Then Validar que exista un tag con nombre:"tag-edicion" , descripcion:"esto es una edición" y cantidad de posts:"0"

    Scenario: Eliminar tag
    Given Se autentica el usuario
    And Se crea el tag con nombre:"tag-eliminar" y descripcion:"esto es una  de eliminacion"
    When Se elimina el tag con nombre:"tag-eliminar"
    Then Validar que no exista un tag con nombre:"tag-eliminar"

    Scenario: Agregar tag a pagina
    Given Se autentica el usuario
    And Se crea el tag con nombre:"tag-pagina" y descripcion:"pagina nueva"
    When Se agrega el tag con nombre:"tag-pagina" a la pagina con titulo:"About this site"
    Then Validar que  solo una pagina tenga el tag:"tag-pagina" la pagina con titulo:"About this site"

    Scenario: Agregar tag a post
    Given Se autentica el usuario
    And Se crea el tag con nombre:"tag-post" y descripcion:"post nuevo"
    When Se agrega el tag con nombre:"tag-post" al post con titulo:"Coming soon"
    Then Validar que  solo un post tenga el tag:"tag-post" el post con titulo:"Coming soon"




