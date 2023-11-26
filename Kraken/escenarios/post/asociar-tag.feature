Feature: Posts


@user2 @web
Scenario: Asociar tag
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"
  When I navigate to the path "tags/new"
  When I create a new tag with name "$name-tag", slug "$name-slug", description "$string-description"
  When I create a new post number "$number2" and content "Esto es una prueba automatizada"
  When I open the post number "$$number2" settings menu
  When I add the tag "$$name-tag" to the post
  When I save the post changes
  When I navigate to the path "posts"
  Then I verify the post with number "$$number2" has the tag "$$name-tag" associated