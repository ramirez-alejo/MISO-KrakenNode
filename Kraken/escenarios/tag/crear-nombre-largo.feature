Feature: Tags

@user1 @web
Scenario: Crear un Tag con el nombre muy largo
  Given I get the tag test data
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I navigate to the path "tags/new"
  When I try to create a tag with a long name
  Then The error message "Tag names cannot be longer than 191 characters." should be displayed on "tag-name"
  And The save button should be disabled