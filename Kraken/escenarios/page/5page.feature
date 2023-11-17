Feature: Pages

@user5 @web
Scenario: Despublicar page
  Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
  Then I wait
  When I create a new page number "$number6" and content "Esto es una prueba automatizada" on "<Host>"
  Then I wait
  Then I verify the page was created with number "$$number6" on "<Host>"
  Then I unpublish the page with number "$$number6" on "<Host>"
  Then I wait
  Then I check the page with number "$$number6" is not published on "<Host>"
  Then I wait
  Then I delete the page with number "$$number6" on "<Host>"

