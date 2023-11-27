Feature: Tags

@user1 @web
Scenario: Crear un Tag con una descripción de facebook muy larga
  Given I get the tag test data
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I navigate to the path "tags/new"
  When I try to create a tag with a facebook long description
  Then An alert with the message "Validation error, cannot save tag. Validation failed for og_description." is displayed
  And The save button should be disabled