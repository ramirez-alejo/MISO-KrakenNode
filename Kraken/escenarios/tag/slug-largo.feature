Feature: Tags

@user1 @web
Scenario: Crear un Tag con un slug muy largo
  Given I get the tag test data
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  When I navigate to the path "tags/new"
  When I try to create a tag with a long slug
  Then The error message "URL cannot be longer than 191 characters." should be displayed on "tag-slug"
  And The save button should be disabled