Feature: Tags

@user1 @web
Scenario: Crear un Tag con un color invalido
  Given I get the tag test data
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I navigate to the path "tags/new"
  When I try to create a tag with an invalid color
  Then The error message "The colour should be in valid hex format" should be displayed on "tag-name" with selector "[data-test-error=\"accentColor\"]"
  And The save button should be disabled