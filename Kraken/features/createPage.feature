Feature: Crear una nueva pagina

@user1 @web
Scenario: Creacion de paginas
  Given I login to the Ghost application with username "<LoginUsername>" and password "VssK5GQ776f2u$r%"
  When I create a new page with title "MyPagina1" and content "Esto es una prueba automatizada"
  Then I verify the page was created with title "MyPagina1"

