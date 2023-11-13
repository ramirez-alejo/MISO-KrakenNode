Feature: Posts

@user1 @web
Scenario: Creacion de draft
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I create a new post draft with number "$number1" and content "Esto es una prueba automatizada" on "<Host>"
  Then I verify the post draft was created with number "$$number1" on "<Host>"
  Then I delete the post with number "$$number1" on "<Host>"
