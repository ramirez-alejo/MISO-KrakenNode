import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const postPage = require("../pages/post_page.cy");

let postId;

When(
  "Se crea post {string} desde el acceso directo de nuevo post",
  (titulo) => {
    postPage.crearPostDesdeMenu(titulo);
    cy.screenshot();
    postPage.obtenerElIdDelPost().then((id) => {
      postId = id;
    });
  }
);

When("Se modifica el título a {string}", (nuevoTitulo) => {
  postPage.modificarTitulo(nuevoTitulo);
  cy.screenshot();
});

When("Se publica inmediatamente el post", ()=>{
  postPage.publicarDeInmediato();
  cy.screenshot();
})

When("Se navega al listado de posts", ()=>{
  postPage.navegarAlListadoDePosts();
  cy.screenshot();
});

When("Se navega a la edición del post", ()=>{
  postPage.editarPostDesdeListado(postId, 'post');
  cy.screenshot();
});


When("Se despublica el post", ()=>{
  postPage.despublicarPost(postId, 'post');
  cy.screenshot();
})

When("Se abre el panel de configuración del post", ()=>{
  postPage.abrirConfiguracionPost();
  cy.screenshot();
});

When("Eliminar el post", ()=>{
  postPage.eliminarPost();
  cy.screenshot();
});

Then("Eliminar todos los posts", ()=>{
  postPage.eliminarTodosLosPosts();
  // cy.screenshot();
})

Then("Validar que exista el postId el listado de posts con estado {string}",
  (estado) => {
    postPage.validarQueExistaElPostEnElListadoConEstado(postId, estado);
    cy.screenshot();
  }
);

Then("Validar que el post no existe dentro del listado", ()=>{
  postPage.validarQueElPostNoEstaEnElListado(postId);
  cy.screenshot();
})


Then("Validar que el título del post es {string}", (titulo) =>{
  postPage.validarTituloEnListadoDePosts(postId, titulo);
  cy.screenshot();
});
