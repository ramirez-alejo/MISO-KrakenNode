Feature: Tags

@user1 @web
Scenario: Crear un Tag con el nombre vacio
  Given I get the tag test data
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I navigate to the path "tags/new"
  When I try to create a tag with an empty name
  Then The error message "You must specify a name for the tag." should be displayed on "tag-name"
  And The save button should be disabled