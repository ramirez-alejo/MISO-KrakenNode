Feature: Members
    @user1 @web
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