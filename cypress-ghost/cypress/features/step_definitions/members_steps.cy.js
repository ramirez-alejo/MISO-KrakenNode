import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const memberPage = require("../pages/members_page.cy");


When(
    "Se crea un miembro con nombre:{string} y correo:{string}",
    (nombre,correo) => {
        memberPage.crearMiembro(nombre,correo);
        cy.screenshot();
    }
  );

When(
    "Se impersona el miembro", () => {
        memberPage.impersonarMiembro();
        cy.screenshot();
    }
  );


When(
    "Se elmina el usuario con nombre:{string} y correo:{string}",
    (nombre,correo) => {
      memberPage.eliminarMiembro(nombre,correo);
      cy.screenshot();
    }
);


Then (
    "Validar que exista el miembro con nombre:{string} y correo:{string}",
    (nombre,correo) => {
        memberPage.validarQueExistaUnMiembroEnElListadoConLosDatos(nombre,correo);
        cy.screenshot();
    }

  );

Then("Validar enlace impersonar generado", () =>{
      memberPage.validarImpersonar();
      cy.screenshot();
    });

Then (
  "Validar que no exista usuario con nombre:{string} y correo:{string}",
  (nombre,correo) => {
      memberPage.validarQueNoExistaUnMiembroEnElListadoConLosDatos(nombre,correo);
      cy.screenshot();
  }

);

