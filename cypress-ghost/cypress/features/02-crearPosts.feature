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

    Scenario: Editar un post
        Given Se autentica el usuario
        When Se crea post "Titulo de post" desde el acceso directo de nuevo post
        And Se navega al listado de posts
        And Se navega a la edición del post
        And Se modifica el título a "Este es el nuevo título del post"
        Then Validar que el título del post es "Este es el nuevo título del post"
        
