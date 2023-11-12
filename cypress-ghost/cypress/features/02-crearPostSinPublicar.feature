Feature: Crear un nuevo post sin publicar
   
    Scenario: Crear un nuevo post sin publicar
        Given Se autentica el usuario
        When Se crea post "Titulo de post" desde el acceso directo de nuevo post
        And Se obtiene el postId
        And Se navega al listado de posts
        Then Validar que exista el postId el listado de posts
