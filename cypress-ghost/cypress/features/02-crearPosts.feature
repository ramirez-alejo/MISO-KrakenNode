Feature: Crear un nuevo post
   
    Scenario: Crear un nuevo post sin publicar
        Given Se autentica el usuario
        When Se crea post "Titulo de post" desde el acceso directo de nuevo post
        Then Validar que exista el postId el listado de posts con estado "Draft"

    Scenario: Crear un nuevo post y publicarlo
        Given Se autentica el usuario
        When Se crea post "Titulo de post" desde el acceso directo de nuevo post
        And Se publica inmediatamente el post
        Then Validar la publicación del post
        
