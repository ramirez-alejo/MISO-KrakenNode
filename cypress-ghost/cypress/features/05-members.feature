Feature: Administrar los miembros

    #Scenario: Agregar miembro
    #    Given Se autentica el usuario
    #    When Se crea un miembro con nombre:"nuevo" y correo:"nuevo@miembros.co"
    #    Then Validar que exista el miembro con nombre:"nuevo" y correo:"nuevo@miembros.co"
    
    #Scenario: Impersonar miembro
    #    Given Se autentica el usuario
    #    When Se crea un miembro con nombre:"impersonado" y correo:"impersonado@miembros.co"
    #    And Se impersona el miembro
    #    Then Validar enlace impersonar generado


    #Scenario: Eliminar miembro
    #    Given Se autentica el usuario
    #    When Se crea un miembro con nombre:"elminar" y correo:"elminar@miembros.co"
    #    And  Se elmina el usuario con nombre:"elminar" y correo:"elminar@miembros.co"
    #    Then Validar que no exista usuario con nombre:"elminar" y correo:"elminar@miembros.co"


    Scenario Outline: No debe agregar miembro <nombre escenario>
        Given Se autentica el usuario
        When Navego a la creacion de nuevo miembro
        And Se llena el formulario con los datos, nombre:'<nombre miembro>' , correo:'<correo>' y nota:'<note>'
        And Hago click en el botón de  guardar
        Then Validar que el formulario no permita guardar
    
    Examples:
    |nombre miembro|correo|note|nombre escenario|
    |Vale Bernardy||dolor vel est donec odio|con correo vacío|
    |Lyda Neljes|`⁄€‹›ﬁﬂ‡°·‚—±|feugiat et eros vestibulum ac est lacinia nisi|con correo en un formato no peritido|
    |Marni Philippsohn|ssauven21@ovh.net|HLWdyRR46NBlCJa7LKISwyepNvTQ7HT2aklejqz0QvWHO0OhD4gMX6HONjQ5bbD8WDfKA14BFLwLn7L6kKZKhOlAEB1fbTaRJWR7RSc4GkYekagehq9JulgYeMTpg2B1SH2LMWW22zUR8Sfl4jmh6GZruWJ4v8oRR9doW1hGdCR8bQVd1QAUHrnmRlv630Cya2LuwRVzmP0cmIxE5BU951Mt9X3vexLMECykTSEKD8dwLqlSkYMmeTconVz9lKbl4mV8r5WmIXLwYPZeC4fOgu6823NTelL68IuKocNgmPim2L31x9Wu1R5aCsWYkuWZ1tpqiyquQvmsounAaVQADf5Gv0QTWwlEEHEYCElR9RDzUWXZMDh5bhVOPsUzOWW9Dj3R9kaDeHifZbMRPxDozJV3Zxqy4LaCD0AwWkxgOqqnp5nWox55jvt7SdNjKiHsUQAMeCXAyYbiy6zWOeDTfDMBjkwMQXIul14kWsu4j296RBWwBTb7y|con nota mayor a 500 caracteres|


    Scenario Outline: Al agregar miembro <nombre escenario>
        Given Se autentica el usuario
        When Navego a la creacion de nuevo miembro
        And Se llena el formulario con los datos, nombre:'<nombre miembro>' , correo:'<correo>' y nota:'<note>'
        And Hago click en el botón de  guardar
        Then Debe aparecer  el mensaje de error:'<mensaje error>' en el formulario
    
    
    Examples:
    |nombre miembro|correo|note|mensaje error|nombre escenario|
    |Arnuad Silk||ut volutpat sapien arcu sed|Please enter an email.|con correo vacío , debe presentar el mensaje de error  en pantalla:'Please enter an email.'|
    |Dirk Stothard|¡™£¢∞§¶•ªº–≠|ridiculus mus vivamus vestibulum sagittis sapien|Invalid Email.|con correo en un formato no permitido:'Invalid Email.'|
    |Sharyl Norcop|mblyth11@cnn.com|VMIKLcZmACmkxCe09I8tK4KswQUrGRxwEoTs5xmgV5fFVYAH91QsUv3BgoKJyVUe5Av7lYfyV2Sz05mmI57F7NqgDWWKdvBPTVsovL2Lns9A7Ifyo3fNBCqWUR7qU76UTKJW5hdEJAbDdhKTeMNGZE9bR9i9Kqf5BrPt4rUgod0n1Whd4gFwiV5WJ81ZIyMPQzFHWTkxs6sAzThdynxedEDPXGHxxiC0cvaJvkzQaH5GrwCnVj5JPXO7hgzO0tARhmKei6W8KFKVjhlWIzNvmSZY5ea9gKUyZGPIRMtRwLCNs3VzoH61TMQAErRUQ1NFgUWihHAVqoovEro2hrxwriElpHqsZLfO0e7ZP0PrWAIUpsS4ZBY5AJLON0OzQNX4DRyhRWG72H3zSAr7kvGo9Qa80oFM0a6PGkI2uFhdXPPwwyAD6HCyN67rKfLyopNG0TFU7N8w1igr8j7XEZawWZeUUWRwGTcgIXqyMjq7sNQEqRg8nSxHv|Note is too long.|con nota mayor a 500 caracteres, debe presentar el mensaje de error  en pantalla:'Note is too long.'|






    

