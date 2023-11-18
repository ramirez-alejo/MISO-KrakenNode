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