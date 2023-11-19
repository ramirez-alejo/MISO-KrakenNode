Feature: Tags

@user1 @web
Scenario: Eliminar un Tag
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I navigate to the path "tags/new"
  When I create a new tag with name "$name-tag", slug "$name-slug", description "$string-description"
  When I navigate to the path "tags"
  When I select the tag name "$$name-tag" from the list
  When I click on the delete tag button
  When I confirm the delete dialog
  Then A tag with the name "$$name-tag1" should not exists on the list