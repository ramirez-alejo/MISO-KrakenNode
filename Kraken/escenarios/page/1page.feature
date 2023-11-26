Feature: Pages

@user1 @web
Scenario: Creacion de draft
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"
  When I create a new page draft with number "$number1" and content "Esto es una prueba automatizada"
  Then I verify the page draft was created with number "$$number1"
  Then I wait
  Then I delete the page with number "$$number1"
  