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