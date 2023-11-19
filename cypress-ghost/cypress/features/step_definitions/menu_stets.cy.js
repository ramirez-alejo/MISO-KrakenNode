import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const menuPage = require("../pages/menu_page.cy");

When(
    "Navega a las configuraciones de navegacion",
    ()=>{
        menuPage.navegarConfiguracionesNavegacion();
        cy.screenshot();
    }
);

When(
    "Agrega opcion al menu con nombre:{string} y enlace:{string} a la navegacion primaria",
    (nombre,enlace)=>{
        menuPage.agregarEnlaceNavegacionPrimaria(nombre,enlace);
        cy.screenshot();
    }
);

When(
    "Elimina opcion del menu con nombre:{string}",
    (nombre)=>{
        menuPage.eliminarEnlaceNavegacionPrimaria(nombre);
        cy.screenshot();
    }
);

Then(
    "Verificar que exista una opcion al menu con nombre:{string} y enlace:{string} a la navegacion primaria",
    (nombre,enlace)=>{
        menuPage.validarOpcionMenu(nombre,enlace);
        cy.screenshot();
    }
);

Then(
    "Verificar que exista una opcion al menu con nombre:{string}",
    (nombre)=>{
        menuPage.validarOpcionMenuEliminada(nombre);
        cy.screenshot();
    }
);
