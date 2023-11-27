Feature: Tags

@user1 @web
Scenario: Crear un Tag con un titulo de metadata muy largo
  Given I get the tag test data
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I navigate to the path "tags/new"
  When I try to create a tag with a long metadata title
  Then The error message "Meta Title cannot be longer than 300 characters." should be displayed on "#meta-title"
  And The save button should be disabled