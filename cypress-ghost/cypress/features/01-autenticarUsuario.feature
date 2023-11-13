Feature: Autenticar usuario en el administrador Ghost
   
    Scenario: Un usuario con credenciales válidas ingresa al administrador
        Given Navega al sitio de administración de Ghost
        When Ingresa usuario: "grupo16@pruebas.com" y clave: "VssK5GQ776f2u$r%"
        Then Navega a la pagina principal
        

    Scenario: Un usuario con correo inexistente no debe autenticar
        Given Navega al sitio de administración de Ghost
        When Ingresa usuario: "usuario.inexistente@test.tt" y clave: "claveCorrecta"
        Then Muestra mensaje de error "There is no user with that email address." en la autenticación

    Scenario: Un usuario con correo correcto y clave incorrecta no debe autenticar
        Given Navega al sitio de administración de Ghost
        When Ingresa usuario: "grupo16@pruebas.com" y clave: "claveIncorrecta"
        Then Muestra mensaje de error "Your password is incorrect." en la autenticación

