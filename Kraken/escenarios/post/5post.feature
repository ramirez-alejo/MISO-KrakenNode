Feature: Posts


@user5 @web
Scenario: Despublicar post
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  Then I wait
  When I create a new post number "$number6" and content "Esto es una prueba automatizada" on "<Host>"
  Then I wait
  Then I verify the post was created with number "$$number6" on "<Host>"
  Then I unpublish the post with number "$$number6" on "<Host>"
  Then I wait
  Then I check the post with number "$$number6" is not published on "<Host>"
  Then I wait
  Then I delete the post with number "$$number6" on "<Host>"

