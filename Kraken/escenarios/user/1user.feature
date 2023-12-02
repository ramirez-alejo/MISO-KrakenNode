Feature: User manageament

@user1 @web
Scenario: Can update user profile
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"
  Given I wait
  Given I navigate to the user profile
  When I update the location to "$number1" and bio to "$number2"
  Then I verify the users location is "$$number1" and bio is "$$number2" updated

