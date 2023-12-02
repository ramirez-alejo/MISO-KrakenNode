Feature: User manageament cannot save with invalid data

@user1 @web
Scenario: Can update user profile
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"
  Given I wait
  Given I navigate to the user profile
  When I set an invalid website url
  Then I verify is not allowed to save the changes

