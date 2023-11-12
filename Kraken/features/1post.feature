Feature: Posts

@user1 @web
Scenario: Creacion de draft
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I create a new post draft with number "$number1" and content "Esto es una prueba automatizada" on "<Host>"
  Then I wait
  Then I verify the post draft was created with number "$$number1" on "<Host>"
  Then I delete the post with number "$$number1" on "<Host>"
  Then I send a signal to user 4 containing "Done1"

@user2 @web
Scenario: Creacion
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I create a new post number "$number2" and content "Esto es una prueba automatizada" on "<Host>"
  Then I wait
  Then I verify the post was created with number "$$number2" on "<Host>"
  Then I delete the post with number "$$number2" on "<Host>"
  Then I send a signal to user 5 containing "Done2"

@user3 @web
Scenario: Eliminar
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I create a new post number "$number2" and content "Esto es una prueba automatizada" on "<Host>"
  Then I wait
  Then I verify the post was created with number "$$number2" on "<Host>"
  Then I delete the post with number "$$number2" on "<Host>"
  Then I check the post with number "$$number2" is not published on "<Host>"  


@user4 @web
Scenario: Editar post
  Given I wait
  Given I wait for a signal containing "Done1"
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I create a new post number "$number3" and content "Esto es una prueba automatizada" on "<Host>"
  Then I wait
  Then I verify the post was created with number "$$number3" on "<Host>"
  Then I edit the existing post with title "$$number3" to have the new number "$number2" and new content "Esto fue actualizado por una prueba automatizada" on "<Host>"
  Then I delete the post with number "$$number3" on "<Host>"
  

@user5 @web
Scenario: Despublicar post
  Given I wait
  Given I wait for a signal containing "Done2"
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I create a new post number "$number4" and content "Esto es una prueba automatizada" on "<Host>"
  Then I wait
  Then I verify the post was created with number "$$number4" on "<Host>"
  Then I unpublish the post with number "$$number4" on "<Host>"
  Then I wait
  Then I check the post with number "$$number4" is not published on "<Host>"
  Then I delete the post with number "$$number4" on "<Host>"

