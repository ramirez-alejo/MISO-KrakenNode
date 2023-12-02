Feature: Posts



@user3 @web
Scenario: Eliminar
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"
  When I create a new post number "$number3" and content "Esto es una prueba automatizada"
  Then I verify the post was created with number "$$number3"
  Then I delete the post with number "$$number3"  
  Then I wait
  Then I check the post with number "$$number3" is not published  
