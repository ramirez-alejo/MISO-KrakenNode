Feature: Posts


@user5 @web
Scenario: Despublicar post
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"
  Then I wait
  When I create a new post number "$number6" and content "Esto es una prueba automatizada"
  Then I wait
  Then I verify the post was created with number "$$number6"
  Then I unpublish the post with number "$$number6"
  Then I wait
  Then I check the post with number "$$number6" is not published
  Then I wait
  Then I delete the post with number "$$number6"

