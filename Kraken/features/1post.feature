Feature: Posts



@user4 @web
Scenario: Despublicar post
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I create a new post number "4" and content "Esto es una prueba automatizada" on "<Host>"
  Then I wait
  Then I verify the post was created with number "4" on "<Host>"
  Then I unpublish the post with number "4" on "<Host>"
  Then I wait
  Then I check the post with number "4" is not published on "<Host>"

