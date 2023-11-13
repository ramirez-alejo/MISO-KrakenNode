import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const pagePage = require("../pages/page_page.cy");

let pageId;

When("Se crea page {string}", (titulo)=>{
    pagePage.navegarAPages();
    pagePage.crearPage(titulo);
    pagePage.obtenerElIdDelPage().then((id) => {
        pageId = id;
      });
});

When("Se navega al listado de páginas", ()=>{
    pagePage.devolverAListadoPaginas();
});

Then("Validar que exista la página en el listado con estado {string}", (estado) =>{
    pagePage.validarQueExistaElPageEnElListadoConEstado(pageId, estado);
});