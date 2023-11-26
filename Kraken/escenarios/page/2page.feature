Feature: Pages
 

@user2 @web
Scenario: Creacion
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"
  When I create a new page number "$number2" and content "Esto es una prueba automatizada"
  Then I verify the page was created with number "$$number2"
  Then I wait
  Then I delete the page with number "$$number2"
