Feature: Members
    @user1 @web
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