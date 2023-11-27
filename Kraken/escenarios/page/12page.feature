Feature: Pages

@user1 @web
Scenario: Creacion de draft con contenido invalido
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"
  When I try to create a new page draft with dynamic invalid SoundCloud link
  Then I verify the error is shown
  