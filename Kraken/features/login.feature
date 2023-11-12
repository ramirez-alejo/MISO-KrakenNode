Feature: Iniciar una sesion

@user1 @web
Scenario: Como primer usuario inicio sesion 
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"