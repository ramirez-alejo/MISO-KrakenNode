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

When(
    "Navego a la creacion de nuevo miembro",
    ()=>{
      memberPage.navegarACrearMiembro();
    }
);

When(
    "Se llena el formulario con los datos, nombre:{string} , correo:{string} y nota:{string}",
    (nombre,correo,nota)=>{
      memberPage.llenarFormulario(nombre,correo,nota);
    }
);

When(
    "Hago click en el botón de  guardar",
    ()=>{
      memberPage.guardarCambiosFormulario();
    }
);


When(
    "Se edita suscripción",
    ()=>{
      memberPage.desuscribirse();
      memberPage.guardarCambiosFormulario();
    }
)



Then(
    "Validar que el formulario no permita guardar",
    ()=>{
      memberPage.validarFormularioNoPermiteGuardar();
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

Then(
  "Debe aparecer  el mensaje de error:{string} en el formulario",
  (mensajeError)=>{
     memberPage.validarMensajeErrorPresente(mensajeError);
  }
);

Then(
  "Validar que exista activdiad de registro y  Subscrito en  el miembro con nombre:{string}",
  (nombre)=>{
    memberPage.validarActividad(nombre,false);
  }
);

Then(
  "Validar que exista activdiad de registro , Subscrito  y cancelar suscripción en  el miembro con nombre:{string}",
  (nombre)=>{
    memberPage.validarActividad(nombre,true);
  }
);

