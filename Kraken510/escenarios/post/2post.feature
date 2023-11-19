Feature: Posts


@user2 @web
Scenario: Creacion
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I create a new post number "$number2" and content "Esto es una prueba automatizada" on "<Host>"
  Then I verify the post was created with number "$$number2" on "<Host>"
  Then I delete the post with number "$$number2" on "<Host>"
  