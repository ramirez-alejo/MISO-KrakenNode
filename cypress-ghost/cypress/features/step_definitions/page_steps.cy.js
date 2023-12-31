import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const pagePage = require("../pages/page_page.cy");

let pageId;

When("Se crea page {string}", (titulo)=>{
    pagePage.navegarAPages();
    pagePage.crearPage(titulo);
    cy.screenshot();
    pagePage.obtenerElIdDelPage().then((id) => {
        pageId = id;
      });
});

When("Se navega al listado de páginas", ()=>{
    pagePage.devolverAListadoPaginas();
    cy.screenshot();
});

When("Se navega a la edición del page", ()=>{
    pagePage.editarPageDesdeListado(pageId);
    cy.screenshot();
  });

  When("Se modifica el título del page a {string}", (nuevoTitulo) => {
    pagePage.modificarTitulo(nuevoTitulo);
    cy.screenshot();
  });

  When("Se despublica el page", ()=>{
    pagePage.despublicarPage();
    cy.screenshot();
  })

Then("Validar que exista la página en el listado con estado {string}", (estado) =>{
    pagePage.validarQueExistaElPageEnElListadoConEstado(pageId, estado);
    cy.screenshot();
});


Then("Validar que el título del page es {string}", (titulo) =>{
    pagePage.validarTituloEnListadoDePages(pageId, titulo);
    cy.screenshot();
  });