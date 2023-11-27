Feature: Tags

@user1 @web
Scenario: Crear un Tag con el slug vacio
  Given I get the tag test data
  And I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I navigate to the path "tags/new"
  When I try to create a tag with en empty slug
  Then The slug should be equal to the tag name