import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const postPage = require("../pages/post_page.cy");
const memberSitePage = require("../pages/member_site_page.cy");

let postId;

When(
  "Se crea post {string} desde el acceso directo de nuevo post",
  (titulo) => {
    postPage.crearPostDesdeMenu(titulo);
    postPage.obtenerElIdDelPost().then((id) => {
      postId = id;
    });
  }
);

When("Se publica inmediatamente el post", ()=>{
  postPage.publicarDeInmediato();
})

Then("Validar que exista el postId el listado de posts con estado {string}",
  (estado) => {
    postPage.navegarAlListadoDePosts();
    postPage.validarQueExistaElPostEnElListado(postId, estado);
  }
);

Then("Validar la publicación del post", ()=>{
  postPage.validarPublicacionPost();
})
