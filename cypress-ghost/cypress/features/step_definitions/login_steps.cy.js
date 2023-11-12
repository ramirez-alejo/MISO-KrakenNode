import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const loginPage = require("../pages/login_page.cy");

Given("Navega al sitio de administración de Ghost", () => {
  cy.visit("/");
});

When("Ingresa usuario: {string} y clave: {string}", (usuario, clave) => {
  loginPage.autenticar(usuario, clave);
});

Given("Se autentica el usuario", () => {
  loginPage.autenticar("test@test.tt", "1234567890a.");
});

Then("Navega a la pagina principal", () => {
  loginPage.verificarIngreso();
});

Then('Muestra mensaje de error {string} en la autenticación', (mensajeError)=> {
    loginPage.verficarErrorAutenticacion(mensajeError);
});
