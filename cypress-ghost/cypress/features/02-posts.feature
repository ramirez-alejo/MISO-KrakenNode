Feature: Administrar los posts
   
    Scenario: Crear un nuevo post sin publicar
        Given Se autentica el usuario
        When Se crea post "Este post lo creamos pero no lo publicamos" desde el acceso directo de nuevo post
        And Se navega al listado de posts
        Then Validar que exista el postId el listado de posts con estado "Draft"

    Scenario: Crear un nuevo post y publicarlo
        Given Se autentica el usuario
        When Se crea post "Este post lo publicamos de una" desde el acceso directo de nuevo post
        And Se publica inmediatamente el post
        And Se navega al listado de posts
        Then Validar que exista el postId el listado de posts con estado "Published"

    Scenario: Editar un post
        Given Se autentica el usuario
        When Se crea post "Creamos un post que vamos a modificar" desde el acceso directo de nuevo post
        And Se navega al listado de posts
        And Se navega a la edición del post
        And Se modifica el título a "Este es el nuevo título del post"
        Then Validar que el título del post es "Este es el nuevo título del post"

    Scenario: Despublicar un post
        Given Se autentica el usuario
        When Se crea post "Este post lo publicamos y lo despublicamos" desde el acceso directo de nuevo post
        And Se publica inmediatamente el post
        And Se navega al listado de posts
        And Se navega a la edición del post
        And Se despublica el post
        Then Validar que exista el postId el listado de posts con estado "Draft"

    Scenario: Eliminar un post
        Given Se autentica el usuario
        When Se crea post "Este post lo vamos a eliminar" desde el acceso directo de nuevo post
        And Se navega al listado de posts
        And Se navega a la edición del post
        And Se abre el panel de configuración del post
        And Eliminar el post
        Then Validar que el post no existe dentro del listado

        
