Feature: Administrar los miembros

    Scenario: Agregar miembro
        Given Se autentica el usuario
        When Se crea un miembro con nombre:"miembro nuevo" y correo:"nuevo@miembros.co"
        Then Validar que exista el miembro con nombre:"miembro nuevo" y correo:"nuevo@miembros.co"
    
    Scenario: Impersonar miembro
        Given Se autentica el usuario
        When Se crea un miembro con nombre:"miembro impersonado" y correo:"impersonado@miembros.co"
        And Se impersona el miembro
        Then Validar enlace impersonar generado

    Scenario: Eliminar miembro
        Given Se autentica el usuario
        When Se crea un miembro con nombre:"miembro a elminar" y correo:"elminar@miembros.co"
        And  Se elmina el usuario con nombre:"miembro a elminar" y correo:"elminar@miembros.co"
        Then Validar que no exista usuario con nombre:"miembro a elminar" y correo:"elminar@miembros.co"


    

