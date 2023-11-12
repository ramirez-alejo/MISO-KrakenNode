import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const postPage = require("../pages/post_page.cy");

let postId;

When(
  "Se crea post {string} desde el acceso directo de nuevo post",
  (titulo) => {
    postPage.crearPostDesdeMenu(titulo);
  }
);

When("Se navega al listado de posts", () => {
  postPage.navegarAlListadoDePosts();
});

When("Se obtiene el postId", () => {
  postPage.obtenerElIdDelPost().then((id) => {
    postId = id;
  });
});

Then("Validar que exista el postId el listado de posts", () => {
  postPage.obtenerElPostDentroDelListado(postId);
});
