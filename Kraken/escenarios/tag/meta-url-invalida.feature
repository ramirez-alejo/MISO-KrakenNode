Feature: Tags

@user1 @web
Scenario: Crear un Tag con una url de metadata invalida
  Given I get the tag test data
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I navigate to the path "tags/new"
  When I try to create a tag with an invalid metadata url
  Then The error message "The url should be a valid url" should be displayed on "#canonical-url"
  And The save button should be disabled