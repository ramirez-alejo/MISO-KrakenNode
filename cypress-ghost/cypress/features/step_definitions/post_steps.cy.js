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

When("Se modifica el título a {string}", (nuevoTitulo) => {
  postPage.modificarTitulo(nuevoTitulo);
});

When("Se publica inmediatamente el post", ()=>{
  postPage.publicarDeInmediato();
})

When("Se navega al listado de posts", ()=>{
  postPage.navegarAlListadoDePosts();
});

When("Se navega a la edición del post", ()=>{
  postPage.editarElPost(postId);
});

Then("Validar que exista el postId el listado de posts con estado {string}",
  (estado) => {
    postPage.navegarAlListadoDePosts();
    postPage.validarQueExistaElPostEnElListadoConEstado(postId, estado);
  }
);

Then("Validar la publicación del post", ()=>{
  postPage.validarPublicacionPost();
})

Then("Validar que el título del post es {string}", (titulo) =>{
  postPage.validarTituloEnListadoDePosts(postId, titulo);
});
