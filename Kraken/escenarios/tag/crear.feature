Feature: Tags

@user1 @web
Scenario: Crear un Tag
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I navigate to the path "tags/new"
  When I create a new tag with name "$name-tag", slug "$name-slug", description "$string-description"
  When I navigate to the path "tags"
  Then A new tag with the name "$$name-tag" should exists on the list