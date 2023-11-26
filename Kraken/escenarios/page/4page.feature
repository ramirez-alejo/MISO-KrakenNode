Feature: Pages



@user4 @web
Scenario: Editar page
  Then I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"
  When I create a new page number "$number4" and content "Esto es una prueba automatizada"
  Then I verify the page was created with number "$$number4"
  Then I edit the existing page with title "$$number4" to have the new number "$number5" and new content "Esto fue actualizado por una prueba automatizada"
  Then I wait
  Then I delete the page with number "$$number5"
