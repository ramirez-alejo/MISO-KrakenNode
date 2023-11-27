Feature: Pages

@user1 @web
Scenario: Creacion de draft con titulo invalido
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"
  When I try to create a new post draft with dynamic invalid title
  Then I verify the preview option is not available for post
  