Feature: Pages


@user2 @web
Scenario: Asociar tag
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"
  When I navigate to the path "tags/new"
  When I create a new tag with name "$name-tag", slug "$name-slug", description "$string-description"
  When I create a new page number "$number2" and content "Esto es una prueba automatizada"
  When I open the page number "$$number2" settings menu
  When I add the tag "$$name-tag" to the page
  When I save the page changes
  When I navigate to the path "pages"
  Then I verify the page with number "$$number2" has the tag "$$name-tag" associated