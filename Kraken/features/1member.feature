Feature: Members

@user1 @web
Scenario: Creación de un miembro
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>"
  When I navigate to the members page
  When Create a member with name "$name_membername", email "$email_memberemail", note "$string_membernote" and label "$string_memberlabel"  
  When I navigate to the members page
  Then I should see a new member named "$$name_membername" on the members list