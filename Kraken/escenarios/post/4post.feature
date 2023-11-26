Feature: Posts

@user4 @web
Scenario: Editar post
  Then I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"
  When I create a new post number "$number4" and content "Esto es una prueba automatizada"
  Then I verify the post was created with number "$$number4"
  Then I edit the existing post with title "$$number4" to have the new number "$number5" and new content "Esto fue actualizado por una prueba automatizada"
  Then I delete the post with number "$$number5"
  
