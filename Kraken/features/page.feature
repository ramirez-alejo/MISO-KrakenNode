Feature: Crear una nueva pagina

@user1 @web
Scenario: Creacion de paginas
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I create a new page number "1" and content "Esto es una prueba automatizada" on "<Host>"
  Then I wait
  Then I verify the page was created with number "1" on "<Host>"

