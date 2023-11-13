import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const loginPage = require("../pages/login_page.cy");

Given("Navega al sitio de administración de Ghost", () => {
  cy.visit("/");
});

When("Ingresa usuario: {string} y clave: {string}", (usuario, clave) => {
  loginPage.autenticar(usuario, clave);
});

Given("Se autentica el usuario", () => {
  cy.visit("/");
  loginPage.autenticar("grupo16@pruebas.com", "VssK5GQ776f2u$r%");
});

Then("Navega a la pagina principal", () => {
  loginPage.verificarIngreso();
});

Then('Muestra mensaje de error {string} en la autenticación', (mensajeError)=> {
    loginPage.verficarErrorAutenticacion(mensajeError);
});
