Feature: Members

  @user1 @web
  Scenario: Creación de un miembro
    Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
    When I navigate to the members page
    When I wait for 1 seconds
    When Create a member with name "$name:membername1", email "$email:memberemail1", note "$string:membernote1" and label "$string:memberlabel1"
    When I navigate to the members page
    When I wait for 1 seconds
    Then I should see a new member named "$$name:membername1" on the members list

  @user2 @web
  Scenario: Eliminar un miembro
    Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
    When I navigate to the members page
    When I wait for 1 seconds
    When Create a member with name "$name:membername2", email "$email:memberemail2", note "$string:membernote2" and label "$string:memberlabel2"
    When I navigate to the members page
    When I wait for 1 seconds
    When I select the member named "$$name:membername2"
    When I wait
    When I remove the selected member
    When I wait for 1 seconds
    Then I should not see a member named "$$name:membername2" on the members list

  @user3 @web
  Scenario: Impersonar un miembro
    Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
    When I navigate to the members page
    When I wait for 1 seconds
    When Create a member with name "$name:membername3", email "$email:memberemail3", note "$string:membernote3" and label "$string:memberlabel3"
    When I navigate to the members page
    When I wait for 1 seconds
    When I select the member named "$$name:membername3"
    When I wait for 1 seconds
    Then I impersonate the selected member

