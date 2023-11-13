import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const memberPage = require("../pages/members_page.cy");


When(
    "Se crea un miembro con nombre:{string} y correo:{string}",
    (nombre,correo) => {
        memberPage.crearMiembro(nombre,correo);
    }
  );

When(
    "Se impersona el miembro", () => {
        memberPage.impersonarMiembro();
    }
);


Then (
    "Validar que exista el miembro con nombre:{string} y correo:{string}",
    (nombre,correo) => {
        memberPage.validarQueExistaUnMiembroEnElListadoConLosDatos(nombre,correo);
    }

  );

Then("Validar enlace impersonar generado", () =>{
      memberPage.validarImpersonar();
    });