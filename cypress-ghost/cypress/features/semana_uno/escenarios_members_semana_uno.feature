Feature: Actividad de  los miembros

    Scenario: Verificar actividad de miembro al crear 
        Given Se autentica el usuario
        When Navego a la creacion de nuevo miembro
        And Se crea un miembro con nombre:"nuevo" y correo:"nuevo@miembros.co"
        Then Validar que exista activdiad de registro y  Subscrito en  el miembro con nombre:"nuevo"

    Scenario: Verificar actividad de miembro al editar suscripción  
        Given Se autentica el usuario
        When Navego a la creacion de nuevo miembro
        And Se crea un miembro con nombre:"edicion" y correo:"nuevo@miembros.co"
        And Se edita suscripción
        Then Validar que exista activdiad de registro , Subscrito  y cancelar suscripción en  el miembro con nombre:"edicion"    