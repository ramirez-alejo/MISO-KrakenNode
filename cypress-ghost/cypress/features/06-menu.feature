Feature: Administrar menu


    Scenario: Agregar pagina al menu
    Given Se autentica el usuario
    And Navega a las configuraciones de navegacion
    When Agrega opcion al menu con nombre:"prueba" y enlace:"http://grupo16.pruebas.co" a la navegacion primaria
    Then Verificar que exista una opcion al menu con nombre:"prueba" y enlace:"http://grupo16.pruebas.co" a la navegacion primaria

    Scenario: Eliminar pagina del menu
    Given Se autentica el usuario
    And Navega a las configuraciones de navegacion
    When Elimina opcion del menu con nombre:"prueba"
    Then Verificar que exista una opcion al menu con nombre:"prueba"
