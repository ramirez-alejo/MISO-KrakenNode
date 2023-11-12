Feature: Posts

@user1 @web
Scenario: Creacion de draft
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I create a new post draft with number "1" and content "Esto es una prueba automatizada" on "<Host>"
  Then I wait
  Then I verify the post draft was created with number "1" on "<Host>"

@user2 @web
Scenario: Creacion
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I create a new post number "2" and content "Esto es una prueba automatizada" on "<Host>"
  Then I wait
  Then I verify the post was created with number "2" on "<Host>"