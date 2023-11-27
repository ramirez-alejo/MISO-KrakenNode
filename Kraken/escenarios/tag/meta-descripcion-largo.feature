Feature: Tags

@user1 @web
Scenario: Crear un Tag con una descripción de metadata muy larga
  Given I get the tag test data
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I navigate to the path "tags/new"
  When I try to create a tag with a long metadata description
  Then The error message "Meta Description cannot be longer than 500 characters." should be displayed on "#meta-description"
  And The save button should be disabled