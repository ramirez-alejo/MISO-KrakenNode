Feature: Tags

@user1 @web
Scenario: Crear un Tag
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I navigate to the path "tags/new"
  When I create a new tag with name "$name-tag", slug "$name-slug", description "$string-description"
  When I navigate to the path "tags"
  When I select the tag name "$$name-tag" from the list
  When I set the tag name "$name-tag1", slug "$name-slug1" and description "$string-description1"
  When I navigate to the path "tags"
  Then A tag with the name "$$name-tag1" should exists on the list  