import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const postPage = require("../pages/post_page.cy");


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
  postPage.editarPostDesdeListado(postId);
});


When("Se despublica el post", ()=>{
  postPage.despublicarPost(postId);
})

When("Se abre el panel de configuración del post", ()=>{
  postPage.abrirConfiguracionPost();
});

When("Eliminar el post", ()=>{
  postPage.eliminarPost();
});

Then("Validar que exista el postId el listado de posts con estado {string}",
  (estado) => {
    postPage.validarQueExistaElPostEnElListadoConEstado(postId, estado);
  }
);

Then("Validar que el post no existe dentro del listado", ()=>{
  postPage.validarQueElPostNoEstaEnElListado(postId);
})


Then("Validar que el título del post es {string}", (titulo) =>{
  postPage.validarTituloEnListadoDePosts(postId, titulo);
});
