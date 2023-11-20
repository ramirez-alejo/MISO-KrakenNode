Feature: Navigation Settings

    @user1 @web
    Scenario: Agregar
        Given I login to the Ghost application with username "<LoginUsername>" and password "<LoginPassword>" on "<Host>"
        When I navigate to the path "settings/navigation"
        When I add a new label "$name1" with a url "$url1"
        When I navigate to page "<Host>"
        Then Should exists a new menu item with label "$$name1" and url "$$url1"