Feature: Pages

@user3 @web
Scenario: Eliminar
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I create a new page number "$number3" and content "Esto es una prueba automatizada" on "<Host>"
  Then I verify the page was created with number "$$number3" on "<Host>"
  Then I delete the page with number "$$number3" on "<Host>"
  Then I wait
  Then I check the page with number "$$number3" is not published on "<Host>"  
