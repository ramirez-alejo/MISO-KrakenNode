Feature: Administrar las páginas-Pages

    Scenario: Crear un nuevo page sin publicar
        Given Se autentica el usuario
        When Se crea page "Página sin publicar"
        And Se navega al listado de páginas
        Then Validar que exista la página en el listado con estado "Draft"

    Scenario: Crear un nuevo page y publicarlo
        Given Se autentica el usuario
        When Se crea page "Esta página debe quedar publicada"
        And Se publica inmediatamente el post
        And Se navega al listado de páginas
        Then Validar que exista la página en el listado con estado "Published"

    Scenario: Editar un page
        Given Se autentica el usuario
        When Se crea page "Página que vamos a editar"
        And Se navega al listado de páginas
        And Se navega a la edición del page
        And Se modifica el título del page a "Cambiamos el título de esta page"
        Then Validar que el título del page es "Cambiamos el título de esta page"
