Feature: Administrar tags

    
    Scenario Outline: Crear tag <nombre escenario>
    Given Se autentica el usuario
    When Se crea el tag con nombre:'<nombre tag>' y descripcion:'<descripcion>'
    Then Validar que exista un tag con nombre:'<nombre tag>' , descripcion:'<descripcion>' y cantidad de posts:'<posts>'

    Examples:
    |nombre tag| descripcion | posts | nombre escenario|
    |tag ||0 | con nombre corto y descripción vacía |
    |tag prueba 2|In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.| 0 | con nombre compuesto de espacios y descripción  |
    |JqbiR28D56PJT8Nh7IsThF10HMwBrGc74f4uetNfCfO2xEhdHsQ6D5k4d90nTUZS0RGukmYILpzyBTzNTplpPKZZQ8xqvpvN9XVfI7nCQRYBJ4dseC1PboPbSFTN8ncv8cRZi6Bjll60QURy6qkZMiclX4ungJKtTam8pf6CmBTp2sXPHTJeBot5wO7NdK|desd|0| con nombre de 190 caracteres (límite máximo permitido) y descripción  |
    



    Scenario Outline: Editar tag <nombre escenario>
    Given Se autentica el usuario
    And Se crea el tag con nombre:'<nombre tag>' y descripcion:"esto es una prueba"
    When Se edita el tag con nombre:'<nombre tag>' y nueva  descripcion:'<descripcion>'
    Then Validar que exista un tag con nombre:'<nombre tag>' , descripcion:'<descripcion>' y cantidad de posts:'<post>'

    Examples:
    |nombre tag| descripcion | post | nombre escenario |
    | ronstring || 0 | Descripción vacía  |
    | zamit | Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. | 0 | descripción  |


    Scenario: Eliminar tag
    Given Se autentica el usuario
    And Se crea el tag con nombre:"tag-eliminar" y descripcion:"esto es una  de eliminacion"
    When Se elimina el tag con nombre:"tag-eliminar"
    Then Validar que no exista un tag con nombre:"tag-eliminar"

    Scenario: Agregar tag a pagina
    Given Se autentica el usuario
    And Se crea page "Página con tag"
    And Se publica inmediatamente el post
    And Se navega al listado de páginas
    And Se crea el tag con nombre:"tag-pagina" y descripcion:"pagina nueva"
    When Se agrega el tag con nombre:"tag-pagina" a la pagina con titulo:"Página con tag"
    Then Validar que  solo una pagina tenga el tag:"tag-pagina" la pagina con titulo:"Página con tag"

    Scenario: Agregar tag a post
    Given Se autentica el usuario
    And Se crea post "Post con tag" desde el acceso directo de nuevo post
    And Se publica inmediatamente el post
    And Se navega al listado de posts
    And Se crea el tag con nombre:"tag-post" y descripcion:"post nuevo"
    When Se agrega el tag con nombre:"tag-post" al post con titulo:"Post con tag"
    Then Validar que  solo un post tenga el tag:"tag-post" el post con titulo:"Post con tag"

    Scenario Outline: No debe crear tag  <nombre escenario>
    Given Se autentica el usuario
    When Navego a la creacion de nuevo tag
    And Se llena el formulario con los datos nombre:'<nombre tag>' , descripcion:'<descripcion>' , color:'<color>' , slug:'<slug>'
    And Hago click en el botón de  guardar
    Then Validar que el formulario no permita guardar

    Examples:
    |nombre tag| descripcion | color | slug |nombre escenario |
    ||Phasellus in felis. Donec semper sapien a libero. Nam dui.| 000000 | slug1 |con nombre de tag vacío  |
    | 3MkR5VypoQ8xYgFCiH5nlml98pxeY29Fbhpw9QSewF2z6clbNk9U61k2sN59PdLbqPv5hsc0kYuxqu5Glyeu5magMUjR9kYtzhi1V0zIVVZKI1REemdJjGqP48FGcxRlO91IEPEn7VmEhUgTgGdvHUOdhJkaNKX956SkvLcd8Eym3LoUpktZTiBjuV3oIMhP | Cras mi pede, malesuada in| 000000 | slug2 | con nombre mayor a 191 caracteres |
    | Cardguard | Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. |¡™£¢∞§¶•ªº–≠| | con color en formato incorrecto|
    | Tres-Zap | Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.| 3f49ea | 7oLOikqZiBMpJLOxjINFs4iqUTPqeJAcsMzx5NsYnMvHXcHmDu2rQ8xIpBi3Yka4ANblV1IHp8XsetHTWLjSqKGcUHM1Iu3neICxctROpEAMJGSRPZ1v1rvbxk2R1udTVW45ERtnX6lAwubMg4eOxFDEllO4R6Gf5LoNV54zctwaCZzFjGliEN1gOUPBTt7g | con slug mayor a 191 caracteres |
    | Cardify | aQJRQQXHv99wi5ix22p2C1ngFNpiHe8zBYRaKaeiCzBCur0hHajcikMwOs9lEoC8wRpcXhSUxGAoVZCshXyJCg5SszI8UUnZzkGcCdF2yLf3lIg0nW1bzXA9hZva4woJXqBnffsRb5H01koenMgCPIpzjzbEPCXnZ9Tye01QnihtWZgBjvelPTPhdsxdPDDSQfOATLOkhXF0Xqra8pNk73y8948nsNyjl6D1l0oaGQdcJwn9iIwUX9NUGr1AASQTd2yx4zFw4iEhMezI2YU3imVxaBCoSBF1oyf3j8JQu5QStBCzb81qXP9Fqro1738p04mH2qoz6ygD2VXMJYHWTvVLCl0T6iKh4P9EZc68IgE2EexQ1zJST3FSwlWXDaWyQBY6PREF4rC9IYHnKwGW6s01uSRslZp51kuAHtSx3g8gMdQPZLIw1MPWH7LBen04fFpXENxHJbnh3twAVTd6sKqRqC3e9XaYEKJfDdU9662wYiZDcdxf7 | 637a72 | Bigtax | con descripción mayor a 500 caracteres  |

    Scenario Outline: No debe editar tag <nombre escenario>
    Given Se autentica el usuario
    And Se crea el tag con nombre:'<nombre busqueda tag>' y descripcion:"esto es una prueba"
    When Navego a las lista de tags y selecciono el tag con nombre:'<nombre busqueda tag>' para edición
    And Se llena el formulario con los datos nombre:'<nombre nuevo tag>' , descripcion:'<descripcion>' , color:'<color>' , slug:'<slug>'
    And Hago click en el botón de  guardar
    Then Validar que el formulario no permita guardar

    Examples:
    |nombre busqueda tag| nombre nuevo tag | descripcion | color | slug |nombre escenario |
    | suspendisse || In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.  | eb79dd | lacus | con nombre de tag vacío |
    | ipsum |NMdh4semnBKi8beAK2FJhRejacAVMC8kOgGhj4ya0NUX8VqVKh5El1cO6LXpXHywlzepbDNS62U9iuxu82k2bBhNjwgb8Zu1dJoBsDkT991a9xWsTRKdxKW2Y1UaO0hi5IjXrTCBk1I6f0qxcbdG1R42jhlLlxovWvumwIOxzJpetRFFf7cm5wZjDQUQHb | Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. | 969632 | integer | con nombre mayor a 191 caracteres  |
    | ullamcorper | ullamcorper | Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. | 和製漢語 | leo | con color en formato incorrecto |
    | vivamus | vivamus | Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus | f6a7ee | AP9BuOfxt7B6Y1Z6ZB0daXee01Sb2Dl8fOlKJQj0FY0TcsEtnmJebqEzjPECiupo7GgKykvo5adcymwKxRCDVTUOl4GOXGEQUVoQuUWgqcqX2xHdCWz40Aa2qqbY8QuhlyUNH0IGJjxIF4I3aoKKTTxGHZo2EaPAfIUPmebVf4QQV9Co1wbDHflZQMcIch | con slug mayor a 191 caracteres |
    | commodo | commodo | aq8lctAKzbbFaP3SEMnpOWwm4TH1DuBeBrnKUyD0AMWHGFA4vNhqFq4hvdRsrooNRgz0LrkmNzI5XrqOAEvEBDdUUGe2cVhgtFVHHKAt5OLaSGiUSzN8RIUC6QJKXOx0Ye4k9A8Lnpr5Nh2BI8BJKc9JWnlILmS4AZFJjPqcCDIvRdaJopz4X5MBD0kERYmD6XJgJwbGUrKaxg2LH08HpFmCjUf2g5p2xCvmTh2Jm6RQcoO9jt0sqYGzduioWmGLdQRdiuOUvCVDtPesd0LacQB3GtpMQxKmglHgYB0UVTEq8BwEQ6kQ0WVXoitUyTAMrDL1FonluVS0V87ioaboIr91UKU1M6FnW5qIpVKJH03vDLONrvHzz3QVwKjWyDC1eVdf9XlTj91g0SUxmXHbrd3AmY7rxyUv6wxdx9BK2hPqcLN4QW1s0vdr7dwxMPXZL1t8dOk4NuJUlTaxiWCPPTVjyU8L4sD0bfpsXNWRxP2iaMoB5bdch | 9da36f | non | con descripción mayor a 500 caracteres  |

    Scenario Outline: En la creación del tag ,  <nombre escenario>
    Given Se autentica el usuario
    When Navego a la creacion de nuevo tag
    And Se llena el formulario con los datos nombre:'<nombre tag>' , descripcion:'<descripcion>' , color:'<color>' , slug:'<slug>'
    And Hago click en el botón de  guardar
    Then Debe aparecer  el mensaje de error:'<mensaje error>' en el formulario

    Examples:
    |nombre tag| descripcion | color | slug | mensaje error |nombre escenario |
    ||Phasellus in felis. Donec semper sapien a libero. Nam dui.| 5f4b81 | tortor | You must specify a name for the tag. |con nombre de tag vacío,  debe presentar el mensaje de error  en pantalla:'You must specify a name for the tag.'|
    |hHAg6BgETHKvXUM4KEwjVjhdIjJFGjLmxkgyY4fiiZ9jK3tX3pvif9TCzdzGJ72AJzu7wXA6bkfuhrAfXV6ZZ4bO2sFE6ohZ1odsf8wgJodlna27vZSmuBVv23nZgB7S3YA9WAcRDe8e8um8Xwpgx0fIpCmG5Lh1XjhLg9lMvoT2HONZF5BpTV12l8z19Vfe|Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.|5f4b81|pharetra|Tag names cannot be longer than 191 characters.|con nombre de tag mayor a 191 caracteres , debe presentar el mensaje de error en pantalla:'Tag names cannot be longer than 191 characters.'|
    | massa | 	Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. | åß∂ƒ©˙∆˚¬…æ | morbi | The colour should be in valid hex format | con color en formato incorrecto  debe presentar el mensaje de error  en pantalla:'The colour should be in valid hex format' |
    | habitasse | Phasellus in felis. Donec semper sapien a libero. Nam dui. | 516155 | OxXbHvKJ2cKglUSVxTRSqju9sCK80cqGpUv1JVcGMSwgKdodMDuZMjj0O1iVo9wh5nX0wdrgl5WaX3T7kjhidEUzULBFnCFnm8LWnumNqJuXtHHWxWVRDgAFDeugZGQEz1Uu4ZBoWVbSHUrh3wrSOULM2ybeEXWmwfF8Bk1hWRvJIHIAOUUneLn2Ur7nfxwO |URL cannot be longer than 191 characters. |  con slug mayor a 191 caracteres , debe presentar el mensaje de error  en pantalla:'URL cannot be longer than 191 characters.' |
    | justo | mJcCgimXd2FfdpFXbAgRMYyWsI0QDeWS6crcSAhPbzoWRjX9SkZBQaDNnvC6yAYX7QpeH8NLZGW5y6w7QbAJcXZbbbKdyuCWOHsUOHEl2PiRzMG9WIs1uJGVNpOejRjos0Nhd5XEivbZKUNDdfvh2c8L13NwE3x1hlheCEAqd8eiXDNdX5YskFQCkEt1XzJvfcZzZvvqHkxao81eKIRCzKkNQK788KrNDcwvTHkd5rXGzGYq7wQB5ysWsRPexUDkQvhNcwIHRf0OkHPMiUMyLxdqlVZ6iKxxMHYPfyMb7MEKeJNmTqSLzrWtdrEdS7reYa2I6celRmTuhe2a1CK3Em6o5fxazKRhMQzAE9vmQZk4MibQOSww8qIMJhsgcq1jKCCNazBABSQlIIMNyDxqvc0zLvhO80F2NLDGanDFtvIbp5rIFuAcYE975KS55P86pEOnq4flKG56s7HI0TappEvFlGjFfp8gWp3QtBZgO1mlChikHdLac | 4ca1f2 | sit | Description cannot be longer than 500 characters. | con descripción mayor a 500 caracteres , debe presentar el mensaje de error en pantalla:'Description cannot be longer than 500 characters.' |

    Scenario Outline: En la edición del tag, <nombre escenario>
    Given Se autentica el usuario
    And Se crea el tag con nombre:'<nombre busqueda tag>' y descripcion:"esto es una prueba"
    When Navego a las lista de tags y selecciono el tag con nombre:'<nombre busqueda tag>' para edición
    And Se llena el formulario con los datos nombre:'<nombre nuevo tag>' , descripcion:'<descripcion>' , color:'<color>' , slug:'<slug>'
    And Hago click en el botón de  guardar
    Then Debe aparecer  el mensaje de error:'<mensaje error>' en el formulario

    Examples:
    |nombre busqueda tag| nombre nuevo tag | descripcion | color | slug | mensaje error | nombre escenario |
    | vestibulum ||  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. | fb795b | vivamus | You must specify a name for the tag. |con nombre de tag vacío,  debe presentar el mensaje de error  en pantalla:'You must specify a name for the tag.'|
    |accumsan | 920urRuUknS1U0juLVkSbE9NVRiqEe2cZMe7oZJP9lBjuOCKQaNmRAOF3UCnvLT3jQSZUKViXZdGl7wzN0WOn6Zx88LXw5a2oR9pbMphHWEXVpVJAfTmWDBSidTyccUErkpVzD0HNC6J8zh1O0T76aUqEQgQfjeDkguqYjqwtFLzERcZYKT0U8MvarNAMnK | Fusce consequat. Nulla nisl. Nunc nisl. | 76aecc | amet  |Tag names cannot be longer than 191 characters.|con nombre de tag mayor a 191 caracteres , debe presentar el mensaje de error en pantalla:'Tag names cannot be longer than 191 characters.'|
    |aliquam | aliquam	| In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus | ÅÍÎÏ˝ÓÔÒÚÆ☃ | magna| The colour should be in valid hex format | con color en formato incorrecto  debe presentar el mensaje de error  en pantalla:'The colour should be in valid hex format' |
    | nulla | nulla | Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. | 942b85 | gtyfN9dGJDmLLlMXMGZd5E36yto3oitlnRlttDlwxz7eFpgKBG59bLoK9capSpWAFO9Otb2XuLy63ESoFDyJ3GbRr3alAXAiDy7qlggRkviKlo6UwGOOYhA2cp1ATxUrXyolkh4PvM5L6VVlWQkY0zxLuwcsXs1zgHvRdghAAqbXzY80YDb8Hy1CuPs00s91| URL cannot be longer than 191 characters. | con slug mayor a 191 caracteres , debe presentar el mensaje de error  en pantalla:'URL cannot be longer than 191 characters.' |
    |vitae| vitae | 5g5sGMXXgOIjgQAqmMUs3R72piSEXOFXBA4nTfQAPwuLx3SXqaHamakGvFgfEanbAbzmQwJRUYxdx8tosM6NiCW3UooBko9OhUmPuFD6vCOjn9WXZdC9ZYJyjdLgFOxnM5trrjAsZkWeuiJtUjLwrYomSIqfgpzzmVIvJj9kzKFTHfwiJ2Cm2YrddfqQlhUUUXiQIwLXT95eZVBUKAoZ3tuyEwNFT6ysm9op7xQew2bPXPUUs6FSHMLQOJaNaHFOmSTooAH7FSGhG3rvChzy9SscwEuG3gFAMJ0nQOavZwY0CMloIOQVLMEH11LBJJXb2wt01ZiDfNbNHKEcn12EQ2KqPLWOli57TEzWEBPm0pBPdtfzRzlXiV1NLdQAxlejSzuK8mFBmdjlW3r2QJskx1z32HleRGqLzODNiGLG6GrzgUcZSDRlW28DLmylAm69WFMpB2KklVyQZHtFusLoVaty8Vq9JLP3luW5U74hNhQAGQh5nPJBE | 2d1080| nunc | Description cannot be longer than 500 characters. | con descripción mayor a 500 caracteres , debe presentar el mensaje de error en pantalla:'Description cannot be longer than 500 characters.' |

