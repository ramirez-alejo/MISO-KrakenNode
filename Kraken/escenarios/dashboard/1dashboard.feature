Feature: Dahsboard


@user2 @web
Scenario: Search posts
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"
  Given I wait
  When I create a new post number "$number2" and content "Esto es una prueba automatizada"
  Then I can find the post with number "$$number2" using the search bar
  