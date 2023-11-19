import "./commands";

const postPage = require("../features/pages/post_page.cy");
const loginPage = require("../features/pages/login_page.cy");

export const siteUrl = "http://localhost:2368";



before(() => {
  cy.visit("/");
  loginPage.autenticar("grupo16@pruebas.com", "VssK5GQ776f2u$r%");
  postPage.eliminarTodosLosPosts();
  cy.visit("/" + "#/signout/");

});



